# Swagger Annotations Cheat Sheet

Copy and paste these annotation templates for new endpoints.

---

## 📦 Imports Required

Add these to the top of your controller file:

```java
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
```

---

## 🏗️ Template 1: Simple GET Endpoint

```java
@GetMapping("/{id}")
@Operation(
    summary = "Get item by ID",
    description = "Retrieve a specific item by its unique identifier"
)
@ApiResponses(value = {
    @ApiResponse(
        responseCode = "200",
        description = "Item found",
        content = @Content(
            mediaType = "application/json",
            schema = @Schema(implementation = ItemDto.class)
        )
    ),
    @ApiResponse(
        responseCode = "404",
        description = "Item not found"
    ),
    @ApiResponse(
        responseCode = "401",
        description = "Unauthorized"
    )
})
public ResponseEntity<ItemDto> getItem(
        @Parameter(description = "Item ID", example = "1")
        @PathVariable Long id) {
    // Implementation
}
```

---

## 🏗️ Template 2: POST Endpoint (Create)

```java
@PostMapping
@Operation(
    summary = "Create new item",
    description = "Create a new item with the provided information"
)
@ApiResponses(value = {
    @ApiResponse(
        responseCode = "201",
        description = "Item created successfully",
        content = @Content(
            mediaType = "application/json",
            schema = @Schema(implementation = ItemDto.class)
        )
    ),
    @ApiResponse(
        responseCode = "400",
        description = "Invalid item data"
    ),
    @ApiResponse(
        responseCode = "401",
        description = "Unauthorized"
    )
})
public ResponseEntity<ItemDto> createItem(
        @RequestBody ItemDto itemDto) {
    // Implementation
}
```

---

## 🏗️ Template 3: GET List Endpoint

```java
@GetMapping
@Operation(
    summary = "Get all items",
    description = "Retrieve a list of all items in the system"
)
@ApiResponses(value = {
    @ApiResponse(
        responseCode = "200",
        description = "List retrieved successfully",
        content = @Content(
            mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = ItemDto.class))
        )
    ),
    @ApiResponse(
        responseCode = "401",
        description = "Unauthorized"
    )
})
public ResponseEntity<List<ItemDto>> getAll() {
    // Implementation
}
```

---

## 🏗️ Template 4: PUT Endpoint (Update)

```java
@PutMapping("/{id}")
@Operation(
    summary = "Update item",
    description = "Update an existing item's information"
)
@ApiResponses(value = {
    @ApiResponse(
        responseCode = "200",
        description = "Item updated successfully",
        content = @Content(
            mediaType = "application/json",
            schema = @Schema(implementation = ItemDto.class)
        )
    ),
    @ApiResponse(
        responseCode = "404",
        description = "Item not found"
    ),
    @ApiResponse(
        responseCode = "400",
        description = "Invalid item data"
    ),
    @ApiResponse(
        responseCode = "401",
        description = "Unauthorized"
    )
})
public ResponseEntity<ItemDto> updateItem(
        @Parameter(description = "Item ID", example = "1")
        @PathVariable Long id,
        @RequestBody ItemDto itemDto) {
    // Implementation
}
```

---

## 🏗️ Template 5: DELETE Endpoint

```java
@DeleteMapping("/{id}")
@Operation(
    summary = "Delete item",
    description = "Delete an item from the system"
)
@ApiResponses(value = {
    @ApiResponse(
        responseCode = "204",
        description = "Item deleted successfully"
    ),
    @ApiResponse(
        responseCode = "404",
        description = "Item not found"
    ),
    @ApiResponse(
        responseCode = "401",
        description = "Unauthorized"
    )
})
public ResponseEntity<Void> deleteItem(
        @Parameter(description = "Item ID", example = "1")
        @PathVariable Long id) {
    // Implementation
}
```

---

## 🏗️ Template 6: Endpoint with Query Parameters

```java
@GetMapping("/search")
@Operation(
    summary = "Search items",
    description = "Search items by criteria with optional filtering"
)
@ApiResponses(value = {
    @ApiResponse(
        responseCode = "200",
        description = "Search results",
        content = @Content(
            mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = ItemDto.class))
        )
    ),
    @ApiResponse(
        responseCode = "400",
        description = "Invalid search parameters"
    ),
    @ApiResponse(
        responseCode = "401",
        description = "Unauthorized"
    )
})
public ResponseEntity<List<ItemDto>> search(
        @Parameter(description = "Search keyword", example = "laptop")
        @RequestParam(required = false) String keyword,
        @Parameter(description = "Price range (max)", example = "1000")
        @RequestParam(required = false) Double maxPrice,
        @Parameter(description = "Page number", example = "1")
        @RequestParam(defaultValue = "1") Integer page) {
    // Implementation
}
```

---

## 🏗️ Template 7: Controller Class

```java
@RestController
@RequestMapping("/items")
@Tag(
    name = "Items",
    description = "APIs for managing items and item-related operations"
)
@SecurityRequirement(name = "Bearer Token")
public class ItemController {
    
    // Add your methods here with individual @Operation annotations
}
```

---

## 📝 Annotation Reference

### @Tag (Class Level)
```java
@Tag(
    name = "Items",                    // Category name in Swagger UI
    description = "Item management"    // Description shown
)
```

### @Operation (Method Level)
```java
@Operation(
    summary = "Brief description",           // Title in Swagger UI
    description = "Detailed description",    // Help text
    operationId = "listItems"               // (Optional) Operation ID
)
```

### @ApiResponse (Method Level)
```java
@ApiResponse(
    responseCode = "200",                    // HTTP status code
    description = "Success message",         // What it means
    content = @Content(
        mediaType = "application/json",
        schema = @Schema(implementation = ItemDto.class)  // Response type
    )
)
```

### @ApiResponses (Method Level - Multiple)
```java
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "..."),
    @ApiResponse(responseCode = "400", description = "..."),
    @ApiResponse(responseCode = "401", description = "...")
})
```

### @Parameter (Parameter Level)
```java
@Parameter(
    description = "Item ID",      // What this parameter is
    example = "123",              // Example value
    required = true               // Is it required?
)
@PathVariable Long id
```

### @SecurityRequirement (Class or Method Level)
```java
@SecurityRequirement(name = "Bearer Token")  // Marks endpoint as requiring JWT auth
```

---

## 🚨 Common Status Codes to Use

| Code | When to Use |
|------|------------|
| **200** | Successful GET, PUT, DELETE response |
| **201** | Resource successfully created (POST) |
| **204** | Successful DELETE with no content |
| **400** | Invalid request data/parameters |
| **401** | Authentication required or invalid token |
| **403** | Authenticated but not authorized |
| **404** | Resource not found |
| **409** | Conflict (e.g., duplicate resource) |
| **500** | Internal server error |

---

## ✅ Checklist for New Endpoints

When adding a new endpoint, ensure you have:

- [ ] `@Tag` on controller class
- [ ] `@Operation` on the method with summary and description
- [ ] `@ApiResponses` with at least:
  - [ ] Success response (200, 201, 204)
  - [ ] Error response (400, 401)
- [ ] `@Parameter` on path variables with description and example
- [ ] `@SecurityRequirement` if authentication is required
- [ ] Proper schema types for request/response bodies
- [ ] Clear, user-friendly descriptions
- [ ] Tested via Swagger UI before committing

---

## 💡 Best Practices

1. **Be Descriptive**
   - ❌ "Get user"
   - ✅ "Get authenticated user profile with detailed information"

2. **Include Examples**
   - Always provide `example` values in `@Parameter`
   - Makes testing easier in Swagger UI

3. **Document All Status Codes**
   - Don't just document success (200)
   - Include error scenarios (400, 401, 404)

4. **Use Meaningful Names**
   - ❌ "item", "obj", "data"
   - ✅ "userId", "productName", "createdDate"

5. **Group Related Endpoints**
   - Use same `@Tag` for related endpoints
   - Swagger UI automatically groups them

6. **Keep Descriptions Current**
   - Update annotations when logic changes
   - Outdated documentation is worse than none

---

## 🔗 Quick Copy-Paste URLs

After starting backend:

```
Swagger UI:        http://localhost:8080/api/swagger-ui.html
OpenAPI JSON:      http://localhost:8080/api/v3/api-docs
Swagger Resources: http://localhost:8080/api/swagger-resources
```

---

## 📞 Need Help?

1. Check existing controllers (AuthController, FacultyController) for examples
2. Review SWAGGER_CONFIGURATION.md for detailed explanation
3. Use SWAGGER_GUIDE.md for user documentation
4. Check [Springdoc Official Docs](https://springdoc.org/)

---

**Last Updated:** January 22, 2026
