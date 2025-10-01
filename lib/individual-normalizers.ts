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

export function parseExperienceLokesh(experienceText: string): NormalizedStudent['experience'] {
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
    
    // Pattern: "Full Stack Development Intern ~ BrainoVision"
    if (lines.length > 0) {
      const firstLine = lines[0].trim()
      
      // Extract role and company from first line
      // Pattern: "Role ~ Company"
      const roleCompanyMatch = firstLine.match(/^(.+?)\s*~\s*(.+)$/)
      if (roleCompanyMatch) {
        entry.role = roleCompanyMatch[1].trim()
        entry.company = roleCompanyMatch[2].trim()
      } else {
        // Fallback: treat entire first line as role if no company separator found
        entry.role = firstLine
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

export function parseEducationLokesh(educationText: string): NormalizedStudent['education'] {
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
    
    // Pattern: "Vasireddy Venkatadri Institute of Technology B.Tech in Computer Science Engineering (AI/ML)"
    const universityMatch = trimmed.match(/^([^B]+?)\s+B\.Tech\s+in\s+(.+?)(?:\s+\d{4}|\s*$)/i)
    if (universityMatch) {
      entry.institution = universityMatch[1].trim()
      const field = universityMatch[2].trim()
      
      // Extract degree and field
      entry.degree = 'Bachelor of Technology'
      
      // Clean up field name
      if (field.includes('(') && field.includes(')')) {
        const fieldMatch = field.match(/^(.+?)\s*\((.+?)\)$/)
        if (fieldMatch) {
          entry.field = `${fieldMatch[1].trim()} (${fieldMatch[2].trim()})`
        } else {
          entry.field = field
        }
      } else {
        entry.field = field
      }
      
      // Extract year if present
      const yearMatch = trimmed.match(/(\d{4})\s*[-–—]\s*(\d{4})/)
      if (yearMatch) {
        entry.year = `${yearMatch[1]}-${yearMatch[2]}`
      }
    }
    
    if (entry.degree && entry.institution) {
      entries.push(entry)
    }
  }
  
  return entries
}

export function parseSkillsLokesh(skillsText: string): NormalizedStudent['skills'] {
  const skillsCategories: NormalizedStudent['skills'] = []
  
  // Split by lines and process each category
  const lines = skillsText.split('\n').filter(line => line.trim())
  
  for (const line of lines) {
    if (!line.trim()) continue
    
    // Pattern: "Gen AI — AI Agents, n8n, LangChain, LangGraph, CrewAI"
    const categoryMatch = line.match(/^(.+?)\s*—\s*(.+)$/)
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
          if (skill.toLowerCase().includes('ai agents')) {
            return 'AI Agents'
          } else if (skill.toLowerCase().includes('n8n')) {
            return 'n8n'
          } else if (skill.toLowerCase().includes('langchain')) {
            return 'LangChain'
          } else if (skill.toLowerCase().includes('langgraph')) {
            return 'LangGraph'
          } else if (skill.toLowerCase().includes('crewai')) {
            return 'CrewAI'
          } else if (skill.toLowerCase().includes('rag')) {
            return 'RAG'
          } else if (skill.toLowerCase().includes('transformers')) {
            return 'Transformers'
          } else if (skill.toLowerCase().includes('unsloth')) {
            return 'Unsloth'
          } else if (skill.toLowerCase().includes('machine learning')) {
            return 'Machine Learning'
          } else if (skill.toLowerCase().includes('supervised')) {
            return 'Supervised Learning'
          } else if (skill.toLowerCase().includes('unsupervised')) {
            return 'Unsupervised Learning'
          } else if (skill.toLowerCase().includes('deep learning')) {
            return 'Deep Learning'
          } else if (skill.toLowerCase().includes('data structures')) {
            return 'Data Structures'
          } else if (skill.toLowerCase().includes('algorithms')) {
            return 'Algorithms'
          } else if (skill.toLowerCase().includes('tcp/ip')) {
            return 'TCP/IP'
          } else if (skill.toLowerCase().includes('networking')) {
            return 'Computer Networks'
          } else if (skill.toLowerCase().includes('operating systems')) {
            return 'Operating Systems'
          } else if (skill.toLowerCase().includes('oop')) {
            return 'Object-Oriented Programming'
          } else if (skill.toLowerCase().includes('mysql')) {
            return 'MySQL'
          } else if (skill.toLowerCase().includes('sql')) {
            return 'SQL'
          } else if (skill.toLowerCase().includes('redis')) {
            return 'Redis'
          } else if (skill.toLowerCase().includes('graphdb')) {
            return 'GraphDB'
          } else if (skill.toLowerCase().includes('python')) {
            return 'Python'
          } else if (skill.toLowerCase().includes('react')) {
            return 'React'
          } else if (skill.toLowerCase().includes('fastapi')) {
            return 'FastAPI'
          } else if (skill.toLowerCase().includes('pydantic')) {
            return 'Pydantic'
          } else if (skill.toLowerCase().includes('streamlit')) {
            return 'Streamlit'
          } else if (skill.toLowerCase().includes('docker')) {
            return 'Docker'
          } else if (skill.toLowerCase().includes('aws')) {
            return 'AWS'
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

export function parseExperienceHarishankar(experienceText: string): NormalizedStudent['experience'] {
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
    
    // Pattern: "Deccan AI Mar 2024 – Apr 2025\nAI Prompt Engineer Freelance"
    if (lines.length >= 2) {
      const firstLine = lines[0].trim()
      const secondLine = lines[1].trim()
      
      // Extract company and duration from first line
      // Pattern: "Company Mar 2024 – Apr 2025"
      const companyDurationMatch = firstLine.match(/^(.+?)\s+([A-Z][a-z]+\s+\d{4})\s*[–—]\s*([A-Z][a-z]+\s+\d{4})$/)
      if (companyDurationMatch) {
        entry.company = companyDurationMatch[1].trim()
        entry.duration = `${companyDurationMatch[2]} - ${companyDurationMatch[3]}`
        
        // Extract role and location from second line
        // Pattern: "Role Location" or just "Role"
        const roleLocationMatch = secondLine.match(/^(.+?)\s+(.+)$/)
        if (roleLocationMatch) {
          entry.role = roleLocationMatch[1].trim()
          // Location is in roleLocationMatch[2], but we don't store it separately
        } else {
          entry.role = secondLine.trim()
        }
      } else {
        // Fallback: try to extract from second line if first line doesn't match
        // Pattern: "Qubrid AI Jul 2023 – Jan 2024\nQuantum Researcher & Developer Remote, India"
        const companyMatch = firstLine.match(/^(.+?)\s+([A-Z][a-z]+\s+\d{4})\s*[–—]\s*([A-Z][a-z]+\s+\d{4})$/)
        if (companyMatch) {
          entry.company = companyMatch[1].trim()
          entry.duration = `${companyMatch[2]} - ${companyMatch[3]}`
          
          // Extract role from second line
          const roleMatch = secondLine.match(/^(.+?)(?:\s+Remote,\s*India|\s+Freelance|$)/)
          if (roleMatch) {
            entry.role = roleMatch[1].trim()
          } else {
            entry.role = secondLine.trim()
          }
        } else {
          // Last resort: treat first line as company, second as role
          entry.company = firstLine.trim()
          entry.role = secondLine.trim()
        }
      }
    }
    
    // Collect bullet points from remaining lines
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('•')) {
        entry.description.push(line.replace(/^•\s*/, ''))
      } else if (line && !line.match(/^[A-Z][a-z]+\s+\d{4}/) && !line.match(/^[A-Z][a-z]+,\s*[A-Z][a-z]+$/)) {
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

export function parseEducationHarishankar(educationText: string): NormalizedStudent['education'] {
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
    
    // Pattern: "B.Tech Computer Science Engineering, SRM IST, Chennai"
    const universityMatch = trimmed.match(/^B\.Tech\s+(.+?),\s*([^,]+),\s*(.+)$/i)
    if (universityMatch) {
      entry.degree = 'Bachelor of Technology'
      entry.field = universityMatch[1].trim()
      entry.institution = universityMatch[2].trim()
      // Location is in the third group but we don't store it separately
    } else {
      // Fallback: try to extract basic B.Tech info
      const btechMatch = trimmed.match(/^B\.Tech\s+(.+?)(?:\s+from|\s*,|\s*$)/i)
      if (btechMatch) {
        entry.degree = 'Bachelor of Technology'
        entry.field = btechMatch[1].trim()
        
        // Try to extract institution
        const institutionMatch = trimmed.match(/(?:from|,)\s*([^,\n]+?)(?:\s*,\s*[A-Z][a-z]+|\s*$)/i)
        if (institutionMatch) {
          entry.institution = institutionMatch[1].trim()
        }
      }
    }
    
    // Extract year if present
    const yearMatch = trimmed.match(/(\d{4})\s*[-–—]\s*(\d{4})/)
    if (yearMatch) {
      entry.year = `${yearMatch[1]}-${yearMatch[2]}`
    }
    
    if (entry.degree && entry.institution) {
      entries.push(entry)
    }
  }
  
  return entries
}

export function parseExperienceAmol(experienceText: string): NormalizedStudent['experience'] {
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
    
    // Pattern: "Frontend Developer, Gameopedia Data Solutions Pvt. Ltd. (Mar 2022– Mar 2025)"
    if (lines.length > 0) {
      const firstLine = lines[0].trim()
      
      // Extract role, company, and duration from first line
      // Pattern: "Role, Company (Duration)"
      const roleCompanyMatch = firstLine.match(/^([^,]+),\s*(.+?)\s*\(([^)]+)\)$/)
      if (roleCompanyMatch) {
        entry.role = roleCompanyMatch[1].trim()
        entry.company = roleCompanyMatch[2].trim()
        entry.duration = roleCompanyMatch[3].trim()
      } else {
        // Fallback: try simpler patterns
        const simpleMatch = firstLine.match(/^(.+?),\s*(.+?)\s*\((.+)\)$/)
        if (simpleMatch) {
          entry.role = simpleMatch[1].trim()
          entry.company = simpleMatch[2].trim()
          entry.duration = simpleMatch[3].trim()
        } else {
          // If no parentheses found, treat as role/company without duration
          const roleCompanySimple = firstLine.match(/^(.+?),\s*(.+)$/)
          if (roleCompanySimple) {
            entry.role = roleCompanySimple[1].trim()
            entry.company = roleCompanySimple[2].trim()
          } else {
            entry.role = firstLine.trim()
          }
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

export function parseEducationAmol(educationText: string): NormalizedStudent['education'] {
  const entries: NormalizedStudent['education'] = []
  
  // Split by lines and filter out AI Engineering MisogiAI entries
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
    
    // Pattern: "Bachelor Of Engineering in Electrical"
    const engineeringMatch = trimmed.match(/^Bachelor\s+Of\s+Engineering\s+in\s+(.+)$/i)
    if (engineeringMatch) {
      entry.degree = 'Bachelor of Engineering'
      entry.field = engineeringMatch[1].trim()
      
      // Try to extract institution if present (look for "from" or comma)
      const institutionMatch = trimmed.match(/(?:from|,)\s*([^,\n]+(?:University|Institute|College|School|University)[^,\n]*)/i)
      if (institutionMatch) {
        entry.institution = institutionMatch[1].trim()
      }
      
      // Extract year if present
      const yearMatch = trimmed.match(/(\d{4})\s*[-–—]\s*(\d{4})/)
      if (yearMatch) {
        entry.year = `${yearMatch[1]}-${yearMatch[2]}`
      }
    }
    // Alternative pattern for B.E variations
    else if (trimmed.includes('B.E') || trimmed.includes('Bachelor of Engineering') || trimmed.includes('Bachelor Of Engineering')) {
      entry.degree = 'Bachelor of Engineering'
      
      // Try to extract field
      const fieldMatch = trimmed.match(/(?:in|of)\s+(.+?)(?:\s+from|\s*,|\s*$)/i)
      if (fieldMatch) {
        entry.field = fieldMatch[1].trim()
      } else {
        entry.field = 'Engineering' // Default
      }
      
      // Try to extract institution
      const institutionMatch = trimmed.match(/(?:from|,)\s*([^,\n]+(?:University|Institute|College|School)[^,\n]*)/i)
      if (institutionMatch) {
        entry.institution = institutionMatch[1].trim()
      }
      
      // Extract year if present
      const yearMatch = trimmed.match(/(\d{4})\s*[-–—]\s*(\d{4})/)
      if (yearMatch) {
        entry.year = `${yearMatch[1]}-${yearMatch[2]}`
      }
    }
    // Handle cases where the degree might be on a line by itself
    else if (trimmed.match(/^Bachelor\s+Of\s+Engineering/i)) {
      entry.degree = 'Bachelor of Engineering'
      entry.field = 'Electrical' // Default field based on the data provided
    }
    
    // Only add entry if we have at least a degree
    if (entry.degree) {
      entries.push(entry)
    }
  }
  
  // If no entries found, try a more flexible approach
  if (entries.length === 0) {
    const allLines = educationText.split('\n').filter(line => line.trim())
    for (const line of allLines) {
      const trimmed = line.trim()
      
      // Look for any B.E or Bachelor of Engineering reference
      if (trimmed.match(/Bachelor.*Engineering/i) && !trimmed.includes('AI Engineering MisogiAI')) {
        const entry: NormalizedStudent['education'][0] = {
          degree: 'Bachelor of Engineering',
          field: 'Electrical',
          institution: '',
          year: '',
          grade: ''
        }
        
        // Try to extract field
        const fieldMatch = trimmed.match(/in\s+(\w+)/i)
        if (fieldMatch) {
          entry.field = fieldMatch[1].trim()
        }
        
        entries.push(entry)
        break // Only add one entry
      }
    }
  }
  
  return entries
}

export function parseExperienceAbhijeet(experienceText: string): NormalizedStudent['experience'] {
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
    
    // Pattern: "Blowhorn: Member of Technical Staff April 2022 – July 2025"
    if (lines.length > 0) {
      const firstLine = lines[0].trim()
      
      // Extract company, role, and duration from first line
      // Pattern: "Company: Role Duration"
      const companyRoleMatch = firstLine.match(/^([^:]+):\s*(.+?)\s+([A-Z][a-z]+\s+\d{4})\s*[–—]\s*([A-Z][a-z]+\s+\d{4})$/)
      if (companyRoleMatch) {
        entry.company = companyRoleMatch[1].trim()
        entry.role = companyRoleMatch[2].trim()
        entry.duration = `${companyRoleMatch[3]} - ${companyRoleMatch[4]}`
      } else {
        // Fallback: try simpler patterns
        const simpleMatch = firstLine.match(/^([^:]+):\s*(.+?)\s+(.+)$/)
        if (simpleMatch) {
          entry.company = simpleMatch[1].trim()
          entry.role = simpleMatch[2].trim()
          entry.duration = simpleMatch[3].trim()
        } else {
          // If no colon found, try other patterns
          const noColonMatch = firstLine.match(/^(.+?)\s+(.+?)\s+([A-Z][a-z]+\s+\d{4})\s*[–—]\s*([A-Z][a-z]+\s+\d{4})$/)
          if (noColonMatch) {
            entry.company = noColonMatch[1].trim()
            entry.role = noColonMatch[2].trim()
            entry.duration = `${noColonMatch[3]} - ${noColonMatch[4]}`
          } else {
            // Last resort: treat as role/company without duration
            entry.role = firstLine.trim()
          }
        }
      }
    }
    
    // Collect bullet points and tech stack as descriptions
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('•')) {
        entry.description.push(line.replace(/^•\s*/, ''))
      } else if (line.startsWith('Tech Stack:')) {
        // Add tech stack as a description
        entry.description.push(line)
      } else if (line && !line.match(/^[A-Z][a-z]+\s+\d{4}/)) {
        // Add other non-duration lines as descriptions
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

export function parseExperienceMisal(experienceText: string): NormalizedStudent['experience'] {
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
    
    // Pattern: "PhdTech Software – Software Developer (Remote)\nFeb 2023 – Jul 2025"
    if (lines.length >= 2) {
      const firstLine = lines[0].trim()
      const secondLine = lines[1].trim()
      
      // Extract company and role from first line
      // Pattern: "Company – Role (Location)"
      const companyRoleMatch = firstLine.match(/^(.+?)\s*–\s*(.+?)\s*\((.+?)\)$/)
      if (companyRoleMatch) {
        entry.company = companyRoleMatch[1].trim()
        entry.role = companyRoleMatch[2].trim()
        // Location is in companyRoleMatch[3], but we don't store it separately
      } else {
        // Fallback: try without parentheses
        const simpleMatch = firstLine.match(/^(.+?)\s*–\s*(.+)$/)
        if (simpleMatch) {
          entry.company = simpleMatch[1].trim()
          entry.role = simpleMatch[2].trim()
        } else {
          // Last resort: treat first line as company/role
          entry.company = firstLine.trim()
        }
      }
      
      // Extract duration from second line
      const durationMatch = secondLine.match(/([A-Z][a-z]+\s+\d{4})\s*[–—]\s*([A-Z][a-z]+\s+\d{4})/)
      if (durationMatch) {
        entry.duration = `${durationMatch[1]} - ${durationMatch[2]}`
      }
    }
    // Alternative pattern for single line entries
    else if (lines.length === 1) {
      const line = lines[0].trim()
      
      // Try to extract company, role, and duration from single line
      const fullMatch = line.match(/^(.+?)\s*–\s*(.+?)\s+([A-Z][a-z]+\s+\d{4})\s*[–—]\s*([A-Z][a-z]+\s+\d{4})$/)
      if (fullMatch) {
        entry.company = fullMatch[1].trim()
        entry.role = fullMatch[2].trim()
        entry.duration = `${fullMatch[3]} - ${fullMatch[4]}`
      }
    }
    
    // Collect bullet points as descriptions
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line && !line.match(/^[A-Z][a-z]+\s+\d{4}/)) {
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

export function parseEducationMisal(educationText: string): NormalizedStudent['education'] {
  const entries: NormalizedStudent['education'] = []
  
  // Split by lines and filter out AI Engineering MisogiAI entries
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
    
    // Pattern: "TimesPro Post Graduate Diploma in Banking Management New Delhi Feb 2017 – Jul 2017"
    const diplomaMatch = trimmed.match(/^(.+?)\s+Post\s+Graduate\s+Diploma\s+in\s+(.+?)\s+([^,]+?)\s+([A-Z][a-z]+\s+\d{4})\s*[–—]\s*([A-Z][a-z]+\s+\d{4})$/)
    if (diplomaMatch) {
      entry.institution = diplomaMatch[1].trim()
      entry.degree = 'Post Graduate Diploma'
      entry.field = diplomaMatch[2].trim()
      // Location is in diplomaMatch[3], but we don't store it separately
      entry.year = `${diplomaMatch[4]} - ${diplomaMatch[5]}`
    }
    // Pattern: "Central Board of Irrigation and Power – PG Diploma in Thermal Power Plant Engineering New Delhi Oct 2014 – Sep 2015"
    else if (trimmed.includes('PG Diploma')) {
      const pgDiplomaMatch = trimmed.match(/^(.+?)\s*–\s*PG\s+Diploma\s+in\s+(.+?)\s+([^,]+?)\s+([A-Z][a-z]+\s+\d{4})\s*[–—]\s*([A-Z][a-z]+\s+\d{4})$/)
      if (pgDiplomaMatch) {
        entry.institution = pgDiplomaMatch[1].trim()
        entry.degree = 'PG Diploma'
        entry.field = pgDiplomaMatch[2].trim()
        entry.year = `${pgDiplomaMatch[4]} - ${pgDiplomaMatch[5]}`
      }
    }
    // Pattern: "Regional College for Education, Research and Technology – B.Tech in Electrical Engineering Jaipur, Rajasthan Jun 2008 – Jun 2012"
    else if (trimmed.includes('B.Tech')) {
      const btechMatch = trimmed.match(/^(.+?)\s*–\s*B\.Tech\s+in\s+(.+?)\s+([^,]+?),\s*([^,]+?)\s+([A-Z][a-z]+\s+\d{4})\s*[–—]\s*([A-Z][a-z]+\s+\d{4})$/)
      if (btechMatch) {
        entry.institution = btechMatch[1].trim()
        entry.degree = 'Bachelor of Technology'
        entry.field = btechMatch[2].trim()
        // Location is in btechMatch[3] and btechMatch[4], but we don't store it separately
        entry.year = `${btechMatch[5]} - ${btechMatch[6]}`
      }
    }
    // Fallback patterns for simpler formats
    else if (trimmed.includes('B.Tech') || trimmed.includes('Bachelor of Technology')) {
      entry.degree = 'Bachelor of Technology'
      
      // Try to extract field
      const fieldMatch = trimmed.match(/in\s+(.+?)(?:\s+from|\s*,|\s*$)/i)
      if (fieldMatch) {
        entry.field = fieldMatch[1].trim()
      } else {
        entry.field = 'Engineering' // Default
      }
      
      // Try to extract institution
      const institutionMatch = trimmed.match(/^(.+?)\s*[–-]\s*/)
      if (institutionMatch) {
        entry.institution = institutionMatch[1].trim()
      }
      
      // Extract year if present
      const yearMatch = trimmed.match(/(\d{4})\s*[-–—]\s*(\d{4})/)
      if (yearMatch) {
        entry.year = `${yearMatch[1]}-${yearMatch[2]}`
      }
    }
    
    // Only add entry if we have essential information
    if (entry.degree && (entry.field || entry.institution)) {
      entries.push(entry)
    }
  }
  
  // Sort by education level (highest first)
  return entries.sort((a, b) => {
    const getEducationLevel = (degree: string) => {
      if (degree.toLowerCase().includes('phd')) return 6
      if (degree.toLowerCase().includes('post graduate') || degree.toLowerCase().includes('pg diploma')) return 5
      if (degree.toLowerCase().includes('master')) return 4
      if (degree.toLowerCase().includes('bachelor') || degree.toLowerCase().includes('b.tech')) return 3
      if (degree.toLowerCase().includes('diploma')) return 2
      return 1
    }
    return getEducationLevel(b.degree) - getEducationLevel(a.degree)
  })
}

export function parseExperienceArvind(experienceText: string): NormalizedStudent['experience'] {
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
    
    // Pattern: "TechAeroes Sofware Trainer \nDeveloped curriculum for AI and Programming Languages\nMar 2024 - Jun 2024"
    if (lines.length >= 3) {
      const firstLine = lines[0].trim()
      const secondLine = lines[1].trim()
      const thirdLine = lines[2].trim()
      
      // Extract company and role from first line
      // Pattern: "TechAeroes Sofware Trainer"
      const companyRoleMatch = firstLine.match(/^(.+?)\s+(.+)$/)
      if (companyRoleMatch) {
        entry.company = companyRoleMatch[1].trim()
        entry.role = companyRoleMatch[2].trim()
      } else {
        // Fallback: treat first line as company/role
        entry.company = firstLine.trim()
      }
      
      // Second line is description
      if (secondLine && !secondLine.match(/^[A-Z][a-z]+\s+\d{4}/)) {
        entry.description.push(secondLine)
      }
      
      // Extract duration from third line
      const durationMatch = thirdLine.match(/([A-Z][a-z]+\s+\d{4})\s*-\s*([A-Z][a-z]+\s+\d{4})/)
      if (durationMatch) {
        entry.duration = `${durationMatch[1]} - ${durationMatch[2]}`
      }
    }
    // Alternative pattern: "Techaeroes - Software Trainer  Mar 2024 - may 2024"
    else if (lines.length > 0) {
      const firstLine = lines[0].trim()
      
      // Extract company, role, and duration from first line
      // Pattern: "Company - Role Duration"
      const companyRoleMatch = firstLine.match(/^(.+?)\s*-\s*(.+?)\s+([A-Z][a-z]+\s+\d{4})\s*-\s*([a-z]+\s+\d{4})$/)
      if (companyRoleMatch) {
        entry.company = companyRoleMatch[1].trim()
        entry.role = companyRoleMatch[2].trim()
        entry.duration = `${companyRoleMatch[3]} - ${companyRoleMatch[4]}`
      } else {
        // Fallback: try with case-insensitive month matching
        const fallbackMatch = firstLine.match(/^(.+?)\s*-\s*(.+?)\s+([A-Z][a-z]+\s+\d{4})\s*-\s*([A-Z][a-z]+\s+\d{4})$/)
        if (fallbackMatch) {
          entry.company = fallbackMatch[1].trim()
          entry.role = fallbackMatch[2].trim()
          entry.duration = `${fallbackMatch[3]} - ${fallbackMatch[4]}`
        } else {
          // Try simpler pattern
          const simpleMatch = firstLine.match(/^(.+?)\s*-\s*(.+?)\s+(.+)$/)
          if (simpleMatch) {
            entry.company = simpleMatch[1].trim()
            entry.role = simpleMatch[2].trim()
            entry.duration = simpleMatch[3].trim()
          } else {
            // Last resort: treat as role/company without duration
            entry.role = firstLine.trim()
          }
        }
      }
    }
    
    // Collect bullet points and other descriptions from remaining lines
    for (let i = 3; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('•')) {
        entry.description.push(line.replace(/^•\s*/, ''))
      } else if (line && !line.match(/^[A-Z][a-z]+\s+\d{4}/)) {
        // Add other non-duration lines as descriptions
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

export function parseEducationArvind(educationText: string): NormalizedStudent['education'] {
  const entries: NormalizedStudent['education'] = []
  
  // Split by lines and filter out AI Engineering MisogiAI entries
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
    
    // Pattern: "Bachelor of Technology in AI and Data Science, VNR Vignana Jyothi Institute of Engineering & Technology, Hyderabad, Dec 2021 - July 2025"
    const btechMatch = trimmed.match(/^Bachelor\s+of\s+Technology\s+in\s+(.+?),\s*(.+?),\s*([^,]+?),\s*([A-Z][a-z]+\s+\d{4})\s*-\s*([A-Z][a-z]+\s+\d{4})$/)
    if (btechMatch) {
      entry.degree = 'Bachelor of Technology'
      entry.field = btechMatch[1].trim()
      entry.institution = btechMatch[2].trim()
      // Location is in btechMatch[3], but we don't store it separately
      entry.year = `${btechMatch[4]} - ${btechMatch[5]}`
    } else {
      // Fallback: try simpler B.Tech patterns
      const simpleBtechMatch = trimmed.match(/^Bachelor\s+of\s+Technology\s+in\s+(.+?),\s*(.+?),\s*([A-Z][a-z]+\s+\d{4})\s*-\s*([A-Z][a-z]+\s+\d{4})$/)
      if (simpleBtechMatch) {
        entry.degree = 'Bachelor of Technology'
        entry.field = simpleBtechMatch[1].trim()
        entry.institution = simpleBtechMatch[2].trim()
        entry.year = `${simpleBtechMatch[3]} - ${simpleBtechMatch[4]}`
      } else {
        // Try alternative B.Tech pattern
        const altBtechMatch = trimmed.match(/^B\.Tech\s+in\s+(.+?),\s*(.+?),\s*([A-Z][a-z]+\s+\d{4})\s*-\s*([A-Z][a-z]+\s+\d{4})$/)
        if (altBtechMatch) {
          entry.degree = 'Bachelor of Technology'
          entry.field = altBtechMatch[1].trim()
          entry.institution = altBtechMatch[2].trim()
          entry.year = `${altBtechMatch[3]} - ${altBtechMatch[4]}`
        }
      }
    }
    
    // Alternative patterns for other degree types
    if (!entry.degree) {
      if (trimmed.includes('B.Tech') || trimmed.includes('Bachelor of Technology')) {
        entry.degree = 'Bachelor of Technology'
        
        // Try to extract field
        const fieldMatch = trimmed.match(/in\s+(.+?)(?:\s+from|\s*,|\s*$)/i)
        if (fieldMatch) {
          entry.field = fieldMatch[1].trim()
        } else {
          entry.field = 'Engineering' // Default
        }
        
        // Try to extract institution
        const institutionMatch = trimmed.match(/(?:from|,)\s*([^,\n]+(?:University|Institute|College|School)[^,\n]*)/i)
        if (institutionMatch) {
          entry.institution = institutionMatch[1].trim()
        }
        
        // Extract year if present
        const yearMatch = trimmed.match(/(\d{4})\s*[-–—]\s*(\d{4})/)
        if (yearMatch) {
          entry.year = `${yearMatch[1]}-${yearMatch[2]}`
        }
      }
    }
    
    // Only add entry if we have essential information
    if (entry.degree && (entry.field || entry.institution)) {
      entries.push(entry)
    }
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
  } else if (name.includes('sachin')) {
    return parseEducationSachin(educationText)
  } else if (name.includes('lokesh') || name.includes('venkata')) {
    return parseEducationLokesh(educationText)
  } else if (name.includes('harishankar')) {
    return parseEducationHarishankar(educationText)
  } else if (name.includes('amol')) {
    return parseEducationAmol(educationText)
  } else if (name.includes('misal')) {
    return parseEducationMisal(educationText)
  } else if (name.includes('arvind')) {
    return parseEducationArvind(educationText)
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
  } else if (name.includes('lokesh') || name.includes('venkata')) {
    return parseExperienceLokesh(experienceText)
  } else if (name.includes('amol')) {
    return parseExperienceAmol(experienceText)
  } else if (name.includes('abhijeet')) {
    return parseExperienceAbhijeet(experienceText)
  } else if (name.includes('misal')) {
    return parseExperienceMisal(experienceText)
  } else if (name.includes('arvind')) {
    return parseExperienceArvind(experienceText)
  } else {
    return parseExperienceGeneric(experienceText)
  }
}

export function normalizeSkillsByStudent(skillsText: string, studentName: string): NormalizedStudent['skills'] {
  const name = studentName.toLowerCase()
  
  if (name.includes('akash')) {
    return parseSkillsAkash(skillsText)
  } else if (name.includes('lokesh') || name.includes('venkata')) {
    return parseSkillsLokesh(skillsText)
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

