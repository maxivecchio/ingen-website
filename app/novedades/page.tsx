"use client"

import { useCallback, useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Calendar, User, Clock, Search, Tag, ArrowRight, Filter, Check } from "lucide-react"
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
import { ScrollArea } from "@/components/ui/scroll-area"

export default function NovedadesPage() {

  const [postsList, setPostsList] = useState<any>([])
  const [postsListRecomended, setPostsListRecomended] = useState<any>([])
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
  const [categoriasSelected, setCategoriasSelected] = useState<string[]>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [categorySearchTerm, setCategorySearchTerm] = useState("")

  // Filtrar categorías para el sheet
  const filteredCategoriesForSheet = categoriesList.filter((cat: any) =>
    cat.name.toLowerCase().includes(categorySearchTerm.toLowerCase()),
  )

  // Función para toggle de categorías seleccionadas
  const toggleCategorySelection = (categoryId: string) => {
    setCategoriasSelected((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  // Función para limpiar selección
  const clearSelection = () => {
    setCategoriasSelected([])
  }

  // Obtener nombres de categorías seleccionadas
  const getSelectedCategoryNames = () => {
    return categoriesList.filter((cat: any) => categoriasSelected.includes(cat._id)).map((cat: any) => cat.name)
  }

  /* 68641d03be9d0053209528ec */

  const loadPostsRecomended = useCallback(async () => {
    try {
      const filters: any = {
        status: "publish",
        categories: ["68641d03be9d0053209528ec"],
      }
      const response = await blogService.getAllPostRecomended(filters)
      console.log("Posts loaded:", response);
      setPostsListRecomended(response)
    } catch (error) {
      console.error("Error loading posts:", error)
    }
  }, [currentPage, searchTerm, categoriasSelected])


  const loadPosts = useCallback(async () => {
    try {
      const filters: any = {
        page: currentPage,
        limit: 12,
        search: searchTerm || undefined,
        categories: categoriasSelected.length > 0 ? categoriasSelected : undefined,
      }

      console.log("Loading posts with filters:", filters)

      const response = await blogService.getAll(filters)
      console.log("Posts loaded:", response);
      setPostsList(response.data)
      setPagination(response.pagination)
    } catch (error) {
      console.error("Error loading posts:", error)
    }
  }, [currentPage, searchTerm, categoriasSelected])

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
    loadPosts()
  }, [loadPosts])

  useEffect(() => {
    loadPostsRecomended()
  }, [loadPostsRecomended])

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

              <div className="flex flex-wrap gap-2">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="relative bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtrar por categorías
                      {categoriasSelected.length > 0 && (
                        <Badge variant="secondary" className="ml-2 bg-rose-600 text-white hover:bg-rose-700">
                          {categoriasSelected.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                      <SheetTitle>Seleccionar Categorías</SheetTitle>
                      <SheetDescription>Elige las categorías que quieres incluir en tu búsqueda</SheetDescription>
                    </SheetHeader>

                    <div className="mt-6 space-y-4">
                      {/* Buscador dentro del sheet */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Buscar categorías..."
                          value={categorySearchTerm}
                          onChange={(e) => setCategorySearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      {/* Mostrar categorías seleccionadas */}
                      {categoriasSelected.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">Seleccionadas ({categoriasSelected.length})</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={clearSelection}
                              className="text-rose-600 hover:text-rose-700"
                            >
                              Limpiar todo
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {getSelectedCategoryNames().map((name: any) => (
                              <Badge key={name} variant="secondary" className="bg-rose-100 text-rose-800">
                                {name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Lista de categorías */}
                      <ScrollArea className="h-[400px] w-full">
                        <div className="space-y-2">
                          {filteredCategoriesForSheet.map((category: any) => {
                            const isSelected = categoriasSelected.includes(category._id)
                            return (
                              <div
                                key={category._id}
                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? "bg-rose-50 border-rose-200" : "hover:bg-gray-50 border-gray-200"
                                  }`}
                                onClick={() => toggleCategorySelection(category._id)}
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <Tag className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">{category.name}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {category.count}
                                    </Badge>
                                  </div>
                                  {category.description && (
                                    <p className="text-sm text-gray-500 mt-1 ml-6">{category.description}</p>
                                  )}
                                </div>
                                {isSelected && <Check className="h-5 w-5 text-rose-600" />}
                              </div>
                            )
                          })}
                        </div>
                      </ScrollArea>
                    </div>
                  </SheetContent>
                </Sheet>
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

            <div className="grid md:grid-cols-3 gap-6">
              {/* Post Principal (ocupa 2 columnas en md+) */}
              {postsListRecomended[0] && (
                <div onClick={() => route.push(`/novedades/${postsListRecomended[0]._id}`)} className="md:col-span-2 relative rounded-xl overflow-hidden">
                  <Image
                    src={postsListRecomended[0].image || "/placeholder.svg"}
                    alt={postsListRecomended[0].title}
                    width={1200}
                    height={600}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 p-6 flex flex-col justify-end">
                    <div className="">
                      <Badge variant="secondary" className="bg-rose-600 text-white hover:bg-rose-700">
                        {postsListRecomended[0].category.name}
                      </Badge>
                    </div>

                    <h2 className="text-white text-3xl font-bold mb-2">{postsListRecomended[0].title}</h2>
                    <p className="text-white/80 mb-4 line-clamp-2">{postsListRecomended[0].short_description}</p>
                    <div className="flex items-center justify-between text-sm text-white/80">
                      <span>Ingen</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Secundarios */}
              <div className="flex flex-col gap-6">
                {postsListRecomended.slice(1, 3).map((post: any) => (
                  <div onClick={() => route.push(`/novedades/${postsListRecomended[0]._id}`)} key={post._id} className="relative rounded-xl overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={300}
                      className="w-full h-[240px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 p-4 flex flex-col justify-end">
                      <div className="">
                        <Badge variant="secondary" className="bg-rose-600 text-white hover:bg-rose-700">
                          {postsListRecomended[0].category.name}
                        </Badge>
                      </div>
                      <h3 className="text-white font-bold text-lg leading-tight mb-1">{post.title}</h3>
                      <p className="text-white/80 mb-4 line-clamp-2">{postsListRecomended[0].short_description}</p>
                      <div className="flex justify-between items-center text-sm text-white/80 mt-2">
                        <span>Ingen</span>
                        <span>💬 {post.comments.length}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Todos los Artículos
              </h2>
              <span className="text-gray-600">{postsList.length} artículos encontrados</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsList.map((post: any) => (
                <Card key={post.id} className="overflow-hidden relative hover:shadow-xl transition-shadow">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <Badge variant="secondary" className="ml-2 absolute top-2 right-2 bg-rose-600 text-white hover:bg-rose-700">
                    {post.category.name}
                  </Badge>


                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>

                    <p className="text-black mb-4 line-clamp-2">{post?.short_description}</p>

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
      </main>

      <Footer />
    </div>
  )
}
