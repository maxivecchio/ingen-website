"use client"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Calendar, MapPin, TrendingUp, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { propertyService } from "@/components/api/properties-api"
import { getImageUrl } from "@/lib/utils"

export default function ConstruccionPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()

  /*  useEffect(() => {
         router.push("/")
     }, []) */

  const [propertiesConstruccion, setPropertiesConstruccion] = useState<any>([])
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
      const response = await propertyService.getAllConstruccion(filters)

      setPropertiesConstruccion(response.data)
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
    const whatsappUrl = `https://wa.me/5493515521325?text=${encodeURIComponent(message)}`
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

  const openGallery = (project: any) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeGallery = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === selectedProject?.files?.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject?.files?.length - 1 : prev - 1))
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="">
        <section className="bg-gradient-to-r from-brand-gray to-gray-50 dark:from-neutral-800 dark:to-neutral-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Avances de Construcción</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Seguí el progreso de nuestros proyectos en tiempo real con fotos actualizadas de cada obra
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">Nuestras Obras en Progreso</h2>
              <p className="text-xl text-gray-600 dark:text-white">Transparencia total en cada etapa de construcción</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {propertiesConstruccion &&
                propertiesConstruccion.map((project: any) => (
                  <Card key={project?._id} className="overflow-hidden bg-white rounded-xl shadow-md dark:border-neutral-900 dark:bg-neutral-800">
                    <div className="relative">
                      <Image
                        src={
                          project.files?.find((file: any) => file.position === 0)
                            ? getImageUrl(project.files.find((file: any) => file.position === 0))
                            : "/placeholder.svg"
                        }
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
                      <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">{project.name}</h3>
                      <div className="flex items-center text-gray-600 mb-3 dark:text-white">
                        <MapPin className="h-4 w-4 mr-2 text-red-400" />
                        <span className="text-sm">{project?.address_id?.address_line}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-rose-600" />
                          <span>Inicio: {new Date(project?.publication_date).toLocaleDateString("es-AR")}</span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-rose-600" />
                          <span>Estado: {project?.status?.name}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-3 dark:text-white">{project.description}</p>
                      <div className="mb-5">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-white mb-1">
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
                        <div className="w-full bg-gray-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
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
                      <div className="space-y-2">
                        <Button
                          className="w-full bg-brand-black dark:text-white hover:bg-brand-black/90"
                          onClick={() => openGallery(project)}
                        >
                          Ver Galería de Avances ({project?.files?.length} fotos)
                        </Button>
                        <div className="text-center text-sm text-gray-500">
                          {project?.files?.length} fotos de progreso disponibles
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                <div className="text-sm text-black dark:text-white">
                  Mostrando {(pagination.page - 1) * pagination.limit + 1}-
                  {Math.min(pagination.page * pagination.limit, pagination.total)} de {pagination.total} construcciones
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
                  <span className="text-sm text-black dark:text-white px-2">
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

        {/* Gallery Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              {/* Close Button */}
              <button
                onClick={closeGallery}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>

              {/* Image */}
              <div className="relative">
                <Image
                  // ✅ AQUÍ ESTÁ LA CORRECCIÓN: Usar currentImageIndex en lugar de [0]
                  src={
                    selectedProject?.files?.[currentImageIndex]
                      ? getImageUrl(selectedProject?.files[currentImageIndex])
                      : "/placeholder.svg"
                  }
                  alt={`Avance ${currentImageIndex + 1} de ${selectedProject?.name}`}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />

                {/* Navigation Arrows */}
                {selectedProject?.files?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
                    >
                      <ChevronLeft className="h-6 w-6 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
                    >
                      <ChevronRight className="h-6 w-6 text-gray-800" />
                    </button>
                  </>
                )}
              </div>

              {/* Image Info */}
              <div className="bg-white rounded-lg mt-4 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedProject?.name}</h3>
                    <p className="text-gray-600">{selectedProject?.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">
                      Foto {currentImageIndex + 1} de {selectedProject?.files?.length || 1}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>
                      Progreso:{" "}
                      {selectedProject?.type_info?.find(
                        (info: any) =>
                          info.label?.toLowerCase() === "progreso" || info.name?.toLowerCase().includes("progreso"),
                      )?.value ?? "0"}{" "}
                      %
                    </span>
                    <span>•</span>
                    <span>Actualizado: {new Date(selectedProject?.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {selectedProject?.files?.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
                  {selectedProject?.files?.map((image: any, index: any) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex ? "border-rose-500" : "border-transparent"
                        }`}
                    >
                      <Image
                        src={getImageUrl(image) || "/placeholder.svg"}
                        alt={`Miniatura ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
