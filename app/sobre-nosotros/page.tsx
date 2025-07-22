import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Award, Users, Calendar, Target } from "lucide-react"
import Image from "next/image"
import CompanyStats from "@/components/company-stats"

export default function SobreNosotrosPage() {
  const team = [
    {
      name: "Agustin",
      role: "Rellenar info",
      image: "/agus.jpeg",
      description: "Rellenar info",
      experience: "Rellenar info",
      education: "Rellenar info",
      achievements: ["Rellenar info"],
    },
    {
      name: "Lucas",
      role: "Rellenar info",
      image: "/lucas.jpeg",
      description: "Rellenar info",
      experience: "Rellenar info",
      education: "Rellenar info",
      achievements: ["Rellenar info"],
    },
    {
      name: "Martin",
      role: "Rellenar info",
      image: "/martin.jpeg",
      description: "Rellenar info",
      experience: "Rellenar info",
      education: "Rellenar info",
      achievements: ["Rellenar info"],
    },
    {
      name: "Nati",
      role: "Rellenar info",
      image: "/nati.jpeg",
      description: "Rellenar info",
      experience: "Rellenar info",
      education: "Rellenar info",
      achievements: ["Rellenar info"],
    },
    {
      name: "Robert",
      role: "Rellenar info",
      image: "/robert2.jpeg",
      description: "Rellenar info",
      experience: "Rellenar info",
      education: "Rellenar info",
      achievements: ["Rellenar info"],
    },
    {
      name: "Tomas",
      role: "Rellenar info",
      image: "/tomas.jpeg",
      description: "Rellenar info",
      experience: "Rellenar info",
      education: "Rellenar info",
      achievements: ["Rellenar info"],
    },
    {
      name: "Tomi",
      role: "Rellenar info",
      image: "/tomi.jpeg",
      description: "Rellenar info",
      experience: "Rellenar info",
      education: "Rellenar info",
      achievements: ["Rellenar info"],
    },
  ];

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
      <main className="">
        <section
          className="relative bg-cover bg-center bg-no-repeat py-16 lg:py-32"
          style={{ backgroundImage: "url('/sobre-nosotros.jpeg')" }}
        >

          <div className="absolute inset-0 bg-black/75 z-0" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                  Invertí en tu
                  <span className="text-white block">Futuro Inmobiliario</span>
                </h1>
                <p className="text-lg text-white mb-6 leading-relaxed">
                  Fundada en 2009, <strong>INGEN</strong> nació como un pequeño estudio de arquitectura con una gran visión:
                  transformar el paisaje urbano a través de desarrollos innovadores y sustentables. Hoy somos una de las desarrolladoras
                  más reconocidas de la región.
                </p>
                <p className="text-lg text-white leading-relaxed">
                  Nuestro compromiso es crear espacios que mejoren la calidad de vida, combinando diseño de vanguardia, tecnología y
                  ubicaciones estratégicas. Con más de 2,500 unidades entregadas, seguimos apostando por la calidad, la transparencia y el
                  crecimiento responsable de nuestras ciudades.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 
        <section className="bg-gradient-to-r from-brand-gray to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Sobre Nosotros</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conocé nuestra historia, nuestro equipo y nuestra misión de transformar el desarrollo urbano
            </p>
          </div>
        </section>
        <section className="relative h-auto min-h-[600px] w-full">
          <Image
            src="/sobre-nosotros.jpeg" // Usás la misma imagen que en tu card
            alt="Nuestra historia"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/80" />

          <div className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-24 py-20">
            <div className="max-w-4xl text-white">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Nuestra Historia
              </h2>
              <p className="text-lg mb-6 leading-relaxed">
                Fundada en 2009, <strong>INGEN</strong> nació con la visión de transformar el paisaje urbano a
                través de desarrollos inmobiliarios innovadores y sustentables. Comenzamos como un pequeño estudio de
                arquitectura y hoy somos una de las desarrolladoras más reconocidas de la región.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Nuestro enfoque siempre ha sido crear espacios que mejoren la calidad de vida de las personas,
                combinando diseño de vanguardia con tecnologías sustentables y ubicaciones estratégicas. Cada proyecto
                es una oportunidad de contribuir al crecimiento ordenado y responsable de nuestras ciudades.
              </p>
              <p className="text-lg leading-relaxed">
                A lo largo de más de 15 años, hemos entregado más de 2,500 unidades habitacionales y comerciales,
                siempre manteniendo nuestros valores de calidad, transparencia y compromiso con nuestros clientes e
                inversores.
              </p>
            </div>
          </div>
        </section> */}

        {/* Company Stats */}
        <CompanyStats />

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
              <p className="text-xl text-gray-600">Los profesionales que hacen posible cada proyecto</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-rose-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.description}</p>

                  <div className="text-left w-full text-sm space-y-2">
                    <div>
                      <span className="font-semibold text-gray-700">Experiencia:</span>
                      <span className="text-gray-600 ml-1">{member.experience}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Formación:</span>
                      <span className="text-gray-600 ml-1">{member.education}</span>
                    </div>
                    {member.achievements.length > 0 && (
                      <div>
                        <span className="font-semibold text-gray-700">Logros:</span>
                        <ul className="mt-1 list-disc list-inside text-gray-600 text-xs">
                          {member.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        {/*  <section className="py-16 bg-gray-50">
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
        </section> */}

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
                <p className="text-gray-600 leading-relaxed">
                  Crear desarrollos urbanos sustentables que mejoren la calidad de vida de las personas, generando
                  oportunidades de inversión rentables y seguras para nuestros socios. Nos comprometemos con la
                  excelencia, la transparencia y la innovación en cada proyecto, contribuyendo al crecimiento ordenado y
                  responsable de nuestras ciudades.
                </p>
              </Card>

              <Card className="p-8">
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestra Ubicación</h2>
              <p className="text-xl text-gray-600">Visitanos en nuestras oficinas centrales</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Información de contacto */}
              <Card className="p-8 shadow-md border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
                <div className="space-y-6 text-gray-700 text-sm">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-rose-600 mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Dirección Principal</p>
                      <p>
                        Av. Principal 1234, Piso 12<br />
                        Centro Empresarial Torre Norte<br />
                        Ciudad, Provincia 12345
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-rose-600 mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Teléfonos</p>
                      <p>
                        +52 1 984 879 0708 (Principal)<br />
                        +52 1 984 879 0709 (Ventas)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-rose-600 mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Email</p>
                      <p>
                        hello@moveup.digital<br />
                        billing@moveup.digital
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Horarios de Atención</h4>
                  <p>Lunes a Viernes: 9:00 - 18:00</p>
                  <p>Sábados: 9:00 - 14:00</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </Card>

              {/* Mapa */}
              <Card className="p-8 shadow-md border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ubicación en el Mapa</h3>
                <div className="rounded-lg overflow-hidden h-80 mb-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.763088492449!2d-58.41730982426313!3d-34.63565405941545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb6caa16f7e7%3A0xdda4f986f1234567!2sAv.%20Principal%201234!5e0!3m2!1ses!2sar!4v1717020123456"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>Transporte público:</strong> Líneas de metro A, B y C — Estación Centro (5 min caminando)
                  </p>
                  <p>
                    <strong>Estacionamiento:</strong> Disponible en el edificio (primeras 2 horas gratuitas)
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
