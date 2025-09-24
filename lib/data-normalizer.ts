import type { StudentData, NormalizedStudent } from './supabase'
import { normalizeEducationByStudent, normalizeExperienceByStudent } from './individual-normalizers'

/**
 * Comprehensive data normalization utilities for student data
 * Handles various formats and inconsistencies in education, skills, and experience data
 */

// Education normalization patterns
const EDUCATION_PATTERNS = {
  // Degree patterns - comprehensive matching for various formats
  DEGREE_PATTERNS: [
    // B.Tech variations
    /B\.?Tech\.?\s+(?:in\s+)?(.+?)(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    /Bachelor\s+of\s+Technology\s+(?:in\s+)?(.+?)(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    
    // B.E variations  
    /B\.?E\.?\s+(?:in\s+)?(.+?)(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    /Bachelor\s+of\s+Engineering\s+(?:in\s+)?(.+?)(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    
    // M.Tech variations
    /M\.?Tech\.?\s+(?:in\s+)?(.+?)(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    /Master\s+of\s+Technology\s+(?:in\s+)?(.+?)(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    
    // M.S variations
    /M\.?S\.?\s+(?:in\s+)?(.+?)(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    /Master\s+of\s+Science\s+(?:in\s+)?(.+?)(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    
    // MBA variations
    /MBA\s+(?:\(?(.+?)\)?)?(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    /Master\s+of\s+Business\s+Administration\s+(?:\(?(.+?)\)?)?(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    
    // MCA variations
    /MCA\s*(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    /Master\s+of\s+Computer\s+Applications\s*(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    
    // BCA variations
    /BCA\s*(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    /Bachelor\s+of\s+Computer\s+Applications\s*(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    
    // B.Sc variations
    /B\.?Sc\.?\s+(?:\(?(.+?)\)?)?(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    /Bachelor\s+of\s+Science\s+(?:\(?(.+?)\)?)?(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    
    // Diploma variations
    /Diploma\s+(?:in\s+)?(.+?)(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    /PG\s+Diploma\s+(?:in\s+)?(.+?)(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    /Post\s+Graduate\s+Diploma\s+(?:in\s+)?(.+?)(?:\s+from|\s+,|\s+-|\s+—|\s+\(|$)/i,
    
    // Generic patterns for any remaining formats
    /([A-Z][A-Za-z\s]+(?:Engineering|Science|Technology|Applications|Arts))\s+(?:from|\s+,|\s+-|\s+—)/i
  ],
  
  // Institution patterns
  INSTITUTION_PATTERNS: [
    /(?:from|,)\s+([^,(]+?)(?:\s*,\s*[A-Z]{2,})?(?:\s+\d{4}|\s*$)/i,
    /(?:—|–|-)\s+([^,(]+?)(?:\s*,\s*[A-Z]{2,})?(?:\s+\d{4}|\s*$)/i
  ],
  
  // Grade/CGPA patterns
  GRADE_PATTERNS: [
    /(?:Grade|CGPA|GPA)\s*[=:]\s*([\d.]+)/i,
    /\(Grade\s*[=:]\s*([\d.]+)\)/i,
    /\(([\d.]+)\s*CGPA\)/i,
    /\(([\d.]+)\s*GPA\)/i
  ],
  
  // Year patterns
  YEAR_PATTERNS: [
    /(\d{4})\s*[-–—]\s*(\d{4})/,
    /(\w+\s+\d{4})\s*[-–—]\s*(\w+\s+\d{4})/i,
    /(\d{4})/
  ]
}

// Skills normalization patterns
const SKILLS_PATTERNS = {
  // Category patterns
  CATEGORY_PATTERNS: [
    /^[•\-*]\s*(.+?)[:]/,
    /^(.+?)[:]/
  ],
  
  // Skill item patterns
  SKILL_ITEM_PATTERNS: [
    /,\s*/,
    /\s*[;|]\s*/,
    /\s*&\s*/,
    /\s+and\s+/i
  ],
  
  // Skill normalization mappings
  SKILL_NORMALIZATIONS: new Map([
    // Programming Languages
    ['js', 'JavaScript'],
    ['javascript', 'JavaScript'],
    ['ts', 'TypeScript'],
    ['typescript', 'TypeScript'],
    ['py', 'Python'],
    ['python', 'Python'],
    ['java', 'Java'],
    ['c++', 'C++'],
    ['cpp', 'C++'],
    ['c#', 'C#'],
    ['csharp', 'C#'],
    ['go', 'Go'],
    ['golang', 'Go'],
    ['rust', 'Rust'],
    ['php', 'PHP'],
    ['ruby', 'Ruby'],
    ['swift', 'Swift'],
    ['kotlin', 'Kotlin'],
    ['scala', 'Scala'],
    ['r', 'R'],
    ['matlab', 'MATLAB'],
    ['sql', 'SQL'],
    
    // Frameworks & Libraries
    ['react', 'React'],
    ['reactjs', 'React'],
    ['react.js', 'React'],
    ['vue', 'Vue.js'],
    ['vuejs', 'Vue.js'],
    ['vue.js', 'Vue.js'],
    ['angular', 'Angular'],
    ['angularjs', 'Angular'],
    ['next', 'Next.js'],
    ['nextjs', 'Next.js'],
    ['next.js', 'Next.js'],
    ['nuxt', 'Nuxt.js'],
    ['nuxtjs', 'Nuxt.js'],
    ['nuxt.js', 'Nuxt.js'],
    ['express', 'Express.js'],
    ['expressjs', 'Express.js'],
    ['express.js', 'Express.js'],
    ['fastapi', 'FastAPI'],
    ['flask', 'Flask'],
    ['django', 'Django'],
    ['spring', 'Spring Boot'],
    ['springboot', 'Spring Boot'],
    ['spring boot', 'Spring Boot'],
    ['laravel', 'Laravel'],
    ['rails', 'Ruby on Rails'],
    ['rubyonrails', 'Ruby on Rails'],
    ['ruby on rails', 'Ruby on Rails'],
    
    // AI/ML Libraries
    ['tensorflow', 'TensorFlow'],
    ['tf', 'TensorFlow'],
    ['pytorch', 'PyTorch'],
    ['torch', 'PyTorch'],
    ['sklearn', 'Scikit-learn'],
    ['scikit-learn', 'Scikit-learn'],
    ['scikitlearn', 'Scikit-learn'],
    ['pandas', 'Pandas'],
    ['numpy', 'NumPy'],
    ['matplotlib', 'Matplotlib'],
    ['seaborn', 'Seaborn'],
    ['opencv', 'OpenCV'],
    ['cv2', 'OpenCV'],
    ['keras', 'Keras'],
    ['huggingface', 'Hugging Face'],
    ['transformers', 'Transformers'],
    ['langchain', 'LangChain'],
    ['langgraph', 'LangGraph'],
    ['langsmith', 'LangSmith'],
    
    // Databases
    ['mongodb', 'MongoDB'],
    ['mongo', 'MongoDB'],
    ['mysql', 'MySQL'],
    ['postgresql', 'PostgreSQL'],
    ['postgres', 'PostgreSQL'],
    ['sqlite', 'SQLite'],
    ['redis', 'Redis'],
    ['elasticsearch', 'Elasticsearch'],
    ['dynamodb', 'DynamoDB'],
    ['pinecone', 'Pinecone'],
    ['weaviate', 'Weaviate'],
    ['qdrant', 'Qdrant'],
    ['chroma', 'ChromaDB'],
    ['chromadb', 'ChromaDB'],
    ['faiss', 'FAISS'],
    
    // Cloud & DevOps
    ['aws', 'AWS'],
    ['amazon web services', 'AWS'],
    ['gcp', 'Google Cloud Platform'],
    ['google cloud', 'Google Cloud Platform'],
    ['azure', 'Microsoft Azure'],
    ['docker', 'Docker'],
    ['kubernetes', 'Kubernetes'],
    ['k8s', 'Kubernetes'],
    ['jenkins', 'Jenkins'],
    ['gitlab', 'GitLab'],
    ['github', 'GitHub'],
    ['git', 'Git'],
    
    // Tools & Others
    ['vscode', 'VS Code'],
    ['visual studio code', 'VS Code'],
    ['postman', 'Postman'],
    ['figma', 'Figma'],
    ['sketch', 'Sketch'],
    ['photoshop', 'Photoshop'],
    ['illustrator', 'Illustrator'],
    ['jira', 'Jira'],
    ['confluence', 'Confluence'],
    ['slack', 'Slack'],
    ['notion', 'Notion']
  ])
}

// Experience normalization patterns
const EXPERIENCE_PATTERNS = {
  // Company patterns - more robust extraction
  COMPANY_PATTERNS: [
    /^([^—–\-\n]+?)(?:\s*[—–\-]|\n)/,
    /^(.+?)(?:\s+\d{4}|\s*$)/
  ],
  
  // Role patterns - better role extraction
  ROLE_PATTERNS: [
    /(?:^|\n)([^•◦\-*\n]+?)(?:\n|$)/,
    /(?:Position|Role|Title):\s*(.+?)(?:\n|$)/i
  ],
  
  // Duration patterns - more flexible date matching
  DURATION_PATTERNS: [
    /(\w+\s+\d{4})\s*[-–—]\s*(\w+\s+\d{4})/i,
    /(\d{1,2}\/\d{4})\s*[-–—]\s*(\d{1,2}\/\d{4})/,
    /(\d{4})\s*[-–—]\s*(\d{4})/,
    /(\w+\s+\d{4})\s*[-–—]\s*(Present|Current)/i,
    /(\d{2}\/\d{4})\s*[-–—]\s*(\d{2}\/\d{4})/,
    /(\w{3}\s+\d{4})\s*[-–—]\s*(\w{3}\s+\d{4})/i
  ],
  
  // Achievement bullet patterns
  BULLET_PATTERNS: [
    /^[•◦\-*]\s*(.+)/,
    /^\s*[\-•]\s*(.+)/
  ]
}

/**
 * Normalize education data from raw text
 */
export function normalizeEducation(educationText: string): NormalizedStudent['education'] {
  if (!educationText?.trim()) return []
  
  const educationEntries: NormalizedStudent['education'] = []
  
  // Split by common separators for multiple education entries
  const entries = educationText.split(/\n\n|\n(?=[A-Z])|(?:\d{4}\s*[-–—]\s*\d{4}.*?\n)(?=[A-Z])/)
  
  for (const entry of entries) {
    if (!entry.trim()) continue
    
    // Skip AI Engineering MisogiAI entries as they're not the main degree
    if (entry.includes('AI Engineering MisogiAI') || entry.includes('MisogiAI')) {
      continue
    }
    
    const education: NormalizedStudent['education'][0] = {
      degree: '',
      institution: '',
      field: '',
      grade: undefined,
      year: undefined
    }
    
    // Extract degree and field
    for (const pattern of EDUCATION_PATTERNS.DEGREE_PATTERNS) {
      const match = entry.match(pattern)
      if (match) {
        const fullDegree = match[0].replace(/\s+from.*$/i, '').trim()
        const field = match[1]?.trim() || ''
        
        education.degree = fullDegree
        education.field = field
        break
      }
    }
    
    // Extract institution
    for (const pattern of EDUCATION_PATTERNS.INSTITUTION_PATTERNS) {
      const match = entry.match(pattern)
      if (match) {
        education.institution = match[1].trim()
        break
      }
    }
    
    // Extract grade/CGPA
    for (const pattern of EDUCATION_PATTERNS.GRADE_PATTERNS) {
      const match = entry.match(pattern)
      if (match) {
        const grade = parseFloat(match[1])
        if (!isNaN(grade)) {
          education.grade = grade
        }
        break
      }
    }
    
    // Extract year
    for (const pattern of EDUCATION_PATTERNS.YEAR_PATTERNS) {
      const match = entry.match(pattern)
      if (match) {
        if (match[2]) {
          education.year = `${match[1]} - ${match[2]}`
        } else {
          education.year = match[1]
        }
        break
      }
    }
    
    // Only add if we found at least a degree or institution
    if (education.degree || education.institution) {
      educationEntries.push(education)
    }
  }
  
  // Sort by education level (highest first)
  return educationEntries.sort((a, b) => {
    const getEducationLevel = (degree: string) => {
      if (degree.toLowerCase().includes('phd') || degree.toLowerCase().includes('ph.d')) return 6
      if (degree.toLowerCase().includes('m.tech') || degree.toLowerCase().includes('master')) return 5
      if (degree.toLowerCase().includes('mca') || degree.toLowerCase().includes('mba')) return 4
      if (degree.toLowerCase().includes('b.tech') || degree.toLowerCase().includes('bachelor')) return 3
      if (degree.toLowerCase().includes('diploma')) return 2
      return 1
    }
    return getEducationLevel(b.degree) - getEducationLevel(a.degree)
  })
}

/**
 * Normalize skills data from raw text
 */
export function normalizeSkills(skillsText: string): NormalizedStudent['skills'] {
  if (!skillsText?.trim()) return []
  
  const skillsCategories: NormalizedStudent['skills'] = []
  
  // Split by lines and process each category
  const lines = skillsText.split('\n').filter(line => line.trim())
  
  for (const line of lines) {
    let category = 'General Skills'
    let skillsString = line
    
    // Extract category
    for (const pattern of SKILLS_PATTERNS.CATEGORY_PATTERNS) {
      const match = line.match(pattern)
      if (match) {
        category = match[1].replace(/^[•\-*]\s*/, '').trim()
        skillsString = line.split(':')[1] || ''
        break
      }
    }
    
    if (!skillsString.trim()) continue
    
    // Split skills by various delimiters
    let skills = [skillsString]
    for (const pattern of SKILLS_PATTERNS.SKILL_ITEM_PATTERNS) {
      skills = skills.flatMap(skill => skill.split(pattern))
    }
    
    // Clean and normalize individual skills
    const normalizedSkills = skills
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0)
      .map(skill => {
        // Remove common prefixes/suffixes
        skill = skill.replace(/^[•\-*]\s*/, '')
        skill = skill.replace(/[,;.]+$/, '')
        skill = skill.trim()
        
        // Normalize using our mapping
        const normalized = SKILLS_PATTERNS.SKILL_NORMALIZATIONS.get(skill.toLowerCase())
        return normalized || skill
      })
      .filter(skill => skill.length > 1) // Remove single character skills
    
    if (normalizedSkills.length > 0) {
      // Check if category already exists
      const existingCategory = skillsCategories.find(cat => 
        cat.category.toLowerCase() === category.toLowerCase()
      )
      
      if (existingCategory) {
        // Merge skills, avoiding duplicates
        const newSkills = normalizedSkills.filter(skill => 
          !existingCategory.items.some(existing => 
            existing.toLowerCase() === skill.toLowerCase()
          )
        )
        existingCategory.items.push(...newSkills)
      } else {
        skillsCategories.push({
          category,
          items: normalizedSkills
        })
      }
    }
  }
  
  return skillsCategories
}

/**
 * Normalize experience data from raw text
 */
export function normalizeExperience(experienceText: string): NormalizedStudent['experience'] {
  if (!experienceText?.trim()) return []
  
  const experienceEntries: NormalizedStudent['experience'] = []
  
  // Split by company entries - handle numbered entries like "1 )", "2 )", etc. and other patterns
  const entries = experienceText.split(/\n\n+|\n(?=\d+\s*\)\s*[A-Z])|(?:\n|^)(?=\s*=+>\s*[A-Z])|(?:\n|^)(?=[A-Z][^a-z\n]*(?:—|–|-)\s*[A-Z])|(?:\n|^)(?=[A-Z][A-Za-z\s]+(?:Intern|Engineer|Developer|Manager|Analyst|Associate|Lead|Senior|Junior|Founder|CEO|CTO|Director))/)
  
  for (const entry of entries) {
    if (!entry.trim()) continue
    
    const experience: NormalizedStudent['experience'][0] = {
      company: '',
      role: '',
      duration: '',
      description: []
    }
    
    const lines = entry.split('\n').filter(line => line.trim())
    if (lines.length === 0) continue
    
    // First line is usually company, clean it up
    let companyLine = lines[0].trim()
    // Remove common prefixes and clean up
    companyLine = companyLine.replace(/^=+>\s*/, '')
    companyLine = companyLine.replace(/\s*—.*$/, '')
    companyLine = companyLine.replace(/\s*–.*$/, '')
    companyLine = companyLine.replace(/\s*-.*$/, '')
    experience.company = companyLine
    
    // Extract role (usually second line or look for role patterns)
    if (lines.length > 1) {
      let roleLine = lines[1].trim()
      // Clean up role line
      roleLine = roleLine.replace(/^=+>\s*/, '')
      roleLine = roleLine.replace(/^\s*•\s*/, '')
      experience.role = roleLine
    }
    
    // Extract duration
    for (const line of lines) {
      for (const pattern of EXPERIENCE_PATTERNS.DURATION_PATTERNS) {
        const match = line.match(pattern)
        if (match) {
          if (match[2]) {
            experience.duration = `${match[1]} - ${match[2]}`
          } else {
            experience.duration = match[1]
          }
          break
        }
      }
      if (experience.duration) break
    }
    
    // Extract bullet points/achievements
    for (const line of lines) {
      for (const pattern of EXPERIENCE_PATTERNS.BULLET_PATTERNS) {
        const match = line.match(pattern)
        if (match) {
          experience.description.push(match[1].trim())
        }
      }
    }
    
    // If no bullet points found, use remaining lines as description
    if (experience.description.length === 0 && lines.length > 2) {
      experience.description = lines.slice(2)
        .filter(line => !EXPERIENCE_PATTERNS.DURATION_PATTERNS.some(pattern => pattern.test(line)))
        .map(line => line.trim())
        .filter(line => line.length > 0)
    }
    
    // Only add if we have at least company name
    if (experience.company) {
      experienceEntries.push(experience)
    }
  }
  
  return experienceEntries
}

/**
 * Normalize a single student's data
 */
export function normalizeStudentData(rawData: StudentData): NormalizedStudent {
  return {
    id: rawData.id || rawData.emai,
    email: rawData.emai.toLowerCase(),
    name: rawData.name.trim(),
    education: normalizeEducationByStudent(rawData.education, rawData.name),
    experience: normalizeExperienceByStudent(rawData.experience, rawData.name),
    skills: normalizeSkills(rawData.skills),
    github: rawData.github?.trim() || '',
    deployed: rawData.deployed?.trim() || '',
    demo_video: rawData.demo_video?.trim() || '',
    photo_link: rawData.photo_link?.trim() || '',
    created_at: rawData.created_at,
    updated_at: rawData.updated_at
  }
}

/**
 * Convert CSV row to StudentData
 */
export function csvRowToStudentData(row: string[], headers: string[]): StudentData | null {
  if (row.length !== headers.length) return null
  
  const data: any = {}
  headers.forEach((header, index) => {
    data[header] = row[index]?.trim() || ''
  })
  
  // Generate ID from email if not present
  if (!data.id) {
    data.id = data.email?.split('@')[0]?.toLowerCase() || Math.random().toString(36).substr(2, 9)
  }
  
  return {
    id: data.id,
    email: data.email || '',
    name: data.name || '',
    education: data.education || '',
    experience: data.experience || '',
    skills: data.skills || '',
    github: data.github || '',
    deployed: data.deployed || '',
    demo_video: data.demo_video || '',
    photo_link: data.photo_link || ''
  }
}
