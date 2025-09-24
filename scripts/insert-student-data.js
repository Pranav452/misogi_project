/**
 * Script to insert all student data into Supabase
 * This script processes the CSV data and inserts it into the database
 */

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://vfftizjdckmnzreqxfoe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZnRpempkY2ttbnpyZXF4Zm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NDA5NTIsImV4cCI6MjA3NDMxNjk1Mn0.kma9N0CB-kDJVeD_SxHNSsiiI-Cx4qm2vmkRDCfzuVU'

const supabase = createClient(supabaseUrl, supabaseKey)

// All student data from the CSV
const studentData = [
  {
    email: '0100LAKSHYA@gmail.com',
    name: 'Lakshya',
    education: 'AI Engineering MisogiAI by Masai, Bengaluru Jun 2025 – Sept 2025 \n\nB.Tech in CSE from IIT Mandi',
    experience: 'Indian Space Research Organisation (ISRO)\n Artificial Intelligence Intern\n ◦ Chatbot: Developed a context-aware multilingual voice-activated chatbot for ISRO\'s geoportal BHUVAN.\n ◦ Stack Integration: Integrated 3 advanced technology stacks—a voice recognition API, Whisper, and Mixtral-8x7B-Instruct v0.1—together with ISRO\'s BHUVAN geoportal to create a comprehensive platform.\n ◦ Multilingual Performance: Pioneered support in 12 languages, ensuring inclusivity and accessibility while maintaining a ˜1-second response time for optimal user experience.',
    skills: ' • Languages: Python & SQL\n • AI & ML:Pandas, Scikit-learn, NumPy, PyTorch, MCP, LangChain, LangGraph, LangSmith, Transformers\n • Backend & Databases: FastAPI, MongoDB, PostgreSQL, Supabase, Qdrant, FAISS, Redis, Docker',
    github: 'https://github.com/BurningStar0100',
    deployed: 'https://v0-fork1-of-ai-assistant-ui-design.vercel.app/',
    demo_video: 'https://drive.google.com/file/d/1gojOASelib3Z7RN15UPA9vzOy00BKcAn/view?usp=sharing',
    photo_link: 'https://coding-platform.s3.amazonaws.com/dev/lms/tickets/772ff9cf-cae1-4fe9-a78f-49f9be596da9/u0MxTUKRKxLkycs3.png'
  },
  {
    email: '9shubhampawar9@gmail.com',
    name: 'Shubham S Pawar',
    education: 'AI Engineering MisogiAI by Masai, Bengaluru Jun 2025 – Sept 2025 \nFull Stack Web Development ,Masai School, Bengaluru Jan 2022 - Oct 2022\nB.E. Mechanical Engineering , P.V.P.I.T., Budhgaon, Maharashtra Jul 2015 - Aug 2021',
    experience: 'Backend Developer — Eassylife (services superapp) Sep 2023 – July 2025\n• Engineered a real-time AI voice calling agent system (agent + RAG) that engaged 5000+ leads/month,\nintegrated lead behavior data to prioritize follow-ups improving funnel coversion by 12%.\n• Architected an AI-powered marketing intelligence system that unified multi-agency MMP campaign data with\nin-app behavioral data from SQL, and built automated AI-driven reports that surfaced ROI trends, flagged\ncampaign anomalies, boosted conversion rates through smarter campaign targeting by 20%\n• Overhauled the Node.js backend and re-engineered the MySQL database by fixing bottlenecks and optimizing\nqueries, schema, and deployments delivering faster API response times and cutting infrastructure costs by 15%.\nBackend Application Intern — RevsureAI Dec 2022 – Mar 2023\n• Built Spring Boot REST APIs for pipeline optimization modules, enhanced revenue intelligence\n• Assisted in designing 85 unit tests, improving backend service reliability and reducing bugs in production',
    skills: 'AI/ML: LLMs, RAG, AI Agents, LangChain, Langgraph, Langsmith, Vector database, MCP, Prompt Engineering, Fine tuning, Evaluations\nBackend/languages: FastAPI, Node.js/Express.js, REST APIs, SpringBoot, Python, Java, Javascript\nData/Infra: MySQL, Vector Database\nTools: Postman, Github',
    github: 'https://github.com/shubhampawar0901/',
    deployed: 'https://github.com/shubhampawar0901/edtech-support-intelligence',
    demo_video: 'https://drive.google.com/drive/folders/1baC34B1Jla1GQ7N7fcktLurQFByqTPAs?usp=sharing',
    photo_link: 'https://coding-platform.s3.amazonaws.com/dev/lms/tickets/f278af68-cceb-4551-ba5b-a847f8c8b61d/BylKzWFFfbNQC0Lx.jpg'
  },
  {
    email: 'abdulrasheed8223@gmail.com',
    name: 'Rasheed Ahmed',
    education: 'AI Engineering MisogiAI by Masai, Bengaluru Jun 2025 – Sept 2025 \nBachelor of Computer Applications - RNTU (AISECT) - 2019\nHoly Crescent High School - 2013\nAl-Ameen Pre-University College - PCMC - 2015',
    experience: ' ==> SENIOR DEVELOPER — Tautmore Pvt Ltd Jan 2024 – May 2025\n•Integrated a RAG-based chatbot to provide interactive explanations and learning support using domain-specific content.\n• Integrated Razorpay & PayPal for seamless B2B/B2C payments. Implemented real-time Firebase notifications, improving engagement by 15%.\n•Built & maintained AWS-based solutions (S3, EC2, Route 53) for scalability. \n ==> DEVELOPER — Wunderman Thompson Studios / Hogarth Aug 2022 – Dec 2023\n•Developed REST APIs (Express.js, Flask) and React dashboards for real-time analytics.\n•Automated workflows with Python +. BeautifulSoup, reducing manual effort by 20%.\n•Delivered responsive, cross-device web apps with React, HTML, CSS.',
    skills: 'AI/ML: LangChain, LangGraph, RAG, Prompt Engineering, Fine-tuning, Multi-agent Systems\nWeb & Backend: React.js, Node.js, Express.js, MongoDB, MySQL, FastAPI, Typescript\nCloud & DevOps: AWS (S3, SES, Route 53, Amplify, Lambda), Firebase, CI/CD, Bitbucket\nTools & Libraries: Git, Material UI, jQuery, BeautifulSoup, Data Structures and Algorithms',
    github: 'https://github.com/rasheed8123',
    deployed: 'https://misogihelpdeskai.netlify.app',
    demo_video: 'https://drive.google.com/drive/folders/1Rx6cQyZSgYcD1qfn55PAMserB-tiMPJG?usp=sharing',
    photo_link: 'https://coding-platform.s3.amazonaws.com/dev/lms/tickets/43f665bc-b03e-4346-86c4-2e38b8ca5ae0/PvLfuxuvPyBFDkwG.png'
  }
  // Add more students here...
]

async function insertStudents() {
  console.log('Starting to insert student data...')
  
  for (const student of studentData) {
    try {
      // Generate ID from email
      const id = student.email.split('@')[0].toLowerCase()
      
      const { data, error } = await supabase
        .from('students')
        .upsert({
          id,
          ...student,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      
      if (error) {
        console.error(`Error inserting ${student.name}:`, error)
      } else {
        console.log(`✅ Successfully inserted ${student.name}`)
      }
    } catch (err) {
      console.error(`Error processing ${student.name}:`, err)
    }
  }
  
  console.log('Finished inserting student data!')
}

// Run the script
insertStudents().catch(console.error)
