const fs = require('fs');
const path = require('path');

// Load dummy students data
const dataFilePath = path.join(__dirname, 'students.json');
let students = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

const PORT = process.env.PORT || 5000;

// Try loading Express. If not installed, seamlessly fall back to built-in http module
let expressAvailable = false;
try {
  require.resolve('express');
  require.resolve('cors');
  expressAvailable = true;
} catch (e) {
  expressAvailable = false;
}

if (expressAvailable) {
  const express = require('express');
  const cors = require('cors');

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Root route
  app.get('/', (req, res) => {
    res.json(getRootInfo());
  });

  // GET /api/students
  app.get('/api/students', (req, res) => {
    const { stack, city, skill } = req.query;
    const filtered = filterStudents({ stack, city, skill });
    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  });

  // GET /api/students/stack/:stackName
  app.get('/api/students/stack/:stackName', (req, res) => {
    const filtered = filterStudents({ stack: req.params.stackName });
    res.json({
      success: true,
      count: filtered.length,
      techStack: req.params.stackName,
      data: filtered
    });
  });

  // GET /api/students/:id
  app.get('/api/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    const student = students.find(s => s.id === studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${req.params.id} not found!`
      });
    }

    res.json({
      success: true,
      data: student
    });
  });

  // POST /api/students
  app.post('/api/students', (req, res) => {
    const newStudent = createStudent(req.body);
    if (!newStudent) {
      return res.status(400).json({
        success: false,
        message: 'Name and techStack are required fields.'
      });
    }
    students.push(newStudent);
    res.status(201).json({
      success: true,
      message: 'New student added successfully',
      data: newStudent
    });
  });

  // DELETE /api/students/:id
  app.delete('/api/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id, 10);
    const index = students.findIndex(s => s.id === studentId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found!`
      });
    }
    students.splice(index, 1);
    res.json({
      success: true,
      message: `Student with ID ${studentId} deleted successfully.`
    });
  });

  app.listen(PORT, () => {
    printServerBanner('Express');
  });

} else {
  // Built-in HTTP module fallback (Zero dependencies required!)
  const http = require('http');
  const url = require('url');

  const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname.replace(/\/$/, '') || '/';
    const query = parsedUrl.query;

    if (req.method === 'GET') {
      if (pathname === '/') {
        res.writeHead(200);
        res.end(JSON.stringify(getRootInfo(), null, 2));
      } else if (pathname === '/api/students') {
        const filtered = filterStudents(query);
        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          count: filtered.length,
          data: filtered
        }, null, 2));
      } else if (pathname.startsWith('/api/students/stack/')) {
        const stackName = decodeURIComponent(pathname.replace('/api/students/stack/', ''));
        const filtered = filterStudents({ stack: stackName });
        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          count: filtered.length,
          techStack: stackName,
          data: filtered
        }, null, 2));
      } else if (/^\/api\/students\/\d+$/.test(pathname)) {
        const id = parseInt(pathname.split('/').pop(), 10);
        const student = students.find(s => s.id === id);
        if (!student) {
          res.writeHead(404);
          res.end(JSON.stringify({ success: false, message: `Student with ID ${id} not found!` }));
        } else {
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, data: student }, null, 2));
        }
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, message: 'Endpoint not found' }));
      }
    } else if (req.method === 'POST' && pathname === '/api/students') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const newStudent = createStudent(parsed);
          if (!newStudent) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, message: 'Name and techStack are required fields.' }));
            return;
          }
          students.push(newStudent);
          res.writeHead(201);
          res.end(JSON.stringify({ success: true, message: 'New student added successfully', data: newStudent }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, message: 'Invalid JSON body' }));
        }
      });
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ success: false, message: 'Not Found' }));
    }
  });

  server.listen(PORT, () => {
    printServerBanner('Node Built-in HTTP (Standalone)');
  });
}

// Helper functions
function getRootInfo() {
  return {
    message: '🚀 Dummy Student Details API Server is running!',
    endpoints: {
      getAllStudents: 'GET /api/students',
      getStudentById: 'GET /api/students/:id',
      filterByStack: 'GET /api/students?stack=mern (or /api/students/stack/mean)',
      filterByCity: 'GET /api/students?city=kochi',
      filterBySkill: 'GET /api/students?skill=react',
      addNewStudent: 'POST /api/students'
    },
    totalStudents: students.length
  };
}

function filterStudents({ stack, city, skill }) {
  let filtered = [...students];

  if (stack) {
    const s = stack.toLowerCase();
    filtered = filtered.filter(st => st.techStack.toLowerCase().includes(s));
  }

  if (city) {
    const c = city.toLowerCase();
    filtered = filtered.filter(st =>
      (st.address.city && st.address.city.toLowerCase().includes(c)) ||
      (st.address.place && st.address.place.toLowerCase().includes(c))
    );
  }

  if (skill) {
    const sk = skill.toLowerCase();
    filtered = filtered.filter(st =>
      st.skills.some(item => item.skill.toLowerCase().includes(sk))
    );
  }

  return filtered;
}

function createStudent(data) {
  if (!data.name || !data.techStack) return null;
  return {
    id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
    name: data.name,
    age: data.age || null,
    address: data.address || {},
    techStack: data.techStack,
    overallExperience: data.overallExperience || 'Beginner',
    skills: data.skills || []
  };
}

function printServerBanner(engine) {
  console.log(`===============================================`);
  console.log(`🚀 Dummy Student API Server running! (${engine})`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`📚 API URL:   http://localhost:${PORT}/api/students`);
  console.log(`===============================================`);
}
