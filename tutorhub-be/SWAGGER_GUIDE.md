# TutorHub API - Swagger UI Guide

## Overview
Swagger UI provides an interactive interface to explore and test all API endpoints of the TutorHub backend. All endpoints are fully documented with descriptions, request/response examples, and status codes.

---

## 🚀 How to Access Swagger UI

### Option 1: Direct Browser Access
After starting the backend server, open your browser and navigate to:

```
http://localhost:8080/api/swagger-ui.html
```

### Option 2: OpenAPI JSON Documentation
For programmatic access, the full API specification in JSON format is available at:

```
http://localhost:8080/api/v3/api-docs
```

### Option 3: Swagger Resources
Additional Swagger resources can be accessed at:

```
http://localhost:8080/api/swagger-resources
```

---

## 🔧 Starting the Backend Server

### Prerequisites
- Java 17 or higher installed
- Maven installed
- MySQL database running
- Database credentials configured in `application.yml`

### Running the Application

1. **Using Maven:**
   ```bash
   cd tutorhub-be
   mvn spring-boot:run
   ```

2. **Using JAR File:**
   ```bash
   cd tutorhub-be
   mvn clean package -DskipTests
   java -jar target/tutorhub-be-0.0.1-SNAPSHOT.war
   ```

3. **Expected Output:**
   ```
   2026-01-22 00:59:43 - Tomcat started on port 8080 (http) with context path '/api'
   2026-01-22 00:59:43 - Started YourProjectApplication in 8.844 seconds
   ```

Once you see the "Started YourProjectApplication" message, the server is ready!

---

## 📚 API Documentation Structure

The Swagger UI is organized by API tags (categories):

### **Authentication** 
- `POST /auth/signin` - User login with email/password
- `POST /auth/register` - Register new user account
- `GET /auth/me` - Get current authenticated user profile
- `GET /auth/test` - Health check endpoint

### **Faculty**
- `POST /faculties` - Create new faculty
- `GET /faculties` - List all faculties
- `GET /faculties/{id}` - Get faculty by ID
- `PUT /faculties/{id}` - Update faculty
- `DELETE /faculties/{id}` - Delete faculty
- `GET /faculties/{id}/students` - Get students in faculty

### Additional Categories
Other controllers follow the same pattern with comprehensive documentation for all CRUD operations.

---

## 🔐 Authentication with JWT

Most endpoints (except `/auth/**`) require JWT authentication. Here's how to use Swagger UI with authentication:

### Step 1: Get JWT Token
1. Expand the **Authentication** section in Swagger UI
2. Click on `POST /auth/signin`
3. Click **"Try it out"**
4. Enter credentials:
   ```json
   {
     "email": "test@example.com",
     "password": "password"
   }
   ```
5. Click **Execute**
6. Copy the JWT token from the response

### Step 2: Authenticate Requests
1. Look for the **Authorize** button (top right of Swagger UI)
2. Click it and enter your JWT token in format:
   ```
   Bearer <your-jwt-token>
   ```
3. Click **Authorize**
4. All subsequent requests will include the JWT token

---

## 🧪 Testing Endpoints

### Example: Create a Faculty

1. Navigate to the **Faculty** section
2. Click on `POST /faculties`
3. Click **"Try it out"**
4. Enter the request body:
   ```json
   {
     "name": "Computer Science"
   }
   ```
5. Click **Execute**
6. View the response with HTTP status code

### Response Format
- **Success (201):** Returns the created faculty with ID
- **Error (400):** Validation errors displayed
- **Error (401):** Authentication required

---

## 📋 Request/Response Examples

Each endpoint in Swagger UI shows:

✅ **Request Schema** - Input parameters and body structure  
✅ **Response Schema** - Expected output format  
✅ **Status Codes** - Possible HTTP responses  
✅ **Example Values** - Sample data for testing  
✅ **Parameter Description** - What each field means  

---

## 🔍 Key Features of Swagger UI

| Feature | Description |
|---------|-------------|
| **Try It Out** | Send real requests to the API |
| **Authorize** | Add JWT token for authenticated endpoints |
| **Model Schema** | View data structure definitions |
| **Response Examples** | See actual response formats |
| **cURL Command** | View raw cURL command for each request |
| **Response Headers** | See HTTP headers in response |

---

## ⚙️ Configuration Details

Swagger is configured in `application.yml`:

```yaml
springdoc:
  api-docs:
    path: /v3/api-docs
  swagger-ui:
    enabled: true
    path: /swagger-ui.html
    operations-sorter: method
    tags-sorter: alpha
    show-logo: true
    doc-expansion: list
    display-operation-id: true
  show-actuator: false
  use-fqn: true
```

### Key Settings:
- **enabled**: Swagger UI is enabled
- **path**: Access Swagger UI at `/api/swagger-ui.html`
- **operations-sorter**: Sort by HTTP method (GET, POST, etc.)
- **tags-sorter**: Sort API sections alphabetically
- **doc-expansion**: Show documentation by default

---

## 🛡️ Security Configuration

### Public Endpoints (No Authentication Required)
- `/auth/**` - All authentication endpoints
- `/public/**` - Public resources
- `/statistics/**` - Public statistics
- `/v3/api-docs/**` - API documentation
- `/swagger-ui/**` - Swagger UI interface

### Protected Endpoints (Authentication Required)
All other endpoints require valid JWT token in:
```
Authorization: Bearer <jwt-token>
```

---

## 📱 Adding Endpoints to Swagger

When adding new endpoints, use these annotations:

```java
@RestController
@RequestMapping("/resources")
@Tag(name = "Resources", description = "Resource management endpoints")
public class ResourceController {

    @GetMapping("/{id}")
    @Operation(summary = "Get resource by ID", description = "Retrieve a specific resource")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Resource found"),
        @ApiResponse(responseCode = "404", description = "Resource not found"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @SecurityRequirement(name = "Bearer Token")
    public ResponseEntity<ResourceDto> getResource(
            @Parameter(description = "Resource ID")
            @PathVariable Long id) {
        // Implementation
    }
}
```

### Required Annotations:
- `@Tag` - Group related endpoints
- `@Operation` - Describe the endpoint
- `@ApiResponses` - Document possible responses
- `@Parameter` - Document parameters
- `@SecurityRequirement` - Mark if authentication required

---

## 🐛 Troubleshooting

### Swagger UI Not Loading
- Ensure backend is running: `http://localhost:8080/api/swagger-ui.html`
- Check if port 8080 is available
- Verify `application.yml` configuration

### API Docs Return 500 Error
- Check backend logs for error messages
- Ensure all controllers have `@Tag` annotation
- Verify JWT configuration in SecurityConfig

### Authentication Not Working
- Ensure `/auth/signin` returns a valid token
- Token should start with "Bearer " prefix
- Check token hasn't expired (default: 24 hours)

### Cannot See New Endpoints
- Rebuild the project: `mvn clean package`
- Restart the backend server
- Clear browser cache (Ctrl+Shift+Delete)

---

## 📞 Support

For API support or questions about endpoints:
1. Check Swagger UI documentation first
2. Review endpoint descriptions and examples
3. Check backend logs for error messages
4. Contact: support@tutorhub.com

---

## 📚 Additional Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)
- [Springdoc OpenAPI Documentation](https://springdoc.org/)
- [Swagger UI User Guide](https://swagger.io/tools/swagger-ui/)
- [JWT Authentication Guide](https://jwt.io/introduction)

---

**Last Updated:** January 22, 2026  
**API Version:** 1.0.0  
**Backend Version:** TutorHub 0.0.1-SNAPSHOT
