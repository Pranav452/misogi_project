import type { NormalizedStudent } from './supabase'

/**
 * Individual normalization functions for specific student patterns
 * Each function handles the unique format used by different students
 */

// Individual education parsers
export function parseEducationTathagat(educationText: string): NormalizedStudent['education'] {
  const entries: NormalizedStudent['education'] = []
  const lines = educationText.split('\n').filter(line => line.trim() && !line.includes('AI Engineering MisogiAI'))
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    
    if (trimmed.includes('Full Stack Web Development')) {
      entries.push({
        degree: 'Full Stack Web Development',
        field: 'Computer Science',
        institution: 'Masai School',
        year: '',
        grade: ''
      })
    } else if (trimmed.includes('B.E.') && trimmed.includes('Electrical')) {
      entries.push({
        degree: 'Bachelor of Engineering',
        field: 'Electrical & Electronics',
        institution: 'Visvesvaraya Technological University',
        year: '',
        grade: ''
      })
    }
  }
  return entries
}

export function parseEducationHenish(educationText: string): NormalizedStudent['education'] {
  const entries: NormalizedStudent['education'] = []
  const lines = educationText.split('\n').filter(line => line.trim() && !line.includes('AI Engineering MisogiAI'))
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    
    if (trimmed.includes('Master of Science') && trimmed.includes('Data Science')) {
      entries.push({
        degree: 'Master of Science',
        field: 'Data Science',
        institution: 'Indiana University Bloomington',
        year: '2021-2023',
        grade: ''
      })
    } else if (trimmed.includes('Bachelor of Engineering') && trimmed.includes('Electronics')) {
      entries.push({
        degree: 'Bachelor of Engineering',
        field: 'Electronics and Telecommunication',
        institution: 'University of Mumbai',
        year: '2015-2019',
        grade: ''
      })
    }
  }
  return entries
}

export function parseEducationMayank(educationText: string): NormalizedStudent['education'] {
  const entries: NormalizedStudent['education'] = []
  const lines = educationText.split('\n').filter(line => line.trim() && !line.includes('AI Engineering MisogiAI'))
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    
    if (trimmed.includes('MBA')) {
      entries.push({
        degree: 'MBA (IT)',
        field: 'Information Technology',
        institution: 'SGV University',
        year: '2021-2023',
        grade: ''
      })
    } else if (trimmed.includes('Java Backend Development')) {
      entries.push({
        degree: 'Java Backend Development',
        field: 'Computer Science',
        institution: 'Masai School',
        year: '2022-2023',
        grade: ''
      })
    } else if (trimmed.includes('Bachelor of Arts')) {
      entries.push({
        degree: 'Bachelor of Arts',
        field: 'Psychology',
        institution: 'University Of Rajasthan',
        year: '2016-2020',
        grade: ''
      })
    } else if (trimmed.includes('Diploma') && trimmed.includes('Mechanical')) {
      entries.push({
        degree: 'Diploma',
        field: 'Mechanical Engineering',
        institution: 'Govt. R. C. Khaitan Polytechnic College',
        year: '2015-2018',
        grade: ''
      })
    }
  }
  return entries
}

export function parseExperienceMayank(experienceText: string): NormalizedStudent['experience'] {
  const entries: NormalizedStudent['experience'] = []
  
  // Split by company blocks (double newlines or company name patterns)
  const sections = experienceText.split(/\n\n+/)
  
  for (const section of sections) {
    if (!section.trim()) continue
    
    const lines = section.split('\n').filter(line => line.trim())
    const entry: NormalizedStudent['experience'][0] = {
      role: '',
      company: '',
      duration: '',
      description: []
    }
    
    // First line usually contains company and date
    if (lines.length > 0) {
      const firstLine = lines[0].trim()
      
      // Pattern: "QuickTouch Technologies Ltd April 2023– July 2025"
      const companyDateMatch = firstLine.match(/^(.+?)\s+((?:\w+\s+\d{4}|[A-Z][a-z]+\s+\d{4}).*?)$/)
      if (companyDateMatch) {
        entry.company = companyDateMatch[1].trim()
        entry.duration = companyDateMatch[2].trim()
      }
    }
    
    // Second line usually contains role
    if (lines.length > 1) {
      const secondLine = lines[1].trim()
      if (!secondLine.startsWith('–') && !secondLine.startsWith('•')) {
        entry.role = secondLine.replace(/^(Software Engineer|Co-Founder|Sales Engineer).*/, '$1')
      }
    }
    
    // Collect bullet points as descriptions
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('–') || line.startsWith('•')) {
        entry.description.push(line.replace(/^[–•]\s*/, ''))
      }
    }
    
    // Handle specific cases for Mayank's format
    if (entry.company.includes('QuickTouch')) {
      entry.role = 'Software Engineer'
    } else if (entry.company.includes('SmartContact')) {
      entry.role = 'Co-Founder'
    } else if (entry.company.includes('GainWell')) {
      entry.role = 'Sales Engineer'
    }
    
    if (entry.company && entry.role) {
      entries.push(entry)
    }
  }
  
  return entries
}

export function parseExperiencePranav(experienceText: string): NormalizedStudent['experience'] {
  const entries: NormalizedStudent['experience'] = []
  
  // Split by lines and process each experience block
  const lines = experienceText.split('\n').filter(line => line.trim())
  let currentEntry: NormalizedStudent['experience'][0] | null = null
  
  for (const line of lines) {
    const trimmed = line.trim()
    
    // Pattern: "Front-End Developer, Scogo Networks – Mumbai, India Dec 2024 – Jun 2025"
    // More flexible pattern to capture role, company, and duration
    const roleCompanyMatch = trimmed.match(/^([^,]+),\s*([^–]+)\s*–\s*(.+)$/)
    if (roleCompanyMatch) {
      // Save previous entry
      if (currentEntry) {
        entries.push(currentEntry)
      }
      
      const role = roleCompanyMatch[1].trim()
      const company = roleCompanyMatch[2].trim()
      const locationAndDuration = roleCompanyMatch[3].trim()
      
      // Extract duration from location and duration string
      // Pattern: "Mumbai, India Dec 2024 – Jun 2025" or "Mumbai, India Apr-Sep 2024"
      const durationMatch = locationAndDuration.match(/(?:\w+,?\s+\w+\s+)?(.+)$/)
      const duration = durationMatch ? durationMatch[1].trim() : locationAndDuration
      
      currentEntry = {
        role: role,
        company: company,
        duration: duration,
        description: []
      }
    }
    // Collect bullet points
    else if (trimmed.startsWith('•') && currentEntry) {
      currentEntry.description.push(trimmed.replace(/^•\s*/, ''))
    }
  }
  
  // Add the last entry
  if (currentEntry) {
    entries.push(currentEntry)
  }
  
  return entries
}

// Individual experience parsers
export function parseExperienceTathagat(experienceText: string): NormalizedStudent['experience'] {
  const entries: NormalizedStudent['experience'] = []
  const lines = experienceText.split('\n').filter(line => line.trim())
  
  let currentEntry: NormalizedStudent['experience'][0] | null = null
  
  for (const line of lines) {
    const trimmed = line.trim()
    
    // Pattern: "1 ) Associate Software Engineer — Full Stack 09/2023–04/2025"
    const roleMatch = trimmed.match(/^\d+\s*\)\s*(.+?)\s*—\s*(.+?)\s+(\d{2}\/\d{4})[–—](\d{2}\/\d{4})/)
    if (roleMatch) {
      if (currentEntry) entries.push(currentEntry)
      currentEntry = {
        role: roleMatch[1].trim(),
        company: '',
        duration: `${roleMatch[3]}-${roleMatch[4]}`,
        description: []
      }
    }
    // Pattern: "Noesys Software Pvt Ltd  • Bengaluru, India"
    else if (trimmed.includes('Pvt Ltd') || trimmed.includes('Limited') || trimmed.includes('Inc')) {
      if (currentEntry) {
        const companyMatch = trimmed.match(/^([^•]+)/)
        if (companyMatch) {
          currentEntry.company = companyMatch[1].trim()
        }
      }
    }
  }
  
  if (currentEntry) entries.push(currentEntry)
  return entries
}

export function parseExperienceHenish(experienceText: string): NormalizedStudent['experience'] {
  const entries: NormalizedStudent['experience'] = []
  const sections = experienceText.split(/(?=\w+[\s\w]*\s+\|\s+\w+)/)
  
  for (const section of sections) {
    if (!section.trim()) continue
    
    const lines = section.split('\n').filter(line => line.trim())
    const entry: NormalizedStudent['experience'][0] = {
      role: '',
      company: '',
      duration: '',
      description: []
    }
    
    // First line usually contains role | company duration
    if (lines.length > 0) {
      const firstLine = lines[0].trim()
      const parts = firstLine.split('|')
      if (parts.length >= 2) {
        entry.role = parts[0].trim()
        entry.company = parts[1].trim()
      }
    }
    
    // Collect bullet points as descriptions
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('•') || line.startsWith('-')) {
        entry.description.push(line.replace(/^[•\-]\s*/, ''))
      }
    }
    
    if (entry.role && entry.company) {
      entries.push(entry)
    }
  }
  
  return entries
}

// Additional specific parsers
export function parseExperienceSrinivasan(experienceText: string): NormalizedStudent['experience'] {
  const entries: NormalizedStudent['experience'] = []
  const lines = experienceText.split('\n').filter(line => line.trim())
  let currentEntry: NormalizedStudent['experience'][0] | null = null
  
  for (const line of lines) {
    const trimmed = line.trim()
    
    // Pattern: "Founding Engineer (Frontend Web Developer) — GetAligned Jan 2024 – Jul 2025"
    // Simpler pattern to match role — company duration
    const roleCompanyMatch = trimmed.match(/^(.+?)\s*—\s*(.+?)\s+([A-Z][a-z]+\s+\d{4}\s*[–—-]\s*[A-Z][a-z]+\s+\d{4})/)
    if (roleCompanyMatch) {
      if (currentEntry) entries.push(currentEntry)
      
      currentEntry = {
        role: roleCompanyMatch[1].trim(),
        company: roleCompanyMatch[2].trim(),
        duration: roleCompanyMatch[3].trim(),
        description: []
      }
    }
    else if (trimmed.startsWith('•') && currentEntry) {
      currentEntry.description.push(trimmed.replace(/^•\s*/, ''))
    }
  }
  
  if (currentEntry) entries.push(currentEntry)
  return entries
}

export function parseExperienceHarshavardhan(experienceText: string): NormalizedStudent['experience'] {
  const entries: NormalizedStudent['experience'] = []
  const sections = experienceText.split(/\n\n+/)
  
  for (const section of sections) {
    if (!section.trim()) continue
    
    const lines = section.split('\n').filter(line => line.trim())
    const entry: NormalizedStudent['experience'][0] = {
      role: '',
      company: '',
      duration: '',
      description: []
    }
    
    if (lines.length > 0) {
      const firstLine = lines[0].trim()
      // Pattern: "ML Engineer, Cube Highways – Hyderabad Apr 2024 – May 2025"
      const match = firstLine.match(/^([^,]+),\s*([^–]+)\s*–\s*(.+)$/)
      if (match) {
        entry.role = match[1].trim()
        const companyLocation = match[2].trim()
        entry.company = companyLocation.split(' – ')[0] || companyLocation
        entry.duration = match[3].trim()
      }
    }
    
    // Collect descriptions
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('•')) {
        entry.description.push(line.replace(/^•\s*/, ''))
      }
    }
    
    if (entry.role && entry.company) {
      entries.push(entry)
    }
  }
  
  return entries
}

export function parseExperienceMohammad(experienceText: string): NormalizedStudent['experience'] {
  const entries: NormalizedStudent['experience'] = []
  const sections = experienceText.split(/\n\n+/)
  
  for (const section of sections) {
    if (!section.trim()) continue
    
    const lines = section.split('\n').filter(line => line.trim())
    const entry: NormalizedStudent['experience'][0] = {
      role: '',
      company: '',
      duration: '',
      description: []
    }
    
    // First line: "AI Engineer, Scogo Networks – Navi Mumbai, Maharashtra"
    // Second line: "Jan 2024 – June 2025"
    if (lines.length >= 2) {
      const firstLine = lines[0].trim()
      const secondLine = lines[1].trim()
      
      const roleCompanyMatch = firstLine.match(/^([^,]+),\s*(.+)$/)
      if (roleCompanyMatch) {
        entry.role = roleCompanyMatch[1].trim()
        entry.company = roleCompanyMatch[2].split(' – ')[0].trim()
        entry.duration = secondLine
      }
    }
    
    // Collect descriptions
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('•')) {
        entry.description.push(line.replace(/^•\s*/, ''))
      }
    }
    
    if (entry.role && entry.company) {
      entries.push(entry)
    }
  }
  
  return entries
}

export function parseExperienceHarishankar(experienceText: string): NormalizedStudent['experience'] {
  const entries: NormalizedStudent['experience'] = []
  const sections = experienceText.split(/\n\n+/)
  
  for (const section of sections) {
    if (!section.trim()) continue
    
    const lines = section.split('\n').filter(line => line.trim())
    const entry: NormalizedStudent['experience'][0] = {
      role: '',
      company: '',
      duration: '',
      description: []
    }
    
    if (lines.length >= 2) {
      const firstLine = lines[0].trim()
      const secondLine = lines[1].trim()
      
      // Pattern: "Deccan AI Mar 2024 – Apr 2025"
      // Extract company and duration from first line
      const companyDurationMatch = firstLine.match(/^(.+?)\s+([A-Z][a-z]+\s+\d{4}\s*[–—-]\s*[A-Z][a-z]+\s+\d{4})$/)
      if (companyDurationMatch) {
        entry.company = companyDurationMatch[1].trim()
        entry.duration = companyDurationMatch[2].trim()
        entry.role = secondLine
      } else {
        // Fallback: treat first line as company, second as role
        entry.company = firstLine
        entry.role = secondLine
      }
    }
    
    if (entry.company && entry.role) {
      entries.push(entry)
    }
  }
  
  return entries
}

export function parseExperienceLakshya(experienceText: string): NormalizedStudent['experience'] {
  const entries: NormalizedStudent['experience'] = []
  const lines = experienceText.split('\n').filter(line => line.trim())
  
  // For Lakshya's specific format: one main experience entry
  const entry: NormalizedStudent['experience'][0] = {
    role: '',
    company: '',
    duration: '',
    description: []
  }
  
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    
    // First line is company
    if (i === 0 && trimmed.includes('Organisation')) {
      entry.company = trimmed
    }
    // Second line is role
    else if (i === 1 && !trimmed.startsWith('◦')) {
      entry.role = trimmed
    }
    // Description points starting with ◦
    else if (trimmed.startsWith('◦')) {
      const cleanDesc = trimmed.replace(/^◦\s*/, '').replace(/^[^:]*:\s*/, '')
      if (cleanDesc) {
        entry.description.push(cleanDesc)
      }
    }
  }
  
  if (entry.company && entry.role) {
    entries.push(entry)
  }
  
  return entries
}

// Generic fallback parser
export function parseEducationGeneric(educationText: string): NormalizedStudent['education'] {
  const entries: NormalizedStudent['education'] = []
  const lines = educationText.split('\n').filter(line => line.trim() && !line.includes('AI Engineering MisogiAI'))
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    
    const entry: NormalizedStudent['education'][0] = {
      degree: '',
      field: '',
      institution: '',
      year: '',
      grade: ''
    }
    
    // Extract basic degree information
    if (trimmed.includes('B.Tech') || trimmed.includes('Bachelor of Technology')) {
      entry.degree = 'Bachelor of Technology'
      entry.field = 'Computer Science' // Default
    } else if (trimmed.includes('B.E') || trimmed.includes('Bachelor of Engineering')) {
      entry.degree = 'Bachelor of Engineering'
      entry.field = 'Computer Science' // Default
    } else if (trimmed.includes('Master') || trimmed.includes('M.Tech') || trimmed.includes('M.S')) {
      entry.degree = 'Master\'s Degree'
    } else if (trimmed.includes('MBA')) {
      entry.degree = 'MBA'
      entry.field = 'Business Administration'
    } else if (trimmed.includes('MCA')) {
      entry.degree = 'Master of Computer Applications'
      entry.field = 'Computer Applications'
    } else if (trimmed.includes('BCA')) {
      entry.degree = 'Bachelor of Computer Applications'
      entry.field = 'Computer Applications'
    } else {
      entry.degree = trimmed.split(',')[0].trim() || trimmed
    }
    
    // Extract institution
    const institutionMatch = trimmed.match(/(?:from|,|\s—\s)([^,\n]+(?:University|Institute|College|School)[^,\n]*)/i)
    if (institutionMatch) {
      entry.institution = institutionMatch[1].trim()
    }
    
    // Extract year
    const yearMatch = trimmed.match(/(\d{4})\s*[-–—]\s*(\d{4})/)
    if (yearMatch) {
      entry.year = `${yearMatch[1]}-${yearMatch[2]}`
    }
    
    if (entry.degree) {
      entries.push(entry)
    }
  }
  
  return entries
}

export function parseExperienceGeneric(experienceText: string): NormalizedStudent['experience'] {
  const entries: NormalizedStudent['experience'] = []
  const sections = experienceText.split(/\n\n+|\n(?=[A-Z][A-Za-z\s]+(?:Engineer|Developer|Manager|Analyst|Associate|Lead|Senior|Junior|Intern))/i)
  
  for (const section of sections) {
    if (!section.trim() || section.includes('N/A')) continue
    
    const lines = section.split('\n').filter(line => line.trim())
    const entry: NormalizedStudent['experience'][0] = {
      role: '',
      company: '',
      duration: '',
      description: []
    }
    
    // Parse role, company, and duration from various formats
    for (const line of lines) {
      const trimmed = line.trim()
      
      // Pattern: "Role — Company Duration"
      const roleCompanyMatch = trimmed.match(/^(.+?)\s*[—–-]\s*(.+?)\s+(\d{2}\/\d{4}[—–-]\d{2}\/\d{4}|\w+\s+\d{4}[—–-]\w+\s+\d{4})/)
      if (roleCompanyMatch) {
        entry.role = roleCompanyMatch[1].trim()
        entry.company = roleCompanyMatch[2].trim()
        entry.duration = roleCompanyMatch[3].trim()
        continue
      }
      
      // Pattern: "Company Role Duration"
      const companyRoleMatch = trimmed.match(/^([A-Z][A-Za-z\s]+(?:Ltd|Inc|Pvt|Technologies|Solutions|Systems))\s+(.+?)\s+(\d{2}\/\d{4}[—–-]\d{2}\/\d{4}|\w+\s+\d{4}[—–-]\w+\s+\d{4})/)
      if (companyRoleMatch) {
        entry.company = companyRoleMatch[1].trim()
        entry.role = companyRoleMatch[2].trim()
        entry.duration = companyRoleMatch[3].trim()
        continue
      }
      
      // Collect bullet points
      if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('◦')) {
        entry.description.push(trimmed.replace(/^[•\-◦]\s*/, ''))
      }
    }
    
    // If no structured parsing worked, use first line as role/company
    if (!entry.role && !entry.company && lines.length > 0) {
      const firstLine = lines[0].trim()
      const parts = firstLine.split(/[,—–-]/)
      if (parts.length >= 2) {
        entry.role = parts[0].trim()
        entry.company = parts[1].trim()
      } else {
        entry.role = firstLine
      }
    }
    
    if (entry.role || entry.company) {
      entries.push(entry)
    }
  }
  
  return entries
}

// Main dispatcher function
export function normalizeEducationByStudent(educationText: string, studentName: string): NormalizedStudent['education'] {
  const name = studentName.toLowerCase()
  
  if (name.includes('tathagat')) {
    return parseEducationTathagat(educationText)
  } else if (name.includes('henish')) {
    return parseEducationHenish(educationText)
  } else if (name.includes('mayank')) {
    return parseEducationMayank(educationText)
  } else {
    return parseEducationGeneric(educationText)
  }
}

export function normalizeExperienceByStudent(experienceText: string, studentName: string): NormalizedStudent['experience'] {
  const name = studentName.toLowerCase()
  
  if (name.includes('tathagat')) {
    return parseExperienceTathagat(experienceText)
  } else if (name.includes('henish')) {
    return parseExperienceHenish(experienceText)
  } else if (name.includes('mayank')) {
    return parseExperienceMayank(experienceText)
  } else if (name.includes('pranav')) {
    return parseExperiencePranav(experienceText)
  } else if (name.includes('srinivasan')) {
    return parseExperienceSrinivasan(experienceText)
  } else if (name.includes('harshavardhan') || name.includes('gaddam')) {
    return parseExperienceHarshavardhan(experienceText)
  } else if (name.includes('mohammad') || name.includes('mukhtar')) {
    return parseExperienceMohammad(experienceText)
  } else if (name.includes('harishankar')) {
    return parseExperienceHarishankar(experienceText)
  } else if (name.includes('lakshya')) {
    return parseExperienceLakshya(experienceText)
  } else {
    return parseExperienceGeneric(experienceText)
  }
}

