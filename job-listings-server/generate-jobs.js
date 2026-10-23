const fs = require('fs');
const path = require('path');

const companies = [
  "Infosys", "TCS", "Wipro", "UST Global", "Cognizant", "QBurst", 
  "Experion Technologies", "IBS Software", "Innovature Labs", "Accubits Technologies", 
  "ThoughtWorks", "Zoho", "Freshworks", "Swiggy", "Zerodha", "Razorpay", 
  "Flipkart", "Amazon", "Google", "Microsoft", "Cisco", "Oracle", "IBM", 
  "Capgemini", "LTIMindtree", "HCLTech", "Tech Mahindra", "CareStack", 
  "SurveySparrow", "Neoito", "Flytxt", "Nissan Digital Hub", "EY Global Delivery Services", 
  "Allianz Technology", "Tata Elxsi"
];

const locations = [
  "Kochi, Kerala (Infopark)",
  "Thiruvananthapuram, Kerala (Technopark)",
  "Kozhikode, Kerala (Cyberpark)",
  "Bengaluru, Karnataka (Hybrid)",
  "Bengaluru, Karnataka (Remote)",
  "Hyderabad, Telangana (Hybrid)",
  "Chennai, Tamil Nadu (On-site)",
  "Pune, Maharashtra (Hybrid)",
  "Remote, India",
  "Kochi, Kerala (Hybrid)"
];

const jobBlueprints = [
  // 1. Frontend
  {
    title: "Junior Frontend Developer",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.5 LPA - ₹4.5 LPA",
    stack: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
    desc: "Build responsive, accessible, and high-performance UI components using modern JavaScript and React. Work alongside UI designers and senior engineers."
  },
  {
    title: "Senior React / Next.js Developer",
    level: "Experienced",
    years: "3-5 Years",
    salary: "₹10 LPA - ₹16 LPA",
    stack: ["React", "Next.js", "TypeScript", "Redux Toolkit", "GraphQL", "Tailwind CSS"],
    desc: "Architect scalable frontend web applications, optimize Web Vitals, implement server-side rendering, and mentor junior frontend engineers."
  },
  {
    title: "Angular Developer",
    level: "Experienced",
    years: "2-4 Years",
    salary: "₹7 LPA - ₹11 LPA",
    stack: ["Angular", "TypeScript", "RxJS", "NgRx", "SCSS", "Karma"],
    desc: "Develop enterprise-grade single-page applications with Angular and RxJS, integrate backend REST APIs, and manage state architecture."
  },
  {
    title: "Vue.js / Frontend Trainee",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.2 LPA - ₹4.2 LPA",
    stack: ["Vue.js", "JavaScript", "HTML5", "CSS3", "Vite", "Pinia"],
    desc: "Entry-level frontend role focusing on Vue.js and modern component design. Fresh graduates with strong JavaScript basics are encouraged to apply."
  },

  // 2. Backend - Node.js / Express
  {
    title: "Backend Developer (Node.js)",
    level: "Experienced",
    years: "2-4 Years",
    salary: "₹7.5 LPA - ₹12 LPA",
    stack: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Docker", "Redis"],
    desc: "Design and implement robust RESTful APIs and microservices. Handle database schema migrations, caching layers, and high-throughput background tasks."
  },
  {
    title: "Junior Backend Engineer (Node.js)",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.8 LPA - ₹5 LPA",
    stack: ["Node.js", "Express.js", "JavaScript", "MongoDB", "Postman", "Git"],
    desc: "Collaborate with backend teams to develop server logic, maintain API routes, write unit tests, and integrate databases."
  },

  // 3. Backend - Python / Django / FastAPI
  {
    title: "Python / Django Developer Trainee",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.6 LPA - ₹4.8 LPA",
    stack: ["Python", "Django", "PostgreSQL", "REST APIs", "Git"],
    desc: "Great starting point for freshers with good algorithmic skills and Python knowledge. You will build backend web services with Django."
  },
  {
    title: "Senior FastAPI & Python Engineer",
    level: "Experienced",
    years: "4-6 Years",
    salary: "₹12 LPA - ₹18 LPA",
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Celery", "Docker", "AWS"],
    desc: "Develop asynchronous, high-concurrency microservices with FastAPI. Optimize database queries, manage task queues, and maintain containerized workloads."
  },

  // 4. Full Stack - MERN / MEAN
  {
    title: "Full Stack MERN Developer",
    level: "Experienced",
    years: "3-5 Years",
    salary: "₹9 LPA - ₹15 LPA",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "TypeScript", "AWS"],
    desc: "Take full ownership of end-to-end features from database design and backend APIs to polished frontend components."
  },
  {
    title: "Associate Full Stack Trainee",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.5 LPA - ₹4.5 LPA",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "HTML5", "CSS3"],
    desc: "Ideal for fresh engineering graduates or bootcamp graduates with hands-on projects in the MERN stack."
  },

  // 5. Java / Spring Boot
  {
    title: "Trainee Software Engineer (Java)",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹4 LPA - ₹5 LPA",
    stack: ["Java", "Core Java", "OOPs", "MySQL", "Spring Basics", "Git"],
    desc: "Entry-level position for software engineers with strong object-oriented programming fundamentals in Java and relational database concepts."
  },
  {
    title: "Senior Java Microservices Architect",
    level: "Experienced",
    years: "5-8 Years",
    salary: "₹16 LPA - ₹25 LPA",
    stack: ["Java 17", "Spring Boot", "Spring Cloud", "Kafka", "PostgreSQL", "Kubernetes", "AWS"],
    desc: "Lead the technical design and deployment of distributed, resilient microservices architectures using Spring Boot, Kafka, and Kubernetes."
  },

  // 6. Mobile - Flutter & React Native
  {
    title: "Junior Flutter App Developer",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.6 LPA - ₹4.8 LPA",
    stack: ["Flutter", "Dart", "Firebase", "REST APIs", "Provider"],
    desc: "Develop cross-platform iOS and Android apps using Flutter. Freshers who have created app projects during their studies are welcome."
  },
  {
    title: "Lead Flutter Mobile Engineer",
    level: "Experienced",
    years: "3-6 Years",
    salary: "₹11 LPA - ₹17 LPA",
    stack: ["Flutter", "Dart", "Bloc Architecture", "CI/CD (Fastlane)", "GraphQL", "Native iOS/Android Bridge"],
    desc: "Architect complex mobile applications, establish clean state management architectures, integrate native SDKs, and publish to app stores."
  },
  {
    title: "React Native Developer",
    level: "Experienced",
    years: "2-4 Years",
    salary: "₹8 LPA - ₹13 LPA",
    stack: ["React Native", "TypeScript", "Redux", "REST APIs", "Jest"],
    desc: "Create smooth and performant cross-platform mobile apps. Optimize rendering, handle device permissions, and maintain reusable UI widgets."
  },
  {
    title: "iOS App Developer (Swift)",
    level: "Experienced",
    years: "3-5 Years",
    salary: "₹10 LPA - ₹16 LPA",
    stack: ["Swift", "SwiftUI", "UIKit", "Combine", "CoreData", "Xcode"],
    desc: "Build native iOS applications adhering to Apple design guidelines. Implement smooth animations, network layers, and offline caching."
  },
  {
    title: "Android Developer Trainee (Kotlin)",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.5 LPA - ₹4.5 LPA",
    stack: ["Kotlin", "Android SDK", "Jetpack Compose", "Coroutines", "Room Database"],
    desc: "Join our mobile team to learn and build modern Android applications using Kotlin and Jetpack Compose."
  },

  // 7. DevOps & Cloud
  {
    title: "Junior Cloud Support Associate",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.5 LPA - ₹4.6 LPA",
    stack: ["Linux", "AWS Basics", "Bash Scripting", "Networking", "Git"],
    desc: "Monitor cloud infrastructure, troubleshoot basic Linux server issues, manage access rights, and assist senior cloud administrators."
  },
  {
    title: "Senior DevOps & Platform Engineer",
    level: "Experienced",
    years: "4-7 Years",
    salary: "₹14 LPA - ₹22 LPA",
    stack: ["AWS", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Prometheus", "Helm"],
    desc: "Design and implement GitOps workflows, automated CI/CD pipelines, multi-cluster Kubernetes infrastructure, and observability tooling."
  },
  {
    title: "Azure Cloud Architect",
    level: "Experienced",
    years: "5-8 Years",
    salary: "₹18 LPA - ₹26 LPA",
    stack: ["Microsoft Azure", "Terraform", "Azure DevOps", "Kubernetes (AKS)", "ARM Templates"],
    desc: "Lead enterprise cloud migration to Microsoft Azure, ensuring security best practices, high availability, and cost efficiency."
  },

  // 8. QA & Software Testing
  {
    title: "Junior QA Manual & Automation Tester",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.2 LPA - ₹4.2 LPA",
    stack: ["Manual Testing", "Selenium", "Java", "TestNG", "Postman", "Jira"],
    desc: "Participate in test case creation, defect reporting, manual smoke/regression testing, and learn test automation frameworks."
  },
  {
    title: "Senior QA Automation Engineer (Cypress / Playwright)",
    level: "Experienced",
    years: "3-6 Years",
    salary: "₹8.5 LPA - ₹14 LPA",
    stack: ["Cypress", "Playwright", "TypeScript", "CI/CD", "Postman", "API Automation"],
    desc: "Build modern end-to-end automated test suites for web and API platforms. Integrate tests into deployment pipelines for continuous feedback."
  },

  // 9. Data Science, AI & Machine Learning
  {
    title: "Junior Data Analyst",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹4 LPA - ₹5.5 LPA",
    stack: ["Python", "SQL", "Pandas", "Power BI", "Excel", "Tableau"],
    desc: "Analyze business metrics, build interactive dashboards, query SQL databases, and prepare executive summary reports."
  },
  {
    title: "Machine Learning Engineer",
    level: "Experienced",
    years: "2-5 Years",
    salary: "₹12 LPA - ₹20 LPA",
    stack: ["Python", "PyTorch", "Scikit-Learn", "FastAPI", "Docker", "MLflow", "HuggingFace"],
    desc: "Train, fine-tune, and deploy predictive ML models and NLP systems into production. Manage dataset pipelines and model monitoring."
  },
  {
    title: "Generative AI & LLM Specialist",
    level: "Experienced",
    years: "2-5 Years",
    salary: "₹15 LPA - ₹24 LPA",
    stack: ["Python", "LangChain", "LlamaIndex", "OpenAI APIs", "Vector DBs (Pinecone/Chroma)", "RAG"],
    desc: "Build Retrieval-Augmented Generation (RAG) pipelines, agentic workflows, and customized enterprise LLM search systems."
  },
  {
    title: "Associate AI / ML Intern",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.8 LPA - ₹5 LPA",
    stack: ["Python", "NumPy", "Pandas", "Math/Statistics", "Machine Learning Basics", "Jupyter"],
    desc: "Entry-level position for graduates excited about data science and artificial intelligence. Assist in data cleaning, EDA, and model testing."
  },

  // 10. Cybersecurity
  {
    title: "Junior SOC Analyst",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.6 LPA - ₹4.8 LPA",
    stack: ["SIEM (Splunk)", "Wireshark", "Network Security", "Linux", "Incident Response"],
    desc: "Monitor security event logs, analyze suspicious alerts, triage potential incidents, and verify network compliance."
  },
  {
    title: "Cybersecurity Specialist & Penetration Tester",
    level: "Experienced",
    years: "3-6 Years",
    salary: "₹11 LPA - ₹18 LPA",
    stack: ["Burp Suite", "Metasploit", "OWASP Top 10", "Network Penetration Testing", "Python", "Kali Linux"],
    desc: "Perform ethical hacking, vulnerability assessments, and penetration testing on web apps, mobile apps, and cloud infrastructure."
  },

  // 11. Golang & Systems
  {
    title: "Golang Backend Developer",
    level: "Experienced",
    years: "2-5 Years",
    salary: "₹11 LPA - ₹17 LPA",
    stack: ["Go (Golang)", "gRPC", "Protobuf", "PostgreSQL", "Docker", "Microservices"],
    desc: "Build ultra-fast, concurrent backend services in Go with gRPC communication and robust error handling."
  },

  // 12. UI/UX & Product Design
  {
    title: "Junior UI/UX Designer & Web Trainee",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.2 LPA - ₹4.4 LPA",
    stack: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "HTML/CSS Basics"],
    desc: "Design wireframes, modern user interfaces, conduct user research, and assist in converting design prototypes into code."
  },
  {
    title: "Senior Product Designer (UI/UX)",
    level: "Experienced",
    years: "4-7 Years",
    salary: "₹12 LPA - ₹18 LPA",
    stack: ["Figma", "Design Systems", "User Research", "Usability Testing", "Interaction Design"],
    desc: "Drive the end-to-end design strategy for SaaS enterprise software. Build comprehensive design systems and mentor designers."
  },

  // 13. Database Administration
  {
    title: "Database Administrator (PostgreSQL / MySQL)",
    level: "Experienced",
    years: "3-6 Years",
    salary: "₹9 LPA - ₹15 LPA",
    stack: ["PostgreSQL", "MySQL", "Query Optimization", "Replication", "High Availability", "Backup & Recovery"],
    desc: "Ensure high availability, tuning, disaster recovery, and query performance across production database clusters."
  },
  {
    title: "Junior SQL & Database Support Trainee",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.2 LPA - ₹4 LPA",
    stack: ["SQL", "Relational Databases", "Data Normalization", "Stored Procedures", "Linux"],
    desc: "Execute database migration scripts, write ad-hoc analytical queries, and maintain data integrity."
  },

  // 14. Embedded Systems & IoT
  {
    title: "Embedded Software Trainee",
    level: "Fresher",
    years: "0-1 Years",
    salary: "₹3.5 LPA - ₹4.5 LPA",
    stack: ["C", "Embedded C", "Microcontrollers (STM32/ESP32)", "RTOS", "UART/SPI/I2C"],
    desc: "Work on firmware development for IoT devices, microcontrollers, sensor interfacing, and hardware debugging."
  },
  {
    title: "Senior Embedded Linux & IoT Engineer",
    level: "Experienced",
    years: "4-7 Years",
    salary: "₹12 LPA - ₹19 LPA",
    stack: ["Embedded Linux", "Yocto", "C++", "Device Drivers", "MQTT", "BLE/WiFi"],
    desc: "Develop board support packages (BSP), custom Linux kernel modules, and secure IoT telemetry systems."
  }
];

// Generate exactly 100 jobs
const totalTarget = 100;
const generatedJobs = [];

for (let i = 1; i <= totalTarget; i++) {
  // Pick blueprint with cyclic variety
  const blueprint = jobBlueprints[(i - 1) % jobBlueprints.length];
  const company = companies[(i - 1) % companies.length];
  const location = locations[(i - 1) % locations.length];

  // Dates spread over past 30 days
  const dayOffset = (i % 28);
  const date = new Date(2026, 9, 23 - dayOffset); // October 2026
  const formattedDate = date.toISOString().split('T')[0];

  // Variations in title if repeated
  let displayTitle = blueprint.title;
  const cycle = Math.floor((i - 1) / jobBlueprints.length);
  if (cycle > 0) {
    if (cycle === 1) displayTitle = `${blueprint.title} (${location.split(',')[0]})`;
    else if (cycle === 2) displayTitle = `Urgent: ${blueprint.title}`;
    else displayTitle = `${blueprint.title} - Core Team`;
  }

  generatedJobs.push({
    id: i,
    title: displayTitle,
    company: company,
    description: blueprint.desc,
    stack: blueprint.stack,
    experience_level: blueprint.level,
    experience_years: blueprint.years,
    location: location,
    salary: blueprint.salary,
    type: "Full-time",
    posted_date: formattedDate
  });
}

// Write to jobs.json
const outputPath = path.join(__dirname, 'jobs.json');
fs.writeFileSync(outputPath, JSON.stringify(generatedJobs, null, 2), 'utf-8');

console.log(`Successfully generated ${generatedJobs.length} IT jobs!`);
const freshers = generatedJobs.filter(j => j.experience_level === 'Fresher').length;
const experienced = generatedJobs.filter(j => j.experience_level === 'Experienced').length;
console.log(`Freshers: ${freshers}, Experienced: ${experienced}`);
