import { getPostBySlug, getAllPosts } from '@/lib/posts.server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Markdown from 'markdown-to-jsx'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} - Guy Kastner`,
    description: post.description,
  }
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <article className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <time>{post.date}</time>
            <span>•</span>
            <span className="text-primary">{post.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground">{post.description}</p>
        </header>
        <div className="prose prose-lg dark:prose-invert max-w-none prose-pre:bg-muted prose-pre:text-muted-foreground prose-a:text-primary">
          <Markdown>{post.content}</Markdown>
        </div>
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
} 