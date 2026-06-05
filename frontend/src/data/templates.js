// templatesData.js

export const TEMPLATES_DATA = [
  {
    id: "template-modern-01",
    layoutStyle: "modern-minimal", // Helpful for conditional Tailwind rendering
    themeColor: "bg-blue-600",
    profileImage: "https://unsplash.com",
    name: "Sarah Jenkins",
    designation: "Senior Frontend Engineer",
    summary: "Passionate UI developer with 6+ years of experience building accessible, high-performance web applications using React and Tailwind CSS.",
    
    contact: {
      email: "sarah.j@example.com",
      phone: "+1 (555) 019-2834",
      location: "San Francisco, CA",
      website: "https://sarahcodes.dev",
      linkedin: "://linkedin.com",
      github: "://github.com"
    },

    education: [
      {
        id: "edu-1",
        degree: "B.S. in Computer Science",
        institution: "Stanford University",
        location: "Stanford, CA",
        period: "2016 - 2020",
        details: "Graduated with Honors. Specialization in Human-Computer Interaction."
      }
    ],

    experience: [
      {
        id: "exp-1",
        role: "Lead Frontend Developer",
        company: "TechHive Solutions",
        location: "Remote",
        period: "2023 - Present",
        current: true,
        description: "Spearheaded the migration of a legacy dashboard to React 18, improving initial load times by 42%.",
        achievements: [
          "Managed a team of 5 frontend developers.",
          "Built a reusable UI design system leveraging Tailwind CSS configuration.",
          "Implemented strict automated accessibility (a11y) testing patterns."
        ]
      },
      {
        id: "exp-2",
        role: "Software Engineer II",
        company: "PixelPerfect Apps",
        location: "Austin, TX",
        period: "2020 - 2023",
        current: false,
        description: "Developed and maintained highly responsive client-facing e-commerce applications.",
        achievements: [
          "Optimized Web Vitals score from 'Needs Improvement' to 'Good' across 4 web properties.",
          "Integrated global state management solutions using Redux Toolkit."
        ]
      }
    ],

    expertise: [
      { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "HTML5/CSS3", "SQL"] },
      { category: "Frameworks & Libraries", items: ["React.js", "Next.js", "Tailwind CSS", "Redux", "Zustand"] },
      { category: "Tools & DevOps", items: ["Git", "Webpack", "Vite", "Docker", "CI/CD Pipelines"] }
    ],

    languages: ["English (Native)", "Spanish (Conversational)"],

    certifications: [
      { name: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", year: "2024" }
    ],

    references: [
      {
        id: "ref-1",
        name: "Marcus Vance",
        relationship: "Engineering Manager at TechHive",
        email: "marcus.v@techhive.com",
        phone: "+1 (555) 014-9988"
      }
    ]
  },
  {
    id: "template-creative-02",
    layoutStyle: "creative-sidebar",
    themeColor: "bg-emerald-600",
    profileImage: "https://unsplash.com",
    name: "Alex Rivera",
    designation: "Product Designer",
    summary: "User-centric UI/UX designer with a track record of transforming complex workflows into intuitive digital products.",
    
    contact: {
      email: "alex.rivera@designspace.io",
      phone: "+1 (555) 012-7744",
      location: "New York, NY",
      website: "https://riveradesigns.com",
      linkedin: "://linkedin.com",
      github: "://github.com"
    },

    education: [
      {
        id: "edu-2",
        degree: "B.F.A. in Graphic Design",
        institution: "Rhode Island School of Design",
        location: "Providence, RI",
        period: "2015 - 2019",
        details: "Focus on digital typography and interaction design."
      }
    ],

    experience: [
      {
        id: "exp-3",
        role: "Senior Product Designer",
        company: "Nova FinTech",
        location: "New York, NY",
        period: "2022 - Present",
        current: true,
        description: "Redesigned the mobile banking onboarding flow, driving a 24% increase in user activation rates.",
        achievements: [
          "Conducted 40+ user research interviews to overhaul target user personas.",
          "Created interactive high-fidelity prototypes used for stakeholder buy-in.",
          "Collaborated directly with engineering teams to ensure pixel-perfect Tailwind output."
        ]
      },
      {
        id: "exp-4",
        role: "UI/UX Designer",
        company: "Stellar Creative Agency",
        location: "Boston, MA",
        period: "2019 - 2022",
        current: false,
        description: "Delivered custom design solutions for Fortune 500 B2B clients.",
        achievements: [
          "Delivered 15+ successful responsive web projects from concept to handoff.",
          "Established a component-driven system in Figma reducing design time by 30%."
        ]
      }
    ],

    expertise: [
      { category: "Design Tools", items: ["Figma", "Adobe CC", "Sketch", "Prototyping"] },
      { category: "Methodologies", items: ["User Research", "Wireframing", "A/B Testing", "Design Systems"] },
      { category: "Frontend", items: ["Tailwind UI", "Basic HTML/CSS", "Framer Motion"] }
    ],

    languages: ["English (Native)", "French (Fluent)"],

    certifications: [
      { name: "Google UX Design Professional Certificate", issuer: "Coursera", year: "2020" }
    ],

    references: [
      {
        id: "ref-2",
        name: "Elena Rostova",
        relationship: "VP of Product at Nova FinTech",
        email: "elena@novafintech.com",
        phone: "+1 (555) 017-5511"
      }
    ]
  }
];
