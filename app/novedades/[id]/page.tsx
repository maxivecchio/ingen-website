"use client"

import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, User, MessageCircle, Tag, ChevronLeft, ChevronRight } from "lucide-react"
import CommentSection from "./comment-section"
import Image from "next/image"
import { use, useCallback, useState, useEffect } from "react"
import { blogService } from "@/components/api/blog-api"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { getImageUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Tipos basados en tu schema
interface Comment {
    _id: string
    user_name: string
    content: string
    createdAt: string
}

interface Post {
    _id: string
    title: string
    content: string
    image?: string
    status: string
    category: {
        _id: string
        name: string
        slug: string
    }
    comments: Comment[]
    account: {
        _id: string
        name: string
    }
    recomended: boolean
    short_description?: string
    createdAt: string
    updatedAt: string
}

// Función para formatear fecha
function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Usar React.use() para unwrap la Promise de params
    const { id } = use(params)

    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [files, setFiles] = useState([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const loadPost = useCallback(async () => {
        console.log("Loading post with ID:", id);

        try {
            setLoading(true)
            setError(null)
            const response = await blogService.getById(id)

            let imageData = { data: [] }

            try {
                imageData = await blogService.getImages(id)
                setFiles(imageData.data)
            } catch (err) {
                console.warn("No se pudieron cargar las imágenes:", err)
                setFiles([])
            }

            console.log(imageData);

            setPost(response)
        } catch (error) {
            console.error("Error loading post:", error)
            setError("Error al cargar el post")
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        loadPost()
    }, [loadPost])

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-sm border mb-8">
                        <div className="p-6 sm:p-8">
                            <div className="animate-pulse">
                                <div className="flex gap-2 mb-4">
                                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                                </div>
                                <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-6 bg-gray-200 rounded w-2/3 mb-6"></div>
                                <div className="h-64 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    console.log("post", post);

    const nextImage = () => {
        if (post) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % files.length)
        }
    }

    const prevImage = () => {
        if (post) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + files.length) % files.length)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header del post */}
                    <div className="bg-white rounded-lg shadow-sm border mb-8">
                        <div className="p-6 sm:p-8">
                            {/* Badges de estado y recomendado */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                                    {post?.category?.name}
                                </Badge>
                            </div>

                            {/* Título */}
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post?.title}</h1>

                            {/* Metadatos */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                                <div className="flex items-center gap-1">
                                    <CalendarDays className="h-4 w-4" />
                                    {/* @ts-ignore */}
                                    <span>{formatDate(post?.createdAt)}</span>
                                </div>
                                {post?.category && (
                                    <div className="flex items-center gap-1">
                                        <Tag className="h-4 w-4" />
                                        <span>{post?.category.name}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <MessageCircle className="h-4 w-4" />
                                    <span>{post?.comments.length} comentarios</span>
                                </div>
                            </div>

                            {/* Descripción corta */}
                            {post?.short_description && (
                                <p className="text-xl text-gray-600 mb-6 leading-relaxed">{post?.short_description}</p>
                            )}


                            {/* Imagen principal */}
                            {post?.image && (
                                <div className="mb-8">
                                    <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden">
                                        <Image
                                            src={post?.image || "/placeholder.svg"}
                                            alt={post?.title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden mb-10 bg-transparent">
                        <div className="relative h-[400px] w-full">
                            <img
                                src={
                                    files?.length
                                        ? getImageUrl(files[currentImageIndex])
                                        : post?.cover_image || "/placeholder.svg"
                                }
                                alt={`${post?.name || "Propiedad"} - Imagen ${currentImageIndex + 1}`}
                                className="h-full w-full object-cover"
                            />

                            {files?.length > 1 && (
                                <>
                                    <div className="absolute inset-0 flex items-center justify-between p-4">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={prevImage}
                                            className="h-10 w-10 rounded-full bg-white/80 hover:bg-white"
                                        >
                                            <ChevronLeft className="h-6 w-6" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={nextImage}
                                            className="h-10 w-10 rounded-full bg-white/80 hover:bg-white"
                                        >
                                            <ChevronRight className="h-6 w-6" />
                                        </Button>
                                    </div>

                                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm">
                                        {currentImageIndex + 1} / {files.length}
                                    </div>
                                </>
                            )}
                        </div>

                        {files?.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto mt-5">
                                {files.map((image: string, index: number) => (
                                    <div
                                        key={index}
                                        className={`h-16 w-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${index === currentImageIndex ? "border-blue-600" : "border-transparent"}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    >
                                        <img
                                            src={getImageUrl(files[index]) || "/placeholder.svg"}
                                            alt={`Miniatura ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Contenido del post */}
                    <Card className="mb-8">
                        <CardContent className="p-6 sm:p-8">
                            <div
                                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-rose-600 prose-strong:text-gray-900 prose-table:table-auto prose-th:bg-gray-100 prose-th:font-semibold prose-th:text-gray-700"
                                /* @ts-ignore */
                                dangerouslySetInnerHTML={{ __html: post?.content }}
                            />
                        </CardContent>
                    </Card>

                    {/* Sección de comentarios */}
                    <CommentSection loadPost={loadPost} postId={post?._id} initialComments={post?.comments} />
                </div>
            </main>
        </div>
    )
}
