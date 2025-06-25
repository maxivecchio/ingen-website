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

// Función para obtener el color de estado
const getStatusBadge = (status: string) => {
    switch (status) {
        case "available":
            return (
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 font-medium">Disponible</Badge>
            )
        case "occupied":
            return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 font-medium">Ocupada</Badge>
        case "maintenance":
            return (
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0 font-medium">Mantenimiento</Badge>
            )
        case "pending":
            return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-0 font-medium">Pendiente</Badge>
        default:
            return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 font-medium">Desconocido</Badge>
    }
}

export default function PropertyDetail({ propertyId }: { propertyId: string }) {
    const [property, setProperty] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [activeTab, setActiveTab] = useState("Detalles")
    const router = useRouter()

    const tabs = [
        "Detalles",
        "Características",
        ...(property?.files.length > 0 ? ["Documentos"] : []),
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
                <p className="text-muted-foreground mb-6">La propiedad que estás buscando no existe o ha sido eliminada.</p>
                <Button variant="default" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al listado
                </Button>
            </div>
        )
    }



    return (
        <div className="space-y-6 pt-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button onClick={() => router.push("/myprops/properties")} variant="outline" size="icon" className="h-9 w-9 shrink-0">
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
                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                    <Button onClick={() => router.push(`/myprops/properties/form/${property._id}`)} variant="outline" size="sm" className="gap-1 shadow-sm">
                        <Edit className="h-3.5 w-3.5" />
                        <span>Editar</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 shadow-sm">
                        <Download className="h-3.5 w-3.5" />
                        <span>Exportar</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 shadow-sm">
                        <Share2 className="h-3.5 w-3.5" />
                        <span>Compartir</span>
                    </Button>
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

                                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm">
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
                                                    ${property?.price?.toLocaleString() || "No especificado"} {property.currency}
                                                </span>
                                            </div>

                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Expensas mensuales</span>
                                                <span className="font-medium">
                                                    ${property?.monthly_fee?.toLocaleString() || "No especificado"} {property.monthly_fee_currency}
                                                </span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Complejo</span>
                                                <span className="font-medium">{property.complex_name || "No especificado"}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Fecha de publicación</span>
                                                <span className="font-medium">{new Date(property.publication_date).toLocaleDateString()}</span>
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
                                        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                                            <Maximize className="h-8 w-8 text-blue-500 mb-2" />
                                            <span className="text-2xl font-bold">{property.dimensions.square_meters} m²</span>
                                            <span className="text-sm text-muted-foreground">Superficie total</span>
                                        </div>
                                        {property.dimensions.built_meters > 0 && (
                                            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                                                <Home className="h-8 w-8 text-blue-500 mb-2" />
                                                <span className="text-2xl font-bold">{property.dimensions.built_meters} m²</span>
                                                <span className="text-sm text-muted-foreground">Superficie construida</span>
                                            </div>
                                        )}
                                        {property.dimensions.land_meters > 0 && (
                                            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                                                <Ruler className="h-8 w-8 text-blue-500 mb-2" />
                                                <span className="text-2xl font-bold">{property.dimensions.land_meters} m²</span>
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
                                                <span className="font-medium">{property.commercial_details.zoning}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Tráfico peatonal</span>
                                                <span className="font-medium">{property.commercial_details.foot_traffic}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Negocio anterior</span>
                                                <span className="font-medium">{property.commercial_details.previous_business}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-muted-foreground mb-2">Actividades permitidas</span>
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

                        <TabsContent value="Documentos" className="space-y-6">
                            <Card className="shadow-sm border-0">
                                <CardHeader className="pb-2">
                                    <CardTitle>Documentos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {property.files.length > 0 ? (
                                        <div className="space-y-4">
                                            {property.files.map((file: any) => (
                                                <div
                                                    key={file._id}
                                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                            <FileText className="h-5 w-5 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{file.file_name}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                Subido el {new Date(file.uploaded_at).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm" className="gap-1">
                                                        <Download className="h-4 w-4" />
                                                        <span>Descargar</span>
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-8 text-center">
                                            <FileText className="h-12 w-12 text-slate-300 mb-4" />
                                            <h3 className="text-lg font-medium mb-2">No hay documentos</h3>
                                            <p className="text-muted-foreground mb-4">Esta propiedad no tiene documentos adjuntos.</p>
                                            <Button variant="outline" className="gap-1">
                                                <Upload className="h-4 w-4" />
                                                <span>Subir documento</span>
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {property.contracts.length > 0 && (
                            <TabsContent value="Contratos" className="space-y-6">
                                <Card className="shadow-sm border-0">
                                    <CardHeader className="pb-2">
                                        <CardTitle>Contratos</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>ID</TableHead>
                                                    <TableHead>Inquilino</TableHead>
                                                    <TableHead>Período</TableHead>
                                                    <TableHead>Valor mensual</TableHead>
                                                    <TableHead>Estado</TableHead>
                                                    <TableHead className="text-right">Acciones</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {property.contracts.map((contract: any) => (
                                                    <TableRow key={contract.contract_id}>
                                                        <TableCell className="font-medium">{contract.contract_id.substring(18)}</TableCell>
                                                        <TableCell>{contract.tenant_name}</TableCell>
                                                        <TableCell>
                                                            {new Date(contract.start_date).toLocaleDateString()} -{" "}
                                                            {new Date(contract.end_date).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            ${contract.monthly_rent.toLocaleString()} {contract.currency}
                                                        </TableCell>
                                                        <TableCell>
                                                            {contract.status === "active" ? (
                                                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">
                                                                    Activo
                                                                </Badge>
                                                            ) : (
                                                                <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0">
                                                                    Finalizado
                                                                </Badge>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                                                                <Eye className="h-4 w-4" />
                                                                <span>Ver</span>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        )}

                        {property.status === "maintenance" && (
                            <TabsContent value="Mantenimiento" className="space-y-6">
                                <Card className="shadow-sm border-0">
                                    <CardHeader className="pb-2">
                                        <CardTitle>Detalles de mantenimiento</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Fecha de inicio</span>
                                                <span className="font-medium">
                                                    {new Date(property.maintenance_details.start_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Fecha estimada de finalización</span>
                                                <span className="font-medium">
                                                    {new Date(property.maintenance_details.estimated_end_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Costo estimado</span>
                                                <span className="font-medium">
                                                    ${property.maintenance_details.cost.toLocaleString()} {property.maintenance_details.currency}
                                                </span>
                                            </div>
                                            <Separator />
                                            <div className="flex flex-col">
                                                <span className="text-muted-foreground mb-2">Descripción de trabajos</span>
                                                <p>{property.maintenance_details.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        )}
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
                                        ${property?.price?.toLocaleString() || "No especificado"} {property.currency}
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
                                <div className="h-[200px] bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                                    <MapPin className="h-8 w-8 text-slate-400" />
                                    <span className="ml-2 text-slate-500">Mapa no disponible</span>
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
                                    <Button variant="outline" className="w-full gap-1">
                                        <ExternalLink className="h-4 w-4" />
                                        <span>Ver en Google Maps</span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Información del administrador */}
                    {property.manager && (
                        <Card className="shadow-sm border-0">
                            <CardHeader className="pb-2">
                                <CardTitle>Administrador asignado</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4 mb-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage
                                            src={property.manager.avatar_url || "/placeholder.svg"}
                                            alt={property.manager.full_name}
                                        />
                                        <AvatarFallback>
                                            {property.manager.full_name
                                                .split(" ")
                                                .map((n: string) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{property.manager.full_name}</p>
                                        <p className="text-sm text-muted-foreground">{property.manager.role_name}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-blue-500" />
                                        <span>{property.manager.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-blue-500" />
                                        <span>{property.manager.phone}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Estadísticas */}
                    <Card className="shadow-sm border-0">
                        <CardHeader className="pb-2">
                            <CardTitle>Estadísticas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-blue-500" />
                                        <span className="text-muted-foreground">Publicada hace</span>
                                    </div>
                                    <span className="font-medium">
                                        {Math.floor(
                                            (new Date().getTime() - new Date(property.publication_date).getTime()) / (1000 * 60 * 60 * 24),
                                        )}{" "}
                                        días
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Eye className="h-4 w-4 text-blue-500" />
                                        <span className="text-muted-foreground">Visitas</span>
                                    </div>
                                    <span className="font-medium">124</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <BarChart className="h-4 w-4 text-blue-500" />
                                        <span className="text-muted-foreground">Comparado con similares</span>
                                    </div>
                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                        -5% precio
                                    </Badge>
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
        </div>
    )
}
