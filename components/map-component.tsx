"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import { Button } from "@/components/ui/button"
import "leaflet/dist/leaflet.css"
/* @ts-ignore */
import L from "leaflet"
import { PencilRuler } from "lucide-react"
import ReactDOMServer from "react-dom/server"
import { getImageUrl } from "@/lib/utils"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

interface MapComponentProps {
    properties: any[]
}

function FitBounds({ properties }: { properties: any[] }) {
    const map = useMap()

    useEffect(() => {
        const bounds = new L.LatLngBounds([])

        properties.forEach((property) => {
            if (property.address_id?.latitude && property.address_id?.longitude) {
                bounds.extend([property.address_id.latitude, property.address_id.longitude])
            }
        })

        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50] })
        }
    }, [properties, map])

    return null
}

export default function MapComponent({ properties }: MapComponentProps) {
    const router = useRouter()

    /*     const customIcon = new L.DivIcon({
            html: `
        <div style="
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          padding: 6px 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          font-size: 18px;
        ">
          🏢
        </div>
      `,
            className: "",
            iconSize: [36, 36],
            iconAnchor: [18, 36],
        }) */

    const getCustomIcon = () => {
        const iconHTML = ReactDOMServer.renderToStaticMarkup(
            <div
                style={{
                    background: "white",
                    border: "2px solid #ccc",
                    borderRadius: "8px",
                    padding: "4px",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <PencilRuler size={18} color="#000" />
            </div>
        )

        return new L.DivIcon({
            html: iconHTML,
            className: "",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
        })
    }

    const customIcon = getCustomIcon()

    return (
        <MapContainer
            /* @ts-ignore */
            center={[-36.6, -58.39]}
            zoom={6}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
            <TileLayer
                /* @ts-ignore */
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitBounds properties={properties} />

            <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={(cluster: any) => {
                    return L.divIcon({
                        html: `
                            <div style="
                                background-color: #dc2626;
                                color: white;
                                border-radius: 9999px;
                                width: 40px;
                                height: 40px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-weight: bold;
                                font-size: 14px;
                                border: 2px solid white;
                                box-shadow: 0 0 0 2px #dc2626;
                            ">
                                ${cluster.getChildCount()}
                            </div>
                        `,
                        className: "custom-cluster-icon",
                        iconSize: [40, 40],
                    })
                }}
            >
                {properties.map(
                    (property: any) =>
                        property.address_id?.latitude &&
                        property.address_id?.longitude && (
                            <Marker
                                key={property._id}
                                position={[property.address_id.latitude, property.address_id.longitude]}
                                /* @ts-ignore */
                                icon={customIcon}
                            >
                                <Popup>
                                    <div className="relative">
                                        <img
                                            /* src={property.cover_image || "/placeholder.svg"} */
                                            src={property.files?.[0] ? getImageUrl(property?.files[0]) : "/placeholder.svg"}
                                            alt={property.name}
                                            className="w-full h-[140px] object-cover"
                                        />

                                        <div className="p-3 space-y-1">
                                            {property.status && (
                                                <span
                                                    className="inline-block absolute top-3 left-3 text-xs font-medium rounded-full px-2 py-0.5"
                                                    style={{ backgroundColor: property.status.color, color: "white" }}
                                                >
                                                    {property.status.name}
                                                </span>
                                            )}

                                            <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                                                {property.name}
                                            </h3>

                                            <p className="text-xs text-gray-600">
                                                {property.address_id
                                                    ? `${property.address_id.address_line}, ${property.address_id.city}`
                                                    : "Dirección no disponible"}
                                            </p>

                                            {property.price && (
                                                <p className="text-sm font-bold text-gray-900 mt-1">
                                                    {property.currency === "ARS" ? "$" : "USD"}{" "}
                                                    {property.price.toLocaleString("es-AR")}
                                                </p>
                                            )}

                                            <Button
                                                onClick={() => {
                                                    window.location.href = `/propiedades/${property._id}`
                                                }}
                                                className="w-full mt-2"
                                                size="sm"
                                            >
                                                Ver detalle
                                            </Button>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ),
                )}
            </MarkerClusterGroup>
        </MapContainer>
    )
}
