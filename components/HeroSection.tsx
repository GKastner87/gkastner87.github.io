"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Post } from "@/lib/blog"

interface HeroSectionProps {
  posts: Post[]
}

export default function HeroSection({ posts }: HeroSectionProps) {
  const [randomSlug, setRandomSlug] = useState<string | null>(null)

  useEffect(() => {
    if (posts.length > 0) {
      const randomIndex = Math.floor(Math.random() * posts.length)
      setRandomSlug(posts[randomIndex].slug)
    }
  }, [posts])

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-black">
          <Image
            src="/images/hero.jpg"
            alt="Modern workspace with laptop"
            fill
            sizes="100vw"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            className="opacity-60 dark:opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Welcome to My Blog
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore the latest in web development, design, and technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href={randomSlug ? `/blog/${randomSlug}` : "#"}
              className="w-full sm:w-auto px-6 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Explore a Random Post
            </Link>
            <Link
              href="/blog"
              className="w-full sm:w-auto px-6 py-2 text-sm bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 