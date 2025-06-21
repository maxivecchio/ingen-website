"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Clock, Search, Tag, ArrowRight } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function NovedadesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activePost, setActivePost] = useState(null)

  const categories = [
    { id: "all", name: "Todas", count: 12 },
    { id: "proyectos", name: "Proyectos", count: 5 },
    { id: "inversiones", name: "Inversiones", count: 3 },
    { id: "construccion", name: "Construcción", count: 2 },
    { id: "mercado", name: "Mercado", count: 2 },
  ]

  const featuredPost = {
    id: 1,
    title: "Lanzamiento del Nuevo Proyecto: Residencial Vista Verde",
    excerpt:
      "Presentamos nuestro desarrollo más ambicioso: 120 unidades con tecnología sustentable y amenities de primera clase en la mejor ubicación de la zona norte.",
    content: "El proyecto Residencial Vista Verde marca un hito en nuestro compromiso con el desarrollo sustentable...",
    image: "/placeholder.svg?height=400&width=800",
    category: "proyectos",
    author: "Roberto Martínez",
    date: "15 de Diciembre, 2024",
    readTime: "5 min",
    featured: true,
  }

  const posts = [
    {
      id: 2,
      title: "Guía Completa para Invertir en Desarrollos Inmobiliarios",
      excerpt:
        "Todo lo que necesitás saber antes de invertir en proyectos de desarrollo urbano. Consejos, riesgos y oportunidades.",
      image: "/placeholder.svg?height=300&width=400",
      category: "inversiones",
      author: "Laura Fernández",
      date: "12 de Diciembre, 2024",
      readTime: "8 min",
    },
    {
      id: 3,
      title: "Avances en Torres del Sol: 72% de Progreso Completado",
      excerpt:
        "Las torres gemelas avanzan según cronograma. Conocé los últimos desarrollos y las próximas etapas de construcción.",
      image: "/placeholder.svg?height=300&width=400",
      category: "construccion",
      author: "Miguel Torres",
      date: "10 de Diciembre, 2024",
      readTime: "4 min",
    },
    {
      id: 4,
      title: "Tendencias del Mercado Inmobiliario 2024",
      excerpt: "Análisis del comportamiento del mercado inmobiliario y proyecciones para el próximo año.",
      image: "/placeholder.svg?height=300&width=400",
      category: "mercado",
      author: "Ana García",
      date: "8 de Diciembre, 2024",
      readTime: "6 min",
    },
    {
      id: 5,
      title: "Certificación LEED: Nuestro Compromiso con la Sustentabilidad",
      excerpt:
        "Conocé cómo implementamos prácticas sustentables en todos nuestros desarrollos y los beneficios para inversores.",
      image: "/placeholder.svg?height=300&width=400",
      category: "proyectos",
      author: "Roberto Martínez",
      date: "5 de Diciembre, 2024",
      readTime: "7 min",
    },
    {
      id: 6,
      title: "Nuevas Oportunidades de Inversión en Zona Comercial",
      excerpt:
        "El Complejo Urbano Plaza abre nuevas posibilidades para inversores. Descubrí los beneficios del desarrollo mixto.",
      image: "/placeholder.svg?height=300&width=400",
      category: "inversiones",
      author: "Laura Fernández",
      date: "3 de Diciembre, 2024",
      readTime: "5 min",
    },
    {
      id: 7,
      title: "Tecnología BIM en Nuestros Proyectos",
      excerpt:
        "Cómo utilizamos la tecnología Building Information Modeling para optimizar tiempos y costos de construcción.",
      image: "/placeholder.svg?height=300&width=400",
      category: "construccion",
      author: "Miguel Torres",
      date: "1 de Diciembre, 2024",
      readTime: "6 min",
    },
    {
      id: 8,
      title: "Análisis de Rentabilidad: Comparativa con Inversiones Tradicionales",
      excerpt:
        "Comparamos los retornos de inversión en desarrollos inmobiliarios versus opciones tradicionales del mercado.",
      image: "/placeholder.svg?height=300&width=400",
      category: "inversiones",
      author: "Laura Fernández",
      date: "28 de Noviembre, 2024",
      readTime: "9 min",
    },
    {
      id: 9,
      title: "Impacto Urbano: Cómo Nuestros Proyectos Transforman Barrios",
      excerpt:
        "El efecto positivo de nuestros desarrollos en la plusvalía y calidad de vida de las zonas donde operamos.",
      image: "/placeholder.svg?height=300&width=400",
      category: "mercado",
      author: "Ana García",
      date: "25 de Noviembre, 2024",
      readTime: "7 min",
    },
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryColor = (category: any) => {
    const colors = {
      proyectos: "bg-blue-100 text-blue-800",
      inversiones: "bg-green-100 text-green-800",
      construccion: "bg-orange-100 text-orange-800",
      mercado: "bg-purple-100 text-purple-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-gray to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Novedades</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mantente al día con las últimas noticias, proyectos y tendencias del mercado inmobiliario
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-rose-600 hover:bg-rose-700" : ""}
                  >
                    <Tag className="h-4 w-4 mr-1" />
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Artículo Destacado</h2>
              <div className="w-20 h-1 bg-rose-600"></div>
            </div>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <CardContent className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className={getCategoryColor(featuredPost.category)}>
                      {categories.find((c) => c.id === featuredPost.category)?.name}
                    </Badge>
                    <span className="text-sm text-gray-500">Destacado</span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      <span className="mr-4">{featuredPost.author}</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{featuredPost.date}</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <Button className="bg-rose-600 hover:bg-rose-700">
                    Leer Artículo Completo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "all"
                  ? "Todos los Artículos"
                  : `Artículos de ${categories.find((c) => c.id === selectedCategory)?.name}`}
              </h2>
              <span className="text-gray-600">{filteredPosts.length} artículos encontrados</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActivePost(post)}
                          >
                            Leer Más
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{activePost?.title}</DialogTitle>
                            <DialogDescription className="text-sm text-gray-500 mb-4">
                              <span className="mr-2">Por {activePost?.author}</span> · {activePost?.date} · {activePost?.readTime}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="text-gray-700 space-y-4">
                            <p>{activePost?.excerpt}</p>
                          </div>
                          <DialogFooter className="mt-6">
                            <Button variant="ghost">Cerrar</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Cargar Más Artículos
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-gradient-to-r from-rose-600 to-orange-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Suscribite a Nuestro Newsletter</h3>
                <p className="text-rose-100 mb-6 max-w-2xl mx-auto">
                  Recibí las últimas novedades, análisis del mercado y oportunidades de inversión directamente en tu
                  email
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input type="email" placeholder="tu@email.com" className="bg-white text-gray-900 border-0" />
                  <Button variant="secondary" className="bg-white text-rose-600 hover:bg-gray-100">
                    Suscribirse
                  </Button>
                </div>
                <p className="text-rose-100 text-sm mt-4">
                  No spam. Podés cancelar tu suscripción en cualquier momento.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
