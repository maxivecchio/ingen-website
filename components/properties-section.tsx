"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { propertyService } from "./api/properties-api"
import { useRouter } from "next/navigation"
import { getImageUrl } from "@/lib/utils"

export default function PropertiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)
  const [properties, setProperties] = useState<any>([])
  const [loading, setLoading] = useState(true)

  // Detectar el tamaño de pantalla y ajustar items por vista
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3) // Desktop: 3 items
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2) // Tablet: 2 items
      } else {
        setItemsPerView(1) // Mobile: 1 item
      }
    }

    handleResize() // Ejecutar al montar
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calcular el máximo índice basado en items por vista
  const maxIndex = Math.max(0, properties.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) {
        return 0 // Volver al inicio
      }
      return prevIndex + 1
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return maxIndex // Ir al final
      }
      return prevIndex - 1
    })
  }

  // Calcular el porcentaje de transformación
  const getTransformPercentage = () => {
    return (currentIndex * 100) / itemsPerView
  }

  const loadProperties = useCallback(async () => {
    try {
      setLoading(true)

      const filters: any = {
        page: 1,
        property_type: "all",
        limit: 10,
      }

      const response = await propertyService.getAll(filters)
      console.log(response)
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



  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>Cargando propiedades...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!properties.length) {
    return (
      <section className="py-16 lg:py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>No hay propiedades disponibles</p>
          </div>
        </div>
      </section>
    )
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
              style={{ transform: `translateX(-${getTransformPercentage()}%)` }}
            >
              {properties.map((property: any) => (
                <div key={property._id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={
                          property.files?.find((file: any) => file.position === 0)?.path
                            ? getImageUrl(property.files.find((file: any) => file.position === 0))
                            : "/placeholder.svg"
                        }
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

                    <CardContent className="p-4 md:p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{property.name}</h3>

                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-2 text-red-500 flex-shrink-0" />
                        <span className="text-sm truncate">
                          {property.address_id?.city}, {property.address_id?.state}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {property.description || "Sin descripción"}
                        </p>
                      </div>

                      <Button
                        onClick={() => router.push(`/propiedades/${property._id}`)}
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

          {/* Mostrar botones solo si hay más elementos que los visibles */}
          {properties.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Indicadores de posición */}
        {properties.length > itemsPerView && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-gray-900" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-brand-black hover:bg-brand-dark text-white">
            <Link href="/propiedades">Ver Todas las Propiedades</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
