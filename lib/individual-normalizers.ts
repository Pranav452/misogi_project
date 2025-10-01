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

export function parseExperienceAkash(experienceText: string): NormalizedStudent['experience'] {
  const entries: NormalizedStudent['experience'] = []
  
  // Split by double newlines to separate different experience entries
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
    
    // Pattern: "Software Developer\nQuicktouch Technologies Limited\n05/2024 – 07/2025\nNew Delhi, Delhi"
    if (lines.length >= 4) {
      entry.role = lines[0].trim()
      entry.company = lines[1].trim()
      
      // Extract duration from the third line
      const durationMatch = lines[2].match(/(\d{2}\/\d{4})\s*[–—]\s*(\d{2}\/\d{4})/)
      if (durationMatch) {
        entry.duration = `${durationMatch[1]} - ${durationMatch[2]}`
      }
      
      // Location is on the fourth line
      // Collect bullet points starting from line 5 (if any)
      for (let i = 4; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line.startsWith('•')) {
          entry.description.push(line.replace(/^•\s*/, ''))
        } else if (line && !line.match(/^[A-Z][a-z]+,\s*[A-Z][a-z]+$/)) {
          // Add non-location lines as descriptions
          entry.description.push(line)
        }
      }
    }
    // Alternative pattern for simpler entries
    else if (lines.length >= 3) {
      entry.role = lines[0].trim()
      entry.company = lines[1].trim()
      
      // Check if third line is duration or location
      const thirdLine = lines[2].trim()
      const durationMatch = thirdLine.match(/(\d{2}\/\d{4})\s*[–—]\s*(\d{2}\/\d{4})/)
      if (durationMatch) {
        entry.duration = `${durationMatch[1]} - ${durationMatch[2]}`
      } else if (thirdLine.match(/^[A-Z][a-z]+,\s*[A-Z][a-z]+$/)) {
        // It's a location, look for duration in other lines
        for (let i = 3; i < lines.length; i++) {
          const durationMatch = lines[i].match(/(\d{2}\/\d{4})\s*[–—]\s*(\d{2}\/\d{4})/)
          if (durationMatch) {
            entry.duration = `${durationMatch[1]} - ${durationMatch[2]}`
            break
          }
        }
      }
      
      // Collect descriptions from remaining lines
      for (let i = 3; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line.startsWith('•')) {
          entry.description.push(line.replace(/^•\s*/, ''))
        } else if (line && !line.match(/^[A-Z][a-z]+,\s*[A-Z][a-z]+$/) && !line.match(/\d{2}\/\d{4}/)) {
          entry.description.push(line)
        }
      }
    }
    
    // Only add entry if we have essential information
    if (entry.role && entry.company) {
      entries.push(entry)
    }
  }
  
  return entries
}

export function parseSkillsAkash(skillsText: string): NormalizedStudent['skills'] {
  const skillsCategories: NormalizedStudent['skills'] = []
  
  // Split by lines and process each category
  const lines = skillsText.split('\n').filter(line => line.trim())
  
  for (const line of lines) {
    if (!line.trim()) continue
    
    // Pattern: "GenAI Frameworks, Libraries & Tools: LangChain, LangGraph, LangSmith..."
    const categoryMatch = line.match(/^(.+?):\s*(.+)$/)
    if (categoryMatch) {
      const category = categoryMatch[1].trim()
      const skillsString = categoryMatch[2].trim()
      
      // Split skills by comma and clean them
      const skills = skillsString.split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)
        .map(skill => {
          // Remove trailing periods and clean up
          skill = skill.replace(/[,;.]+$/, '')
          skill = skill.trim()
          
          // Handle special cases and normalize
          if (skill.toLowerCase().includes('javascript')) {
            return 'JavaScript'
          } else if (skill.toLowerCase().includes('typescript')) {
            return 'TypeScript'
          } else if (skill.toLowerCase().includes('next.js') || skill.toLowerCase().includes('nextjs')) {
            return 'Next.js'
          } else if (skill.toLowerCase().includes('react')) {
            return 'React'
          } else if (skill.toLowerCase().includes('python')) {
            return 'Python'
          } else if (skill.toLowerCase().includes('node.js') || skill.toLowerCase().includes('nodejs')) {
            return 'Node.js'
          } else if (skill.toLowerCase().includes('fastapi')) {
            return 'FastAPI'
          } else if (skill.toLowerCase().includes('express.js') || skill.toLowerCase().includes('expressjs')) {
            return 'Express.js'
          } else if (skill.toLowerCase().includes('postgresql')) {
            return 'PostgreSQL'
          } else if (skill.toLowerCase().includes('mongodb')) {
            return 'MongoDB'
          } else if (skill.toLowerCase().includes('redis')) {
            return 'Redis'
          } else if (skill.toLowerCase().includes('langchain')) {
            return 'LangChain'
          } else if (skill.toLowerCase().includes('langgraph')) {
            return 'LangGraph'
          } else if (skill.toLowerCase().includes('langsmith')) {
            return 'LangSmith'
          } else if (skill.toLowerCase().includes('hugging face')) {
            return 'Hugging Face'
          } else if (skill.toLowerCase().includes('tailwind')) {
            return 'Tailwind CSS'
          } else if (skill.toLowerCase().includes('material-ui')) {
            return 'Material-UI'
          } else if (skill.toLowerCase().includes('framer motion')) {
            return 'Framer Motion'
          } else if (skill.toLowerCase().includes('redux')) {
            return 'Redux'
          } else if (skill.toLowerCase().includes('zustand')) {
            return 'Zustand'
          } else if (skill.toLowerCase().includes('tanstack query') || skill.toLowerCase().includes('react query')) {
            return 'TanStack Query'
          } else if (skill.toLowerCase().includes('firebase')) {
            return 'Firebase'
          } else if (skill.toLowerCase().includes('pinecone')) {
            return 'Pinecone'
          } else if (skill.toLowerCase().includes('weaviate')) {
            return 'Weaviate'
          } else if (skill.toLowerCase().includes('chroma')) {
            return 'ChromaDB'
          } else if (skill.toLowerCase().includes('qdrant')) {
            return 'Qdrant'
          } else if (skill.toLowerCase().includes('git')) {
            return 'Git'
          } else if (skill.toLowerCase().includes('github')) {
            return 'GitHub'
          } else if (skill.toLowerCase().includes('docker')) {
            return 'Docker'
          } else if (skill.toLowerCase().includes('nginx')) {
            return 'Nginx'
          } else if (skill.toLowerCase().includes('aws')) {
            return 'AWS'
          } else if (skill.toLowerCase().includes('vercel')) {
            return 'Vercel'
          } else if (skill.toLowerCase().includes('netlify')) {
            return 'Netlify'
          } else if (skill.toLowerCase().includes('ollama')) {
            return 'Ollama'
          } else if (skill.toLowerCase().includes('lm studio')) {
            return 'LM Studio'
          }
          
          return skill
        })
        .filter(skill => skill.length > 0)
      
      if (skills.length > 0) {
        skillsCategories.push({
          category: category,
          items: skills
        })
      }
    }
  }
  
  return skillsCategories
}

export function parseExperienceSachin(experienceText: string): NormalizedStudent['experience'] {
  const entries: NormalizedStudent['experience'] = []
  
  // Split by double newlines to separate different experience entries
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
    
    // Pattern: "Full Stack Developer, Propeye Technologies Pvt. Ltd. - May 2023 - May 2025"
    if (lines.length > 0) {
      const firstLine = lines[0].trim()
      
      // Extract role, company, and duration from first line
      // Pattern: "Role, Company - Month Year - Month Year"
      const roleCompanyMatch = firstLine.match(/^([^,]+),\s*(.+?)\s*-\s*([A-Z][a-z]+\s+\d{4})\s*-\s*([A-Z][a-z]+\s+\d{4})$/)
      if (roleCompanyMatch) {
        entry.role = roleCompanyMatch[1].trim()
        entry.company = roleCompanyMatch[2].trim()
        entry.duration = `${roleCompanyMatch[3]} - ${roleCompanyMatch[4]}`
      } else {
        // Fallback: try simpler patterns
        const simpleMatch = firstLine.match(/^(.+?),\s*(.+?)\s*-\s*(.+)$/)
        if (simpleMatch) {
          entry.role = simpleMatch[1].trim()
          entry.company = simpleMatch[2].trim()
          entry.duration = simpleMatch[3].trim()
        } else {
          // If no pattern matches, treat entire first line as role/company
          entry.role = firstLine
        }
      }
    }
    
    // Collect bullet points as descriptions
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('•')) {
        entry.description.push(line.replace(/^•\s*/, ''))
      } else if (line && !line.match(/^[A-Z][a-z]+,\s*[A-Z]/)) {
        // Add non-role/company lines as descriptions
        entry.description.push(line)
      }
    }
    
    // Only add entry if we have essential information
    if (entry.role && entry.company) {
      entries.push(entry)
    }
  }
  
  return entries
}

export function parseEducationSachin(educationText: string): NormalizedStudent['education'] {
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
    
    // Pattern: "Sikkim Manipal University, Master of Computer Applications (MCA) -- Sep 2024 - Sep 2026"
    const universityMatch = trimmed.match(/^([^,]+),\s*(.+?)\s*--\s*(.+)$/)
    if (universityMatch) {
      entry.institution = universityMatch[1].trim()
      const degreeAndField = universityMatch[2].trim()
      const yearRange = universityMatch[3].trim()
      
      // Extract degree and field
      if (degreeAndField.includes('(') && degreeAndField.includes(')')) {
        const degreeMatch = degreeAndField.match(/^(.+?)\s*\((.+?)\)$/)
        if (degreeMatch) {
          entry.degree = degreeMatch[1].trim()
          entry.field = degreeMatch[2].trim()
        }
      } else {
        entry.degree = degreeAndField
      }
      
      // Extract year range
      entry.year = yearRange
    }
    // Pattern: "Masai School, Full Stack Web Development (MERN) -- July 2022 - Apr 2023"
    else if (trimmed.includes('Masai School')) {
      const masaiMatch = trimmed.match(/^([^,]+),\s*(.+?)\s*--\s*(.+)$/)
      if (masaiMatch) {
        entry.institution = masaiMatch[1].trim()
        const degreeAndField = masaiMatch[2].trim()
        const yearRange = masaiMatch[3].trim()
        
        if (degreeAndField.includes('(') && degreeAndField.includes(')')) {
          const degreeMatch = degreeAndField.match(/^(.+?)\s*\((.+?)\)$/)
          if (degreeMatch) {
            entry.degree = degreeMatch[1].trim()
            entry.field = degreeMatch[2].trim()
          }
        } else {
          entry.degree = degreeAndField
        }
        
        entry.year = yearRange
      }
    }
    // Pattern: "Kanpur University, Bachelor of Arts in Psychology -- Aug 2019 - July 2022"
    else if (trimmed.includes('Bachelor of Arts')) {
      const bachelorMatch = trimmed.match(/^([^,]+),\s*(.+?)\s*--\s*(.+)$/)
      if (bachelorMatch) {
        entry.institution = bachelorMatch[1].trim()
        const degreeAndField = bachelorMatch[2].trim()
        const yearRange = bachelorMatch[3].trim()
        
        // Extract field from "Bachelor of Arts in Psychology"
        const fieldMatch = degreeAndField.match(/^(.+?)\s+in\s+(.+)$/)
        if (fieldMatch) {
          entry.degree = fieldMatch[1].trim()
          entry.field = fieldMatch[2].trim()
        } else {
          entry.degree = degreeAndField
        }
        
        entry.year = yearRange
      }
    }
    
    if (entry.degree && entry.institution) {
      entries.push(entry)
    }
  }
  
  // Sort by education level (highest first)
  return entries.sort((a, b) => {
    const getEducationLevel = (degree: string) => {
      if (degree.toLowerCase().includes('master')) return 5
      if (degree.toLowerCase().includes('bachelor')) return 3
      if (degree.toLowerCase().includes('full stack') || degree.toLowerCase().includes('web development')) return 4
      return 1
    }
    return getEducationLevel(b.degree) - getEducationLevel(a.degree)
  })
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
  } else if (name.includes('sachin')) {
    return parseEducationSachin(educationText)
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
  } else if (name.includes('akash')) {
    return parseExperienceAkash(experienceText)
  } else if (name.includes('sachin')) {
    return parseExperienceSachin(experienceText)
  } else {
    return parseExperienceGeneric(experienceText)
  }
}

export function normalizeSkillsByStudent(skillsText: string, studentName: string): NormalizedStudent['skills'] {
  const name = studentName.toLowerCase()
  
  if (name.includes('akash')) {
    return parseSkillsAkash(skillsText)
  } else {
    // For now, use the generic skills parser for other students
    // This can be expanded later with other specific parsers
    // Import the generic skills parser from data-normalizer
    return parseSkillsGeneric(skillsText)
  }
}

// Generic skills parser (moved from data-normalizer for use in dispatcher)
export function parseSkillsGeneric(skillsText: string): NormalizedStudent['skills'] {
  if (!skillsText?.trim()) return []
  
  const skillsCategories: NormalizedStudent['skills'] = []
  
  // Split by lines and process each category
  const lines = skillsText.split('\n').filter(line => line.trim())
  
  for (const line of lines) {
    let category = 'General Skills'
    let skillsString = line
    
    // Extract category
    const categoryMatch = line.match(/^[•\-*]\s*(.+?)[:]/)
    if (categoryMatch) {
      category = categoryMatch[1].replace(/^[•\-*]\s*/, '').trim()
      skillsString = line.split(':')[1] || ''
    }
    
    if (!skillsString.trim()) continue
    
    // Split skills by various delimiters
    let skills = [skillsString]
    skills = skills.flatMap(skill => skill.split(/,\s*/))
    
    // Clean and normalize individual skills
    const normalizedSkills = skills
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0)
      .map(skill => {
        // Remove common prefixes/suffixes
        skill = skill.replace(/^[•\-*]\s*/, '')
        skill = skill.replace(/[,;.]+$/, '')
        skill = skill.trim()
        return skill
      })
      .filter(skill => skill.length > 1) // Remove single character skills
    
    if (normalizedSkills.length > 0) {
      skillsCategories.push({
        category,
        items: normalizedSkills
      })
    }
  }
  
  return skillsCategories
}

