-- Students table schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Create the students table
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS students_email_idx ON students(email);
CREATE INDEX IF NOT EXISTS students_name_idx ON students(name);
CREATE INDEX IF NOT EXISTS students_skills_idx ON students USING gin(to_tsvector('english', skills));
CREATE INDEX IF NOT EXISTS students_education_idx ON students USING gin(to_tsvector('english', education));

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed for your security requirements)
CREATE POLICY "Students are viewable by everyone" ON students
  FOR SELECT USING (true);

-- Optional: Create policy for authenticated users to insert/update
-- CREATE POLICY "Authenticated users can insert students" ON students
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated users can update students" ON students
--   FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert sample data (you can run this to populate with your student data)
INSERT INTO students (
  id, email, name, education, experience, skills, github, deployed, demo_video, photo_link
) VALUES 
(
  '0100lakshya',
  '0100LAKSHYA@gmail.com',
  'Lakshya',
  'AI Engineering MisogiAI by Masai, Bengaluru Jun 2025 – Sept 2025 

B.Tech in CSE from IIT Mandi',
  'Indian Space Research Organisation (ISRO)
 Artificial Intelligence Intern
 ◦ Chatbot: Developed a context-aware multilingual voice-activated chatbot for ISRO''s geoportal BHUVAN.
 ◦ Stack Integration: Integrated 3 advanced technology stacks—a voice recognition API, Whisper, and Mixtral-8x7B-Instruct v0.1—together with ISRO''s BHUVAN geoportal to create a comprehensive platform.
 ◦ Multilingual Performance: Pioneered support in 12 languages, ensuring inclusivity and accessibility while maintaining a ˜1-second response time for optimal user experience.',
  ' • Languages: Python & SQL
 • AI & ML:Pandas, Scikit-learn, NumPy, PyTorch, MCP, LangChain, LangGraph, LangSmith, Transformers
 • Backend & Databases: FastAPI, MongoDB, PostgreSQL, Supabase, Qdrant, FAISS, Redis, Docker',
  'https://github.com/BurningStar0100',
  'https://v0-fork1-of-ai-assistant-ui-design.vercel.app/',
  'https://drive.google.com/file/d/1gojOASelib3Z7RN15UPA9vzOy00BKcAn/view?usp=sharing',
  'https://coding-platform.s3.amazonaws.com/dev/lms/tickets/772ff9cf-cae1-4fe9-a78f-49f9be596da9/u0MxTUKRKxLkycs3.png'
),
(
  '9shubhampawar9',
  '9shubhampawar9@gmail.com',
  'Shubham S Pawar',
  'AI Engineering MisogiAI by Masai, Bengaluru Jun 2025 – Sept 2025 
Full Stack Web Development ,Masai School, Bengaluru Jan 2022 - Oct 2022
B.E. Mechanical Engineering , P.V.P.I.T., Budhgaon, Maharashtra Jul 2015 - Aug 2021',
  'Backend Developer — Eassylife (services superapp) Sep 2023 – July 2025
• Engineered a real-time AI voice calling agent system (agent + RAG) that engaged 5000+ leads/month,
integrated lead behavior data to prioritize follow-ups improving funnel coversion by 12%.
• Architected an AI-powered marketing intelligence system that unified multi-agency MMP campaign data with
in-app behavioral data from SQL, and built automated AI-driven reports that surfaced ROI trends, flagged
campaign anomalies, boosted conversion rates through smarter campaign targeting by 20%
• Overhauled the Node.js backend and re-engineered the MySQL database by fixing bottlenecks and optimizing
queries, schema, and deployments delivering faster API response times and cutting infrastructure costs by 15%.
Backend Application Intern — RevsureAI Dec 2022 – Mar 2023
• Built Spring Boot REST APIs for pipeline optimization modules, enhanced revenue intelligence
• Assisted in designing 85 unit tests, improving backend service reliability and reducing bugs in production',
  'AI/ML: LLMs, RAG, AI Agents, LangChain, Langgraph, Langsmith, Vector database, MCP, Prompt Engineering, Fine tuning, Evaluations
Backend/languages: FastAPI, Node.js/Express.js, REST APIs, SpringBoot, Python, Java, Javascript
Data/Infra: MySQL, Vector Database
Tools: Postman, Github',
  'https://github.com/shubhampawar0901/',
  'https://github.com/shubhampawar0901/edtech-support-intelligence',
  'https://drive.google.com/drive/folders/1baC34B1Jla1GQ7N7fcktLurQFByqTPAs?usp=sharing',
  'https://coding-platform.s3.amazonaws.com/dev/lms/tickets/f278af68-cceb-4551-ba5b-a847f8c8b61d/BylKzWFFfbNQC0Lx.jpg'
),
(
  'abdulrasheed8223',
  'abdulrasheed8223@gmail.com',
  'Rasheed Ahmed',
  'AI Engineering MisogiAI by Masai, Bengaluru Jun 2025 – Sept 2025 
Bachelor of Computer Applications - RNTU (AISECT) - 2019
Holy Crescent High School - 2013
Al-Ameen Pre-University College - PCMC - 2015',
  ' ==> SENIOR DEVELOPER — Tautmore Pvt Ltd Jan 2024 – May 2025
•Integrated a RAG-based chatbot to provide interactive explanations and learning support using domain-specific content.
• Integrated Razorpay & PayPal for seamless B2B/B2C payments. Implemented real-time Firebase notifications, improving engagement by 15%.
•Built & maintained AWS-based solutions (S3, EC2, Route 53) for scalability. 
 ==> DEVELOPER — Wunderman Thompson Studios / Hogarth Aug 2022 – Dec 2023
•Developed REST APIs (Express.js, Flask) and React dashboards for real-time analytics.
•Automated workflows with Python +. BeautifulSoup, reducing manual effort by 20%.
•Delivered responsive, cross-device web apps with React, HTML, CSS.',
  'AI/ML: LangChain, LangGraph, RAG, Prompt Engineering, Fine-tuning, Multi-agent Systems
Web & Backend: React.js, Node.js, Express.js, MongoDB, MySQL, FastAPI, Typescript
Cloud & DevOps: AWS (S3, SES, Route 53, Amplify, Lambda), Firebase, CI/CD, Bitbucket
Tools & Libraries: Git, Material UI, jQuery, BeautifulSoup, Data Structures and Algorithms',
  'https://github.com/rasheed8123',
  'https://misogihelpdeskai.netlify.app',
  'https://drive.google.com/drive/folders/1Rx6cQyZSgYcD1qfn55PAMserB-tiMPJG?usp=sharing',
  'https://coding-platform.s3.amazonaws.com/dev/lms/tickets/43f665bc-b03e-4346-86c4-2e38b8ca5ae0/PvLfuxuvPyBFDkwG.png'
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  education = EXCLUDED.education,
  experience = EXCLUDED.experience,
  skills = EXCLUDED.skills,
  github = EXCLUDED.github,
  deployed = EXCLUDED.deployed,
  demo_video = EXCLUDED.demo_video,
  photo_link = EXCLUDED.photo_link,
  updated_at = NOW();

-- Function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
