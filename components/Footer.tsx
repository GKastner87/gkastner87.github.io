export default function Footer() {
  return (
    <footer className="border-t bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Guy Kastner. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
} 