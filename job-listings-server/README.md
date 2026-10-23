# IT Job Listings Dummy Server 💼

ഒരു ഡമ്മി ജോബ് പോർട്ടൽ / REST API സെർവർ. ഇതിൽ IT ഫീൽഡിലുള്ള ജോബ് ലിസ്റ്റിംഗുകൾ അടങ്ങിയിരിക്കുന്നു.

## 🚀 ഫീച്ചറുകൾ (Features)
- **സീറോ ഡിപൻഡൻസി (Zero Dependencies)**: Node.js മാത്രം മതി, `npm install` ചെയ്യേണ്ട ആവശ്യമില്ല!
- **CORS Enabled**: React, Angular, Vue, Flutter, Next.js തുടങ്ങിയ ഏത് ഫ്രണ്ട് എൻഡിൽ നിന്നും നേരിട്ട് വിളിക്കാം.
- **കംപ്ലീറ്റ് ഡീറ്റെയിൽസ്**:
  - `company` (കമ്പനി പേര്)
  - `title` (ജോബ് പോസ്റ്റ്)
  - `description` (ജോബ് വിവരണം)
  - `stack` (ഉപയോഗിക്കുന്ന ടെക്നോളജികൾ / സ്കിൽസ്)
  - `experience_level` (`Fresher` ആണോ `Experienced` ആണോ എന്ന വിവരം)
  - `experience_years` (എത്ര വർഷത്തെ പരിചയം)
  - `location`, `salary`, `posted_date`
- **ഫിൽട്ടറിംഗ് & സെർച്ച്**: Freshers മാത്രം വേണമെങ്കിലും, അല്ലെങ്കിൽ React / Python പോലുള്ള സ്റ്റാക്ക് അനുസരിച്ചും ഫിൽട്ടർ ചെയ്യാം.
- **വെബ് ഡാഷ്‌ബോർഡ്**: ബ്രൗസറിൽ `http://localhost:5001` ഓപ്പൺ ചെയ്താൽ എല്ലാ ജോലികളും കാണാനും സെർച്ച് ചെയ്യാനും സാധിക്കും.

---

## 💻 സെർവർ എങ്ങനെ റൺ ചെയ്യാം? (How to Run)

1. പ്രൊജക്റ്റ് ഫോൾഡറിലേക്ക് മാറുക:
   ```bash
   cd C:\Users\sanii\.gemini\antigravity\scratch\job-listings-server
   ```

2. സെർവർ സ്റ്റാർട്ട് ചെയ്യുക:
   ```bash
   node server.js
   ```
   *(അല്ലെങ്കിൽ `npm start` നൽകാം)*

3. ബ്രൗസറിൽ ഓപ്പൺ ചെയ്യുക:
   👉 **http://localhost:5001**

---

## 📡 API എൻഡ്പോയിന്റുകൾ (Endpoints)

| മെത്തേഡ് (Method) | എൻഡ്പോയിന്റ് (Endpoint) | വിവരണം (Description) |
|---|---|---|
| `GET` | `/api/jobs` | എല്ലാ ജോബ് ലിസ്റ്റിംഗുകളും കാണാൻ |
| `GET` | `/api/jobs?level=Fresher` | **ഫ്രഷേഴ്സിന് (Freshers)** മാത്രമുള്ള ജോബ്കൾ |
| `GET` | `/api/jobs?level=Experienced` | **എക്സ്പീരിയൻസ് (Experienced)** ഉള്ളവർക്ക് ഉള്ളവ |
| `GET` | `/api/jobs?stack=React` | നിർദ്ദിഷ്ട ടെക് സ്റ്റാക്ക് ഉള്ള ജോബുകൾ (ഉദാ: React, Python) |
| `GET` | `/api/jobs?search=developer` | കമ്പനി, ടൈറ്റിൽ, സ്റ്റാക്ക് എന്നിവ വെച്ചുള്ള സെർച്ച് |
| `GET` | `/api/jobs/1` | ഒരു പ്രത്യേക ജോബിന്റെ ഡീറ്റെയിൽസ് (ID പ്രകാരം) |
| `POST` | `/api/jobs` | പുതിയ ഒരു ജോബ് ആഡ് ചെയ്യാൻ |
| `DELETE` | `/api/jobs/:id` | ഒരു ജോബ് ഡിലീറ്റ് ചെയ്യാൻ |
| `GET` | `/api/stats` | ജോബ് സ്റ്റാറ്റിസ്റ്റിക്സ് (ആകെ എണ്ണം, സ്റ്റാക്കുകൾ) |

---

## 📝 സാമ്പിൾ ഡാറ്റാ ഫോർമാറ്റ് (JSON Sample)

```json
{
  "id": 1,
  "title": "Junior Frontend Developer",
  "company": "Infosys",
  "description": "Looking for enthusiastic Junior Frontend Developers to design and build responsive, intuitive web interfaces.",
  "stack": ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
  "experience_level": "Fresher",
  "experience_years": "0-1 Years",
  "location": "Kochi, Kerala (Hybrid)",
  "salary": "₹3.5 LPA - ₹4.5 LPA",
  "type": "Full-time",
  "posted_date": "2026-10-20"
}
```

---

## 🔌 ഫ്രണ്ട് എൻഡിൽ കണക്ട് ചെയ്യുന്നത് എങ്ങനെ? (Example Usage)

### 1. JavaScript `fetch()` ഉദാഹരണം:
```javascript
// ഫ്രഷേഴ്സിന്റെ ജോബ് ലിസ്റ്റ് ലഭിക്കാൻ
fetch('http://localhost:5001/api/jobs?level=Fresher')
  .then(res => res.json())
  .then(jobs => console.log(jobs));
```

### 2. പുതിയ ജോബ് ചേർക്കാൻ (POST Request):
```javascript
fetch('http://localhost:5001/api/jobs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Node.js Intern',
    company: 'Tech Solutions',
    description: 'Looking for eager learners passionate about backend APIs.',
    stack: ['Node.js', 'Express', 'MongoDB'],
    experience_level: 'Fresher',
    experience_years: '0-1 Years',
    location: 'Remote',
    salary: '₹15,000 / month'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```
