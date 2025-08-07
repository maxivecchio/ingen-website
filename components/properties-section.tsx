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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3)
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2)
      } else {
        setItemsPerView(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, properties.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
  }

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

  if (loading || !properties.length) {
    return (
      <section className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-neutral-600 dark:text-neutral-300">
            {loading ? "Cargando propiedades..." : "No hay propiedades disponibles"}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Encontrá tu Nueva Propiedad
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
            Descubrí nuestro portafolio de propiedades disponibles
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${getTransformPercentage()}%)` }}
            >
              {properties.map((property: any) => (
                <div key={property._id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                  <Card className="overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-shadow bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700">
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

                      <div className="absolute bottom-4 left-4">
                        <span className="bg-neutral-900 text-white px-2 py-1 rounded text-xs font-medium capitalize">
                          {property.property_type_id?.name || "Sin tipo"}
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-4 md:p-6">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 line-clamp-1">
                        {property.name}
                      </h3>

                      <div className="flex items-center text-neutral-600 dark:text-neutral-400 mb-4">
                        <MapPin className="h-4 w-4 mr-2 text-red-500 flex-shrink-0" />
                        <span className="text-sm truncate">
                          {property.address_id?.city}, {property.address_id?.state}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                          {property.description || "Sin descripción"}
                        </p>
                      </div>

                      <Button
                        onClick={() => router.push(`/propiedades/${property._id}`)}
                        className="block text-center w-full text-brand-black dark:text-white border border-brand-black dark:border-white rounded-md py-2 text-sm font-medium hover:bg-brand-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
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

          {properties.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-neutral-700 rounded-full p-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                <ChevronLeft className="h-6 w-6 text-neutral-700 dark:text-neutral-100" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-neutral-700 rounded-full p-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                <ChevronRight className="h-6 w-6 text-neutral-700 dark:text-neutral-100" />
              </button>
            </>
          )}
        </div>

        {properties.length > itemsPerView && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-neutral-900 dark:bg-white"
                    : "bg-neutral-300 dark:bg-neutral-600"
                }`}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200">
            <Link href="/propiedades">Ver Todas las Propiedades</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
