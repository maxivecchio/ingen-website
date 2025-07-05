"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
/* @ts-ignore */
import L from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})
import * as LucideIcons from "lucide-react"
import ReactDOMServer from "react-dom/server"

interface PropertiesMapProps {
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

export default function PropertiesMap({ properties }: PropertiesMapProps) {
    const getCustomIcon = (iconName: string) => {
        const Icon = LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.Home

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
                <Icon size={18} color="#000" />
            </div>
        )

        return new L.DivIcon({
            html: iconHTML,
            className: "",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
        })
    }

    useEffect(() => {
        properties.forEach((property) => {
            const iconName = property.property_type_id?.icon || "Home"
            const container = document.getElementById(`icon-${iconName}`)
            if (container && LucideIcons[iconName]) {
                const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons]
                const iconElement = IconComponent({ size: 20, color: "#000" })
                const temp = document.createElement("div")
                temp.innerHTML = ReactDOMServer.renderToStaticMarkup(iconElement)
                container.innerHTML = temp.innerHTML
            }
        })
    }, [properties])

    return (
        <MapContainer
            /* @ts-ignore */
            center={[-36.6, -58.39]}
            zoom={6}
            scrollWheelZoom={false}
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
                iconCreateFunction={(cluster) => {
                    return new L.DivIcon({
                        html: `
              <div style="
                background: #ef4444;
                border-radius: 9999px;
                width: 32px;
                height: 32px;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: bold;
              ">
                ${cluster.getChildCount()}
              </div>
            `,
                        className: "",
                        iconSize: [32, 32],
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
                                icon={getCustomIcon(property.property_type_id?.icon || "Home")}
                            >
                                {/* <Popup>
                                    <img
                                        className="mb-2 rounded-lg"
                                        src={property.cover_image || "/placeholder.svg"}
                                        alt=""
                                    />
                                    <strong>{property.name}</strong>
                                    <br />
                                    {property.address_id.address_line}, {property.address_id.city}
                                    <br />
                                    <Button
                                        onClick={() => {
                                            window.location.href = `/propiedades/${property._id}`
                                        }}
                                        className="absolute top-0 h-6 px-2 mt-5 left-7"
                                    >
                                        Ver detalle
                                    </Button>
                                </Popup> */}

                                <Popup>
                                    <div className="relative">
                                        <img
                                            src={property.cover_image || "/placeholder.svg"}
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
                        )
                )}
            </MarkerClusterGroup>
        </MapContainer>
    )
}
