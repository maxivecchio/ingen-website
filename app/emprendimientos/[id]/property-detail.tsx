"use client"

import { useEffect, useState } from "react"
import {
    ArrowLeft,
    MapPin,
    Calendar,
    FileText,
    Phone,
    Mail,
    Maximize,
    Home,
    Check,
    X,
    Edit,
    Download,
    Share2,
    Heart,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Ruler,
    BarChart,
    Upload,
    Eye,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { set } from "date-fns"
import { propertyService } from "@/components/api/properties-api"
import TabComponentFrame from "@/components/propiedades/TabComponentFrame"
import Header from "@/components/header"

// Función para obtener el color de estado
const getStatusBadge = (status: any) => {
    if (!status || typeof status !== "object") {
        return (
            <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 font-medium">
                Desconocido
            </Badge>
        )
    }

    return (
        <Badge
            className="border-0 font-medium"
            style={{
                backgroundColor: `${status.color}20`, // 20 = ~12.5% alpha
                color: status.color,
            }}
        >
            {status.name}
        </Badge>
    )
}

export default function PropertyDetail({ propertyId }: { propertyId: string }) {
    const [property, setProperty] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [activeTab, setActiveTab] = useState("Detalles")
    const router = useRouter()

    const tabs = [
        "Detalles",
        ...(property?.files.length > 0 ? ["Documentos"] : []),
        ...(property?.type_info.length > 0 ? ["Características"] : []),
        ...(property?.contracts.length > 0 ? ["Contratos"] : []),
        ...(property?.status === "maintenance" ? ["Mantenimiento"] : []),
    ];

    const loadProperty = async () => {
        setLoading(true)

        try {
            const response = await propertyService.getById(propertyId)

            console.log(response);

            setProperty(response)
            setLoading(false)
        } catch (error) {
            console.error("Error al obtener la propiedad:", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        loadProperty()
    }, [])

    const nextImage = () => {
        if (property) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.gallery.length)
        }
    }

    const prevImage = () => {
        if (property) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.gallery.length) % property.gallery.length)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!property) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-4">Propiedad no encontrada</h1>
                <p className="text-muted-foreground mb-6">La propiedad que estás buscando no existe o ha sido
                    eliminada.</p>
                <Button variant="default" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al listado
                </Button>
            </div>
        )
    }


    return (
        <div className="min-h-screen bg-white">
            <main className="space-y-6 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Button onClick={() => router.push("/propiedades")} variant="outline" size="icon"
                            className="h-9 w-9 shrink-0">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold tracking-tight">{property.name}</h1>
                                {getStatusBadge(property.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                {property.address_id?.address_line} • {property.address_id?.city}, {property.address_id?.state}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Galería de imágenes */}
                        <Card className="overflow-hidden shadow-sm border-0">
                            <div className="relative h-[400px] w-full">
                                <img
                                    src={
                                        property?.gallery?.length
                                            ? property.gallery[currentImageIndex]
                                            : property?.cover_image || "/placeholder.svg"
                                    }
                                    alt={`${property?.name || "Propiedad"} - Imagen ${currentImageIndex + 1}`}
                                    className="h-full w-full object-cover"
                                />

                                {property?.gallery?.length > 1 && (
                                    <>
                                        <div className="absolute inset-0 flex items-center justify-between p-4">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={prevImage}
                                                className="h-10 w-10 rounded-full bg-white/80 hover:bg-white"
                                            >
                                                <ChevronLeft className="h-6 w-6" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={nextImage}
                                                className="h-10 w-10 rounded-full bg-white/80 hover:bg-white"
                                            >
                                                <ChevronRight className="h-6 w-6" />
                                            </Button>
                                        </div>

                                        <div
                                            className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm">
                                            {currentImageIndex + 1} / {property.gallery.length}
                                        </div>
                                    </>
                                )}
                            </div>

                            {property?.gallery?.length > 1 && (
                                <div className="p-4 flex gap-2 overflow-x-auto">
                                    {property.gallery.map((image: string, index: number) => (
                                        <div
                                            key={index}
                                            className={`h-16 w-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${index === currentImageIndex ? "border-blue-600" : "border-transparent"}`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        >
                                            <img
                                                src={image || "/placeholder.svg"}
                                                alt={`Miniatura ${index + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>

                        {/* Detalles de la propiedad */}
                        <Tabs value={activeTab} className="w-full">
                            <div className="mb-6 bg-white p-2 border border-black/5 shadow rounded-lg">
                                <TabComponentFrame activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
                            </div>

                            <TabsContent value="Detalles" className="space-y-6">
                                <Card className="shadow-sm border-0">
                                    <CardHeader className="pb-2">
                                        <CardTitle>Descripción</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{property.description}</p>
                                    </CardContent>
                                </Card>

                                <Card className="shadow-sm border-0">
                                    <CardHeader className="pb-2">
                                        <CardTitle>Información básica</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-4">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Tipo de propiedad</span>
                                                    <span className="font-medium">{property.property_type}</span>
                                                </div>
                                                <Separator />
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Estado</span>
                                                    <span>{getStatusBadge(property.status)}</span>
                                                </div>
                                                <Separator />
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Precio</span>
                                                    <span className="font-medium">
                                                        {property?.price ? `$${property?.price?.toLocaleString()}` : "No especificado"} {property?.price ? property.currency : ""}
                                                    </span>
                                                </div>

                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Expensas mensuales</span>
                                                    <span className="font-medium">
                                                        {property?.monthly_fee ? `$${property?.monthly_fee?.toLocaleString()}` : "No especificado"} {property?.monthly_fee ? property.monthly_fee_currency : ""}
                                                    </span>
                                                </div>
                                                <Separator />
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Complejo</span>
                                                    <span
                                                        className="font-medium">{property.complex_name || "No especificado"}</span>
                                                </div>
                                                <Separator />
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Fecha de publicación</span>
                                                    <span
                                                        className="font-medium">{new Date(property.publication_date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="shadow-sm border-0">
                                    <CardHeader className="pb-2">
                                        <CardTitle>Dimensiones</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div
                                                className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                                                <Maximize className="h-8 w-8 text-blue-500 mb-2" />
                                                <span
                                                    className="text-2xl font-bold">{property.dimensions.square_meters} m²</span>
                                                <span className="text-sm text-muted-foreground">Superficie total</span>
                                            </div>
                                            {property.dimensions.built_meters > 0 && (
                                                <div
                                                    className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                                                    <Home className="h-8 w-8 text-blue-500 mb-2" />
                                                    <span
                                                        className="text-2xl font-bold">{property.dimensions.built_meters} m²</span>
                                                    <span className="text-sm text-muted-foreground">Superficie construida</span>
                                                </div>
                                            )}
                                            {property.dimensions.land_meters > 0 && (
                                                <div
                                                    className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                                                    <Ruler className="h-8 w-8 text-blue-500 mb-2" />
                                                    <span
                                                        className="text-2xl font-bold">{property.dimensions.land_meters} m²</span>
                                                    <span className="text-sm text-muted-foreground">Superficie de terreno</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="Características" className="space-y-6">
                                <Card className="shadow-sm border-0">
                                    <CardHeader className="pb-2">
                                        <CardTitle>Características y amenities</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {property.type_info.length > 0 && property.type_info.map((feature: any, index: number) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <Check className="h-5 w-5 text-emerald-500" />
                                                    <span>{feature?.label} - {feature?.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {property.property_type === "Local Comercial" && property.commercial_details && (
                                    <Card className="shadow-sm border-0">
                                        <CardHeader className="pb-2">
                                            <CardTitle>Detalles comerciales</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Zonificación</span>
                                                    <span
                                                        className="font-medium">{property.commercial_details.zoning}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Tráfico peatonal</span>
                                                    <span
                                                        className="font-medium">{property.commercial_details.foot_traffic}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Negocio anterior</span>
                                                    <span
                                                        className="font-medium">{property.commercial_details.previous_business}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span
                                                        className="text-muted-foreground mb-2">Actividades permitidas</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {property.commercial_details.permitted_activities.map((activity: string, index: number) => (
                                                            <Badge key={index} variant="outline">
                                                                {activity}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="space-y-6">
                        {/* Información de precio */}
                        <Card className="shadow-sm border-0">
                            <CardHeader className="pb-2">
                                <CardTitle>Información económica</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg">Precio</span>
                                        <span className="text-2xl font-bold text-blue-600">
                                            {property?.price ? `$${property?.price?.toLocaleString()}` : "No especificado"} {property?.price ? property.currency : ""}
                                        </span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Expensas mensuales</span>
                                        <span className="font-medium">
                                            ${property?.monthly_fee?.toLocaleString() || "No especificado"} {property.monthly_fee_currency}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Precio por m²</span>
                                        <span className="font-medium">
                                            ${Math.round(property.price / property.dimensions.square_meters).toLocaleString()}{" "}
                                            {property.currency}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Información de ubicación */}
                        <Card className="shadow-sm border-0">
                            <CardHeader className="pb-2">
                                <CardTitle>Ubicación</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="rounded-md overflow-hidden relative" style={{ height: 200 }}>
                                        <iframe
                                            title="Mapa de Ubicación"
                                            src={`https://maps.google.com/maps?q=${property.address_id?.latitude},${property.address_id?.longitude}&z=15&output=embed`}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={false}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2">
                                            <MapPin className="h-4 w-4 text-blue-500 mt-0.5" />
                                            <div>
                                                <p className="font-medium">{property.address_id?.address_line}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {property.address_id?.city}, {property.address_id?.state} {property.address_id?.postal_code}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{property.address_id?.country}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${property.address_id?.latitude},${property.address_id?.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button variant="outline" className="w-full gap-1">
                                                <ExternalLink className="h-4 w-4" />
                                                <span>Ver en Google Maps</span>
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Etiquetas */}
                        <Card className="shadow-sm border-0">
                            <CardHeader className="pb-2">
                                <CardTitle>Etiquetas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">

                                    {property?.property_type_id && (
                                        <Badge variant="outline" className="bg-slate-50">
                                            {property.property_type_id?.name}
                                        </Badge>
                                    )}

                                    {property?.address_id?.city && (
                                        <Badge variant="outline" className="bg-slate-50">
                                            {property.address_id?.city}
                                        </Badge>
                                    )}

                                    {property?.dimensions?.square_meters && (
                                        <Badge variant="outline" className="bg-slate-50">
                                            {property?.dimensions?.square_meters}
                                        </Badge>
                                    )}

                                    {property.complex_name && (
                                        <Badge variant="outline" className="bg-slate-50">
                                            {property.complex_name}
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
