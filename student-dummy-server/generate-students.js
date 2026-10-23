const fs = require('fs');
const path = require('path');

const firstNames = [
  "Rahul", "Ananya", "Fahad", "Devika", "Arjun", "Sneha", "Bilal", "Meera", "Adithya", "Rhea",
  "Vishnu", "Fathima", "Kiran", "Sandra", "Rohit", "Pooja", "Akhil", "Reshma", "Harikrishnan", "Kavya",
  "Nithin", "Anjali", "Gautham", "Divya", "Abhiram", "Gopika", "Sanjay", "Aparna", "Muhammed", "Parvathy",
  "Vivek", "Sruthi", "Midhun", "Ritu", "Ashwin", "Arya", "Jithin", "Lakshmi", "Varun", "Malavika",
  "Pranav", "Shilpa", "Sarath", "Keerthi", "Sharaf", "Nandana", "Deepak", "Athira", "Amal", "Revathy",
  "Naveen", "Gayathri", "Sujith", "Anupama", "Sreeraj", "Deepthi", "Basil", "Aysha", "Roshan", "Diya",
  "Manu", "Swathy", "Aravind", "Nimisha", "Joel", "Shilpa", "Ajay", "Arya", "Siddharth", "Greeshma",
  "Ebin", "Safa", "Karthik", "Bhavana", "Alen", "Archana", "Ramees", "Surabhi", "Sreehari", "Haritha",
  "Sujith", "Manjima", "Vaisakh", "Aswathy", "Rehan", "Roshni", "Dhanush", "Sangeetha", "Nikhil", "Pavithra",
  "Akshay", "Hridya", "Titus", "Shahana", "Bibin", "Sona", "Vineeth", "Anjana", "Sharon", "Chitra"
];

const lastNames = [
  "Krishna", "Nair", "Mohammed", "Menon", "Das", "Varghese", "Ahamed", "Santhosh", "R.", "Thomas",
  "Prasad", "Hameed", "Kumar", "Paul", "Pillai", "Nambiar", "Kurian", "Joy", "Philip", "Joseph",
  "George", "Mohan", "Madhavan", "Raj", "Namboodiri", "Suresh", "Babu", "Sankar", "Mathew", "Chacko",
  "Venu", "Balakrishnan", "Warrier", "Kartha", "Koya", "Ali", "Musthafa", "Shine", "Vaidyan", "Gopinath"
];

const locations = [
  { city: "Kochi", place: "Edappally", district: "Ernakulam", pincode: "682024", street: "MG Road" },
  { city: "Kochi", place: "Kakkanad", district: "Ernakulam", pincode: "682030", street: "Infopark Road" },
  { city: "Kochi", place: "Kaloor", district: "Ernakulam", pincode: "682017", street: "Banerji Road" },
  { city: "Thiruvananthapuram", place: "Kowdiar", district: "Thiruvananthapuram", pincode: "695003", street: "Kowdiar Avenue" },
  { city: "Thiruvananthapuram", place: "Kazhakoottam", district: "Thiruvananthapuram", pincode: "695582", street: "Technopark Road" },
  { city: "Kozhikode", place: "Mananchira", district: "Kozhikode", pincode: "673001", street: "Beach Road" },
  { city: "Kozhikode", place: "Mavoor", district: "Kozhikode", pincode: "673004", street: "Mavoor Road" },
  { city: "Thrissur", place: "Swaraj Round", district: "Thrissur", pincode: "680001", street: "Round North" },
  { city: "Thrissur", place: "Chalakudy", district: "Thrissur", pincode: "680307", street: "College Road" },
  { city: "Alappuzha", place: "Mullakkal", district: "Alappuzha", pincode: "688011", street: "Boat Jetty Road" },
  { city: "Alappuzha", place: "Cherthala", district: "Alappuzha", pincode: "688524", street: "National Highway" },
  { city: "Kottayam", place: "Kanjikuzhy", district: "Kottayam", pincode: "686004", street: "Collectorate Road" },
  { city: "Kottayam", place: "Pala", district: "Kottayam", pincode: "686575", street: "Main Road" },
  { city: "Palakkad", place: "Palakkad Town", district: "Palakkad", pincode: "678001", street: "Fort Maidan Road" },
  { city: "Palakkad", place: "Ottapalam", district: "Palakkad", pincode: "679101", street: "Court Road" },
  { city: "Malappuram", place: "Down Hill", district: "Malappuram", pincode: "676505", street: "Down Hill Road" },
  { city: "Malappuram", place: "Manjeri", district: "Malappuram", pincode: "676121", street: "Calicut Road" },
  { city: "Kannur", place: "Payyannur", district: "Kannur", pincode: "670307", street: "Fort Road" },
  { city: "Kannur", place: "Thalassery", district: "Kannur", pincode: "670101", street: "Beach Road" },
  { city: "Kollam", place: "Asramam", district: "Kollam", pincode: "691001", street: "Asramam Link Road" },
  { city: "Kollam", place: "Karunagappally", district: "Kollam", pincode: "690518", street: "Station Road" },
  { city: "Wayanad", place: "Kalpetta", district: "Wayanad", pincode: "673121", street: "Bypass Road" },
  { city: "Wayanad", place: "Sulthan Bathery", district: "Wayanad", pincode: "673592", street: "Ooty Road" },
  { city: "Idukki", place: "Thodupuzha", district: "Idukki", pincode: "685584", street: "Civil Station Road" },
  { city: "Idukki", place: "Kattappana", district: "Idukki", pincode: "685508", street: "TB Junction" },
  { city: "Pathanamthitta", place: "Thiruvalla", district: "Pathanamthitta", pincode: "689101", street: "Kottayam Road" },
  { city: "Pathanamthitta", place: "Adoor", district: "Pathanamthitta", pincode: "691523", street: "Central Junction" },
  { city: "Kasaragod", place: "Kanhangad", district: "Kasaragod", pincode: "671315", street: "Main Road" }
];

const houseNames = [
  "Krishna Kripa", "Sreevalsam", "Baitul Noor", "Sobha Enclave", "Punnapra House",
  "Bethel Villa", "Darussalam", "Devi Nivas", "Pournami", "Thomas Villa",
  "Prasad Bhavan", "Al-Madeena", "Kiran Nivas", "Palakkal House", "Sreerangam",
  "Anugraha", "Souparnika", "Kailasam", "Rose Villa", "Grace Cottage",
  "Aiswarya", "Nandanam", "Sanctuary", "Olive Garden", "Hill View"
];

const techDomains = [
  {
    stack: "MERN Stack",
    skills: ["MongoDB", "Express.js", "React.js", "Node.js", "JavaScript (ES6+)", "Redux Toolkit"]
  },
  {
    stack: "MEAN Stack",
    skills: ["MongoDB", "Express.js", "Angular", "Node.js", "TypeScript", "RxJS"]
  },
  {
    stack: "Angular & Frontend",
    skills: ["Angular", "TypeScript", "RxJS", "HTML5 / SCSS", "Tailwind CSS", "NgRx"]
  },
  {
    stack: "React & Next.js",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "GraphQL"]
  },
  {
    stack: "Python Full Stack",
    skills: ["Python", "Django", "FastAPI", "React.js", "PostgreSQL", "REST APIs"]
  },
  {
    stack: "Java Spring Boot Full Stack",
    skills: ["Java (Core & Adv)", "Spring Boot", "Microservices", "Hibernate/JPA", "MySQL", "React/Angular"]
  },
  {
    stack: "Flutter & Mobile Apps",
    skills: ["Flutter", "Dart", "Firebase", "BLoC State Mgmt", "REST API Integration", "SQLite"]
  },
  {
    stack: "DevOps & Cloud Engineering",
    skills: ["Docker", "Kubernetes", "AWS Cloud", "CI/CD Pipelines", "Linux & Shell", "Terraform"]
  },
  {
    stack: "Data Science & Machine Learning",
    skills: ["Python", "Pandas & NumPy", "Machine Learning", "TensorFlow / PyTorch", "Power BI", "SQL"]
  },
  {
    stack: "UI/UX & Product Design",
    skills: ["Figma", "Wireframing & Prototyping", "Design Systems", "User Research", "HTML/CSS"]
  },
  {
    stack: "Cyber Security & Ethical Hacking",
    skills: ["Network Security", "Penetration Testing", "Kali Linux", "OWASP Top 10", "Wireshark", "Burp Suite"]
  },
  {
    stack: "Golang Backend & Microservices",
    skills: ["Golang", "gRPC & Protobuf", "PostgreSQL", "Docker", "Redis", "Microservices"]
  },
  {
    stack: "Android Native Development",
    skills: ["Kotlin", "Android SDK", "Jetpack Compose", "Coroutines & Flow", "Room DB", "Retrofit"]
  },
  {
    stack: "Software QA & Test Automation",
    skills: ["Selenium WebDriver", "Cypress", "Playwright", "Postman / API Testing", "Java/Python", "Jest"]
  }
];

const levels = ["Intermediate", "Advanced", "Expert"];
const expLevels = ["Beginner to Intermediate", "Intermediate", "Advanced", "Expert"];

const students = [];

for (let i = 0; i < 100; i++) {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[(i * 3 + Math.floor(i / 10)) % lastNames.length];
  const fullName = `${firstName} ${lastName}`;
  const loc = locations[i % locations.length];
  const house = houseNames[(i * 2 + 5) % houseNames.length];
  const domain = techDomains[i % techDomains.length];
  const overallExp = expLevels[(i + 1) % expLevels.length];
  const age = 21 + (i % 6); // 21 to 26

  // Select 3 to 5 skills from domain
  const skillCount = 3 + (i % 3);
  const selectedSkills = domain.skills.slice(0, skillCount).map((skillName, idx) => {
    const levelIdx = (i + idx) % levels.length;
    const ratingBase = 7.0 + ((i * 7 + idx * 3) % 26) / 10; // ratings between 7.0 and 9.5
    return {
      skill: skillName,
      level: levels[levelIdx],
      rating: parseFloat(Math.min(ratingBase, 9.5).toFixed(1)),
      maxRating: 10
    };
  });

  students.push({
    id: i + 1,
    name: fullName,
    age: age,
    address: {
      houseName: house,
      street: loc.street,
      place: loc.place,
      city: loc.city,
      district: loc.district,
      state: "Kerala",
      pincode: loc.pincode
    },
    techStack: domain.stack,
    overallExperience: overallExp,
    skills: selectedSkills
  });
}

const outputPath = path.join(__dirname, 'students.json');
fs.writeFileSync(outputPath, JSON.stringify(students, null, 2), 'utf-8');
console.log(`Successfully generated ${students.length} students in ${outputPath}`);
