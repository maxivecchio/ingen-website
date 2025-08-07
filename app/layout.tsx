import type { Metadata } from 'next'
import './globals.css'
import { Montserrat } from "next/font/google";
import Header from '@/components/header';
import Footer from '@/components/footer';
import Providers from "@/app/layout-master";
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
    title: 'Ingen | Desarrollo Urbano e Inversiones Inmobiliarias',
    description: 'Líderes en desarrollo urbano e inversiones inmobiliarias con más de 15 años de experiencia. Ofrecemos soluciones innovadoras y sostenibles para transformar espacios urbanos.',
}

const montserrat = Montserrat({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${montserrat.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Providers>
                        <Header />
                        {children}
                        <Footer />
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    )
}
