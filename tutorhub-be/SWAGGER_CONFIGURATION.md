# Swagger Configuration - Technical Documentation

## Overview
This document explains the Swagger/OpenAPI setup for TutorHub Backend, including configuration files, annotations, and best practices.

---

## 📦 Dependencies

The following dependency was added to `pom.xml`:

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>
```

This provides:
- ✅ Automatic OpenAPI documentation generation
- ✅ Swagger UI web interface
- ✅ API specification in JSON/YAML format
- ✅ Integration with Spring Security

---

## ⚙️ Configuration Files

### 1. `application.yml` - Swagger Configuration

```yaml
springdoc:
  api-docs:
    path: /v3/api-docs                    # OpenAPI JSON endpoint
  swagger-ui:
    enabled: true                         # Enable Swagger UI
    path: /swagger-ui.html               # Swagger UI path
    operations-sorter: method            # Sort by HTTP method
    tags-sorter: alpha                   # Sort tags alphabetically
    show-logo: true                      # Show Springdoc logo
    doc-expansion: list                  # Expand documentation by default
    display-operation-id: true           # Show operation IDs
  show-actuator: false                   # Hide actuator endpoints
  use-fqn: true                          # Use full class names
```

**Why this configuration?**
- Context path is `/api`, so Swagger adapts to this
- Operations sorted by HTTP method for consistency
- Tags sorted alphabetically for easy navigation
- Documentation expanded by default for better UX

### 2. `application.properties` - Cleaned Up

Removed duplicate Swagger configuration that was in `application.properties`:
```properties
# REMOVED - These are now in application.yml
# springdoc.swagger-ui.path=/swagger-ui.html
# springdoc.api-docs.path=/v3/api-docs
# springdoc.packages-to-scan=com.yourcompany.yourproject.controller
```

**Why?** 
- Single source of truth (only use `application.yml`)
- Reduces configuration conflicts
- YAML is more readable than properties file

---

## 📝 OpenApiConfig.java

### Location
`src/main/java/com/yourcompany/yourproject/config/OpenApiConfig.java`

### Configuration Details

```java
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .addServersItem(new Server()
                        .url("http://localhost:8080/api")
                        .description("Local Development Server"))
                .info(new Info()
                        .title("TutorHub API")
                        .version("1.0.0")
                        .description("...")
                        .contact(...)
                        .license(...))
                .components(new Components()
                        .addSecuritySchemes("Bearer Token", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("...")));
    }
}
```

### Key Elements

1. **Server Configuration**
   - Specifies the API base URL
   - Helps Swagger UI know where to send requests

2. **Info Block**
   - API title, version, and description
   - Contact and license information
   - Displayed at the top of Swagger UI

3. **Security Schemes**
   - Defines JWT Bearer token authentication
   - Used by endpoints marked with `@SecurityRequirement`

---

## 🏷️ Annotations - Best Practices

### Controller Level

```java
@RestController
@RequestMapping("/faculties")
@Tag(name = "Faculty", description = "APIs for managing faculties...")
@SecurityRequirement(name = "Bearer Token")
public class FacultyController {
    // All methods in this controller require Bearer Token auth
}
```

### Method Level - Operation

```java
@GetMapping("/{id}")
@Operation(
    summary = "Get faculty by ID",
    description = "Retrieve a specific faculty by its ID"
)
public ResponseEntity<FacultyResponseDto> getFacultyById(
        @Parameter(description = "Faculty ID", example = "1")
        @PathVariable Long id) {
    // Implementation
}
```

### Method Level - Responses

```java
@ApiResponses(value = {
    @ApiResponse(
        responseCode = "200",
        description = "Faculty found",
        content = @Content(
            mediaType = "application/json",
            schema = @Schema(implementation = FacultyResponseDto.class)
        )
    ),
    @ApiResponse(
        responseCode = "404",
        description = "Faculty not found"
    ),
    @ApiResponse(
        responseCode = "401",
        description = "Unauthorized - JWT token required"
    )
})
```

### Parameter Level

```java
@Parameter(
    description = "Faculty ID",
    example = "1",
    required = true
)
@PathVariable Long id
```

---

## 🔐 Security Configuration

### Modified: `SecurityConfig.java`

The security filter chain permits Swagger endpoints:

```java
.requestMatchers(
    "/v3/api-docs/**",
    "/swagger-ui/**",
    "/swagger-ui.html",
    "/swagger-resources/**",
    "/webjars/**"
).permitAll()
```

This allows:
- ✅ Public access to API documentation
- ✅ JWT token endpoints for login
- ✅ Swagger UI interface access
- ✅ All other endpoints require authentication

---

## 📂 Updated Controllers

### AuthController.java
Added comprehensive Swagger annotations:
- `@Tag` - Grouped as "Authentication"
- `@Operation` for each method
- `@ApiResponses` with all possible outcomes
- JWT Bearer token security requirement

Example:
```java
@PostMapping("/signin")
@Operation(summary = "User login", description = "...")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "..."),
    @ApiResponse(responseCode = "401", description = "..."),
    @ApiResponse(responseCode = "400", description = "...")
})
```

### FacultyController.java
Applied consistent annotation pattern:
- All CRUD operations documented
- Request/response schemas defined
- Parameters with examples
- Proper HTTP status codes

---

## 🔄 Swagger Refresh Flow

When you start the backend:

1. **Spring boots up** → Scans classpath for controllers
2. **Springdoc initialization** → Scans `@RestController` and `@Tag` annotations
3. **OpenAPI generation** → Creates API documentation from annotations
4. **Endpoints exposed**:
   - `/v3/api-docs` - OpenAPI JSON spec
   - `/swagger-ui.html` - Interactive UI
5. **Swagger UI loads** → Fetches spec from `/v3/api-docs`
6. **UI renders** → Shows all endpoints with documentation

---

## 🎯 For New Endpoints

When adding new endpoints, follow this pattern:

### 1. Create Controller Class
```java
@RestController
@RequestMapping("/resources")
@Tag(name = "Resources", description = "Resource management")
@SecurityRequirement(name = "Bearer Token")
public class ResourceController {
    
    @PostMapping
    @Operation(summary = "Create resource")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Created"),
        @ApiResponse(responseCode = "400", description = "Bad request"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<ResourceDto> create(@RequestBody ResourceDto dto) {
        // Implementation
    }
}
```

### 2. Annotations Checklist
- [ ] `@Tag` on class
- [ ] `@Operation` on methods
- [ ] `@ApiResponses` with status codes
- [ ] `@Parameter` on path/query variables
- [ ] `@SecurityRequirement` if needs auth
- [ ] Response schema examples

### 3. Test in Swagger UI
- [ ] Restart backend
- [ ] Open Swagger UI
- [ ] Find new endpoints
- [ ] Test with Swagger's "Try it out"

---

## 🐛 Debugging Tips

### Enable Debug Logging
Add to `application.yml`:
```yaml
logging:
  level:
    org.springdoc: DEBUG
    org.springframework.security: DEBUG
```

### Check Generated Spec
Open in browser:
```
http://localhost:8080/api/v3/api-docs
```

### Verify Annotations
Use IDE's search to find:
- `@RestController`
- `@Tag`
- `@Operation`
- Any missing annotations

---

## 📚 Files Modified/Created

| File | Type | Change |
|------|------|--------|
| `pom.xml` | Modified | Added springdoc dependency |
| `application.yml` | Modified | Added springdoc configuration |
| `application.properties` | Modified | Removed duplicate config |
| `OpenApiConfig.java` | Created | Custom OpenAPI bean |
| `AuthController.java` | Modified | Added Swagger annotations |
| `FacultyController.java` | Modified | Added Swagger annotations |
| `SWAGGER_GUIDE.md` | Created | User guide |
| `SWAGGER_QUICK_START.md` | Created | Quick reference |

---

## 🚀 Deployment Notes

### Production Configuration
For production, update `application.yml`:
```yaml
springdoc:
  swagger-ui:
    enabled: false  # Disable Swagger UI in production
```

Keep JSON endpoint enabled for monitoring/CI/CD:
```yaml
springdoc:
  api-docs:
    enabled: true  # Keep for API spec
```

### Docker Configuration
If using Docker, Swagger will be at:
```
http://<container-ip>:8080/api/swagger-ui.html
```

---

## 📖 References

- [Springdoc OpenAPI](https://springdoc.org/v1/#introduction)
- [OpenAPI 3.0 Specification](https://spec.openapis.org/oas/v3.0.3)
- [Swagger Annotations](https://github.com/swagger-api/swagger-core/wiki/Swagger-2.0-Java-Annotations)
- [Spring Security & OpenAPI](https://springdoc.org/#spring-security-support)

---

## ✅ Checklist - Swagger Integration Complete

- [x] Added springdoc dependency
- [x] Configured application.yml
- [x] Created OpenApiConfig bean
- [x] Updated SecurityConfig to allow Swagger access
- [x] Added annotations to AuthController
- [x] Added annotations to FacultyController
- [x] Created user documentation
- [x] Created quick start guide
- [x] Verified Swagger UI is accessible
- [x] Tested API authentication flow

---

**Last Updated:** January 22, 2026  
**Status:** ✅ Complete and Production Ready
