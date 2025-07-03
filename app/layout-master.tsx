"use client";
import { useEffect, useState } from "react";
import { ChevronUp, MessageCircle, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [showWhatsappPopup, setShowWhatsappPopup] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [nearBottom, setNearBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.offsetHeight;

            setShowScrollTop(scrollY > 300);
            setNearBottom(scrollY + windowHeight >= documentHeight - 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShowWhatsappPopup(true);
        }, 5000);
    }, []);

    const handleWhatsAppSubmit = (message = "") => {
        const whatsappUrl = `https://wa.me/5491135221036?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {children}

            {/* Botón WhatsApp */}
            <div
                className={`fixed ${nearBottom ? 'bottom-[100px]' : 'bottom-6'} right-3 sm:right-6 z-50 transition-all duration-300`}
            >
                <button
                    onClick={() =>
                        handleWhatsAppSubmit("Hola! Me gustaría recibir más información sobre los seguros.")
                    }
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-colors duration-200"
                    aria-label="Contactar por WhatsApp"
                >
                    <FaWhatsapp className="h-8 w-8" />
                </button>
            </div>

            {/* Botón Volver arriba */}
            {showScrollTop && (
                <div
                    className={`fixed ${nearBottom ? 'bottom-[100px]' : 'bottom-6'} left-3 sm:left-6 z-50 transition-all duration-300`}
                >
                    <button
                        onClick={scrollToTop}
                        className="bg-brand-black text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-colors duration-200 animate-in fade-in slide-in-from-bottom-5"
                        aria-label="Volver arriba"
                    >
                        <ChevronUp className="h-6 w-6" />
                    </button>
                </div>
            )}

            {/* Popup WhatsApp */}
            {showWhatsappPopup && (
                <div className="fixed bottom-24 right-3 sm:right-6 z-50 bg-white rounded-lg shadow-xl w-[calc(100%-0.75rem*2)] max-w-[400px] sm:max-w-xs animate-in fade-in slide-in-from-bottom-5 duration-300">
                    <div className="bg-green-500 text-white p-3 rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center">
                            <FaWhatsapp className="h-5 w-5 mr-2" />
                            <span className="font-medium">WhatsApp</span>
                        </div>
                        <button
                            onClick={() => setShowWhatsappPopup(false)}
                            className="text-white hover:bg-green-600 rounded-full p-1 transition-colors duration-200"
                            aria-label="Cerrar popup"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="p-4">
                        <p className="text-gray-700 mb-4">
                            ¿Necesitas ayuda? Chatea con nosotros ahora mismo.
                        </p>
                        <Button
                            onClick={() =>
                                handleWhatsAppSubmit("Hola! Me gustaría recibir más información sobre los seguros.")
                            }
                            className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-200"
                        >
                            <FaWhatsapp className="mr-2 h-4 w-4" />
                            Iniciar chat
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
