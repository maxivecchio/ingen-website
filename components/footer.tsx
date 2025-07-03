import Link from "next/link"
import {Facebook, Instagram, Twitter, Linkedin} from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-brand-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <Link href="/">
                            <img src="/logo-white.png" className="h-14 pb-5" alt=""/>
                        </Link>
                        <p className="text-gray-300 mb-4">
                            Líderes en desarrollo urbano e inversiones inmobiliarias con más de 15 años de experiencia.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <Facebook className="h-5 w-5"/>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <Instagram className="h-5 w-5"/>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <Twitter className="h-5 w-5"/>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <Linkedin className="h-5 w-5"/>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Navegación</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-rose-400">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/emprendimientos" className="text-gray-300 hover:text-rose-400">
                                    Emprendimientos
                                </Link>
                            </li>
                            <li>
                                <Link href="/propiedades" className="text-gray-300 hover:text-rose-400">
                                    Propiedades
                                </Link>
                            </li>
                            <li>
                                <Link href="/forma-parte" className="text-gray-300 hover:text-rose-400">
                                    Forma Parte
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Servicios</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/construccion" className="text-gray-300 hover:text-rose-400">
                                    Construcción
                                </Link>
                            </li>
                            <li>
                                <Link href="/sobre-nosotros" className="text-gray-300 hover:text-rose-400">
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/novedades" className="text-gray-300 hover:text-rose-400">
                                    Novedades
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="text-gray-300 hover:text-rose-400">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contacto</h4>
                        <div className="space-y-2 text-gray-300">
                            <p>Av. Principal 1234, Centro</p>
                            <p>Ciudad, Provincia 12345</p>
                            <p>+52 1 984 879 0708</p>
                            <p>info@urbandev.com</p>
                        </div>
                    </div>
                </div>

                <div className="border-t flex-col sm:flex-row flex justify-between border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025. Todos los derechos reservados.</p>
                    <Link href={"https://moveup.digital"} target={"_blank"}
                          className="flex mx-auto sm:mx-0 mt-4 sm:mt-0 text-white w-fit items-center justify-center gap-2 text-sm">Made by <img
                        className={"h-[18px]"} src={"/moveup-logo.png"} alt={"MoveUp Digital Logo"}/> </Link>
                </div>
            </div>
        </footer>
    )
}
