"use client"

import { useCallback, useEffect, useState } from "react"
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
import { blogService } from "@/components/api/blog-api"
import { useRouter } from "next/navigation"

export default function NovedadesPage() {

  const [postsList, setPostsList] = useState<any>([])
  const [categoriesList, setCategoriesList] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  })
  const route = useRouter()

  const loadProperties = useCallback(async () => {
    try {
      const filters: any = {
        page: currentPage,
        limit: 12,
        search: searchTerm || undefined,
        categories: undefined,
      }

      console.log("Loading posts with filters:", filters)

      const response = await blogService.getAll(filters)
      console.log("Posts loaded:", response);
      setPostsList(response.data)
      setPagination(response.pagination)
    } catch (error) {
      console.error("Error loading posts:", error)
    }
  }, [currentPage, searchTerm])

  const loadCategories = useCallback(async () => {
    const filters: any = {
      limit: "all",
    }

    try {
      const response = await blogService.getAllCategories(filters)
      console.log("Posts loaded:", response);
      setCategoriesList(response.data)
    } catch (error) {
      console.error("Error loading posts:", error)
    }
  }, [])

  useEffect(() => {
    loadProperties()
  }, [loadProperties])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const goToNextPage = () => {
    if (pagination.hasNextPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (pagination.hasPrevPage) {
      setCurrentPage(currentPage - 1)
    }
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

              {/* <div className="flex flex-wrap gap-2">
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
              </div> */}
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

            {/*  <Card className="overflow-hidden hover:shadow-xl transition-shadow">
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
            </Card> */}
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/*             <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "all"
                  ? "Todos los Artículos"
                  : `Artículos de ${categories.find((c) => c.id === selectedCategory)?.name}`}
              </h2>
              <span className="text-gray-600">{filteredPosts.length} artículos encontrados</span>
            </div> */}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsList.map((post: any) => (
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
                    {/* <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p> */}

                    <div className="flex flex-col justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>Ingen</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(post.createdAt).toLocaleDateString('es-AR')}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => route.push(`/novedades/${post._id}`)}
                      >
                        Leer Más
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-black">
                  Mostrando {(pagination.page - 1) * pagination.limit + 1}-
                  {Math.min(pagination.page * pagination.limit, pagination.total)} de {pagination.total} propiedades
                  {searchTerm && ` (búsqueda: "${searchTerm}")`}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasPrevPage}
                    onClick={goToPreviousPage}
                    className="shadow-sm"
                  >
                    Anterior
                  </Button>
                  <span className="text-sm text-black px-2">
                    Página {pagination.page} de {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasNextPage}
                    onClick={goToNextPage}
                    className="shadow-sm"
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
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
