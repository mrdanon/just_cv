# 🚀 Professional CV Website - Complete Setup Guide & Implemntation Guide

**Starting Fresh: Professional ATS-Optimized CV Website for Piotr Dankowiakowski**

---

## 📋 Project Overview

**🎯 Goal:** Create a minimalistic, modern CV website with high ATS scores and PDF download capability  
**🌐 Domain:** drdanon.xyz  
**📅 Timeline:** 4 weeks from scratch  
**👨‍💻 Developer:** Piotr Dankowiakowski  

---

## 👤 About Piotr Dankowiakowski -Personal Information & Links

### **Contact Information**
- **Name:** Piotr Dankowiakowski
- **Title:** Senior 3D Artist & AI Specialist | Educational Technology Expert
- **Email:** piotr12451@gmail.com
- **Phone:** +48 505 286 064
- **Location:** Warsaw, Poland

### **Professional Links**
- **Portfolio:** [https://piotr.danon.site](https://piotr.danon.site)
- **LinkedIn:** [https://www.linkedin.com/in/piotr-dankowiakowski-034a352b4/](https://www.linkedin.com/in/piotr-dankowiakowski-034a352b4/)
- **GitHub:** [https://github.com/mrdanon](https://github.com/mrdanon)
- **YouTube:** [https://www.youtube.com/@dr.blender](https://www.youtube.com/@dr.blender)
- **Instagram:** [https://www.instagram.com/doctor.blender/](https://www.instagram.com/doctor.blender/)
- **ArtStation:** [https://www.artstation.com/drdanon](https://www.artstation.com/drdanon)

### **Technical Background** (from [GitHub](https://github.com/mrdanon))
- **SlotMachine:** Mobile casino game (React Native + Expo + TypeScript)
- **portfolio2.0 & portfolio3.0:** Portfolio projects (TypeScript)
- **6+ years** in 3D animation, AI development, and education

---

## 🎯 Requirements Summary

### **Must-Have Features**
- [ ] **Minimalistic Design** - Clean, professional, no animations
- [ ] **Linear CV Layout** - Single-column, ATS-friendly
- [ ] **High ATS Score** - 95%+ compatibility with job systems
- [ ] **PDF Download** - Professional quality, scannable by robots
- [ ] **Mobile Responsive** - Perfect on all devices
- [ ] **Secure Webhooks** - Protected APIs for content updates
- [ ] **Database System** - Easy content management
- [ ] **Portfolio Integration** - Connect with existing piotr.danon.site

### **Technical Requirements**
- [ ] **XYZ Methodology** - "Accomplished X by implementing Y resulting in Z"
- [ ] **Professional Photo** - MyPhoto.jpg integration
- [ ] **Print Optimized** - Perfect A4 formatting
- [ ] **Security First** - No vulnerabilities when on GitHub
- [ ] **Easy Updates** - Webhook system for content changes

---

## 🛠️ Technology Stack (Fresh Start)

### **Frontend Stack**
```json
{
  "framework": "Next.js 14 (App Router)",
  "library": "React 18",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "pdf": "react-pdf + jsPDF",
  "icons": "Lucide React"
}
```

### **Backend & Storage**
```json
{
  "api": "Next.js API Routes",
  "database": "SQLite → PostgreSQL (production)",
  "authentication": "NextAuth.js",
  "validation": "Zod",
  "storage": "Vercel Blob (files)"
}
```

### **Security & Deployment**
```json
{
  "deployment": "Vercel",
  "domain": "www.piotr.danon.site",
  "security": "Environment variables + API keys",
  "monitoring": "Vercel Analytics + Sentry"
}
```

---

## 📁 Project Structure (Fresh Setup)

```
cv-website/
├── 📁 app/                           # Next.js 14 App Router
│   ├── 📁 api/                       # API endpoints
│   │   ├── 📁 auth/                  # Authentication
│   │   ├── 📁 cv/                    # CV management
│   │   ├── 📁 pdf/                   # PDF generation
│   │   └── 📁 webhook/               # Secure webhooks
│   ├── 📁 cv/                        # CV page
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Landing page
├── 📁 components/                    # React components
│   ├── 📁 cv/                        # CV-specific components
│   ├── 📁 ui/                        # Reusable UI components
│   └── 📁 pdf/                       # PDF components
├── 📁 lib/                          # Utilities
│   ├── db.ts                        # Database connection
│   ├── auth.ts                      # Authentication
│   ├── pdf.ts                       # PDF generation
│   └── validations.ts               # Zod schemas
├── 📁 types/                        # TypeScript types
├── 📁 public/                       # Static files
│   ├── MyPhoto.jpg                  # Professional photo
│   └── favicon.ico                  # Site icon
├── 📁 prisma/                       # Database schema
├── .env.local                       # Environment variables
├── package.json                     # Dependencies
└── README.md                        # Project documentation
```

---

## 🚀 Phase 1: Initial Setup (Week 1)

### **Day 1: Project Initialization**
- [x] **Create New Next.js Project**
```bash
npx create-next-app@latest cv-website --typescript --tailwind --eslint --app
cd cv-website
```

- [x] **Install Required Dependencies**
```bash
npm install @prisma/client prisma
npm install next-auth
npm install react-pdf @react-pdf/renderer
npm install jspdf html2canvas
npm install zod
npm install lucide-react
npm install @vercel/blob
```

- [ ] **Setup Development Environment**
```bash
# Create environment file
touch .env.local

# Add to .env.local:
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
WEBHOOK_SECRET=your-webhook-secret
DATABASE_URL="file:./dev.db"
```
add captain definition for caprover deploy later 

-[ ]initialize git repository and save versions after each phase 
https://github.com/mrdanon/just_cv.git

### **Day 2: Database Setup**
- [ ] **Initialize Prisma**
```bash
npx prisma init --datasource-provider sqlite
```

- [ ] **Create Database Schema**
```prisma
// prisma/schema.prisma
model CV {
  id          String @id @default(cuid())
  personalInfo Json
  workExperience Json
  education   Json
  skills      Json
  projects    Json
  courses     Json
  languages   Json
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model User {
  id       String @id @default(cuid())
  email    String @unique
  name     String?
  role     String @default("admin")
}
```

- [ ] **Run Database Migration**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### **Day 3: Basic Components**
- [ ] **Create CV Data Types**
```typescript
// types/cv.ts
export interface PersonalInfo {
  name: string;
  title: string;
  photo: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  courses: Course[];
  languages: Language[];
}
```

- [ ] **Create Basic CV Layout Component**
```typescript
// components/cv/CVLayout.tsx
export default function CVLayout({ data }: { data: CVData }) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      {/* CV Content */}
    </div>
  );
}
```

### **Day 4: Photo Integration & Styling**
- [ ] **Add Professional Photo**
```bash
# Copy MyPhoto.jpg to public folder
cp MyPhoto.jpg public/
```

- [ ] **Setup Tailwind for Print**
```css
/* app/globals.css */
@media print {
  .cv-container {
    font-size: 11pt;
    line-height: 1.4;
    color: black !important;
  }
}
```

### **Day 5: Basic API Routes**
- [ ] **Create CV API Endpoint**
```typescript
// app/api/cv/route.ts
export async function GET() {
  // Get CV data from database
}

export async function POST(request: Request) {
  // Update CV data
}
```

---

## 📝 Phase 2: Content & ATS Optimization (Week 2)

### **Day 6-7: CV Content Creation**
- [ ] **Professional Summary (XYZ Method)**
```
"Accomplished [X: 100+ projects, $2M+ client approvals] by implementing [Y: Blender, AI avatars, educational animations] resulting in [Z: 98% client satisfaction, 40% efficiency gains]"
```

- [ ] **Work Experience Optimization**
```
Each bullet point follows XYZ:
• "Led development of 8 AI avatars [X] by implementing ConvAI integration [Y] resulting in 40% reduced response time [Z]"
• "Generated 15+ architectural visualizations [X] by optimizing animation pipeline [Y] resulting in $2M+ project approvals [Z]"
```

### **Day 8-9: ATS Optimization**
- [ ] **Single-Column Layout**
```typescript
// Ensure ATS-friendly structure:
- No tables or complex layouts
- Standard headings (h1, h2, h3)
- Linear information flow
- Standard fonts (Arial, Helvetica)
- Plain bullet points (•)
```

- [ ] **Keywords Integration**
```
Technical Skills: Blender, Unreal Engine, Python, JavaScript, React, AI, ML
Industry Terms: 3D Artist, AI Specialist, Educational Technology, Animation
Action Verbs: Led, Developed, Managed, Created, Implemented, Optimized
```

### **Day 10: Print & PDF Optimization**
- [ ] **PDF Generation Setup**
```typescript
// lib/pdf.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDF(elementId: string) {
  const element = document.getElementById(elementId);
  const canvas = await html2canvas(element);
  const pdf = new jsPDF('p', 'mm', 'a4');
  // PDF generation logic
}
```

---

## 🔒 Phase 3: Security & Authentication (Week 3)

### **Day 11-12: Authentication Setup**
- [ ] **NextAuth Configuration**
```typescript
// lib/auth.ts
import NextAuth from 'next-auth';

export const authOptions = {
  providers: [
    // Email provider for admin access
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: { ...session.user, id: user.id }
    })
  }
};
```

### **Day 13-14: Webhook Security**
- [ ] **Secure API Endpoints**
```typescript
// Webhook authentication
function verifyWebhookSignature(payload: string, signature: string) {
  const secret = process.env.WEBHOOK_SECRET;
  // Verify signature logic
}
```

- [ ] **Input Validation**
```typescript
// lib/validations.ts
import { z } from 'zod';

export const CVUpdateSchema = z.object({
  section: z.enum(['personalInfo', 'workExperience', 'skills']),
  data: z.any()
});
```

### **Day 15: Rate Limiting & CORS**
- [ ] **API Protection**
```typescript
// Rate limiting middleware
export function rateLimit(request: Request) {
  // Implement rate limiting logic
}
```

---

## 🔗 Phase 4: Portfolio Integration & Deployment (Week 4)

### **Day 16-17: Portfolio Integration**
- [ ] **GitHub API Integration**
```typescript
// Sync projects from GitHub
async function syncGitHubProjects() {
  const response = await fetch('https://api.github.com/users/mrdanon/repos');
  const repos = await response.json();
  // Update CV projects
}
```

- [ ] **Social Media Integration**
```typescript
// Connect YouTube, Instagram, ArtStation
const socialIntegrations = {
  youtube: '@dr.blender',
  instagram: '@doctor.blender',
  artstation: 'drdanon'
};
```

### **Day 18-19: Production Setup**
- [ ] **Environment Variables**
```bash
# .env.production
NEXTAUTH_SECRET=production-secret
NEXTAUTH_URL=https://www.piotr.danon.site
DATABASE_URL=postgresql://...
WEBHOOK_SECRET=production-webhook-secret
```

- [ ] **Database Migration**
```bash
# Switch to PostgreSQL for production
npx prisma migrate deploy
```

### **Day 20: Deployment & Domain**
- [ ] **Deploy to Vercel**
```bash
npm install -g vercel
vercel login
vercel --prod
```

- [ ] **Setup Custom Domain**
```bash
vercel domains add www.piotr.danon.site
vercel alias production-url www.piotr.danon.site
```

---

## 📋 Daily Checklist Template

### **Daily Standup Questions**
1. **What did I complete yesterday?**
   - [ ] List specific tasks completed
   
2. **What am I working on today?**
   - [ ] List today's planned tasks
   
3. **Any blockers or issues?**
   - [ ] Technical challenges
   - [ ] Missing information
   - [ ] Dependencies waiting

### **End of Day Review**
- [ ] **Code committed to Git**
- [ ] **Tests passing**
- [ ] **Documentation updated**
- [ ] **Tomorrow's tasks planned**

---

## 🧪 Testing Checklist

### **ATS Testing**
- [ ] **Upload to Workday** - Test parsing accuracy
- [ ] **Upload to Taleo** - Verify field recognition
- [ ] **Upload to iCIMS** - Check compatibility
- [ ] **Upload to Greenhouse** - Validate formatting

### **Cross-Browser Testing**
- [ ] **Chrome** - Primary testing browser
- [ ] **Firefox** - Secondary compatibility
- [ ] **Safari** - Mac compatibility
- [ ] **Edge** - Windows compatibility

### **Mobile Testing**
- [ ] **iPhone Safari** - iOS compatibility
- [ ] **Android Chrome** - Android compatibility
- [ ] **Tablet View** - iPad/tablet optimization

### **PDF Testing**
- [ ] **Download Quality** - 300 DPI equivalent
- [ ] **Text Selection** - All text selectable
- [ ] **Print Quality** - A4 formatting perfect
- [ ] **File Size** - Under 2MB for easy upload

---

## 🚀 Quick Start Commands

### **Development**
```bash
# Start fresh development
npm run dev

# Database operations
npx prisma studio
npx prisma migrate dev

# Build for production
npm run build
npm start
```

### **Content Management**
```bash
# Update CV via webhook
curl -X POST http://localhost:3000/api/webhook/cv \
  -H "Authorization: Bearer $WEBHOOK_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "section": "workExperience",
    "data": [{
      "position": "New Position",
      "company": "New Company",
      "responsibilities": ["Achievement 1", "Achievement 2"]
    }]
  }'
```

### **Deployment**
```bash
# Deploy to production
vercel --prod

# Check deployment status
vercel ls
```

---

## 📊 Success Metrics

### **Technical KPIs**
- [ ] **Page Load Speed** - Under 2 seconds
- [ ] **ATS Compatibility** - 95%+ score
- [ ] **Mobile Performance** - 90%+ score
- [ ] **PDF Quality** - Professional print-ready
- [ ] **Uptime** - 99.9% availability

### **Business Goals**
- [ ] **CV Downloads** - Track recruiter engagement
- [ ] **Page Views** - Monitor professional visibility
- [ ] **Mobile Usage** - Device access patterns
- [ ] **Geographic Reach** - International recruiter access

---

## 🎯 Week 1 Immediate Actions

### **Today (Start Now)**
1. [ ] **Create Project** - `npx create-next-app@latest cv-website`
2. [ ] **Install Dependencies** - All required packages
3. [ ] **Setup Environment** - `.env.local` configuration
4. [ ] **Initialize Database** - Prisma setup

### **This Week Goals**
1. [ ] **Basic CV Display** - Show personal info and experience
2. [ ] **Photo Integration** - MyPhoto.jpg working perfectly
3. [ ] **PDF Download** - Basic PDF generation working
4. [ ] **Mobile Responsive** - Looks good on all devices

### **Success Criteria for Week 1**
- ✅ CV displays correctly on localhost:3000
- ✅ Professional photo shows in header
- ✅ PDF downloads with proper formatting
- ✅ Mobile view works perfectly
- ✅ Ready for content optimization in Week 2

---

## 🔧 Troubleshooting

### **Common Issues**
- **Build Errors** - Check TypeScript types
- **Database Connection** - Verify .env.local settings
- **Photo Not Loading** - Ensure MyPhoto.jpg in public/
- **PDF Generation Fails** - Check browser console errors

### **Getting Help**
- **GitHub Issues** - Document any bugs found
- **Documentation** - Refer to Next.js, Prisma docs
- **Community** - Stack Overflow for specific technical issues

---

**🚀 Ready to build your professional CV website from scratch!**

Start with Day 1 tasks and work through each phase systematically. This guide will take you from zero to a fully deployed, professional CV website in 4 weeks. 