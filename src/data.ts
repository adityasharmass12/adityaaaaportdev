interface EducationRecord {
  institution: string;
  degree: string;
  dates: string;
}

export const resumeData = {
  basics: {
    name: "Aditya Sharma",
    title: "Third-Year B.Tech CSE Student | AI/ML & Data Analytics",
    summary: "I am a Computer Science Engineering undergraduate with a strong interest in Artificial Intelligence and Machine Learning. Dedicated to engineering scalable applications, I am passionate about understanding how intelligent systems work and how data-driven technologies can solve real-world problems. Alongside my technical pursuits, I am also a passionate Video Editor, bringing stories to life through creative visual editing. My goal is to build a robust foundation in programming, algorithms, and machine learning concepts while continuously exploring new advancements in AI. I enjoy learning new technologies, working on practical projects, and improving my problem-solving abilities through hackathons and collaborative initiatives. In the future, I aspire to specialize in AI/ML and contribute to developing innovative, impactful, and intelligent solutions.",
    location: "Delhi, India",
    email: "adityasharma27120809@gmail.com",
    phone: "",
    links: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/adityasharma1206"
      },
      {
        name: "GitHub",
        url: "https://github.com/adityasharmass12"
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/iadityaaa12/"
      },
      {
        name: "X",
        url: "https://x.com/adityasharmaa27"
      }
    ]
  },
  experience: [
    {
      company: "AI Renaissance (A.I.R)",
      role: "President",
      dates: "September 2026 - Present",
      location: "",
      bullets: [
        "Lead the society’s activities, coordinating events, workshops, and content, design, and technical teams."
      ]
    },
    {
      company: "AI Renaissance (A.I.R)",
      role: "Core Member",
      dates: "September 2025 - August 2026 (1 year)",
      location: "",
      bullets: [
        "Helped organize AI/ML learning sessions and student engagement initiatives."
      ]
    }
  ],
  achievements: [
    {
      title: "Bharatiya Antariksh Hackathon 2025",
      organization: "ISRO & Hack2Skill",
      date: "2025",
      description: "Successfully submitted an innovative idea for the hackathon, demonstrating commitment to solving real-world space and technology challenges.",
      image: "/isro-hackathon.jpg.jpeg"
    },
    {
      title: "HackIndia x DTC AI & Web3 Builders Hackathon",
      organization: "HackIndia & DTC Group of Institutes",
      date: "September 2026",
      description: "Proud to have organised the HackIndia x DTC AI & Web3 Builders Hackathon, held on 12–13 September 2026 at DTC Group of Institutes, Greater Noida.",
      image: "/hackindia-dtc.png"
    },
    {
      title: "Industrial Visit to FANUC INDIA",
      organization: "Delhi Technical Campus",
      date: "2025",
      description: "Participated in an industrial visit to FANUC INDIA organized by the Department of Computer Science and Engineering to learn about industrial automation.",
      image: "/fanuc-visit.jpg.jpeg"
    },
    {
      title: "OS Code Open source and Ai Conclave event in microsoft",
      organization: "Microsoft & OS Code",
      date: "2025",
      description: "Attended the OS Code Open source and Ai Conclave event at Microsoft to learn about AI agents and open-source technologies.",
      image: "/fetch-ai.jpg.jpeg"
    },
    {
      title: "FOSS Hack 2025",
      organization: "FOSS United",
      date: "2025",
      description: "Volunteered in FOSS Hack 2025, assisting with event organization and supporting developers in building open-source projects.",
      image: "/foss-hack.jpg.jpeg"
    },
    {
      title: "AI community delhi Build with AI event",
      organization: "AI Community Delhi",
      date: "2025",
      description: "Actively participated in the Build with AI event by AI Community Delhi, networking with peers and industry professionals.",
      image: "/tech-meetup.jpg.jpeg"
    },
    {
      title: "Machine Learning with Python",
      organization: "IBM / Cognitive Class",
      date: "July 17, 2026",
      description: "Credential ID: 139b89dd8e0f4f6d95a2bba7f1d8238e",
      image: "/machine-learning-python-certificate.png",
      verificationUrl: "https://courses.cognitiveclass.ai/certificates/139b89dd8e0f4f6d95a2bba7f1d8238e"
    },
    {
      title: "Artificial Intelligence Fundamentals",
      organization: "IBM SkillsBuild",
      date: "June 2026",
      description: "Credential ID: PLAN-7913EE1DB030",
      image: "/ibm-ai-fundamentals.png"
    }
  ],
  projects: [
    {
      title: "PoisonGuard",
      description: "Poisoned Dataset Detection System. SECURE YOUR DATA BEFORE TRAINING AI. Features real-time analysis, threat mitigation, and data integrity checks.",
      technologies: ["AI/ML", "Data Security", "Python", "React"],
      github: "https://github.com/adityasharmass12/PoisonGuard",
      live: "https://poison-guard-liard.vercel.app/",
      iconType: "shield",
      image: "/poisonguard-screenshot.png",
      showAllTechnologies: true
    },
    {
      title: "India Air Quality Analysis (2015–2020)",
      description: "Analysed 29,531 daily air quality records across 26 Indian cities to identify pollution patterns. Identified Delhi’s seasonal AQI variation and PM2.5 correlation of 0.88, and developed an interactive Streamlit dashboard.",
      technologies: ["Python", "Pandas", "SQL", "Matplotlib", "Seaborn", "Streamlit"],
      image: "/india-air-quality-dashboard.png",
      imageFit: "contain" as const,
      showAllTechnologies: true,
      live: "https://air-quality-data-india.streamlit.app/",
      github: "https://github.com/adityasharmass12/AQI-Analysis-India-2015-20"
    },
    {
      title: "IRCTC Neo",
      description: "A full-stack reimagining of the Indian Railways platform with a modern UI, built with React 19, TypeScript, and Django REST Framework.",
      technologies: ["TypeScript", "React", "Django"],
      github: "https://github.com/adityasharmass12/IRCTC-Neo",
      live: "https://irctc-neo.vercel.app/",
      iconType: "web",
      image: "/irctc-neo.png",
      showAllTechnologies: true
    },
    {
      title: "adityaaaportdev",
      description: "My personal developer portfolio built to showcase my projects, skills, and experience. Features a modern, responsive design with smooth animations.",
      technologies: ["TypeScript", "React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/adityasharmass12/adityaaaaportdev",
      live: "https://adityaaaaportdev.vercel.app/",
      iconType: "web",
      image: "/portfolio-screenshot.jpg.png",
      showAllTechnologies: true
    },
  ],
  skills: [
    {
      group: "Programming Languages",
      items: ["Python", "SQL", "C", "C++", "JavaScript", "TypeScript"]
    },
    {
      group: "AI/ML & Data Science",
      items: ["Pandas", "NumPy", "Scikit-learn", "PyTorch", "LangChain", "Matplotlib", "Seaborn", "Excel"]
    },
    {
      group: "Development",
      items: ["React.js", "FastAPI", "REST APIs", "Tailwind CSS"]
    },
    {
      group: "Tools",
      items: ["Git", "GitHub", "Docker", "VS Code", "Jupyter Notebook"]
    },
    {
      group: "Core Concepts",
      items: ["Data Structures & Algorithms", "Object-Oriented Programming", "Statistics", "Exploratory Data Analysis"]
    }
  ],
  education: [
    {
      institution: "Delhi Technical Campus (GGSIPU)",
      degree: "B.Tech in Computer Science & Engineering",
      dates: "September 2024 - July 2028"
    },
    {
      institution: "Kendriya Vidyalaya",
      degree: "Senior Secondary (XII) & Secondary (X)",
      dates: "2022 - 2024"
    }
  ] as EducationRecord[],
  awards: [],
  extra: [
    "Actively practicing data structures & algorithms on LeetCode and Codeforces to sharpen competitive programming skills.",
    "Open to internship opportunities in AI/ML, Data Analytics, and Full-Stack Software Development.",
    "Passionate about building AI-powered applications with a continuous focus on strengthening technical expertise and problem-solving ability."
  ]
};
