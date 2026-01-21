# 🚀 Swagger UI - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Start Backend
```bash
cd tutorhub-be
mvn clean package -DskipTests
java -jar target/tutorhub-be-0.0.1-SNAPSHOT.war
```

Wait for this message:
```
Tomcat started on port 8080 (http) with context path '/api'
Started YourProjectApplication in X seconds
```

### Step 2: Open Swagger UI
Open your browser and go to:
```
http://localhost:8080/api/swagger-ui.html
```

### Step 3: Test Login
1. Find the **Authentication** section (blue background)
2. Click on **POST /auth/signin**
3. Click **Try it out**
4. Paste this JSON:
```json
{
  "email": "test@example.com",
  "password": "password"
}
```
5. Click **Execute**
6. Copy the JWT token from response

### Step 4: Authorize Requests
1. Click the blue **Authorize** button (top right)
2. Paste the token as: `Bearer <your-token>`
3. Click **Authorize** → **Close**

### Step 5: Test APIs
- Expand any endpoint
- Click **Try it out**
- Enter parameters/body
- Click **Execute**
- View the response!

---

## 📍 Key URLs

| Resource | URL |
|----------|-----|
| **Swagger UI** | `http://localhost:8080/api/swagger-ui.html` |
| **API Docs (JSON)** | `http://localhost:8080/api/v3/api-docs` |
| **Swagger Resources** | `http://localhost:8080/api/swagger-resources` |

---

## 🎯 Common Endpoints to Try

### Authentication
- `POST /auth/signin` - Login
- `POST /auth/register` - Register
- `GET /auth/me` - Get current user

### Faculty Management
- `GET /faculties` - List all faculties
- `POST /faculties` - Create faculty
- `GET /faculties/{id}` - Get faculty details

---

## 🔑 Default Test User

```
Email: test@example.com
Password: password
```

---

## ❌ Troubleshooting

| Problem | Solution |
|---------|----------|
| Cannot access Swagger | Ensure backend is running on port 8080 |
| 401 Unauthorized | Login first and add JWT token via Authorize button |
| Endpoints not showing | Restart backend after code changes |
| 500 Internal Error | Check backend console for error messages |

---

## 📚 For More Details
See **SWAGGER_GUIDE.md** in the same directory for comprehensive documentation.

---

**That's it! You're ready to explore the TutorHub API!** 🎉
