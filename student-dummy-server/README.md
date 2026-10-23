# Student Dummy API Server (Node.js)

ഒരു Node.js വെബ് സെർവർ. ഇതിൽ 100 വിദ്യാർത്ഥികളുടെ പൂർണ്ണ വിവരങ്ങൾ (പേര്, വയസ്സ്, അഡ്രസ്സ്, വിവിധ ഐടി ടെക് സ്റ്റാക്കുകൾ, സ്കില്ലുകൾ & റേറ്റിംഗുകൾ) അടങ്ങിയ ഡമ്മി ഡാറ്റ ലഭ്യമാണ്.

ഒരൊറ്റ API കോൾ വഴി (`GET /api/students`) 100 വിദ്യാർത്ഥികളുടെയും വിവരങ്ങൾ ഒന്നിച്ച് ലഭിക്കും.

---

## 🚀 എങ്ങിനെ റൺ ചെയ്യാം? (How to Run)

1. പ്രൊജക്റ്റ് ഫോൾഡറിലേക്ക് മാറുക:
   ```powershell
   cd C:\Users\sanii\.gemini\antigravity\scratch\student-dummy-server
   ```

2. സെർവർ സ്റ്റാർട്ട് ചെയ്യുക:
   ```bash
   node server.js
   ```

സെർവർ സ്റ്റാർട്ട് ആകുമ്പോൾ ബ്രൗസറിലോ പോസ്റ്റ്മാനിലോ `http://localhost:5000` വഴി ഉപയോഗിക്കാം.

---

## 📡 പ്രധാന API Endpoints

### 1. 100 വിദ്യാർത്ഥികളുടെയും വിവരങ്ങൾ ഒരൊറ്റ കോളിൽ ലഭിക്കാൻ:
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students`

**റെസ്‌പോൺസ് ഫോർമാറ്റ്:**
```json
{
  "success": true,
  "count": 100,
  "data": [
    {
      "id": 1,
      "name": "Rahul Krishna",
      "age": 21,
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
      "overallExperience": "Advanced",
      "skills": [
        { "skill": "MongoDB", "level": "Intermediate", "rating": 7.5, "maxRating": 10 },
        { "skill": "Express.js", "level": "Advanced", "rating": 8.0, "maxRating": 10 },
        { "skill": "React.js", "level": "Expert", "rating": 8.5, "maxRating": 10 }
      ]
    }
    // ... 100 വിദ്യാർത്ഥികൾ വരെ
  ]
}
```

### 2. ഒരു വിദ്യാർത്ഥിയുടെ മാത്രം വിവരങ്ങൾ എടുക്കാൻ (ID: 1 to 100):
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students/50`

### 3. ടെക് സ്റ്റാക്ക് അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യാൻ:
- **Flutter:** `http://localhost:5000/api/students?stack=flutter`
- **MERN Stack:** `http://localhost:5000/api/students?stack=mern`
- **DevOps:** `http://localhost:5000/api/students?stack=devops`
- **Data Science:** `http://localhost:5000/api/students?stack=data`
- **Cyber Security:** `http://localhost:5000/api/students?stack=cyber`
- **Java Spring Boot:** `http://localhost:5000/api/students?stack=java`

---

## 💻 ഫ്രണ്ട്‌എൻഡിൽ 100 വിദ്യാർത്ഥികളെ ഫെച്ച് ചെയ്യുന്നതിനുള്ള കോഡ്:

### JavaScript `fetch` / React Example:
```javascript
async function getAllStudents() {
  try {
    const response = await fetch('http://localhost:5000/api/students');
    const result = await response.json();
    
    console.log(`ആകെ ലഭിച്ച വിദ്യാർത്ഥികൾ: ${result.count}`);
    console.log('വിദ്യാർത്ഥികളുടെ ലിസ്റ്റ്:', result.data);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}

// കോൾ ചെയ്യാൻ
getAllStudents();
```
