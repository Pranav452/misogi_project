# Student Talent Platform 🎓

A modern, responsive web platform for discovering and connecting with exceptional students from top institutions across India. Built with Next.js, TypeScript, and Supabase.

![Platform Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)

## ✨ Features

### 🎯 Core Functionality
- **Student Discovery**: Browse profiles of talented students from IIT, NIT, IIIT, and other premier institutions
- **Advanced Search**: Search by name, skills, education, or experience
- **Detailed Profiles**: Comprehensive student information with education, experience, and project portfolios
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔧 Technical Features
- **Real-time Data**: Live student data from Supabase database
- **Smart Normalization**: Advanced data processing for consistent profile display
- **Individual Parsers**: Custom parsing logic for different data formats
- **Smooth Animations**: GSAP-powered animations for enhanced user experience
- **SEO Optimized**: Server-side rendering with Next.js

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Student Platform 3"
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   Run the database setup script:
   ```bash
   # Create the users table
   psql -h your-supabase-host -U postgres -d postgres -f database.sql
   
   # Insert student data (optional)
   node scripts/insert-student-data.js
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage with student grid
│   ├── student/[id]/      # Dynamic student profile pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── student-card.tsx   # Student card component
│   ├── student-detail-modal.tsx  # Profile modal
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Database client
│   ├── data-normalizer.ts # Data processing
│   └── individual-normalizers.ts # Custom parsers
├── hooks/                # Custom React hooks
│   └── use-students.ts   # Student data fetching
├── public/               # Static assets
└── scripts/              # Database scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#f97316) - Vibrant, energetic
- **Background**: Gray-50 (#f9fafb) - Clean, minimal
- **Text**: Gray-900 (#111827) - High contrast
- **Accent**: White (#ffffff) - Card backgrounds

### Typography
- **Font**: Inter (system font stack)
- **Headings**: Bold, 18-24px
- **Body**: Regular, 14-16px
- **Captions**: 12-14px

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  emai TEXT NOT NULL,           -- Student email
  name TEXT NOT NULL,           -- Full name
  education TEXT,               -- Education history (raw)
  experience TEXT,              -- Work experience (raw)
  skills TEXT,                  -- Skills list (raw)
  github TEXT,                  -- GitHub profile URL
  deployed TEXT,                -- Portfolio/project URL
  demo_video TEXT,              -- Demo video URL
  photo_link TEXT,              -- Profile photo URL
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔄 Data Processing

The platform features a sophisticated data normalization system:

### Individual Parsers
Custom parsing logic for different student data formats:
- **Tathagat Format**: Numbered experience entries
- **Mayank Format**: Company-first structure
- **Pranav Format**: Role, Company – Location Duration
- **Srinivasan Format**: Role — Company Duration
- **Generic Fallback**: Handles all other patterns

### Skills Normalization
- Categorizes skills into Frontend, Backend, Databases, etc.
- Standardizes skill names (React.js, Node.js, MongoDB)
- Removes duplicates and formats consistently

## 🎯 Key Components

### StudentCard
- Displays essential student information
- Shows top 5 skills as badges
- Hover effects with smooth transitions
- Click to navigate to detailed profile

### Student Profile Page
- Comprehensive education timeline
- Professional experience with achievements
- Skills categorized by type
- Links to GitHub, portfolio, and demo videos

### Search & Filtering
- Real-time search across all student data
- Searches name, email, skills, education
- Maintains custom ordering (Mayank 1st, Pranav 3rd)

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Full Next.js support
- **Railway**: Easy database integration
- **Render**: Simple deployment process

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Students
1. Add data to Supabase `users` table
2. Create individual parser if needed (in `individual-normalizers.ts`)
3. Update dispatcher function to use new parser

### Customizing Styles
- Modify `tailwind.config.js` for theme changes
- Update `globals.css` for global styles
- Use Tailwind classes in components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Supabase** for the backend infrastructure
- **Tailwind CSS** for the utility-first styling
- **Lucide React** for the beautiful icons
- **GSAP** for smooth animations

## 📞 Support

For support, email [your-email@domain.com] or create an issue in the repository.

---

**Built with ❤️ for connecting talented students with opportunities**
