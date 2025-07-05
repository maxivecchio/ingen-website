"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, MessageCircle } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { propertyService } from "@/components/api/properties-api"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Dynamically import the map component with SSR disabled
const DynamicMap = dynamic(() => import("@/components/map-component"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] sm:h-[600px] bg-gray-200 flex items-center justify-center">
            <div className="text-gray-600">Cargando mapa...</div>
        </div>
    ),
})

export default function EmprendimientosPage() {
    const [propertiesEmprende, setPropertiesEmprende] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
    })

    const loadPropertiesEmprende = useCallback(async () => {
        try {
            setLoading(true)
            const filters: any = {
                page: currentPage,
                property_type: "all",
                limit: 10,
            }

            const response = await propertyService.getAllEmprende(filters)
            console.log(response)
            setPropertiesEmprende(response.data)
            setPagination(response.pagination)
        } catch (error) {
            console.error("Error loading properties:", error)
        } finally {
            setLoading(false)
        }
    }, [currentPage])

    useEffect(() => {
        loadPropertiesEmprende()
    }, [loadPropertiesEmprende])

    const handleWhatsAppContact = (project: any) => {
        const message = `Hola! Me interesa obtener más información sobre el proyecto ${project.name} ubicado en ${project.location}. ¿Podrían brindarme detalles sobre las oportunidades de inversión disponibles?`
        const whatsappUrl = `https://wa.me/5491135221036?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
    }

    const goToNextPage = () => {
        if (pagination.hasNextPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const goToPreviousPage = () => {
        if (pagination.hasPrevPage) {
            setCurrentPage(currentPage - 1)
        }
    }

    const router = useRouter()

    return (
        <div className="min-h-screen bg-white">
            <section>
                <div className="w-full h-[400px] sm:h-[600px]">
                    <DynamicMap properties={propertiesEmprende} />
                </div>
            </section>

            <main className="">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-brand-gray to-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Nuestros Emprendimientos</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Descubrí las obras en desarrollo y las oportunidades de inversión disponibles
                        </p>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Obras en Desarrollo</h2>
                            <p className="text-xl text-gray-600">Conocé en detalle cada uno de nuestros proyectos</p>
                        </div>

                        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {propertiesEmprende &&
                                propertiesEmprende.map((project: any) => (
                                    <Card
                                        key={project?._id}
                                        className="overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300"
                                    >
                                        <div className="relative">
                                            <Image
                                                src={project?.cover_image || "/placeholder.svg"}
                                                alt={project?.name}
                                                width={400}
                                                height={300}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span
                                                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                                    style={{ backgroundColor: project.status?.color || "#9CA3AF" }}
                                                >
                                                    {project.status?.name || "Sin estado"}
                                                </span>
                                            </div>
                                        </div>

                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{project?.name}</h3>

                                            <div className="flex items-center text-gray-600 mb-3 text-sm">
                                                <MapPin className="h-4 w-4 mr-2 text-red-500" />
                                                <span className="text-sm">
                                                    {project.address_id?.city}, {project.address_id?.state}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                                                    {new Date(project?.publication_date).toLocaleDateString("es-AR")}
                                                </div>
                                            </div>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                                            <div className="mb-5">
                                                <div className="flex justify-between text-sm text-gray-500 mb-1">
                                                    <span>Progreso</span>
                                                    <span>
                                                        {project?.type_info?.find(
                                                            (info: any) =>
                                                                info.label?.toLowerCase() === "progreso" ||
                                                                info.name?.toLowerCase().includes("progreso"),
                                                        )?.value ?? "0"}
                                                        %
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-brand-black to-brand-dark transition-all duration-500"
                                                        style={{
                                                            width: `${project?.type_info?.find(
                                                                (info: any) =>
                                                                    info.label?.toLowerCase() === "progreso" ||
                                                                    info.name?.toLowerCase().includes("progreso"),
                                                            )?.value ?? "0"
                                                                }%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <Button
                                                    className="w-full bg-brand-black hover:bg-brand-dark text-white"
                                                    onClick={() => handleWhatsAppContact(project)}
                                                >
                                                    <MessageCircle className="h-4 w-4 mr-2" />
                                                    Consultar por WhatsApp
                                                </Button>

                                                <Link
                                                    href={`/emprendimientos/${project?._id}`}
                                                    className="block text-center text-brand-black border border-brand-black rounded-md py-2 text-sm font-medium hover:bg-brand-black hover:text-white transition"
                                                >
                                                    Ver Detalles
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>

                        <div>
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                                <div className="text-sm text-black">
                                    Mostrando {(pagination.page - 1) * pagination.limit + 1}-
                                    {Math.min(pagination.page * pagination.limit, pagination.total)} de {pagination.total} emprendimientos
                                    {searchTerm && ` (búsqueda: "${searchTerm}")`}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={!pagination.hasPrevPage}
                                        onClick={goToPreviousPage}
                                        className="shadow-sm bg-transparent"
                                    >
                                        Anterior
                                    </Button>
                                    <span className="text-sm text-black px-2">
                                        Página {pagination.page} de {pagination.totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={!pagination.hasNextPage}
                                        onClick={goToNextPage}
                                        className="shadow-sm bg-transparent"
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
