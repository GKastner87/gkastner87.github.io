"use client"

import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
import SearchBox from "./SearchBox"
import { CATEGORIES } from "@/lib/blog"
import { useState } from "react"
import { Post } from "@/lib/blog"

interface HeaderProps {
  posts: Post[]
}

export default function Header({ posts }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Guy Kastner
            </Link>
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className="text-sm font-medium flex items-center hover:text-primary transition-colors"
              >
                Categories
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-background/80 backdrop-blur-sm ring-1 ring-border">
                  <div className="py-1">
                    {Object.entries(CATEGORIES).map(([category, description]) => (
                      <Link
                        key={category}
                        href={`/blog/category/${category.toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-muted hover:text-primary transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span className="block text-sm font-medium">{category}</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">{description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <SearchBox posts={posts} />
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <a
                href="https://www.buymeacoffee.com/guykastner"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-2 rounded-full bg-muted hover:bg-primary/20 transition-all duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 884 1279" fill="none" className="text-primary group-hover:text-primary">
                  <path d="M472.623 590.836C426.682 610.503 374.546 632.802 306.976 632.802C278.71 632.746 250.58 628.868 223.353 621.274L270.086 1101.08C271.74 1121.13 280.876 1139.83 295.679 1153.46C310.482 1167.09 329.87 1174.65 349.992 1174.65C349.992 1174.65 416.254 1178.09 438.365 1178.09C462.161 1178.09 533.516 1174.65 533.516 1174.65C553.636 1174.65 573.019 1167.08 587.819 1153.45C602.619 1139.82 611.752 1121.13 613.406 1101.08L663.459 570.876C641.091 563.237 618.516 558.161 593.068 558.161C549.054 558.144 513.591 573.303 472.623 590.836Z" fill="currentColor"/>
                </svg>
                <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[120px] transition-all duration-200 group-hover:ml-2 text-transparent group-hover:text-foreground text-sm font-medium">
                  Buy me a coffee
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 