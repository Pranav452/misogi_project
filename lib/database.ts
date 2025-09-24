import { supabase, type StudentData, type NormalizedStudent } from './supabase'
import { normalizeStudentData, csvRowToStudentData } from './data-normalizer'

/**
 * Database service for student data operations
 */

export class DatabaseService {
  /**
   * Create the students table if it doesn't exist
   */
  static async createStudentsTable(): Promise<void> {
    const { error } = await supabase.rpc('create_students_table_if_not_exists')
    if (error && !error.message.includes('already exists')) {
      console.error('Error creating students table:', error)
      throw error
    }
  }

  /**
   * Insert raw CSV data into the database
   */
  static async insertRawData(csvData: string): Promise<{ success: number; errors: string[] }> {
    const lines = csvData.trim().split('\n')
    const headers = ['email', 'name', 'education', 'experience', 'skills', 'github', 'deployed', 'demo_video', 'photo_link']
    
    const results = { success: 0, errors: [] as string[] }
    
    for (let i = 0; i < lines.length; i++) {
      try {
        const row = this.parseCSVRow(lines[i])
        const studentData = csvRowToStudentData(row, headers)
        
        if (!studentData) {
          results.errors.push(`Row ${i + 1}: Invalid data format`)
          continue
        }

        // Check if student already exists
        const { data: existing } = await supabase
          .from('students')
          .select('id')
          .eq('email', studentData.email)
          .single()

        if (existing) {
          // Update existing student
          const { error } = await supabase
            .from('students')
            .update({
              name: studentData.name,
              education: studentData.education,
              experience: studentData.experience,
              skills: studentData.skills,
              github: studentData.github,
              deployed: studentData.deployed,
              demo_video: studentData.demo_video,
              photo_link: studentData.photo_link,
              updated_at: new Date().toISOString()
            })
            .eq('email', studentData.email)

          if (error) {
            results.errors.push(`Row ${i + 1}: ${error.message}`)
          } else {
            results.success++
          }
        } else {
          // Insert new student
          const { error } = await supabase
            .from('students')
            .insert({
              ...studentData,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })

          if (error) {
            results.errors.push(`Row ${i + 1}: ${error.message}`)
          } else {
            results.success++
          }
        }
      } catch (error) {
        results.errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
    
    return results
  }

  /**
   * Parse CSV row handling quoted fields and commas
   */
  private static parseCSVRow(row: string): string[] {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i]
      
      if (char === '"' && (i === 0 || row[i - 1] === ',')) {
        inQuotes = true
      } else if (char === '"' && inQuotes && (i === row.length - 1 || row[i + 1] === ',')) {
        inQuotes = false
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    
    result.push(current.trim())
    return result
  }

  /**
   * Get all students with optional filtering and pagination
   */
  static async getStudents(options: {
    search?: string
    skills?: string[]
    limit?: number
    offset?: number
  } = {}): Promise<{ students: NormalizedStudent[]; total: number }> {
    let query = supabase
      .from('users')
      .select('*', { count: 'exact' })

    // Apply search filter
    if (options.search) {
      const searchTerm = `%${options.search}%`
      query = query.or(`name.ilike.${searchTerm},skills.ilike.${searchTerm},education.ilike.${searchTerm}`)
    }

    // Apply skills filter
    if (options.skills && options.skills.length > 0) {
      const skillsFilter = options.skills.map(skill => `skills.ilike.%${skill}%`).join(',')
      query = query.or(skillsFilter)
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit)
    }
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching students:', error)
      throw error
    }

    const normalizedStudents = (data || []).map(student => normalizeStudentData(student))
    
    return {
      students: normalizedStudents,
      total: count || 0
    }
  }

  /**
   * Get a single student by ID
   */
  static async getStudent(id: string): Promise<NormalizedStudent | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('emai', id) // Use emai as the identifier since that's the column name
      .single()

    if (error) {
      if (error.code === 'PGRST116') { // Not found
        return null
      }
      console.error('Error fetching student:', error)
      throw error
    }

    return normalizeStudentData(data)
  }

  /**
   * Get unique skills for filtering
   */
  static async getUniqueSkills(): Promise<string[]> {
    const { data, error } = await supabase
      .from('users')
      .select('skills')

    if (error) {
      console.error('Error fetching skills:', error)
      throw error
    }

    const allSkills = new Set<string>()
    
    data.forEach(student => {
      if (student.skills) {
        const normalized = normalizeStudentData(student as StudentData)
        normalized.skills.forEach(category => {
          category.items.forEach(skill => {
            allSkills.add(skill)
          })
        })
      }
    })

    return Array.from(allSkills).sort()
  }

  /**
   * Initialize database with sample data
   */
  static async initializeWithSampleData(): Promise<void> {
    const sampleData = `0100LAKSHYA@gmail.com,Lakshya,"AI Engineering MisogiAI by Masai, Bengaluru Jun 2025 – Sept 2025 

B.Tech in CSE from IIT Mandi ","Indian Space Research Organisation (ISRO)
 Artificial Intelligence Intern
 ◦ Chatbot: Developed a context-aware multilingual voice-activated chatbot for ISRO's geoportal BHUVAN.
 ◦ Stack Integration: Integrated 3 advanced technology stacks—a voice recognition API, Whisper, and Mixtral-8x7B-Instruct v0.1—together with ISRO's BHUVAN geoportal to create a comprehensive platform.
 ◦ Multilingual Performance: Pioneered support in 12 languages, ensuring inclusivity and accessibility while maintaining a ˜1-second response time for optimal user experience."," • Languages: Python & SQL
 • AI & ML:Pandas, Scikit-learn, NumPy, PyTorch, MCP, LangChain, LangGraph, LangSmith, Transformers
 • Backend & Databases: FastAPI, MongoDB, PostgreSQL, Supabase, Qdrant, FAISS, Redis, Docker",https://github.com/BurningStar0100,https://v0-fork1-of-ai-assistant-ui-design.vercel.app/,https://drive.google.com/file/d/1gojOASelib3Z7RN15UPA9vzOy00BKcAn/view?usp=sharing,https://coding-platform.s3.amazonaws.com/dev/lms/tickets/772ff9cf-cae1-4fe9-a78f-49f9be596da9/u0MxTUKRKxLkycs3.png
9shubhampawar9@gmail.com,Shubham S Pawar,"AI Engineering MisogiAI by Masai, Bengaluru Jun 2025 – Sept 2025 
Full Stack Web Development ,Masai School, Bengaluru Jan 2022 - Oct 2022
B.E. Mechanical Engineering , P.V.P.I.T., Budhgaon, Maharashtra Jul 2015 - Aug 2021","Backend Developer — Eassylife (services superapp) Sep 2023 – July 2025
• Engineered a real-time AI voice calling agent system (agent + RAG) that engaged 5000+ leads/month,
integrated lead behavior data to prioritize follow-ups improving funnel coversion by 12%.
• Architected an AI-powered marketing intelligence system that unified multi-agency MMP campaign data with
in-app behavioral data from SQL, and built automated AI-driven reports that surfaced ROI trends, flagged
campaign anomalies, boosted conversion rates through smarter campaign targeting by 20%
• Overhauled the Node.js backend and re-engineered the MySQL database by fixing bottlenecks and optimizing
queries, schema, and deployments delivering faster API response times and cutting infrastructure costs by 15%.
Backend Application Intern — RevsureAI Dec 2022 – Mar 2023
• Built Spring Boot REST APIs for pipeline optimization modules, enhanced revenue intelligence
• Assisted in designing 85 unit tests, improving backend service reliability and reducing bugs in production
Product Design Engineer — Kreativan Design and IT Solutions Dec 2020 – Jan 2022
• Designed and developed a gearbox for a turmeric harvester, improving overall performance and durability
Hydroponics Farming unit — (Business) Jan 2018 – Mar 2020
• Co-founded and operated a small hydroponics farming unit with a 4-member team, managing design, cultivation","AI/ML: LLMs, RAG, AI Agents, LangChain, Langgraph, Langsmith, Vector database, MCP, Prompt Engineering, Fine tuning, Evaluations
Backend/languages: FastAPI, Node.js/Express.js, REST APIs, SpringBoot, Python, Java, Javascript
Data/Infra: MySQL, Vector Database
Tools: Postman, Github
",https://github.com/shubhampawar0901/,https://github.com/shubhampawar0901/edtech-support-intelligence,https://drive.google.com/drive/folders/1baC34B1Jla1GQ7N7fcktLurQFByqTPAs?usp=sharing,https://coding-platform.s3.amazonaws.com/dev/lms/tickets/f278af68-cceb-4551-ba5b-a847f8c8b61d/BylKzWFFfbNQC0Lx.jpg`

    await this.insertRawData(sampleData)
  }
}
