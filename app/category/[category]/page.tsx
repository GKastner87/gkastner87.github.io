import { getAllPosts } from '@/lib/posts.server'
import type { Metadata } from 'next'

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-')
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const target = `/blog/category/${params.category}/`
  return {
    refresh: `0;url=${target}`,
  }
}

export default function LegacyCategoryRedirect({ params }: { params: { category: string } }) {
  const target = `/blog/category/${params.category}/`
  return (
    <p>
      Redirecting to <a href={target}>{target}</a>...
      <script dangerouslySetInnerHTML={{ __html: `window.location.href='${target}'` }} />
    </p>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const categories = Array.from(new Set(posts.map(post => slugify(post.category))))
  return categories.map(category => ({ category }))
}
