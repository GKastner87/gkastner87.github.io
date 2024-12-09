"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/blog'

interface BlogPostsProps {
  initialPosts: Post[]
}

export default function BlogPosts({ initialPosts }: BlogPostsProps) {
  const [posts] = useState(initialPosts)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <article key={post.slug} className="group relative bg-muted rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <Link href={`/blog/${post.slug}`} className="block p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <time>{post.date}</time>
              <span>•</span>
              <span className="text-primary">{post.category}</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-muted-foreground">
              {post.description}
            </p>
          </Link>
        </article>
      ))}
    </div>
  )
} 