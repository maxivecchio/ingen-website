import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Award, Users, Calendar, Target } from "lucide-react"
import Image from "next/image"

export default function SobreNosotrosPage() {
  const team = [
    {
      name: "Roberto Martínez",
      role: "Director General & Fundador",
      image: "/placeholder.svg?height=400&width=400",
      description:
        "Arquitecto con 20 años de experiencia en desarrollo urbano. Especializado en proyectos residenciales de gran escala.",
      experience: "20 años",
      education: "Arquitecto - Universidad Nacional",
      achievements: ["50+ proyectos completados", "Certificación LEED", "Premio Arquitectura Sustentable 2022"],
    },
    {
      name: "Laura Fernández",
      role: "Directora de Inversiones",
      image: "/placeholder.svg?height=400&width=400",
      description:
        "MBA en Finanzas con especialización en mercados inmobiliarios. Experta en estructuración de inversiones.",
      experience: "15 años",
      education: "MBA Finanzas - Universidad de Buenos Aires",
      achievements: ["$50M+ en inversiones gestionadas", "Certificación CFA", "Mejor Gestora 2023"],
    },
    {
      name: "Miguel Torres",
      role: "Director de Construcción",
      image: "/placeholder.svg?height=400&width=400",
      description: "Ingeniero civil especializado en construcción sustentable y gestión de proyectos complejos.",
      experience: "18 años",
      education: "Ingeniero Civil - Universidad Tecnológica",
      achievements: ["Certificación PMP", "Especialista en construcción verde", "0 accidentes en 5 años"],
    },
    {
      name: "Ana García",
      role: "Directora de Ventas",
      image: "/placeholder.svg?height=400&width=400",
      description: "Especialista en marketing inmobiliario y relaciones con inversores. Lidera el equipo comercial.",
      experience: "12 años",
      education: "Lic. en Marketing - Universidad del Salvador",
      achievements: ["95% satisfacción del cliente", "Top Sales 2022-2023", "Equipo de 15 profesionales"],
    },
  ]

  const companyStats = [
    { icon: Calendar, label: "Años de Experiencia", value: "15+" },
    { icon: Users, label: "Proyectos Completados", value: "75+" },
    { icon: Target, label: "Unidades Entregadas", value: "2,500+" },
    { icon: Award, label: "Premios Recibidos", value: "8" },
  ]

  const milestones = [
    {
      year: "2009",
      title: "Fundación de la Empresa",
      description: "Inicio de operaciones con el primer proyecto residencial",
    },
    {
      year: "2012",
      title: "Primer Gran Desarrollo",
      description: "Completamos nuestro primer complejo de 200 unidades",
    },
    { year: "2015", title: "Expansión Regional", description: "Apertura de oficinas en 3 ciudades principales" },
    { year: "2018", title: "Certificación Sustentable", description: "Primeros proyectos con certificación LEED" },
    {
      year: "2021",
      title: "Programa de Inversores",
      description: "Lanzamiento del programa de inversión para particulares",
    },
    { year: "2024", title: "Líder del Mercado", description: "Reconocidos como desarrolladora líder en la región" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-rose-50 to-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Sobre Nosotros</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conocé nuestra historia, nuestro equipo y nuestra misión de transformar el desarrollo urbano
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <div className="prose prose-lg mx-auto text-gray-600">
                <p className="mb-6">
                  Fundada en 2009, <strong>UrbanDev</strong> nació con la visión de transformar el paisaje urbano a
                  través de desarrollos inmobiliarios innovadores y sustentables. Comenzamos como un pequeño estudio de
                  arquitectura y hoy somos una de las desarrolladoras más reconocidas de la región.
                </p>
                <p className="mb-6">
                  Nuestro enfoque siempre ha sido crear espacios que mejoren la calidad de vida de las personas,
                  combinando diseño de vanguardia con tecnologías sustentables y ubicaciones estratégicas. Cada proyecto
                  es una oportunidad de contribuir al crecimiento ordenado y responsable de nuestras ciudades.
                </p>
                <p>
                  A lo largo de más de 15 años, hemos entregado más de 2,500 unidades habitacionales y comerciales,
                  siempre manteniendo nuestros valores de calidad, transparencia y compromiso con nuestros clientes e
                  inversores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Números</h2>
              <p className="text-xl text-gray-600">Resultados que respaldan nuestra trayectoria</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                    <stat.icon className="h-8 w-8 text-rose-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
              <p className="text-xl text-gray-600">Los profesionales que hacen posible cada proyecto</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <CardContent className="md:w-2/3 p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-rose-600 font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 mb-4">{member.description}</p>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Experiencia:</span>
                          <span className="text-gray-600 ml-2">{member.experience}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Formación:</span>
                          <span className="text-gray-600 ml-2">{member.education}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Logros:</span>
                          <ul className="mt-1 ml-4">
                            {member.achievements.map((achievement, i) => (
                              <li key={i} className="text-gray-600 text-xs">
                                • {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Trayectoria</h2>
              <p className="text-xl text-gray-600">Hitos importantes en nuestro crecimiento</p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-rose-200"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-8 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="p-6">
                      <div className="text-2xl font-bold text-rose-600 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </Card>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-rose-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="p-8 bg-rose-50 border-rose-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
                <p className="text-gray-600 leading-relaxed">
                  Crear desarrollos urbanos sustentables que mejoren la calidad de vida de las personas, generando
                  oportunidades de inversión rentables y seguras para nuestros socios. Nos comprometemos con la
                  excelencia, la transparencia y la innovación en cada proyecto, contribuyendo al crecimiento ordenado y
                  responsable de nuestras ciudades.
                </p>
              </Card>

              <Card className="p-8 bg-blue-50 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ser la desarrolladora urbana líder en la región, reconocida por la calidad de nuestros proyectos, la
                  satisfacción de nuestros clientes y el impacto positivo en las comunidades donde operamos. Aspiramos a
                  establecer nuevos estándares en el desarrollo inmobiliario sustentable y ser la primera opción para
                  inversores que buscan rentabilidad con responsabilidad social.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Ubicación</h2>
              <p className="text-xl text-gray-600">Visitanos en nuestras oficinas centrales</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <Card className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-rose-600 mr-3 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Dirección Principal</p>
                        <p className="text-gray-600">
                          Av. Principal 1234, Piso 12
                          <br />
                          Centro Empresarial Torre Norte
                          <br />
                          Ciudad, Provincia 12345
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-rose-600 mr-3 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Teléfonos</p>
                        <p className="text-gray-600">
                          +52 1 984 879 0708 (Principal)
                          <br />
                          +52 1 984 879 0709 (Ventas)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-rose-600 mr-3 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">
                          info@urbandev.com
                          <br />
                          ventas@urbandev.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Horarios de Atención</h4>
                    <div className="text-gray-600 space-y-1">
                      <p>Lunes a Viernes: 9:00 - 18:00</p>
                      <p>Sábados: 9:00 - 14:00</p>
                      <p>Domingos: Cerrado</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <Card className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Ubicación en el Mapa</h3>
                  <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-rose-600 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Mapa Interactivo</p>
                      <p className="text-sm text-gray-500 mt-2">Av. Principal 1234, Centro Empresarial Torre Norte</p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p className="mb-2">
                      <strong>Transporte público:</strong> Líneas de metro A, B y C - Estación Centro (5 min caminando)
                    </p>
                    <p>
                      <strong>Estacionamiento:</strong> Disponible en el edificio (primeras 2 horas gratuitas)
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
