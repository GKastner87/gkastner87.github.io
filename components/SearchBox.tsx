"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Post } from '@/lib/blog'

interface SearchBoxProps {
  posts: Post[]
}

export default function SearchBox({ posts }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Post[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([])
      return
    }

    const results = posts.filter(post => {
      const searchContent = `${post.title} ${post.description} ${post.category}`.toLowerCase()
      return searchContent.includes(searchTerm.toLowerCase())
    })

    setSearchResults(results)
  }, [searchTerm, posts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchResults.length > 0) {
      router.push(`/blog/${searchResults[0].slug}`)
      setSearchTerm('')
      setIsSearching(false)
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="search"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsSearching(true)
          }}
          onBlur={() => setTimeout(() => setIsSearching(false), 200)}
          onFocus={() => setIsSearching(true)}
          className="w-64 px-4 py-1 text-sm bg-background/50 rounded-full border border-border focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <svg 
          className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          onClick={handleSearch}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </form>

      {isSearching && searchResults.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 rounded-md shadow-lg bg-background/80 backdrop-blur-sm ring-1 ring-border max-h-96 overflow-auto">
          <div className="py-1">
            {searchResults.map(post => (
              <button
                key={post.slug}
                onClick={() => {
                  router.push(`/blog/${post.slug}`)
                  setSearchTerm('')
                  setIsSearching(false)
                }}
                className="block w-full text-left px-4 py-2 hover:bg-muted hover:text-primary transition-colors"
              >
                <span className="block text-sm font-medium">{post.title}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">{post.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 