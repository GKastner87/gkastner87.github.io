import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Me - Guy Kastner',
  description: 'Cloud Engineer specializing in Azure, Microsoft 365, and automation solutions.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Hey there, I'm Guy! 👋</h1>
          <p className="text-xl text-muted-foreground">
            Turning complex cloud tech into something simple, useful, and downright exciting.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-muted rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 !mt-0">What I Do 🚀</h2>
            <p>
              As a <strong>Cloud Engineer</strong>, I've spent over a decade living in the trenches of IT—solving problems, 
              building solutions, and making the digital world run smoother, one deployment at a time.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">My Expertise 💪</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Cloud & Infrastructure</h3>
                <ul className="space-y-2">
                  <li>Microsoft Azure</li>
                  <li>Microsoft 365</li>
                  <li>Infrastructure as Code</li>
                  <li>Cloud Security</li>
                </ul>
              </div>
              <div className="bg-muted rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Automation & DevOps</h3>
                <ul className="space-y-2">
                  <li>Scripting (PowerShell, Python)</li>
                  <li>Process Automation</li>
                  <li>DevOps Practices</li>
                  <li>Modern IT Solutions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Why This Blog Exists 🎯</h2>
            <p>
              This isn't just about me—it's about <strong>YOU</strong>. Whether you're just starting your tech career, 
              leveling up your skills, or looking for practical guides to make your life easier, this blog is your 
              <strong>go-to resource</strong>.
            </p>
            <p>
              I believe tech should be <strong>accessible</strong>. You don't need fancy jargon or a PhD in IT to 
              master cloud tools—you just need the right guide. That's what I'm here for.
            </p>
          </div>

          <div className="bg-muted rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 !mt-0">What You'll Find Here 📚</h2>
            <ul className="space-y-3">
              <li>Clear, beginner-friendly tutorials</li>
              <li>Practical scripting examples for automation</li>
              <li>Real-world projects and Azure how-tos</li>
              <li>No fluff, no nonsense—just actionable tech solutions</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-primary/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Let's Build Something Awesome! 🚀</h2>
            <p className="mb-6">
              Ready to turn those "What does that even mean?" moments into "I've totally got this!" wins?
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/blog"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Check Out My Blog
              </Link>
              <a 
                href="https://www.buymeacoffee.com/guykastner"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
              >
                Buy Me a Coffee ☕
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 