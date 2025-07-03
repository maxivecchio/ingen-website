"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { propertyService } from "./api/properties-api"
import { useRouter } from "next/navigation"

export default function PropertiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === properties.length - 3 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? properties.length - 3 : prevIndex - 1))
  }

  /* test */
  const [properties, setProperties] = useState<any>([])
  const [loading, setLoading] = useState(true)

  const loadProperties = useCallback(async () => {
    try {
      setLoading(true)


      const filters: any = {
        page: 1,
        property_type: "all",
        limit: 10,
      }

      const response = await propertyService.getAll(filters)
      console.log(response);
      setProperties(response.data)
    } catch (error) {
      console.error("Error loading properties:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProperties()
  }, [loadProperties])

 

  const router = useRouter()

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
                  <div key={property._id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <Image
                            src={property.cover_image || "/placeholder.svg"}
                            alt={property.name}
                            width={400}
                            height={300}
                            className="w-full h-52 object-cover"
                        />

                        <div className="absolute top-4 left-4">
                    <span
                        className="px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: property.status?.color || "#9CA3AF" }}
                    >
                      {property.status?.name || "Sin estado"}
                    </span>
                        </div>

                        {property.price && (
                            <div className="absolute top-4 right-4">
                      <span className="bg-white text-gray-900 px-2 py-0.5 rounded-full text-sm md:text-base font-bold">
                        ${property.price}
                      </span>
                            </div>
                        )}

                        <div className="absolute bottom-4 left-4">
                    <span className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium capitalize">
                      {property.property_type_id?.name || "Sin tipo"}
                    </span>
                        </div>
                      </div>

                      <div>
                        <p className="line-clamp-3">{property.description || "Sin descripción"}</p>
                      </div>

                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="h-4 w-4 mr-2 text-red-500 flex-shrink-0" />
                          <span className="text-sm truncate">
                      {property.address_id?.city}, {property.address_id?.state}
                    </span>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 line-clamp-2">{property.description || "Sin descripción"}</p>
                        </div>

                        <Button
                            onClick={() => console.log(`Ver detalles de ${property._id}`)}
                            className="w-full"
                            variant="outline"
                        >
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
