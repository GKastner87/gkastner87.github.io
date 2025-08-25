import { getAllPosts } from '@/lib/posts.server'
import { Metadata } from 'next'
import BlogPosts from '@/components/BlogPosts'

export const metadata: Metadata = {
  title: 'Blog - Guy Kastner',
  description: 'Articles about Microsoft technologies, PowerShell, development, and security.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  function slugify(str: string) {
    return str.toLowerCase().replace(/\s+/g, '-')
  }

  const tagCounts = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Blog Posts</h1>
          <p className="text-lg text-muted-foreground">
            Browse articles by tag:
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {Array.from(tagCounts.entries()).map(([tag, count]) => (
              <a
                key={tag}
                href={`/blog/tag/${slugify(tag)}`}
                className="inline-flex items-center px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <span className="text-sm font-medium">{tag}</span>
                <span className="ml-2 text-xs text-muted-foreground">({count})</span>
              </a>
            ))}
          </div>
        </header>
        <BlogPosts initialPosts={posts} />
      </div>
    </div>
  )
}
