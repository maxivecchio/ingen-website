"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { blogService } from "@/components/api/blog-api"

interface Comment {
  _id: string
  user_name: string
  content: string
  createdAt: string
}

interface CommentSectionProps {
  postId: any
  initialComments: any
  loadPost: any
}

export default function CommentSection({ postId, initialComments, loadPost }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState({ user_name: "", content: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Función para formatear fecha de comentario
  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Hace unos minutos"
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} horas`
    } else {
      return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    }
  }

  // Función para obtener iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Función para enviar comentario
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.user_name.trim() || !newComment.content.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Reemplaza con tu endpoint real
      const response = await blogService.createCommentPublic(postId, newComment)

      if (response.ok) {
        const savedComment = await response.json()
        setComments((prev) => [...prev, savedComment])
        setNewComment({ user_name: "", content: "" })
        toast({
          title: "¡Comentario enviado!",
          description: "Tu comentario ha sido publicado exitosamente",
        })
      } else {
        throw new Error("Error al enviar comentario")
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "No se pudo enviar el comentario. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      loadPost()
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Título de la sección */}
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-gray-600" />
        <h2 className="text-2xl font-bold text-gray-900">Comentarios ({comments.length})</h2>
      </div>

      {/* Formulario para nuevo comentario */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Deja tu comentario</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1">
                Tu nombre *
              </label>
              <Input
                id="user_name"
                type="text"
                placeholder="Ingresa tu nombre"
                value={newComment.user_name}
                onChange={(e) => setNewComment((prev) => ({ ...prev, user_name: e.target.value }))}
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Comentario *
              </label>
              <Textarea
                id="content"
                placeholder="Escribe tu comentario aquí..."
                value={newComment.content}
                onChange={(e) => setNewComment((prev) => ({ ...prev, content: e.target.value }))}
                required
                rows={4}
                className="w-full resize-none"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="bg-rose-600 hover:bg-rose-700">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Publicar comentario
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aún no hay comentarios. ¡Sé el primero en comentar!</p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 bg-rose-100">
                    <AvatarFallback className="bg-rose-600 text-white text-sm">
                      {getInitials(comment.user_name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{comment.user_name}</h4>
                      <span className="text-sm text-gray-500">{formatCommentDate(comment.createdAt)}</span>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
