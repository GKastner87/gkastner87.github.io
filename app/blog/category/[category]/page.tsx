import { getAllPosts } from '@/lib/posts.server'
import { CATEGORIES } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogPosts from '@/components/BlogPosts'

interface Props {
  params: {
    category: string
  }
}

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryKey = Object.keys(CATEGORIES).find(
    (key) => slugify(key) === params.category
  )
  if (!categoryKey) return { title: 'Category Not Found' }

  return {
    title: `${categoryKey} Posts - Guy Kastner`,
    description: CATEGORIES[categoryKey as keyof typeof CATEGORIES],
  }
}

export default async function CategoryPage({ params }: Props) {
  const categorySlug = params.category
  const categoryKey = Object.keys(CATEGORIES).find(
    (key) => slugify(key) === categorySlug
  )
  if (!categoryKey) notFound()

  const posts = await getAllPosts()
  const categoryPosts = posts.filter(
    (post) => slugify(post.category) === categorySlug
  )

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{categoryKey} Posts</h1>
          <p className="text-lg text-muted-foreground">
            {CATEGORIES[categoryKey as keyof typeof CATEGORIES]}
          </p>
        </header>
        <BlogPosts initialPosts={categoryPosts} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const categories = Array.from(
    new Set(posts.map((post) => slugify(post.category)))
  )
  return categories.map((category) => ({ category }))
}