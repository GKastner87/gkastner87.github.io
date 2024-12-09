import { getAllPosts } from '@/lib/posts.server'
import { CATEGORIES } from '@/lib/blog'
import { Metadata } from 'next'
import BlogPosts from '@/components/BlogPosts'

export const metadata: Metadata = {
  title: 'Blog - Guy Kastner',
  description: 'Articles about Microsoft technologies, PowerShell, development, and security.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Blog Posts</h1>
          <p className="text-lg text-muted-foreground">
            Browse articles by category:
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {Object.entries(CATEGORIES).map(([category, description]) => (
              <a
                key={category}
                href={`/blog/category/${category.toLowerCase()}`}
                className="inline-flex items-center px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <span className="text-sm font-medium">{category}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  ({posts.filter(post => post.category === category).length})
                </span>
              </a>
            ))}
          </div>
        </header>
        <BlogPosts initialPosts={posts} />
      </div>
    </div>
  )
} 