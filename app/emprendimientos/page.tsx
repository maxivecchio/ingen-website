"use client"

import { useCallback, useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, TrendingUp, MessageCircle } from "lucide-react"
import Image from "next/image"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
/* @ts-ignore */
import L from "leaflet"
import { propertyService } from "@/components/api/properties-api"
import Link from "next/link"

// Soluciona problema con iconos por defecto de Leaflet en Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
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
      console.log(response);
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
    const whatsappUrl = `https://wa.me/5219848790708?text=${encodeURIComponent(message)}`
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section>
        <div className="w-full h-[600px]">
          <MapContainer
            /* @ts-ignore */
            center={[-34.6, -58.39]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
          >
            <TileLayer
              /* @ts-ignore */
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* {projects.map((project) => (
              <Marker
                key={project.id}
                position={[project.coordinates.lat, project.coordinates.lng]}
              >
                <Popup>
                  <strong>{project.name}</strong>
                  <br />
                  {project.location}
                  <br />
                  {project.description}
                </Popup>
              </Marker>
            ))} */}
          </MapContainer>
        </div>
      </section>

      <main className="">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-gray to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Nuestros Emprendimientos
            </h1>
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
              {/* {projects.map((project) => (

                <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                  <div className="relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${project.status === "En Construcción"
                        ? "bg-yellow-600/70"
                        : project.status === "Próximo Lanzamiento"
                          ? "bg-blue-700/70"
                          : "bg-gray-700/70"
                        }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>

                    <div className="grid gap-4 mb-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-brand-black" />
                        <span>Inicio: {project.startDate}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-brand-black" />
                        <span>ROI: {project.expectedReturn}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progreso de Obra</span>
                        <span>{project.progress}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-brand-black h-2 rounded-full"
                          style={{ width: project.progress }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-auto space-y-2">
                      <Button
                        className="w-full bg-brand-black hover:bg-brand-dark text-white"
                        onClick={() => handleWhatsAppContact(project)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Consultar por WhatsApp
                      </Button>
                      <Button variant="outline" className="w-full">
                        Ver Detalles Completos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))} */}
              {propertiesEmprende && propertiesEmprende.map((project: any) => (
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
                        style={{ backgroundColor: project.status?.color || "#9CA3AF" }} // fallback: gray-400
                      >
                        {project.status?.name || "Sin estado"}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project?.name}</h3>

                    <div className="flex items-center text-gray-600 mb-3 text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-red-500" />
                      <span className="text-sm">{project.address_id?.city}, {project.address_id?.state}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                        {new Date(project?.publication_date).toLocaleDateString("es-AR")}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                    <div className="mb-5">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Progreso</span>
                        <span>
                          {
                            project?.type_info?.find(
                              (info: any) =>
                                info.label?.toLowerCase() === "progreso" ||
                                info.name?.toLowerCase().includes("progreso")
                            )?.value ?? "0"
                          }%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-black to-brand-dark transition-all duration-500"
                          style={{
                            width: `${project?.type_info?.find(
                              (info: any) =>
                                info.label?.toLowerCase() === "progreso" ||
                                info.name?.toLowerCase().includes("progreso")
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
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-black">
                  Mostrando {(pagination.page - 1) * pagination.limit + 1}-
                  {Math.min(pagination.page * pagination.limit, pagination.total)} de {pagination.total} propiedades
                  {searchTerm && ` (búsqueda: "${searchTerm}")`}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasPrevPage}
                    onClick={goToPreviousPage}
                    className="shadow-sm"
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
                    className="shadow-sm"
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Suggested Projects */}
        {/* <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">También te Puede Interesar</h2>
              <p className="text-xl text-gray-600">Otros proyectos que podrían ser de tu interés</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project) => (
                <Card
                  key={`suggested-${project.id}`}
                  className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover"
                  />
                  <CardContent className="p-4 flex flex-col flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{project.name}</h4>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      {project.location}
                    </div>
                    <div className="mt-auto">
                      <Button size="sm" className="w-full bg-brand-black text-white hover:bg-brand-dark">
                        Ver Proyecto
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  )
}
