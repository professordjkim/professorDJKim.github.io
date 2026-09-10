// Unified Publications Data
// Each publication can be a preprint or a conference/journal paper.
// Use isSelected: true to feature it on the homepage. The publications page
// groups entries by `year`. Keep the array in reverse-chronological order.
// Full list: files/Kim_CV.pdf and Google Scholar.
const publications = [
  {
    title: "The Impact of Input Order Bias on Large Language Models for Software Fault Localization",
    authors: "Md Nakhla Rafi, <b>Dong Jae Kim</b>, Tse-Hsun Chen, Shaowei Wang",
    venue: "ICSE 2026",
    year: 2026,
    links: [],
    isNew: true,
    isPreprint: false,
    isSelected: true
  },
  {
    title: "Identifying Performance-Sensitive Configurations in Software Systems through Code Analysis with LLM Agents",
    authors: "Zehao Wang, <b>Dong Jae Kim</b>, Tse-Hsun Chen",
    venue: "Empirical Software Engineering (EMSE) 2026",
    year: 2026,
    links: [],
    isNew: true,
    isPreprint: false,
    isSelected: false
  },
  {
    title: "Unsupervised, Accurate, and Efficient Log Parsing Using Smaller Open-Source Large Language Models",
    authors: "Zeyang Ma, <b>Dong Jae Kim</b>, Tse-Hsun Chen",
    venue: "ACM TOSEM 2026",
    year: 2026,
    links: [],
    isNew: true,
    isPreprint: false,
    isSelected: false
  },
  {
    title: "When LLM-Based Code Generation Meets the Software Development Process",
    authors: "Feng Lin, <b>Dong Jae Kim</b>, Tse-Hsun Chen",
    venue: "ICSE 2025",
    year: 2025,
    links: [],
    isPreprint: false,
    isSelected: true
  },
  {
    title: "LibreLog: Accurate and Efficient Unsupervised Log Parsing Using Open-Source Large Language Models",
    authors: "Zeyang Ma, <b>Dong Jae Kim</b>, Tse-Hsun Chen",
    venue: "ICSE 2025",
    year: 2025,
    links: [],
    isPreprint: false,
    isSelected: true
  },
  {
    title: "A First Look at the Inheritance-Induced Redundant Test Execution",
    authors: "<b>Dong Jae Kim</b>, Tse-Hsun Chen, Jinqiu Yang",
    venue: "ICSE 2024",
    year: 2024,
    links: [],
    isPreprint: false,
    isSelected: true
  },
  {
    title: "LLMParser: An Exploratory Study on Using Large Language Models for Log Parsing",
    authors: "Zeyang Ma, An Ran Chen, <b>Dong Jae Kim</b>, Tse-Hsun Chen, Shaowei Wang",
    venue: "ICSE 2024",
    year: 2024,
    links: [],
    isPreprint: false,
    isSelected: false
  },
  {
    title: "Towards Better Graph Neural Network-Based Fault Localization Through Enhanced Code Representation",
    authors: "Md Nakhla Rafi, <b>Dong Jae Kim</b>, An Ran Chen, Tse-Hsun Chen, Shaowei Wang",
    venue: "FSE 2024",
    year: 2024,
    links: [],
    isPreprint: false,
    isSelected: true
  },
  {
    title: "Blessing or Curse? Investigating Test Code Maintenance through Inheritance and Interface",
    authors: "<b>Dong Jae Kim</b>, Tse-Hsun Chen",
    venue: "ICSME 2024",
    year: 2024,
    links: [],
    isPreprint: false,
    isSelected: false
  },
  {
    title: "Challenges in Adopting an AI-Based User Input Verification Framework in Reporting Software Systems",
    authors: "<b>Dong Jae Kim</b>, Steve Locke, Tse-Hsun Chen, et al.",
    venue: "ICSE (SEIP) 2023",
    year: 2023,
    links: [],
    isPreprint: false,
    isSelected: false
  },
  {
    title: "Studying Test Annotation Maintenance in the Wild",
    authors: "<b>Dong Jae Kim</b>, Jinqiu Yang, Tse-Hsun Chen",
    venue: "ICSE 2021",
    year: 2021,
    links: [],
    isPreprint: false,
    isSelected: false
  },
  {
    title: "How Disabled Tests Manifest in Test Maintainability Challenges?",
    authors: "<b>Dong Jae Kim</b>, Bo Yang, Jinqiu Yang, Tse-Hsun Chen",
    venue: "FSE 2021",
    year: 2021,
    links: [],
    isPreprint: false,
    isSelected: false
  },
  {
    title: "The Secret Life of Test Smells — An Empirical Study on Test Smell Evolution and Maintenance",
    authors: "<b>Dong Jae Kim</b>, Tse-Hsun Chen, Jinqiu Yang",
    venue: "Empirical Software Engineering (EMSE) 2021",
    year: 2021,
    links: [],
    isPreprint: false,
    isSelected: false
  }
];

// Helper functions to filter publications
const getPreprints = () => publications.filter(pub => pub.isPreprint);
const getSelectedPreprints = () => publications.filter(pub => pub.isPreprint && pub.isSelected);
const getPublications = () => publications.filter(pub => !pub.isPreprint);
const getSelectedPublications = () => publications.filter(pub => !pub.isPreprint && pub.isSelected);
const getAllPublications = () => publications.filter(pub => !pub.isPreprint);

// Legacy variables for backward compatibility
const preprints = getSelectedPreprints();
const selectedPublications = getSelectedPublications();
const fullPublications = getAllPublications();

// Projects Data - Replace with your own projects
const projects = [
  {
    title: "Gödel Agent",
    description: "A self-referential agent framework for recursive self-improvement implemented with Monkey Patching. (<a href=\"https://github.com/Arvid-pku/Godel_Agent\" target=\"_blank\" rel=\"noopener\">Project Homepage</a>)",
    badges: [
      { url: "https://github.com/Arvid-pku/Godel_Agent/releases", img: "https://img.shields.io/badge/Version-1.0-blue" },
      { url: "https://github.com/Arvid-pku/Godel_Agent/blob/main/LICENSE.md", img: "https://img.shields.io/badge/License-MIT-blue" },
      { url: "https://github.com/Arvid-pku/Godel_Agent/stargazers", img: "https://img.shields.io/github/stars/Arvid-pku/Godel_Agent" },
      { url: "https://github.com/Arvid-pku/Godel_Agent/network/members", img: "https://img.shields.io/github/forks/Arvid-pku/Godel_Agent" },
      { url: "https://arxiv.org/abs/2410.04444", img: "https://img.shields.io/badge/Doc-Paper-red" }
    ],
    isSelected: true,
    demoPath: "photos/project-demo/godel-agent.png"
  }
];

// Helper functions to filter projects
const getSelectedProjects = () => projects.filter(project => project.isSelected);
const getAllProjects = () => projects;

// Research Experience Data - Replace with your own experience
const researchExperience = [
  {
    period: "Month YYYY - Month YYYY",
    institution: "Your Institution Name",
    mentor: "Prof. Mentor Name",
    description: "Brief description of your research work and achievements."
  }
];

// Teaching Data - Replace with your own teaching experience
const teaching = [
  "Teaching Assistant, Institution, Course Name, Semester YYYY, with Prof. Name"
];

// Academic Services Data - Replace with your own services
const academicServices = [
  "Reviewer: Conference YYYY",
  "Volunteer: Conference YYYY"
];

// Talks Data - Replace with your own talks
const talks = [
  {
    title: "Your Talk Title",
    venue: "Venue Name",
    date: "Mon DD, YYYY",
    attachments: [
      { text: "Slides", url: "files/your-talk/slides.pdf" }
    ]
  }
];

// Honors Data - Replace with your own honors and awards
const honors = [
  "Your Award Name, Institution, Month YYYY"
];
