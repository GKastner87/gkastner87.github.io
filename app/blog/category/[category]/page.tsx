import { getAllPosts } from '@/lib/posts.server'
import { CATEGORIES, Category } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogPosts from '@/components/BlogPosts'

interface Props {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1) as Category
  if (!CATEGORIES[category]) return { title: 'Category Not Found' }

  return {
    title: `${category} Posts - Guy Kastner`,
    description: CATEGORIES[category],
  }
}

export default async function CategoryPage({ params }: Props) {
  const categoryKey = params.category.charAt(0).toUpperCase() + params.category.slice(1) as Category
  if (!CATEGORIES[categoryKey]) notFound()

  const posts = await getAllPosts()
  const categoryPosts = posts.filter(post => post.category === categoryKey)

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{categoryKey} Posts</h1>
          <p className="text-lg text-muted-foreground">
            {CATEGORIES[categoryKey]}
          </p>
        </header>
        <BlogPosts initialPosts={categoryPosts} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({
    category: category.toLowerCase(),
  }))
} 