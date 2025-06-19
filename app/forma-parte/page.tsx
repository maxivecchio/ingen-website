"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Shield, Clock, Users, DollarSign, Calculator, CheckCircle, MessageCircle } from "lucide-react"

export default function FormaPartePage() {
  const [investmentAmount, setInvestmentAmount] = useState(50000)
  const [selectedProject, setSelectedProject] = useState("")

  const investmentBenefits = [
    {
      icon: TrendingUp,
      title: "Alta Rentabilidad",
      description: "Retornos del 18% al 25% anual según el proyecto",
    },
    {
      icon: Shield,
      title: "Inversión Segura",
      description: "Respaldo legal completo y garantías reales",
    },
    {
      icon: Clock,
      title: "Plazos Definidos",
      description: "Proyectos con cronogramas claros de 12 a 24 meses",
    },
    {
      icon: Users,
      title: "Acompañamiento",
      description: "Asesoramiento personalizado durante todo el proceso",
    },
  ]

  const investmentOptions = [
    {
      name: "Inversor Inicial",
      minAmount: 25000,
      maxAmount: 75000,
      expectedReturn: "18-20%",
      features: ["Informes mensuales", "Acceso a plataforma", "Soporte básico"],
      color: "bg-blue-50 border-blue-200",
    },
    {
      name: "Inversor Premium",
      minAmount: 75000,
      maxAmount: 200000,
      expectedReturn: "20-23%",
      features: ["Informes quincenales", "Visitas a obra", "Soporte prioritario", "Descuentos en futuras inversiones"],
      color: "bg-rose-50 border-rose-200",
      popular: true,
    },
    {
      name: "Inversor VIP",
      minAmount: 200000,
      maxAmount: 500000,
      expectedReturn: "23-25%",
      features: [
        "Informes semanales",
        "Acceso exclusivo",
        "Asesor dedicado",
        "Participación en decisiones",
        "Beneficios especiales",
      ],
      color: "bg-amber-50 border-amber-200",
    },
  ]

  const projects = [
    { id: 1, name: "Residencial Vista Verde", expectedReturn: "18%", duration: "18 meses" },
    { id: 2, name: "Torres del Sol", expectedReturn: "22%", duration: "12 meses" },
    { id: 3, name: "Complejo Urbano Plaza", expectedReturn: "25%", duration: "24 meses" },
  ]

  const calculateReturns = (amount, returnRate) => {
    const rate = Number.parseFloat(returnRate.replace("%", "")) / 100
    return amount * rate
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-gray to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Formá Parte de Nuestros Proyectos</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Invertí en desarrollos inmobiliarios de alta calidad y obtené rendimientos superiores al mercado
              tradicional
            </p>
          </div>
        </section>
        

        {/* Investment Benefits */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por Qué Invertir con Nosotros?</h2>
              <p className="text-xl text-gray-600">Conocé las ventajas de formar parte de nuestros desarrollos</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {investmentBenefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-6">
                    <benefit.icon className="h-8 w-8 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Contact Form */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Listo para Invertir?</h2>
              <p className="text-xl text-gray-600">Completá el formulario y un asesor se contactará contigo</p>
            </div>

            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                    <Input placeholder="Tu nombre completo" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="tu@email.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <Input type="tel" placeholder="+54 11 1234-5678" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monto a Invertir</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar rango" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25000-75000">$25,000 - $75,000</SelectItem>
                        <SelectItem value="75000-200000">$75,000 - $200,000</SelectItem>
                        <SelectItem value="200000+">$200,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Proyecto de Interés</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje Adicional</label>
                  <Textarea placeholder="Contanos sobre tus objetivos de inversión..." rows={4} />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" className="flex-1 bg-rose-600 hover:bg-rose-700">
                    Solicitar Información
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      const message =
                        "Hola! Me interesa conocer más sobre las oportunidades de inversión en sus desarrollos inmobiliarios. ¿Podrían brindarme información detallada?"
                      const whatsappUrl = `https://wa.me/5219848790708?text=${encodeURIComponent(message)}`
                      window.open(whatsappUrl, "_blank")
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Consultar por WhatsApp
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
