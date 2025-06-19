"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, TrendingUp, MessageCircle } from "lucide-react"
import Image from "next/image"

export default function EmprendimientosPage() {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      name: "Residencial Vista Verde",
      location: "Zona Norte, Ciudad",
      coordinates: { lat: -34.6037, lng: -58.3816 },
      status: "En Construcción",
      progress: "45%",
      image: "/placeholder.svg?height=400&width=600",
      description: "Moderno complejo residencial con amenities de primera clase",
      expectedReturn: "18%",
      startDate: "Marzo 2024",
      totalUnits: 120,
      availableUnits: 68,
      features: ["Piscina", "Gimnasio", "Área de juegos", "Seguridad 24hs"],
    },
    {
      id: 2,
      name: "Torres del Sol",
      location: "Centro Histórico",
      coordinates: { lat: -34.6118, lng: -58.396 },
      status: "En Construcción",
      progress: "72%",
      image: "/placeholder.svg?height=400&width=600",
      description: "Torres gemelas en el corazón de la ciudad",
      expectedReturn: "22%",
      startDate: "Enero 2024",
      totalUnits: 200,
      availableUnits: 45,
      features: ["Rooftop", "Coworking", "Spa", "Estacionamiento"],
    },
    {
      id: 3,
      name: "Complejo Urbano Plaza",
      location: "Zona Comercial",
      coordinates: { lat: -34.5875, lng: -58.3974 },
      status: "Próximo Lanzamiento",
      progress: "0%",
      image: "/placeholder.svg?height=400&width=600",
      description: "Desarrollo mixto con locales comerciales y residencias",
      expectedReturn: "25%",
      startDate: "Julio 2024",
      totalUnits: 150,
      availableUnits: 150,
      features: ["Centro comercial", "Oficinas", "Residencias", "Plaza central"],
    },
  ]

  const handleWhatsAppContact = (project) => {
    const message = `Hola! Me interesa obtener más información sobre el proyecto ${project.name} ubicado en ${project.location}. ¿Podrían brindarme detalles sobre las oportunidades de inversión disponibles?`
    const whatsappUrl = `https://wa.me/5219848790708?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
      <div className="min-h-screen bg-white">
        <Header />

        <main className="pt-8">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-brand-gray to-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Nuestros Emprendimientos</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubrí las obras en desarrollo y las oportunidades de inversión disponibles
              </p>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold text-gray-900">Ubicación de Nuestros Proyectos</h2>
                  <p className="text-gray-600 mt-2">Hacé clic en los marcadores para ver detalles de cada proyecto</p>
                </div>

                {/* Map Placeholder */}
                <div className="h-96 bg-gray-100 relative flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-rose-600 mx-auto mb-4" />
                    <p className="text-gray-600">Mapa Interactivo con Ubicaciones</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Los proyectos se mostrarían aquí con marcadores interactivos
                    </p>
                  </div>
                </div>
              </div>
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
                {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.name}
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                      <span className="bg-brand-black text-white px-3 py-1 rounded-full text-sm font-medium">
                        {project.status}
                      </span>
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
                        <p className="text-gray-600 mb-4">{project.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
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
                            <div className="bg-brand-black h-2 rounded-full" style={{ width: project.progress }}></div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Características:</p>
                          <div className="flex flex-wrap gap-1">
                            {project.features.map((feature, index) => (
                                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
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
                ))}
              </div>
            </div>
          </section>

          {/* Suggested Projects */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">También te Puede Interesar</h2>
                <p className="text-xl text-gray-600">Otros proyectos que podrían ser de tu interés</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.slice(0, 3).map((project) => (
                    <Card key={`suggested-${project.id}`} className="overflow-hidden">
                      <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.name}
                          width={400}
                          height={200}
                          className="w-full h-32 object-cover"
                      />
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{project.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{project.location}</p>
                        <Button size="sm" variant="outline" className="w-full">
                          Ver Proyecto
                        </Button>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
  )
}
