import Link from 'next/link'
import { getAllPosts } from '@/lib/posts.server'

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-')
}

async function getAllCategories() {
  const posts = await getAllPosts()
  const categories = new Map<string, string>()
  posts.forEach(post => {
    const slug = slugify(post.category)
    if (!categories.has(slug)) {
      categories.set(slug, post.category)
    }
  })
  return Array.from(categories.entries()).map(([slug, name]) => ({ slug, name }))
}

export const dynamic = 'error'

export default async function CategoryIndexPage() {
  const categories = await getAllCategories()
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Categories</h1>
        </header>
        <ul className="space-y-2">
          {categories.map(({ slug, name }) => (
            <li key={slug}>
              <Link href={`/blog/category/${slug}/`}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
