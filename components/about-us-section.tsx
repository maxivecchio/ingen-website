import Image from "next/image"
import Link from "next/link"

export default function AboutUsSection() {
  return (
    <section className="relative h-[500px] lg:h-[600px] w-full">
      <Image
        src="/cupulaedit.jpg" // Reemplazá esta ruta por tu imagen real
        alt="Sobre nosotros"
        fill
        className="object-cover"
        priority
      />

      {/* <div className="absolute inset-0 bg-black/60" /> */}

      <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl text-white">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Quiénes Somos</h2>
          <p className="text-lg lg:text-xl mb-6">
            Somos expertos en desarrollo urbano. Transformamos espacios y generamos valor para quienes confían en nosotros.
          </p>
          <Link
            href="/sobre-nosotros"
            className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
          >
            Conocé más
          </Link>
        </div>
      </div>
    </section>
  )
}
