import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Post, mapToStandardCategory } from './blog'

export async function getPostFiles() {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  console.log('Looking for posts in:', postsDirectory)
  try {
    const files = fs.readdirSync(postsDirectory)
    console.log('Found files:', files)
    return files
  } catch (error) {
    console.error('Error reading posts directory:', error)
    return []
  }
}

function parsePostFilename(filename: string) {
  console.log('Parsing filename:', filename)
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/)
  if (!match) {
    console.log('Failed to parse filename:', filename)
    return null
  }
  
  const [, date, slug] = match
  return { date, slug: slug.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase() }
}

export async function getAllPosts(): Promise<Post[]> {
  console.log('Getting all posts...')
  const postFiles = await getPostFiles()
  
  const posts = postFiles
    .map(filename => {
      try {
        const fileInfo = parsePostFilename(filename)
        if (!fileInfo) return null

        const fullPath = path.join(process.cwd(), 'content/posts', filename)
        console.log('Reading file:', fullPath)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { content, data } = matter(fileContents)

        const standardCategory = mapToStandardCategory(data.category || '')
        console.log('Processed post:', filename, 'Category:', standardCategory)

        const post: Post = {
          title: data.title || fileInfo.slug,
          description: data.description || '',
          date: data.date || fileInfo.date,
          category: standardCategory,
          slug: fileInfo.slug,
          content
        }

        return post
      } catch (error) {
        console.error(`Error processing post ${filename}:`, error)
        return null
      }
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  console.log('Total posts found:', posts.length)
  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.category === category)
} 