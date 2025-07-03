"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Calendar, MapPin, TrendingUp, X } from "lucide-react"
import Image from "next/image"

export default function ConstruccionPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const projects = [
    {
      id: 1,
      name: "Residencial Vista Verde",
      location: "Zona Norte, Ciudad",
      status: "En Construcción",
      progress: "45%",
      startDate: "Marzo 2024",
      renderImage: "/placeholder.svg?height=400&width=600",
      progressImages: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description: "Avances de construcción del complejo residencial con 120 unidades",
      lastUpdate: "15 de Diciembre, 2024",
    },
    {
      id: 2,
      name: "Torres del Sol",
      location: "Centro Histórico",
      status: "En Construcción",
      progress: "72%",
      startDate: "Enero 2024",
      renderImage: "/placeholder.svg?height=400&width=600",
      progressImages: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description: "Torres gemelas de 25 pisos cada una con acabados premium",
      lastUpdate: "12 de Diciembre, 2024",
    },
    {
      id: 3,
      name: "Complejo Urbano Plaza",
      location: "Zona Comercial",
      status: "Próximo Lanzamiento",
      progress: "0%",
      startDate: "Julio 2024",
      renderImage: "/placeholder.svg?height=400&width=600",
      progressImages: ["/placeholder.svg?height=400&width=600"],
      description: "Desarrollo mixto con locales comerciales y 150 unidades residenciales",
      lastUpdate: "10 de Diciembre, 2024",
    },
    {
      id: 4,
      name: "Residencial Parque Central",
      location: "Zona Residencial",
      status: "En Construcción",
      progress: "30%",
      startDate: "Abril 2024",
      renderImage: "/placeholder.svg?height=400&width=600",
      progressImages: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description: "Complejo residencial sustentable con áreas verdes",
      lastUpdate: "8 de Diciembre, 2024",
    },
  ]

  const openGallery = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeGallery = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === selectedProject.progressImages.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.progressImages.length - 1 : prev - 1))
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-rose-50 to-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Avances de Construcción</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seguí el progreso de nuestros proyectos en tiempo real con fotos actualizadas de cada obra
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestras Obras en Progreso</h2>
              <p className="text-xl text-gray-600">Transparencia total en cada etapa de construcción</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <Image
                      src={project.renderImage || "/placeholder.svg"}
                      alt={`Render de ${project.name}`}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium">Render</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        {project.progress} Completado
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{project.location}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-rose-600" />
                        <span>Inicio: {project.startDate}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-rose-600" />
                        <span>Estado: {project.status}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progreso de Obra</span>
                        <span>{project.progress}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-rose-600 h-2 rounded-full" style={{ width: project.progress }}></div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500 mb-4">Última actualización: {project.lastUpdate}</div>

                    <div className="space-y-2">
                      <Button className="w-full bg-rose-600 hover:bg-rose-700" onClick={() => openGallery(project)}>
                        Ver Galería de Avances ({project.progressImages.length} fotos)
                      </Button>
                      <div className="text-center text-sm text-gray-500">
                        {project.progressImages.length} fotos de progreso disponibles
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                  src={selectedProject.progressImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`Avance ${currentImageIndex + 1} de ${selectedProject.name}`}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />

                {/* Navigation Arrows */}
                {selectedProject.progressImages.length > 1 && (
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
                    <h3 className="text-lg font-bold text-gray-900">{selectedProject.name}</h3>
                    <p className="text-gray-600">{selectedProject.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">
                      Foto {currentImageIndex + 1} de {selectedProject.progressImages.length}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Progreso: {selectedProject.progress}</span>
                    <span>•</span>
                    <span>Actualizado: {selectedProject.lastUpdate}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {selectedProject.progressImages.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
                  {selectedProject.progressImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? "border-rose-500" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
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

        {/* Construction Updates */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Actualizaciones Recientes</h2>
              <p className="text-xl text-gray-600">Las últimas novedades de nuestras obras</p>
            </div>

            <div className="space-y-6">
              {projects
                .filter((p) => p.status === "En Construcción")
                .map((project) => (
                  <Card key={`update-${project.id}`} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-rose-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                        <p className="text-gray-600 mb-2">
                          Progreso actualizado al {project.progress} - {project.lastUpdate}
                        </p>
                        <p className="text-sm text-gray-500">
                          Se completaron los trabajos de estructura en el sector norte. Próxima etapa: instalaciones
                          eléctricas y sanitarias.
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <Button variant="outline" size="sm" onClick={() => openGallery(project)}>
                          Ver Fotos
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
