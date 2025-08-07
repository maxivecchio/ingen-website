import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Award,
  Users,
  Calendar,
  Target,
} from "lucide-react";
import Image from "next/image";
import CompanyStats from "@/components/company-stats";

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="">
        <section
          className="relative bg-cover bg-center bg-no-repeat py-16 lg:py-32"
          style={{ backgroundImage: "url('/sobre-nosotros.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black/30 z-0" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                  Invertí en tu
                  <span className="text-white block">Futuro Inmobiliario</span>
                </h1>
                <p className="md:text-lg text-white mb-6 leading-relaxed">
                  Fundada en 2009, <strong>INGEN</strong> nació como un pequeño
                  estudio de arquitectura con una gran visión: transformar el
                  paisaje urbano a través de desarrollos innovadores y
                  sustentables. Hoy somos una de las desarrolladoras más
                  reconocidas de la región.
                </p>
                <p className="md:text-lg text-white leading-relaxed">
                  Nuestro compromiso es crear espacios que mejoren la calidad de
                  vida, combinando diseño de vanguardia, tecnología y
                  ubicaciones estratégicas. Con más de 2,500 unidades
                  entregadas, seguimos apostando por la calidad, la
                  transparencia y el crecimiento responsable de nuestras
                  ciudades.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <CompanyStats />

        {/* Team Section */}
        {/* <section className="py-20 bg-gray-50">
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
        </section> */}

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
        <section className="py-16 dark:bg-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="p-8 dark:bg-black dark:border-black">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Nuestra Misión
                </h3>
                <p className="text-gray-600 dark:text-white leading-relaxed">
                  Crear desarrollos urbanos sustentables que mejoren la calidad
                  de vida de las personas, generando oportunidades de inversión
                  rentables y seguras para nuestros socios. Nos comprometemos
                  con la excelencia, la transparencia y la innovación en cada
                  proyecto, contribuyendo al crecimiento ordenado y responsable
                  de nuestras ciudades.
                </p>
              </Card>

              <Card className="p-8 dark:bg-black dark:border-black">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Nuestra Visión
                </h3>
                <p className="text-gray-600 dark:text-white leading-relaxed">
                  Ser la desarrolladora urbana líder en la región, reconocida
                  por la calidad de nuestros proyectos, la satisfacción de
                  nuestros clientes y el impacto positivo en las comunidades
                  donde operamos. Aspiramos a establecer nuevos estándares en el
                  desarrollo inmobiliario sustentable y ser la primera opción
                  para inversores que buscan rentabilidad con responsabilidad
                  social.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-20 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl dark:text-white font-bold text-gray-900 mb-4">
                Nuestra Ubicación
              </h2>
              <p className="text-xl dark:text-white text-gray-600">
                Visitanos en nuestras oficinas centrales
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Información de contacto */}
              <Card className="p-8 shadow-md border dark:bg-neutral-900 dark:border-neutral-900">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Información de Contacto
                </h3>

                <div className="space-y-6 text-gray-700 text-sm">
                  <div className="flex flex-col sm:flex-row items-start w-full">
                    <MapPin className="h-6 w-6 text-rose-600 mb-2 sm:mb-0 sm:mr-4 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 dark:text-white">
                        Dirección Principal
                      </p>
                      <p className="break-words dark:text-white">
                        Aldo Serrano 2026, X5900 Villa María, Córdoba
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start w-full">
                    <Phone className="h-6 w-6 text-rose-600 mb-2 sm:mb-0 sm:mr-4 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 dark:text-white">Teléfono</p>
                      <p className="break-words dark:text-white">+54 935 1552-1325</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start w-full">
                    <Mail className="h-6 w-6 text-rose-600 mb-2 sm:mb-0 sm:mr-4 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 dark:text-white">Email</p>
                      <p className="break-all dark:text-white">
                        contacto@ingendesarrollos.com.ar
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3">
                    Horarios de Atención
                  </h4>
                  <p>Lun - Vie: 9:00 - 17:00</p>
                </div>
              </Card>

              {/* Mapa */}
              <Card className="p-8 shadow-md border border-gray-100 dark:bg-neutral-800 dark:border-neutral-900">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Nuestra Ubicación
                  </h3>
                  <div className="bg-gray-200 rounded-lg w-full overflow-hidden">
                    <div className="relative pb-[56.25%] h-0">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d210.55965921263282!2d-63.26071728050357!3d-32.393580095367156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cc4308a4d1c5bb%3A0x33971dd52b68922c!2sIngen%20Desarrollos!5e0!3m2!1ses!2sar!4v1753390438845!5m2!1ses!2sar"
                        className="absolute top-0 left-0 w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
