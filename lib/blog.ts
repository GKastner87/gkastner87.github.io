// Types and interfaces
export interface Post {
  title: string
  description: string
  date: string
  category: Category
  slug: string
  content: string
}

// Standardized categories with descriptions
export const CATEGORIES = {
  'Azure': 'Cloud infrastructure, services, and Azure DevOps',
  'Intune': 'Device management, app deployment, and endpoint security',
  'PowerShell': 'Scripting, automation, and tooling',
  'Security': 'Cybersecurity and IT security',
} as const

export type Category = keyof typeof CATEGORIES

export function mapToStandardCategory(category: string): Category {
  const categoryMap: Record<string, Category> = {
    // Azure related
    'azure': 'Azure',
    'cloud': 'Azure',
    'devops': 'Azure',
    'infrastructure': 'Azure',
    'iac': 'Azure',
    'terraform': 'Azure',
    'arm': 'Azure',
    'bicep': 'Azure',
    
    // Intune related
    'intune': 'Intune',
    'endpoint': 'Intune',
    'mdm': 'Intune',
    'microsoft': 'Intune',
    'windows': 'Intune',
    '365': 'Intune',
    'm365': 'Intune',
    'office': 'Intune',
    'deployment': 'Intune',
    
    // PowerShell related
    'powershell': 'PowerShell',
    'script': 'PowerShell',
    'automation': 'PowerShell',
    'automate': 'PowerShell',
    'scripting': 'PowerShell',
    'development': 'PowerShell',
    'code': 'PowerShell',
    
    // Security related
    'security': 'Security',
    'cybersecurity': 'Security',
    'protection': 'Security',
    'defender': 'Security',
    'privacy': 'Security',
    'vulnerability': 'Security',
    'patch': 'Security',
    'zero-day': 'Security',
    'exploit': 'Security',
    'threat': 'Security'
  }

  const normalizedCategory = category.toLowerCase().trim()
  
  // If the exact category name matches one of our standard categories, use that
  if (normalizedCategory in CATEGORIES) {
    return normalizedCategory as Category
  }
  
  // Otherwise, look up in our mapping
  return categoryMap[normalizedCategory] || 'PowerShell'
} 