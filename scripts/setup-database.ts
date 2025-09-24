/**
 * Database setup script to create tables and populate with student data
 * Run this script to initialize your Supabase database
 */

import { supabase } from '../lib/supabase'
import { DatabaseService } from '../lib/database'

// All the student data from your CSV
const STUDENT_DATA = `0100LAKSHYA@gmail.com,Lakshya,"AI Engineering MisogiAI by Masai, Bengaluru Jun 2025 – Sept 2025 

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
",https://github.com/shubhampawar0901/,https://github.com/shubhampawar0901/edtech-support-intelligence,https://drive.google.com/drive/folders/1baC34B1Jla1GQ7N7fcktLurQFByqTPAs?usp=sharing,https://coding-platform.s3.amazonaws.com/dev/lms/tickets/f278af68-cceb-4551-ba5b-a847f8c8b61d/BylKzWFFfbNQC0Lx.jpg
abdulrasheed8223@gmail.com,Rasheed Ahmed,"AI Engineering MisogiAI by Masai, Bengaluru Jun 2025 – Sept 2025 
Bachelor of Computer Applications - RNTU (AISECT) - 2019
Holy Crescent High School - 2013
Al-Ameen Pre-University College - PCMC - 2015

"," ==> SENIOR DEVELOPER — Tautmore Pvt Ltd Jan 2024 – May 2025
•Integrated a RAG-based chatbot to provide interactive explanations and learning support using domain-specific content.
• Integrated Razorpay & PayPal for seamless B2B/B2C payments. Implemented real-time Firebase notifications, improving engagement by 15%.
•Built & maintained AWS-based solutions (S3, EC2, Route 53) for scalability. 
 ==> DEVELOPER — Wunderman Thompson Studios / Hogarth Aug 2022 – Dec 2023
•Developed REST APIs (Express.js, Flask) and React dashboards for real-time analytics.
•Automated workflows with Python +. BeautifulSoup, reducing manual effort by 20%.
•Delivered responsive, cross-device web apps with React, HTML, CSS.
 ==> Customer Support executive — Udaan Aug 2020 – Oct 2021
•Consistently maintained high customer satisfaction, achieving a CSAT score of 4.8/5 and exceeding team targets by 15%, by providing clear and effective support.
 ==> Customer Support Associate — 31 West global services Sep 2017 – Apr 2018
•Handled 500+ inbound/outbound support tickets per month for global clients, achieving a CSAT score of 4.7/5 and consistently exceeding team performance targets.","AI/ML: LangChain, LangGraph, RAG, Prompt Engineering, Fine-tuning, Multi-agent Systems
Web & Backend: React.js, Node.js, Express.js, MongoDB, MySQL, FastAPI, Typescript
Cloud & DevOps: AWS (S3, SES, Route 53, Amplify, Lambda), Firebase, CI/CD, Bitbucket
Tools & Libraries: Git, Material UI, jQuery, BeautifulSoup, Data Structures and Algorithms",https://github.com/rasheed8123,https://misogihelpdeskai.netlify.app,https://drive.google.com/drive/folders/1Rx6cQyZSgYcD1qfn55PAMserB-tiMPJG?usp=sharing,https://coding-platform.s3.amazonaws.com/dev/lms/tickets/43f665bc-b03e-4346-86c4-2e38b8ca5ae0/PvLfuxuvPyBFDkwG.png
abhijeet.kr.chaurasiya@gmail.com,Abhijeet Kumar,"AI Engineering MisogiAI by Masai, Bengaluru Jun 2025 – Sept 2025 

Web Dvelopment Masai School, Bengaluru Jun 2021 - March 2022

BSc Chemistry (Honours) Binod Bihari Mahto Koyalanchal University, Dhanbad Aug 2016 - Jul 2019

","Blowhorn: Member of Technical Staff April 2022 – July 2025
• Revamped ""LCL Dost,"" a side project website used in the company, improving user engagement by 30% and
reducing page load times by 25%.
• Developed 10+ pages of the main website to enhance navigation and increase traffic by 15%.
• Implemented an automated invoice generation feature connecting two projects hosted on separate servers, cutting manual processing time by 40%.
• Collaborated with project managers and testers to deliver bug-free, end-to-end solutions on schedule.
Tech Stack: Node.js | Vue.js | MongoDB | JavaScript | TypeScript | Python | Django | Docker | PostgreSQL","SKILLS
Generative AI: RAG | LangChain | LangGraph | Multi-Agent System Architecture | Model Fine-Tuning | Optimization
Programming Languages: Node.js | JavaScript | TypeScript | Python
Frameworks: Express | React.js | Vue.js | Next.js | Nuxt.js | Django | FastAPI
Databases: NoSQL (MongoDB) | SQL (PostgreSQL) | VectorDB (Pinecone)
Cloud: Docker | AWS | Heroku
Tools: Git | Jira | Figma | Sketch
Other Skills: Data Structures | Algorithms | Selenium",https://github.com/git-abhijeet,https://snipstasha.vercel.app/,https://drive.google.com/file/d/1i-sLSmTWFIBO36uLMzC5oij1zWlq4p_7/view?usp=sharing,https://coding-platform.s3.amazonaws.com/dev/lms/tickets/4dcf6a62-2166-437f-9c97-2f90c75895c1/CaO2zbhhWiaexJoM.jpg`

async function createStudentsTable() {
  console.log('Creating students table...')
  
  const { error } = await supabase.rpc('exec', {
    sql: `
      CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        education TEXT,
        experience TEXT,
        skills TEXT,
        github TEXT,
        deployed TEXT,
        demo_video TEXT,
        photo_link TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS students_email_idx ON students(email);
      CREATE INDEX IF NOT EXISTS students_name_idx ON students(name);
      CREATE INDEX IF NOT EXISTS students_skills_idx ON students USING gin(to_tsvector('english', skills));
    `
  })
  
  if (error) {
    console.error('Error creating table:', error)
    throw error
  }
  
  console.log('Students table created successfully!')
}

async function insertStudentData() {
  console.log('Inserting student data...')
  
  const result = await DatabaseService.insertRawData(STUDENT_DATA)
  
  console.log(`Successfully inserted/updated ${result.success} students`)
  if (result.errors.length > 0) {
    console.log('Errors encountered:')
    result.errors.forEach(error => console.log(`  - ${error}`))
  }
}

async function main() {
  try {
    console.log('Setting up database...')
    
    // Create table
    await createStudentsTable()
    
    // Insert data
    await insertStudentData()
    
    console.log('Database setup completed successfully!')
    
    // Test the setup
    const { students, total } = await DatabaseService.getStudents({ limit: 5 })
    console.log(`\nTest query: Found ${total} students total, showing first 5:`)
    students.forEach(student => {
      console.log(`  - ${student.name} (${student.email})`)
    })
    
  } catch (error) {
    console.error('Setup failed:', error)
    process.exit(1)
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  main()
}

export { main as setupDatabase }`
