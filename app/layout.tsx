import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/components/providers/modal-provider'

const font = Open_Sans({subsets : ["latin"]})

export const metadata: Metadata = {
  title: 'Умный говор',
  description: 'Next communication app',
  icons : [
    {
      url : "/logo.jpg",
      href : "/logo.jpg",
      
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
            <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem={false}
                  disableTransitionOnChange
                >
                <ModalProvider/>
                {children}
            </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}