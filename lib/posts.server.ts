import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { parseISO, isValid } from 'date-fns'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function isNonEmptyString(x: unknown): x is string {
  return typeof x === 'string' && x.trim().length > 0
}

function toISODate(input: unknown): string {
  if (typeof input === 'string') {
    const d = parseISO(input)
    return isValid(d) ? input : new Date(input).toISOString()
  }
  try {
    const d = new Date(input as any)
    return isValid(d as any) ? d.toISOString() : ''
  } catch {
    return ''
  }
}

export async function getAllPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))

  return files.map(file => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
    const { data, content } = matter(raw)

    const title = isNonEmptyString(data.title) ? data.title : file.replace(/\.(md|mdx)$/, '')
    const slug = isNonEmptyString(data.slug)
      ? data.slug
      : title.toLowerCase().replace(/\s+/g, '-')

    const date = toISODate(data.date) || ''
    const category = isNonEmptyString(data.category) ? data.category : 'Uncategorized'
    const tags = Array.isArray(data.tags) ? data.tags.map(String) : []

    return {
      ...data,
      title,
      slug,
      date,
      category,
      tags,
      content,
    }
  })
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts()
  return posts.find(p => p.slug === slug) || null
}


