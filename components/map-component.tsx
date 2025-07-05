"use client"

import {useEffect} from "react"
import {useRouter} from "next/navigation"
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import {Button} from "@/components/ui/button"
import "leaflet/dist/leaflet.css"
/* @ts-ignore */
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

interface MapComponentProps {
    properties: any[]
}

function FitBounds({properties}: {properties: any[]}) {
    const map = useMap()

    useEffect(() => {
        const bounds = new L.LatLngBounds([])

        properties.forEach((property) => {
            if (property.address_id?.latitude && property.address_id?.longitude) {
                bounds.extend([property.address_id.latitude, property.address_id.longitude])
            }
        })

        if (bounds.isValid()) {
            map.fitBounds(bounds, {padding: [50, 50]})
        }
    }, [properties, map])

    return null
}

export default function MapComponent({properties}: MapComponentProps) {
    const router = useRouter()

    const customIcon = new L.DivIcon({
        html: `<div style="color: #2563eb; font-size: 24px;">📍</div>`,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
    })

    return (
        <MapContainer
            /* @ts-ignore */
            center={[-36.6, -58.39]}
            zoom={6}
            scrollWheelZoom={true}
            style={{height: "100%", width: "100%", zIndex: 0}}
        >
            <TileLayer
                /* @ts-ignore */
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitBounds properties={properties} />

            <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={(cluster:any) => {
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
                                            router.push(`/emprendimientos/${property._id}`)
                                        }}
                                        className="absolute top-0 h-6 px-2 mt-5 left-7"
                                    >
                                        Ver detalle
                                    </Button>
                                </Popup>
                            </Marker>
                        ),
                )}
            </MarkerClusterGroup>
        </MapContainer>
    )
}
