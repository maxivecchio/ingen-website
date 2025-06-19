"use client"

import { useState } from "react"
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
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      name: "Residencial Vista Verde",
      location: "Zona Norte, Ciudad",
      coordinates: { lat: -34.6037, lng: -58.3816 },
      status: "En Construcción",
      progress: "45%",
      image: "/imagen-prueba.jpg",
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
      image: "/imagen-prueba.jpg",
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
      image: "/imagen-prueba.jpg",
      description: "Desarrollo mixto con locales comerciales y residencias",
      expectedReturn: "25%",
      startDate: "Julio 2024",
      totalUnits: 150,
      availableUnits: 150,
      features: ["Centro comercial", "Oficinas", "Residencias", "Plaza central"],
    },
    {
      id: 4,
      name: "Mirador del Lago",
      location: "Barrio Sur",
      coordinates: { lat: -34.595, lng: -58.372 },
      status: "En Construcción",
      progress: "60%",
      image: "/imagen-prueba.jpg",
      description: "Departamentos con vista panorámica al lago",
      expectedReturn: "20%",
      startDate: "Febrero 2024",
      totalUnits: 80,
      availableUnits: 30,
      features: ["Balcones", "Gimnasio", "Estacionamiento", "Seguridad 24hs"],
    },
    {
      id: 5,
      name: "Paseo Central",
      location: "Centro",
      coordinates: { lat: -34.609, lng: -58.385 },
      status: "Finalizado",
      progress: "100%",
      image: "/imagen-prueba.jpg",
      description: "Locales comerciales y oficinas en zona estratégica",
      expectedReturn: "15%",
      startDate: "Julio 2023",
      totalUnits: 50,
      availableUnits: 0,
      features: ["Locales", "Estacionamiento", "Seguridad 24hs"],
    },
    {
      id: 6,
      name: "Altos de la Montaña",
      location: "Zona Alta",
      coordinates: { lat: -34.620, lng: -58.410 },
      status: "Próximo Lanzamiento",
      progress: "0%",
      image: "/imagen-prueba.jpg",
      description: "Casas familiares con diseño moderno",
      expectedReturn: "23%",
      startDate: "Octubre 2024",
      totalUnits: 90,
      availableUnits: 90,
      features: ["Parque", "Seguridad 24hs", "Piscina", "Área de juegos"],
    },
    {
      id: 7,
      name: "Costa Azul",
      location: "Zona Costera",
      coordinates: { lat: -34.580, lng: -58.395 },
      status: "En Construcción",
      progress: "35%",
      image: "/imagen-prueba.jpg",
      description: "Departamentos con vista al mar",
      expectedReturn: "19%",
      startDate: "Marzo 2024",
      totalUnits: 100,
      availableUnits: 70,
      features: ["Balcones", "Piscina", "Spa", "Gimnasio"],
    },
    {
      id: 8,
      name: "Jardines de Palermo",
      location: "Palermo",
      coordinates: { lat: -34.586, lng: -58.422 },
      status: "En Construcción",
      progress: "50%",
      image: "/imagen-prueba.jpg",
      description: "Complejo residencial con amplios jardines",
      expectedReturn: "21%",
      startDate: "Abril 2024",
      totalUnits: 130,
      availableUnits: 90,
      features: ["Jardines", "Seguridad 24hs", "Gimnasio", "Estacionamiento"],
    },
    {
      id: 9,
      name: "Torres de la Ciudad",
      location: "Centro",
      coordinates: { lat: -34.605, lng: -58.381 },
      status: "Finalizado",
      progress: "100%",
      image: "/imagen-prueba.jpg",
      description: "Edificios de oficinas modernas",
      expectedReturn: "17%",
      startDate: "Enero 2023",
      totalUnits: 60,
      availableUnits: 0,
      features: ["Oficinas", "Estacionamiento", "Seguridad 24hs"],
    },
    {
      id: 10,
      name: "Altura del Sol",
      location: "Zona Norte",
      coordinates: { lat: -34.600, lng: -58.370 },
      status: "En Construcción",
      progress: "55%",
      image: "/imagen-prueba.jpg",
      description: "Departamentos con diseño sustentable",
      expectedReturn: "20%",
      startDate: "Marzo 2024",
      totalUnits: 140,
      availableUnits: 75,
      features: ["Energía Solar", "Gimnasio", "Piscina", "Seguridad 24hs"],
    },
    {
      id: 11,
      name: "Vistas del Río",
      location: "Zona Ribereña",
      coordinates: { lat: -34.610, lng: -58.390 },
      status: "Próximo Lanzamiento",
      progress: "0%",
      image: "/imagen-prueba.jpg",
      description: "Residencias con vista al río",
      expectedReturn: "24%",
      startDate: "Septiembre 2024",
      totalUnits: 110,
      availableUnits: 110,
      features: ["Vista al río", "Seguridad 24hs", "Piscina", "Gimnasio"],
    },
    {
      id: 12,
      name: "Parque Central",
      location: "Zona Central",
      coordinates: { lat: -34.598, lng: -58.382 },
      status: "En Construcción",
      progress: "65%",
      image: "/imagen-prueba.jpg",
      description: "Complejo residencial rodeado de espacios verdes",
      expectedReturn: "19%",
      startDate: "Febrero 2024",
      totalUnits: 160,
      availableUnits: 90,
      features: ["Parque", "Seguridad 24hs", "Piscina", "Área de juegos"],
    },
  ]


  const handleWhatsAppContact = (project: any) => {
    const message = `Hola! Me interesa obtener más información sobre el proyecto ${project.name} ubicado en ${project.location}. ¿Podrían brindarme detalles sobre las oportunidades de inversión disponibles?`
    const whatsappUrl = `https://wa.me/5219848790708?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
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
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              /* @ts-ignore */
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {projects.map((project) => (
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
            ))}
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
              {projects.map((project) => (

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
        </section>
      </main>

      <Footer />
    </div>
  )
}
