import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { getAllPosts } from '@/lib/posts.server'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Guy Kastner - Blog',
  description: 'Articles about Microsoft technologies, scripting, DevOps, and security.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const posts = await getAllPosts()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header posts={posts} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 