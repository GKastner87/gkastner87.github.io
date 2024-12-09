import { getAllPosts } from '@/lib/posts.server'
import HeroSection from '@/components/HeroSection'

export default async function Home() {
  const posts = await getAllPosts()
  
  return (
    <main>
      <HeroSection posts={posts} />
    </main>
  )
} 