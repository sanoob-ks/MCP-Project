const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5001;
const DATA_FILE = path.join(__dirname, 'jobs.json');

// Helper to read jobs data
function getJobs() {
  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading jobs file:', err);
    return [];
  }
}

// Helper to save jobs data
function saveJobs(jobs) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving jobs file:', err);
    return false;
  }
}

// Helper to send JSON responses
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data, null, 2));
}

// Helper to parse JSON body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (err) {
        reject(new Error('Invalid JSON format in request body'));
      }
    });
    req.on('error', err => reject(err));
  });
}

// HTML Dashboard for visiting in browser
function getDashboardHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IT Jobs Dummy API Server</title>
  <style>
    :root {
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --fresher: #059669;
      --fresher-bg: #ecfdf5;
      --exp: #7c3aed;
      --exp-bg: #f5f3ff;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #1e293b;
      --text-muted: #64748b;
      --border: #e2e8f0;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    body { background-color: var(--bg); color: var(--text); padding: 2rem 1rem; }
    .container { max-width: 1100px; margin: 0 auto; }
    header { margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1.5rem; }
    h1 { font-size: 2rem; color: #0f172a; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; }
    p.subtitle { color: var(--text-muted); font-size: 1.05rem; }
    
    .api-docs {
      background: #1e293b;
      color: #f1f5f9;
      border-radius: 10px;
      padding: 1.25rem;
      margin-bottom: 2rem;
      font-size: 0.95rem;
    }
    .api-docs h2 { font-size: 1.15rem; color: #38bdf8; margin-bottom: 0.75rem; }
    .api-docs code { background: #334155; padding: 0.2rem 0.4rem; border-radius: 4px; color: #fed7aa; font-family: monospace; }
    .endpoints { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem; margin-top: 0.75rem; }
    .endpoint-item { background: #0f172a; padding: 0.6rem 0.8rem; border-radius: 6px; border-left: 4px solid #38bdf8; }
    
    .controls { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; align-items: center; justify-content: space-between; }
    .search-input {
      padding: 0.65rem 1rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      width: 320px;
      font-size: 0.95rem;
      background: white;
    }
    .filters { display: flex; gap: 0.5rem; }
    .btn {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: white;
      color: var(--text);
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }
    .btn:hover { background: #f1f5f9; }
    .btn.active { background: var(--primary); color: white; border-color: var(--primary); }
    
    .job-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 1.25rem; }
    .job-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.25rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .job-card:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
    .card-top { margin-bottom: 1rem; }
    .job-title { font-size: 1.2rem; font-weight: 600; color: #0f172a; margin-bottom: 0.25rem; }
    .company { font-size: 0.95rem; font-weight: 500; color: #475569; display: flex; align-items: center; gap: 0.4rem; }
    .badge-level {
      display: inline-block;
      padding: 0.25rem 0.6rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 0.5rem;
    }
    .badge-fresher { background: var(--fresher-bg); color: var(--fresher); border: 1px solid #a7f3d0; }
    .badge-exp { background: var(--exp-bg); color: var(--exp); border: 1px solid #ddd6fe; }
    
    .desc { font-size: 0.9rem; color: #475569; line-height: 1.45; margin: 0.8rem 0; }
    .meta { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem; display: flex; flex-direction: column; gap: 0.25rem; }
    .meta-item { display: flex; align-items: center; gap: 0.35rem; }
    
    .stack-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.75rem; }
    .tag { background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.55rem; border-radius: 6px; font-size: 0.75rem; font-weight: 500; }
    
    .stats-bar { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem; font-weight: 500; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>💼 IT Job Listings Dummy Server</h1>
      <p class="subtitle">A mock REST API backend providing IT job listings with tech stack and experience levels (Freshers & Experienced).</p>
    </header>

    <div class="api-docs">
      <h2>⚡ Quick API Endpoints</h2>
      <div class="endpoints">
        <div class="endpoint-item"><code>GET /api/jobs</code> &mdash; Get all jobs</div>
        <div class="endpoint-item"><code>GET /api/jobs?level=Fresher</code> &mdash; Freshers only</div>
        <div class="endpoint-item"><code>GET /api/jobs?level=Experienced</code> &mdash; Experienced only</div>
        <div class="endpoint-item"><code>GET /api/jobs?stack=React</code> &mdash; Filter by tech stack</div>
        <div class="endpoint-item"><code>GET /api/jobs?search=python</code> &mdash; Full text search</div>
        <div class="endpoint-item"><code>GET /api/jobs/1</code> &mdash; Single job details</div>
        <div class="endpoint-item"><code>POST /api/jobs</code> &mdash; Create a new job</div>
        <div class="endpoint-item"><code>DELETE /api/jobs/:id</code> &mdash; Delete a job</div>
      </div>
    </div>

    <div class="controls">
      <div class="filters">
        <button class="btn active" onclick="filterJobs('all')">All Jobs</button>
        <button class="btn" onclick="filterJobs('Fresher')">🎓 Freshers Only</button>
        <button class="btn" onclick="filterJobs('Experienced')">💼 Experienced Only</button>
      </div>
      <input type="text" id="searchInput" class="search-input" placeholder="Search by title, company, or stack..." onkeyup="handleSearch()">
    </div>

    <div class="stats-bar" id="statsBar">Loading jobs...</div>
    <div class="job-list" id="jobGrid"></div>
  </div>

  <script>
    let allJobs = [];
    let currentFilter = 'all';

    async function loadJobs() {
      try {
        const res = await fetch('/api/jobs');
        allJobs = await res.json();
        renderJobs();
      } catch (err) {
        document.getElementById('jobGrid').innerHTML = '<p>Error loading jobs.</p>';
      }
    }

    function filterJobs(level) {
      currentFilter = level;
      document.querySelectorAll('.filters .btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
      renderJobs();
    }

    function handleSearch() {
      renderJobs();
    }

    function renderJobs() {
      const q = document.getElementById('searchInput').value.toLowerCase().trim();
      let filtered = allJobs;

      if (currentFilter !== 'all') {
        filtered = filtered.filter(j => j.experience_level.toLowerCase() === currentFilter.toLowerCase());
      }

      if (q) {
        filtered = filtered.filter(j => 
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          (j.stack && j.stack.some(s => s.toLowerCase().includes(q))) ||
          j.description.toLowerCase().includes(q)
        );
      }

      document.getElementById('statsBar').innerText = \`Showing \${filtered.length} of \${allJobs.length} IT Jobs\`;

      const grid = document.getElementById('jobGrid');
      if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #64748b;">No jobs matching your filter.</div>';
        return;
      }

      grid.innerHTML = filtered.map(job => {
        const isFresher = job.experience_level.toLowerCase() === 'fresher';
        const badgeClass = isFresher ? 'badge-fresher' : 'badge-exp';
        const tags = (job.stack || []).map(s => \`<span class="tag">\${s}</span>\`).join('');

        return \`
          <div class="job-card">
            <div class="card-top">
              <div class="job-title">\${job.title}</div>
              <div class="company">🏢 \${job.company}</div>
              <span class="badge-level \${badgeClass}">\${job.experience_level} (\${job.experience_years || 'N/A'})</span>
              <p class="desc">\${job.description}</p>
            </div>
            <div>
              <div class="meta">
                <div class="meta-item">📍 \${job.location || 'Remote'}</div>
                <div class="meta-item">💰 \${job.salary || 'Competitive'}</div>
              </div>
              <div class="stack-tags">
                \${tags}
              </div>
            </div>
          </div>
        \`;
      }).join('');
    }

    loadJobs();
  </script>
</body>
</html>`;
}

// Request dispatcher
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // 1. Home Dashboard UI
  if (pathname === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(getDashboardHTML());
  }

  // 2. GET /api/jobs - List with filters
  if (pathname === '/api/jobs' && method === 'GET') {
    let jobs = getJobs();
    const query = parsedUrl.query;

    // Filter by experience level (e.g. ?level=Fresher or ?experience=experienced)
    const level = query.level || query.experience || query.experience_level;
    if (level) {
      const lvlLower = level.toLowerCase();
      jobs = jobs.filter(j => j.experience_level && j.experience_level.toLowerCase().includes(lvlLower));
    }

    // Filter by company (e.g. ?company=Infosys)
    if (query.company) {
      const compLower = query.company.toLowerCase();
      jobs = jobs.filter(j => j.company && j.company.toLowerCase().includes(compLower));
    }

    // Filter by stack (e.g. ?stack=React or ?stack=Python)
    if (query.stack) {
      const stackLower = query.stack.toLowerCase();
      jobs = jobs.filter(j => 
        Array.isArray(j.stack) && j.stack.some(s => s.toLowerCase().includes(stackLower))
      );
    }

    // Search query across title, description, company, stack
    if (query.search || query.q) {
      const q = (query.search || query.q).toLowerCase();
      jobs = jobs.filter(j => 
        (j.title && j.title.toLowerCase().includes(q)) ||
        (j.company && j.company.toLowerCase().includes(q)) ||
        (j.description && j.description.toLowerCase().includes(q)) ||
        (Array.isArray(j.stack) && j.stack.some(s => s.toLowerCase().includes(q)))
      );
    }

    return sendJSON(res, 200, jobs);
  }

  // 3. GET /api/jobs/:id - Single job
  const singleMatch = pathname.match(/^\/api\/jobs\/(\d+)$/);
  if (singleMatch && method === 'GET') {
    const id = parseInt(singleMatch[1], 10);
    const jobs = getJobs();
    const job = jobs.find(j => j.id === id);
    if (!job) {
      return sendJSON(res, 404, { success: false, error: `Job with ID ${id} not found.` });
    }
    return sendJSON(res, 200, job);
  }

  // 4. POST /api/jobs - Create new job
  if (pathname === '/api/jobs' && method === 'POST') {
    try {
      const body = await parseRequestBody(req);

      // Validation
      if (!body.title || !body.company || !body.stack || !body.experience_level) {
        return sendJSON(res, 400, {
          success: false,
          error: 'Missing required fields. Required: title, company, stack, experience_level'
        });
      }

      const jobs = getJobs();
      const newId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id || 0)) + 1 : 1;

      const newJob = {
        id: newId,
        title: body.title,
        company: body.company,
        description: body.description || '',
        stack: Array.isArray(body.stack) ? body.stack : [body.stack],
        experience_level: body.experience_level, // 'Fresher' or 'Experienced'
        experience_years: body.experience_years || (body.experience_level.toLowerCase() === 'fresher' ? '0-1 Years' : '2+ Years'),
        location: body.location || 'Remote',
        salary: body.salary || 'Not disclosed',
        type: body.type || 'Full-time',
        posted_date: new Date().toISOString().split('T')[0]
      };

      jobs.push(newJob);
      saveJobs(jobs);

      return sendJSON(res, 201, {
        success: true,
        message: 'Job listing created successfully',
        job: newJob
      });
    } catch (err) {
      return sendJSON(res, 400, { success: false, error: err.message });
    }
  }

  // 5. DELETE /api/jobs/:id - Delete job
  if (singleMatch && method === 'DELETE') {
    const id = parseInt(singleMatch[1], 10);
    let jobs = getJobs();
    const exists = jobs.some(j => j.id === id);

    if (!exists) {
      return sendJSON(res, 404, { success: false, error: `Job with ID ${id} not found.` });
    }

    jobs = jobs.filter(j => j.id !== id);
    saveJobs(jobs);

    return sendJSON(res, 200, {
      success: true,
      message: `Job with ID ${id} deleted successfully.`
    });
  }

  // 6. GET /api/stats - Helpful summary
  if (pathname === '/api/stats' && method === 'GET') {
    const jobs = getJobs();
    const freshers = jobs.filter(j => j.experience_level && j.experience_level.toLowerCase() === 'fresher').length;
    const experienced = jobs.filter(j => j.experience_level && j.experience_level.toLowerCase() === 'experienced').length;

    // Unique stacks
    const stackSet = new Set();
    jobs.forEach(j => {
      if (Array.isArray(j.stack)) j.stack.forEach(s => stackSet.add(s));
    });

    return sendJSON(res, 200, {
      total_jobs: jobs.length,
      freshers_count: freshers,
      experienced_count: experienced,
      all_stacks: Array.from(stackSet)
    });
  }

  // 404 Not Found
  return sendJSON(res, 404, {
    success: false,
    error: 'Endpoint not found',
    available_endpoints: [
      'GET /api/jobs',
      'GET /api/jobs?level=Fresher',
      'GET /api/jobs?level=Experienced',
      'GET /api/jobs?stack=React',
      'GET /api/jobs?search=python',
      'GET /api/jobs/:id',
      'POST /api/jobs',
      'DELETE /api/jobs/:id',
      'GET /api/stats'
    ]
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Dummy Jobs Server is running on http://localhost:${PORT}`);
  console.log(`📄 Dashboard & API docs: http://localhost:${PORT}/`);
  console.log(`📦 REST Endpoint: http://localhost:${PORT}/api/jobs`);
  console.log(`=======================================================`);
});
