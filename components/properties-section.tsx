"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PropertiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const properties = [
    {
      id: 1,
      name: "Casa Moderna Vista Verde",
      location: "Zona Norte, Ciudad",
      price: "$285,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 3,
      baths: 2,
      area: "120 m²",
      status: "Disponible",
      type: "Casa",
    },
    {
      id: 2,
      name: "Departamento Torres del Sol",
      location: "Centro Histórico",
      price: "$195,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 2,
      area: "85 m²",
      status: "Vendido",
      type: "Departamento",
    },
    {
      id: 3,
      name: "Penthouse Plaza Central",
      location: "Zona Comercial",
      price: "$450,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 4,
      baths: 3,
      area: "180 m²",
      status: "Disponible",
      type: "Penthouse",
    },
    {
      id: 4,
      name: "Casa Familiar Parque",
      location: "Zona Residencial",
      price: "$320,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 4,
      baths: 3,
      area: "150 m²",
      status: "En Venta",
      type: "Casa",
    },
    {
      id: 5,
      name: "Loft Urbano Centro",
      location: "Centro de la Ciudad",
      price: "$165,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 1,
      baths: 1,
      area: "65 m²",
      status: "Disponible",
      type: "Loft",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === properties.length - 3 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? properties.length - 3 : prevIndex - 1))
  }

  return (
      <section className="py-16 lg:py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Encontrá tu Nueva Propiedad</h2>
            <p className="text-xl text-gray-600">Descubrí nuestro portafolio de propiedades disponibles</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
              >
                {properties.map((property) => (
                    <div key={property.id} className="w-1/3 flex-shrink-0 px-3">
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <Image
                              src={property.image || "/placeholder.svg"}
                              alt={property.name}
                              width={400}
                              height={300}
                              className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 left-4">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                property.status === "Disponible"
                                    ? "bg-green-600 text-white"
                                    : property.status === "Vendido"
                                        ? "bg-brand-dark text-white"
                                        : "bg-brand-black text-white"
                            }`}
                        >
                          {property.status}
                        </span>
                          </div>
                          <div className="absolute top-4 right-4">
                        <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-lg font-bold">
                          {property.price}
                        </span>
                          </div>
                          <div className="absolute bottom-4 left-4">
                        <span className="bg-brand-black text-white px-2 py-1 rounded text-xs font-medium capitalize">
                          {property.type}
                        </span>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.name}</h3>
                          <div className="flex items-center text-gray-600 mb-4">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Bed className="h-4 w-4 mr-1" />
                              {property.beds}
                            </div>
                            <div className="flex items-center">
                              <Bath className="h-4 w-4 mr-1" />
                              {property.baths}
                            </div>
                            <div className="flex items-center">
                              <Square className="h-4 w-4 mr-1" />
                              {property.area}
                            </div>
                          </div>
                          <Button className="w-full" variant="outline">
                            Ver Detalles
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                ))}
              </div>
            </div>

            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-brand-black hover:bg-brand-dark text-white">
              <Link href="/propiedades">Ver Todas las Propiedades</Link>
            </Button>
          </div>
        </div>
      </section>
  )
}
