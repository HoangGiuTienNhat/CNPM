# Project Overview

This document provides a comprehensive overview of the TutorHub project, including setup instructions, API testing, and the feature development workflow.

## 1. Project Description

TutorHub is a platform designed to connect students with tutors. It provides a seamless experience for finding, scheduling, and managing tutoring sessions.

### Core Features:

- **User Authentication:** Secure user registration and login with JWT.
- **Tutor Profiles:** Tutors can create and manage their profiles.
- **Search and Filter:** Students can search for tutors based on various criteria.
- **Booking System:** Easy scheduling and management of tutoring sessions.

## 2. Running the Project

bảng student-group là  bảng chứa các lớp học
user-group là bảng chứa các lớp học - các sinh viên
consultation-reg là bảng chứa các buổi học - sinh viên


To run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd tutorhub-be
    ```
3.  **Install dependencies:**
    ```bash
    mvn install
    ```
4.  **Run the application:**
    ```bash
    mvn spring-boot:run
    ```

The application will be accessible at `http://localhost:8080`.

## 3. Swagger/OpenAPI Documentation ⭐ NEW

TutorHub now includes comprehensive API documentation through Swagger UI. All endpoints are automatically documented with interactive testing capabilities.

### 📍 Quick Access

```
Swagger UI:        http://localhost:8080/api/swagger-ui.html
OpenAPI JSON Spec: http://localhost:8080/api/v3/api-docs
```

### 🚀 Quick Start (5 minutes)

1. **Start the backend:**
   ```bash
   cd tutorhub-be
   mvn clean package -DskipTests
   java -jar target/tutorhub-be-0.0.1-SNAPSHOT.war
   ```

2. **Open Swagger UI:**
   - Navigate to: `http://localhost:8080/api/swagger-ui.html`

3. **Test endpoints:**
   - Find endpoint in Swagger UI
   - Click "Try it out"
   - Enter parameters/body
   - Click "Execute"

### 🔐 Authentication Flow

1. Go to **Authentication** section
2. Call `POST /auth/signin` with test credentials:
   ```json
   {
     "email": "test@example.com",
     "password": "password"
   }
   ```
3. Copy the JWT token from response
4. Click **Authorize** button (top right)
5. Paste token as: `Bearer <your-token>`
6. Now all authenticated endpoints are accessible

### 📚 Documentation Files

- **SWAGGER_QUICK_START.md** - 5-minute guide to get started
- **SWAGGER_GUIDE.md** - Comprehensive user guide
- **SWAGGER_CONFIGURATION.md** - Technical details & setup
- **SWAGGER_ANNOTATIONS_CHEATSHEET.md** - Code templates for new endpoints
- **SWAGGER_INTEGRATION_SUMMARY.md** - Complete implementation overview

### 📝 Featured Endpoints

**Authentication (Public)**
- `POST /auth/signin` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user (requires auth)
- `GET /auth/test` - Health check

**Faculty (Protected)**
- `GET /faculties` - List all faculties
- `POST /faculties` - Create faculty
- `GET /faculties/{id}` - Get faculty details
- `PUT /faculties/{id}` - Update faculty
- `DELETE /faculties/{id}` - Delete faculty

### 🎯 For Developers

When adding new endpoints, see **SWAGGER_ANNOTATIONS_CHEATSHEET.md** for copy-paste templates.

Example:
```java
@GetMapping
@Operation(summary = "Get items")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Success"),
    @ApiResponse(responseCode = "401", description = "Unauthorized")
})
public ResponseEntity<List<ItemDto>> getAll() {
    // Implementation
}
```

---

## 4. Testing the Login API

To test the login API, you can use Swagger UI, Postman, or curl.

**Using Swagger UI (Recommended):**
1. Go to `http://localhost:8080/api/swagger-ui.html`
2. Expand "Authentication" section
3. Click on `POST /auth/signin`
4. Click "Try it out"
5. Enter test credentials
6. Click "Execute"

**Using Postman:**
- **URL:** `http://localhost:8080/api/auth/signin`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "password"
  }
  ```

## 5. Feature Development Workflow

To ensure smooth collaboration, please follow this workflow when developing new features:

1.  **Create a new branch:**
    ```bash
    git checkout -b feature/<feature-name>
    ```
2.  **Implement the feature:** Write your code and add any necessary tests.
3.  **Commit your changes:**
    ```bash
    git commit -m "feat: add feature-name"
    ```
4.  **Push to the repository:**
    ```bash
    git push origin feature/<feature-name>
    ```
5.  **Create a pull request:** Open a pull request for review and merge.

## 5. Project Structure

```
tutorhub-be/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/yourcompany/yourproject/
│   │   │       ├── config/           # Configuration classes
│   │   │       │   ├── SecurityConfig.java
│   │   │       │   └── security/     # Security-related configs
│   │   │       ├── controller/       # REST Controllers
│   │   │       ├── service/          # Business logic
│   │   │       ├── repository/       # Data access layer
│   │   │       ├── model/           # Entity classes
│   │   │       └── dto/             # Data Transfer Objects
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application-dev.properties
│   └── test/                        # Test files
├── pom.xml                          # Maven dependencies
└── README.md
```

## 6. Database Setup

### Prerequisites:

- MySQL 8.0 or higher
- Create database: `CREATE DATABASE tutorhub;`

### Configuration:

Update `application.properties` with your database credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tutorhub
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## 7. API Endpoints

### Authentication Endpoints:

- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/refresh` - Refresh JWT token

### User Management:

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/{id}` - Delete user (Admin only)

### Tutor Management:

- `GET /api/tutors` - Get all tutors
- `GET /api/tutors/{id}` - Get tutor by ID
- `POST /api/tutors` - Create tutor profile
- `PUT /api/tutors/{id}` - Update tutor profile

### Booking System:

- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Cancel booking

## 8. Testing API với Postman

### Bước 1: Đăng ký tài khoản mới

```
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
    "email": "pctsv@hcmut.edu.vn",
    "password": "12345678",
    "userName": "Phong CTSV",
    "role": "Officer"
}
```

### Bước 2: Đăng nhập

```
POST http://localhost:8080/auth/signin
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "password123"
}
```

**Response sẽ trả về:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "roles": ["ROLE_STUDENT"]
}
```

### Bước 3: Sử dụng token để truy cập API bảo mật

```
GET http://localhost:8080/api/users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 9. Quy trình phát triển tính năng

### 9.1 Phân tích yêu cầu

1. **Tạo User Story:** Mô tả tính năng từ góc độ người dùng
2. **Xác định API endpoints:** Liệt kê các endpoint cần thiết
3. **Thiết kế database:** Tạo/cập nhật các bảng cần thiết
4. **Tạo mockup/wireframe:** Nếu có giao diện

### 9.2 Implementation Steps

1. **Tạo Entity classes** (model)
2. **Tạo Repository interfaces**
3. **Implement Service layer** (business logic)
4. **Tạo Controller** (REST endpoints)
5. **Tạo DTO classes** cho request/response
6. **Viết unit tests**
7. **Test integration**

### 9.3 Code Review Checklist

- [ ] Code tuân thủ coding standards
- [ ] Có đầy đủ error handling
- [ ] Có validation cho input
- [ ] Có unit tests với coverage >= 80%
- [ ] API documentation được cập nhật
- [ ] Security được implement đúng cách

## 10. Coding Standards & Best Practices

### 10.1 Naming Conventions

- **Classes:** PascalCase (VD: `UserController`, `TutorService`)
- **Methods:** camelCase (VD: `getUserById`, `createBooking`)
- **Variables:** camelCase (VD: `userId`, `tutorProfile`)
- **Constants:** UPPER_SNAKE_CASE (VD: `MAX_RETRY_ATTEMPTS`)

### 10.2 Package Structure

```
com.yourcompany.yourproject.
├── controller/     # REST Controllers
├── service/        # Business Logic
├── repository/     # Data Access
├── model/          # JPA Entities
├── dto/            # Data Transfer Objects
├── config/         # Configuration Classes
├── exception/      # Custom Exceptions
└── util/           # Utility Classes
```

### 10.3 Error Handling

- Sử dụng `@ControllerAdvice` cho global exception handling
- Tạo custom exceptions cho business logic
- Trả về consistent error response format:

```json
{
  "timestamp": "2023-10-23T15:50:24.453Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/users"
}
```

## 11. Environment Setup

### 11.1 Development Tools

- **IDE:** IntelliJ IDEA hoặc Eclipse
- **Java:** JDK 11 hoặc cao hơn
- **Maven:** 3.6+
- **Database:** MySQL 8.0+
- **API Testing:** Postman hoặc Insomnia

### 11.2 Environment Variables

Tạo file `.env` hoặc cấu hình trong IDE:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tutorhub
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400
```

## 12. Deployment

### 12.1 Production Checklist

- [ ] Cấu hình database production
- [ ] Set up environment variables
- [ ] Enable HTTPS
- [ ] Configure logging levels
- [ ] Set up monitoring và health checks
- [ ] Backup strategy

### 12.2 Docker Support (Optional)

```dockerfile
FROM openjdk:11-jre-slim
COPY target/tutorhub-be-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 13. Team Communication

### 13.1 Daily Standup Format

- **Yesterday:** Công việc đã hoàn thành
- **Today:** Công việc sẽ làm hôm nay
- **Blockers:** Vấn đề cần hỗ trợ

### 13.2 Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

---

**Liên hệ:** Nếu có thắc mắc, hãy tạo issue trên GitHub hoặc liên hệ team lead.
