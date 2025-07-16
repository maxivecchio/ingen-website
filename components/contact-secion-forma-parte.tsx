"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { propertyService } from "./api/properties-api"
import { getImageUrl, ServerUrl } from "@/lib/utils"

const ContactFormFormaParte = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        montoInvertir: "",
        proyectoInteres: "",
        source: "website-inversiones",
        formType: "inversiones",
        variant: "inversiones",
    })
    const [propertiesEmprende, setPropertiesEmprende] = useState<any>([])
    const [loading, setLoading] = useState(true)
    // searchTerm, currentPage, pagination are not used in the current UI, but kept as per original code
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

    const getBrowserInfo = () => {
        const userAgent = navigator.userAgent
        const referrer = document.referrer
        const urlParams = new URLSearchParams(window.location.search)
        const utmSource = urlParams.get("utm_source") || ""
        const utmMedium = urlParams.get("utm_medium") || ""
        const utmCampaign = urlParams.get("utm_campaign") || ""

        // Note: IP address cannot be reliably obtained client-side without a third-party API.
        // For demonstration, we'll use a placeholder or assume it's handled server-side.
        const ipAddress = "192.168.1.100" // Placeholder

        return {
            userAgent,
            referrer,
            utmSource,
            utmMedium,
            utmCampaign,
            ipAddress,
        }
    }

    const loadPropertiesEmprende = useCallback(async () => {
        try {
            setLoading(true)
            const filters: any = {
                page: currentPage,
                property_type: "all",
                limit: 10,
            }
            const response = await propertyService.getAllEmprende(filters)
            console.log(response)
            setPropertiesEmprende(response.data)
            setPagination(response.pagination)
        } catch (error) {
            console.error("Error loading properties:", error)
        } finally {
            setLoading(false)
        }
    }, [currentPage]) // [^1] useCallback memoizes the function, preventing unnecessary re-renders of components that depend on it.

    useEffect(() => {
        loadPropertiesEmprende()
    }, [loadPropertiesEmprende])

    // These functions are not used in the current UI, but kept as per original code
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // [^2] Event handlers update state based on user input.
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleProjectSelect = (projectName: string) => {
        setFormData((prevData) => ({
            ...prevData,
            proyectoInteres: projectName,
        }))
    }

    const [isFormValid, setIsFormValid] = useState(false)

    // Function to validate the form
    const validateForm = () => {
        return (
            formData.name.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.phone.trim() !== "" &&
            formData.message.trim() !== "" &&
            formData.montoInvertir.trim() !== "" &&
            formData.proyectoInteres.trim() !== ""
        )
    }
    // Re-validate form whenever formData or cotizarAuto changes
    useEffect(() => {
        setIsFormValid(validateForm())
    }, [formData])

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isFormValid) {
            alert("Por favor, completa todos los campos obligatorios.")
            return
        }

        const browserInfo = getBrowserInfo()

        let payload: any = {
            accountId: "684cb03b2d282f47c65cd8c1", // Fixed ID as per request
            name: formData.name,
            email: formData.email,
            subject: "Mensaje de contacto",
            phone: formData.phone,
            message: formData.message,
            montoInvertir: formData.montoInvertir,
            proyectoInteres: formData.proyectoInteres,
            source: "website-inversiones",
            formType: "inversiones",
            variant: "inversiones",
            ipAddress: browserInfo.ipAddress,
            userAgent: browserInfo.userAgent,
            referrer: browserInfo.referrer,
            utmSource: browserInfo.utmSource,
            utmMedium: browserInfo.utmMedium,
            utmCampaign: browserInfo.utmCampaign,
        }

        console.log(payload);

        try {
            const response = await fetch(`${ServerUrl}/contact-forms`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            console.log(response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            console.log("Form data sent successfully:", payload)
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
                montoInvertir: "",
                proyectoInteres: "",
                source: "website-inversiones",
                formType: "inversiones",
                variant: "inversiones",
            })
        } catch (error) {
            console.error("Error sending form data:", error)
        }
    }

    return (
        <>
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Listo para Invertir?</h2>
                        <p className="text-xl text-gray-600">Completá el formulario y un asesor se contactará contigo</p>
                    </div>
                    <Card className="p-8">
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            {/* Project Selection Grid */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Proyecto de Interés</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {loading ? (
                                        <p className="col-span-full text-center text-gray-600">Cargando proyectos...</p>
                                    ) : propertiesEmprende.length === 0 ? (
                                        <p className="col-span-full text-center text-gray-600">No hay proyectos disponibles.</p>
                                    ) : (
                                        propertiesEmprende.map((project: any) => (
                                            <div
                                                key={project.name}
                                                className={`cursor-pointer rounded-lg border p-4 text-center transition-all hover:shadow-lg ${formData.proyectoInteres === project.name
                                                    ? "border-brand-black ring-brand-black"
                                                    : "border-gray-200"
                                                    }`}
                                                onClick={() => handleProjectSelect(project.name)}
                                                role="button"
                                                tabIndex={0}
                                                aria-pressed={formData.proyectoInteres === project.name}
                                            >
                                                <img
                                                    src={
                                                        project.files?.find((file: any) => file.position === 0)?.path
                                                            ? getImageUrl(project.files.find((file: any) => file.position === 0))
                                                            : "/placeholder.svg"
                                                    }
                                                    alt={project.name}
                                                    className="mx-auto mb-4 h-24 w-24 object-cover rounded-md"
                                                />
                                                <h3 className="text-xs font-semibold text-gray-800">{project.name}</h3>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div>
                                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                                        <div className="text-sm text-black">
                                            Mostrando {(pagination.page - 1) * pagination.limit + 1}-
                                            {Math.min(pagination.page * pagination.limit, pagination.total)} de {pagination.total} emprendimientos
                                            {searchTerm && ` (búsqueda: "${searchTerm}")`}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={!pagination.hasPrevPage}
                                                onClick={goToPreviousPage}
                                                className="shadow-sm bg-transparent"
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
                                                className="shadow-sm bg-transparent"
                                            >
                                                Siguiente
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Other form fields */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre Completo
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Tu nombre completo"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Teléfono
                                    </label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        placeholder="+54 11 1234-5678"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="montoInvertir" className="block text-sm font-medium text-gray-700 mb-2">
                                        Monto a Invertir
                                    </label>
                                    <Select
                                        value={formData.montoInvertir}
                                        onValueChange={(value) => handleSelectChange("montoInvertir", value)}
                                    >
                                        <SelectTrigger id="montoInvertir">
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
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mensaje Adicional
                                </label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Contanos sobre tus objetivos de inversión..."
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button type="submit" className="flex-1 bg-brand-black hover:bg-brand-black">
                                    Solicitar Información
                                </Button>
                                {/* <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 bg-transparent"
                                    onClick={() => {
                                        const message =
                                            "Hola! Me interesa conocer más sobre las oportunidades de inversión en sus desarrollos inmobiliarios. ¿Podrían brindarme información detallada?"
                                        const whatsappUrl = `https://wa.me/5491135221036?text=${encodeURIComponent(message)}`
                                        window.open(whatsappUrl, "_blank")
                                    }}
                                >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Consultar por WhatsApp
                                </Button> */}
                            </div>
                        </form>
                    </Card>
                </div>
            </section>
        </>
    )
}

export default ContactFormFormaParte
