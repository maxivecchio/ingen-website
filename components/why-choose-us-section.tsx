import { Star, MapPin, Award, Users, Clock, Shield } from "lucide-react"

export default function WhyChooseUsSection() {
  const reasons = [
    {
      icon: MapPin,
      title: "Mejores Ubicaciones",
      description: "Seleccionamos terrenos en zonas de alta plusvalía y crecimiento urbano",
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description: "Materiales premium y acabados de primera calidad en todos nuestros proyectos",
    },
    {
      icon: Users,
      title: "Equipo Experto",
      description: "Más de 15 años de experiencia en desarrollo inmobiliario",
    },
    {
      icon: Clock,
      title: "Entrega a Tiempo",
      description: "Cumplimos con los plazos establecidos en cada proyecto",
    },
    {
      icon: Shield,
      title: "Transparencia Total",
      description: "Informes mensuales de avance y uso transparente de fondos",
    },
  ]

  const reviews = [
    {
      name: "María González",
      rating: 5,
      comment:
          "Excelente experiencia de inversión. Cumplieron todos los plazos y la rentabilidad fue superior a lo esperado.",
      project: "Torres del Sol",
    },
    {
      name: "Carlos Rodríguez",
      rating: 5,
      comment: "Muy profesionales y transparentes. Recomiendo totalmente invertir con ellos.",
      project: "Residencial Vista Verde",
    },
    {
      name: "Ana Martínez",
      rating: 5,
      comment: "La mejor decisión de inversión que he tomado. Excelente comunicación durante todo el proceso.",
      project: "Complejo Urbano Plaza",
    },
  ]

  return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">¿Por Qué Elegirnos?</h2>
            <p className="text-xl text-gray-600">
              Somos líderes en desarrollo urbano con un historial comprobado de éxito
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reasons.map((reason, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gray rounded-full mb-6">
                    <reason.icon className="h-8 w-8 text-brand-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
            ))}
          </div>

          <div className="bg-brand-gray rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Lo que dicen nuestros inversores</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{review.comment}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">Inversor en {review.project}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}
