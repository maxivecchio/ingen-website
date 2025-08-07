"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Send,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServerUrl } from "@/lib/utils";

// Define mock data for departments, contactInfo, and socialLinks
const departments = [
  { label: "Consulta General", value: "General" },
  { label: "Soporte Técnico", value: "Soporte" },
  { label: "Ventas", value: "Ventas" },
  { label: "Inversiones", value: "Inversiones" },
];

const contactInfo = [
  {
    icon: MapPin,
    title: "Nuestra Oficina",
    details: ["Aldo Serrano 2026, X5900 Villa María, Córdoba"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["contacto@ingendesarrollos.com.ar"],
  },
  {
    icon: Phone,
    title: "Teléfono",
    details: ["+54 935 1552-1325"],
  },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/ingendesarrollos" },
  { icon: Facebook, href: "https://www.facebook.com/Ingendesarrollos" },
  { icon: Linkedin, href: "#" },
];

const ContactFomrContacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "Mensaje de contacto", // Added 'subject' field as per HTML
    source: "website-contacto", // Adjusted source for this form
    formType: "contacto", // Adjusted formType for this form
    variant: "contacto", // Adjusted variant for this form
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Function to get browser information
  const getBrowserInfo = useCallback(() => {
    const userAgent = navigator.userAgent;
    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source") || "";
    const utmMedium = urlParams.get("utm_medium") || "";
    const utmCampaign = urlParams.get("utm_campaign") || "";
    // Note: IP address cannot be reliably obtained client-side without a third-party API.
    // For demonstration, we'll use a placeholder or assume it's handled server-side.
    const ipAddress = "192.168.1.100"; // Placeholder
    return {
      userAgent,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      ipAddress,
    };
  }, []);

  // Handle input changes for text fields and textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to validate the form
  const validateForm = useCallback(() => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.message.trim() !== "" &&
      formData.subject.trim() !== "" // Validating 'subject' field
    );
  }, [formData]);

  // Re-validate form whenever formData changes
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData, validateForm]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const browserInfo = getBrowserInfo();
    const payload: any = {
      accountId: "684cb03b2d282f47c65cd8c1", // Fixed ID as per request
      name: formData.name,
      email: formData.email,
      subject: formData.subject, // Included 'subject' in payload
      phone: formData.phone,
      message: formData.message,
      // Removed montoInvertir and proyectoInteres as they are not in this form's HTML
      source: formData.source,
      formType: formData.formType,
      variant: formData.variant,
      ipAddress: browserInfo.ipAddress,
      userAgent: browserInfo.userAgent,
      referrer: browserInfo.referrer,
      utmSource: browserInfo.utmSource,
      utmMedium: browserInfo.utmMedium,
      utmCampaign: browserInfo.utmCampaign,
    };
    console.log(payload);
    try {
      const response = await fetch(`${ServerUrl}/contact-forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Form data sent successfully:", payload);
      alert("Formulario enviado con éxito!");
      // Optionally reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        subject: "",
        source: "website-contacto",
        formType: "contacto",
        variant: "contacto",
      });
    } catch (error) {
      console.error("Error sending form data:", error);
      alert(
        "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <section className="py-16 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg dark:bg-neutral-900 dark:border-neutral-900">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Envianos un Mensaje
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                      >
                        Nombre Completo *
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                      >
                        Email *
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                      >
                        Teléfono
                      </label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+54 11 1234-5678"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                      >
                        Asunto *
                      </label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) =>
                          handleSelectChange("subject", value)
                        }
                        required
                      >
                        <SelectTrigger className="dark:text-white dark:bg-black dark:border-black" id="subject">
                          <SelectValue placeholder="Seleccionar asunto" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-black dark:border-black">
                          {departments.map((dept) => (
                            <SelectItem key={dept.value} value={dept.value}>
                              {dept.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                    >
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Contanos en detalle sobre tu consulta..."
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-brand-black hover:bg-black/80 dark:text-white"
                      disabled={!isFormValid}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensaje
                    </Button>
                    {/* <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        const message =
                          "Hola! Me gustaría obtener más información sobre sus servicios y proyectos disponibles."
                        const whatsappUrl = `https://wa.me/5493515521325?text=${encodeURIComponent(message)}`
                        window.open(whatsappUrl, "_blank")
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp Directo
                    </Button> */}
                  </div>
                  <p className="text-sm text-gray-500">
                    * Campos obligatorios. Nos pondremos en contacto contigo
                    dentro de las 24 horas.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 w-full">
            {contactInfo.map((info, index) => (
              <Card key={index} className="dark:bg-neutral-900 dark:border-neutral-900">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start w-full">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                      <div className="w-12 h-12 bg-brand-gray rounded-lg flex items-center justify-center">
                        <info.icon className="h-6 w-6 text-brand-black" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p
                            key={detailIndex}
                            className="text-gray-600 dark:text-white text-sm break-words overflow-hidden text-ellipsis"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Social Media */}
            <Card className="dark:bg-neutral-900 dark:border-neutral-900">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Seguinos en Redes
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-brand-gray rounded-lg flex items-center justify-center hover:bg-black/10 dark:hover:bg-white transition-colors"
                      /* @ts-ignore */
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="h-5 w-5 text-brand-black" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFomrContacto;
