"use client"

import {useRouter} from "next/navigation"
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import {Button} from "@/components/ui/button"
import "leaflet/dist/leaflet.css"
/* @ts-ignore */
import L from "leaflet"

// Fix for default markers in Leaflet with Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

interface MapComponentProps {
    properties: any[]
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
            scrollWheelZoom={false}
            style={{height: "100%", width: "100%", zIndex: 0}}
        >
            <TileLayer
                /* @ts-ignore */
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

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
                                <img className="mb-2 rounded-lg" src={property.cover_image || "/placeholder.svg"} alt=""/>
                                <strong>{property.name}</strong>
                                <br/>
                                {property.address_id.address_line}, {property.address_id.city}
                                <br/>
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
        </MapContainer>
    )
}
