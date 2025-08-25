import Link from 'next/link'
import { getAllPosts } from '@/lib/posts.server'

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-')
}

async function getAllTags() {
  const posts = await getAllPosts()
  const tags = new Map<string, string>()
  posts.forEach(post => {
    post.tags.forEach(tag => {
      const slug = slugify(tag)
      if (!tags.has(slug)) {
        tags.set(slug, tag)
      }
    })
  })
  return Array.from(tags.entries()).map(([slug, name]) => ({ slug, name }))
}

export const dynamic = 'error'

export default async function TagIndexPage() {
  const tags = await getAllTags()
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Tags</h1>
        </header>
        <ul className="space-y-2">
          {tags.map(({ slug, name }) => (
            <li key={slug}>
              <Link href={`/blog/tag/${slug}/`}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
