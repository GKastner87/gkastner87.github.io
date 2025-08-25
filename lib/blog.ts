// Types and interfaces
export interface Post {
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  slug: string
  content: string
}

// Standardized categories with descriptions
export const CATEGORIES = {
  'Azure': 'Cloud infrastructure, services, and Azure DevOps',
  'Intune': 'Device management, app deployment, and endpoint security',
  'PowerShell': 'Scripting, automation, and tooling',
  'Security': 'Cybersecurity and IT security',
  'Development': 'Software engineering, coding practices, and developer tools',
  'AWS': 'Amazon Web Services architecture and solutions',
} as const

export type Category = keyof typeof CATEGORIES

