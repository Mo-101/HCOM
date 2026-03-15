import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { MainNavigation } from "@/components/main-navigation"
import { Footer } from "@/components/footer"
import { ChatbotToggle } from "@/components/chatbot-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WHO AFRO Emergency Preparedness Inventory Catalog",
  description: "Inventory catalog for the WHO AFRO Emergency Preparedness and Response program",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <CartProvider>
            <MainNavigation />
            <div className="flex-grow">{children}</div>
            <Footer />
            <ChatbotToggle />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
