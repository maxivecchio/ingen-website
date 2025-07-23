import Image from "next/image"

export default function CompanyStats() {
  const team = [
    {
      name: "Agustin",
      role: "PONER ROL",
      image: "/agus.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Lucas",
      role: "PONER ROL",
      image: "/lucas.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Martin",
      role: "PONER ROL",
      image: "/martin.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Nati",
      role: "PONER ROL",
      image: "/nati.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Robert",
      role: "PONER ROL",
      image: "/robert2.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Tomas",
      role: "PONER ROL",
      image: "/tomas.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Tomi",
      role: "PONER ROL",
      image: "/tomi.jpeg",
      description: "PONER DESCRIPCION",
    },
  ]

  return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Quiénes Somos</h2>
            <p className="md:text-xl text-gray-600 max-w-3xl mx-auto">
              Somos una empresa líder en desarrollo urbano con más de 15 años de experiencia creando espacios que
              transforman ciudades y generan valor para nuestros inversores.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-48 h-48 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-rose-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </div>
            ))}
          </div>

          {/* <div className="bg-brand-gray rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Crear desarrollos urbanos sustentables que mejoren la calidad de vida de las personas mientras generamos
              oportunidades de inversión rentables y seguras para nuestros socios. Nos comprometemos con la excelencia, la
              transparencia y la innovación en cada proyecto.
            </p>
          </div> */}
        </div>
      </section>
  )
}
