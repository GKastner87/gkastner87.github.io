import { getAllPosts } from '@/lib/posts.server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogPosts from '@/components/BlogPosts'

interface Props {
  params: {
    tag: string
  }
}

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const posts = await getAllPosts()
  const tagName = posts
    .flatMap(p => p.tags)
    .find(t => slugify(t) === params.tag)
  if (!tagName) return { title: 'Tag Not Found' }
  return {
    title: `${tagName} Posts - Guy Kastner`,
    description: `Posts tagged ${tagName}`,
  }
}

export default async function TagPage({ params }: Props) {
  const tagSlug = params.tag
  const posts = await getAllPosts()
  const tagPosts = posts.filter(p =>
    p.tags.some(t => slugify(t) === tagSlug)
  )
  if (tagPosts.length === 0) notFound()
  const tagName = tagPosts[0].tags.find(t => slugify(t) === tagSlug) || tagSlug
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{tagName} Posts</h1>
        </header>
        <BlogPosts initialPosts={tagPosts} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const tags = new Set<string>()
  for (const p of posts) {
    p.tags.forEach(tag => tags.add(slugify(tag)))
  }
  return Array.from(tags).map(tag => ({ tag }))
}

