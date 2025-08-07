"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { propertyService } from "./api/properties-api"
import { getImageUrl } from "@/lib/utils"

export default function ProjectsSection() {
  const [propertiesEmprende, setPropertiesEmprende] = useState<any>([])
  const [loading, setLoading] = useState(true)

  const loadPropertiesEmprende = useCallback(async () => {
    try {
      setLoading(true)
      const filters: any = {
        page: 1,
        property_type: "all",
        limit: 3,
      }

      const response = await propertyService.getAllEmprende(filters)
      console.log(response)
      setPropertiesEmprende(response.data)
    } catch (error) {
      console.error("Error loading properties:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPropertiesEmprende()
  }, [loadPropertiesEmprende])

  return (
    <section className="py-16 lg:py-24 bg-brand-gray dark:bg-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Invertí en tu Propio Proyecto
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Mirá nuestros próximos proyectos y elegí la oportunidad perfecta para vos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {propertiesEmprende &&
            propertiesEmprende.map((project: any) => (
              <Card
                key={project?._id}
                className="overflow-hidden bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300 border border-gray-100 dark:border-neutral-800"
              >
                <div className="relative">
                  <Image
                    src={
                      project.files?.find((file: any) => file.position === 0)?.path
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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project?.name}
                  </h3>

                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3 text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-red-500" />
                    <span className="text-sm">
                      {project.address_id?.city}, {project.address_id?.state}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                      {new Date(project?.publication_date).toLocaleDateString("es-AR")}
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <span>Progreso</span>
                      <span>
                        {
                          project?.type_info?.find(
                            (info: any) =>
                              info.label?.toLowerCase() === "progreso" ||
                              info.name?.toLowerCase().includes("progreso")
                          )?.value ?? "0"
                        }
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-black to-brand-dark transition-all duration-500"
                        style={{
                          width: `${
                            project?.type_info?.find(
                              (info: any) =>
                                info.label?.toLowerCase() === "progreso" ||
                                info.name?.toLowerCase().includes("progreso")
                            )?.value ?? "0"
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/emprendimientos/${project?.id}`}
                    className="block text-center text-brand-black dark:text-white border border-brand-black dark:border-white rounded-md py-2 text-sm font-medium hover:bg-brand-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                  >
                    Ver Detalles
                  </Link>
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-brand-black hover:bg-brand-dark text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            <Link href="/emprendimientos">Ver Emprendimientos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
