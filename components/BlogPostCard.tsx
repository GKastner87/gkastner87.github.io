import Link from "next/link"

interface BlogPostCardProps {
  title: string
  description: string
  date: string
  category: string
  slug: string
}

export default function BlogPostCard({
  title,
  description,
  date,
  category,
  slug,
}: BlogPostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="h-full">
      <article className="group relative rounded-lg border border-border bg-card h-full p-6 hover:bg-muted/50 transition-colors">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <time className="text-sm text-muted-foreground">{date}</time>
            <span className="text-border">•</span>
            <span className="text-sm font-medium text-primary">{category}</span>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h2>
            <p className="text-muted-foreground line-clamp-2">{description}</p>
          </div>
          <div className="flex items-center gap-2 text-primary mt-4">
            <span className="text-sm font-medium">Read More</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
} 