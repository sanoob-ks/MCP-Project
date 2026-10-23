# Student Dummy API Server (Node.js & Express)

ഒരു Node.js & Express വെബ് സെർവർ. ഇതിൽ വിദ്യാർത്ഥികളുടെ പേര്, വയസ്സ്, അഡ്രസ്സ് (സ്ഥലം, ജില്ല, പിൻകോഡ്), ടെക് സ്റ്റാക്ക് (MERN Stack, MEAN Stack, Angular, Python Full Stack മുതലായവ), ഓരോ ടെക്നോളജിയിലെയും സ്കിൽ ലെവലും റേറ്റിംഗും അടങ്ങിയ ഡമ്മി ഡാറ്റ ലഭ്യമാണ്.

---

## 🚀 എങ്ങിനെ റൺ ചെയ്യാം? (How to Run)

1. പ്രൊജക്റ്റ് ഫോൾഡറിലേക്ക് മാറുക:
   ```powershell
   cd C:\Users\sanii\.gemini\antigravity\scratch\student-dummy-server
   ```

2. ഡിപൻഡൻസികൾ ഇൻസ്റ്റാൾ ചെയ്യുക (ആദ്യ തവണ മാത്രം):
   ```bash
   npm install
   ```

3. സെർവർ സ്റ്റാർട്ട് ചെയ്യുക:
   ```bash
   npm start
   ```
   *(അല്ലെങ്കിൽ `node server.js` എന്ന് നൽകാം)*

സെർവർ സ്റ്റാർട്ട് ആകുമ്പോൾ ബ്രൗസറിലോ പോസ്റ്റ്മാനിലോ `http://localhost:5000` വഴി ഉപയോഗിക്കാം.

---

## 📡 API Endpoints & ഉദാഹരണങ്ങൾ

### 1. എല്ലാ വിദ്യാർത്ഥികളുടെയും വിവരങ്ങൾ ലഭിക്കാൻ (Get All Students)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students`

### 2. ഒരു വിദ്യാർത്ഥിയുടെ മാത്രം വിവരങ്ങൾ ID വെച്ച് എടുക്കാൻ (Get Single Student by ID)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students/1`

### 3. ടെക് സ്റ്റാക്ക് അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യാൻ (Filter by Tech Stack)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students?stack=mern`
- അല്ലെങ്കിൽ: `http://localhost:5000/api/students/stack/mean`
- അല്ലെങ്കിൽ: `http://localhost:5000/api/students/stack/angular`

### 4. സ്ഥലം / ജില്ല അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യാൻ (Filter by City/Place)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students?city=kochi`

### 5. സ്കിൽ അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യാൻ (Filter by Specific Skill)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students?skill=react`

---

## 📋 ഡാറ്റാ ഘടന (Sample Response Format)

```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 1,
      "name": "Rahul Krishna",
      "age": 22,
      "address": {
        "houseName": "Krishna Kripa",
        "street": "MG Road",
        "place": "Edappally",
        "city": "Kochi",
        "district": "Ernakulam",
        "state": "Kerala",
        "pincode": "682024"
      },
      "techStack": "MERN Stack",
      "overallExperience": "Intermediate",
      "skills": [
        {
          "skill": "MongoDB",
          "level": "Intermediate",
          "rating": 7.5,
          "maxRating": 10
        },
        {
          "skill": "Express.js",
          "level": "Advanced",
          "rating": 8.0,
          "maxRating": 10
        },
        {
          "skill": "React.js",
          "level": "Advanced",
          "rating": 8.5,
          "maxRating": 10
        },
        {
          "skill": "Node.js",
          "level": "Intermediate",
          "rating": 7.5,
          "maxRating": 10
        }
      ]
    }
  ]
}
```

---

## 💻 ഫ്രണ്ട്എൻഡിൽ (React/Angular/JS) എങ്ങനെ കോൾ ചെയ്യാം?

### JavaScript `fetch` ഉപയോഗിച്ച്:
```javascript
fetch('http://localhost:5000/api/students')
  .then(res => res.json())
  .then(data => {
    console.log('Students List:', data.data);
  })
  .catch(err => console.error('Error fetching students:', err));
```

### Async/Await ഉപയോഗിച്ച്:
```javascript
async function getStudents() {
  try {
    const response = await fetch('http://localhost:5000/api/students');
    const result = await response.json();
    console.log(result.data);
  } catch (error) {
    console.error('Failed to load students:', error);
  }
}
```
