import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      name: "Residencial Vista Verde",
      location: "Zona Norte, Ciudad",
      status: "En Construcción",
      progress: "45%",
      image: "/placeholder.svg?height=300&width=400",
      expectedReturn: "18%",
      startDate: "Marzo 2024",
    },
    {
      id: 2,
      name: "Torres del Sol",
      location: "Centro Histórico",
      status: "En Construcción",
      progress: "72%",
      image: "/placeholder.svg?height=300&width=400",
      expectedReturn: "22%",
      startDate: "Enero 2024",
    },
    {
      id: 3,
      name: "Complejo Urbano Plaza",
      location: "Zona Comercial",
      status: "Próximo Lanzamiento",
      progress: "0%",
      image: "/placeholder.svg?height=300&width=400",
      expectedReturn: "25%",
      startDate: "Julio 2024",
    },
    {
      id: 4,
      name: "Residencial Parque Central",
      location: "Zona Residencial",
      status: "En Construcción",
      progress: "30%",
      image: "/placeholder.svg?height=300&width=400",
      expectedReturn: "20%",
      startDate: "Abril 2024",
    },
  ]

  return (
      <section className="py-16 lg:py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Invertí en tu Propio Proyecto</h2>
            <p className="text-xl text-gray-600 mb-8">
              Mirá nuestros próximos proyectos y elegí la oportunidad perfecta para vos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                  <span className="bg-brand-black text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.status}
                  </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.startDate}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {project.expectedReturn}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progreso</span>
                        <span>{project.progress}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-brand-black h-2 rounded-full" style={{ width: project.progress }}></div>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Ver Detalles
                    </Button>
                  </CardContent>
                </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-brand-black hover:bg-brand-dark text-white">
              <Link href="/emprendimientos">Ver Todos los Proyectos</Link>
            </Button>
          </div>
        </div>
      </section>
  )
}
