package com.yourcompany.yourproject.controller;

import com.yourcompany.yourproject.dto.FacultyRequestDto;
import com.yourcompany.yourproject.dto.FacultyResponseDto;
import com.yourcompany.yourproject.dto.FacultyStudentDto;
import com.yourcompany.yourproject.entity.Faculty;
import com.yourcompany.yourproject.service.FacultyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/faculties")
@Tag(name = "Faculty", description = "APIs for managing faculties and faculty-related data")
@SecurityRequirement(name = "Bearer Token")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    // Helper method to convert Entity to DTO
    private FacultyResponseDto convertToDto(Faculty faculty) {
        return new FacultyResponseDto(faculty.getId(), faculty.getName());
    }

    @PostMapping
    @Operation(
        summary = "Create a new faculty",
        description = "Create a new faculty with the provided name"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "201",
            description = "Faculty created successfully",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = FacultyResponseDto.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid faculty data"
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Unauthorized"
        )
    })
    public ResponseEntity<FacultyResponseDto> createFaculty(@Valid @RequestBody FacultyRequestDto facultyRequestDto) {
        log.info("FacultyController.createFaculty called with: {}", facultyRequestDto);
        Faculty createdFaculty = facultyService.createFaculty(facultyRequestDto);
        log.info("Faculty created successfully: {}", createdFaculty);
        return new ResponseEntity<>(convertToDto(createdFaculty), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(
        summary = "Get all faculties",
        description = "Retrieve a list of all faculties in the system"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "List of faculties retrieved successfully",
            content = @Content(
                mediaType = "application/json",
                array = @ArraySchema(schema = @Schema(implementation = FacultyResponseDto.class))
            )
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Unauthorized"
        )
    })
    public ResponseEntity<List<FacultyResponseDto>> getAllFaculties() {
        List<FacultyResponseDto> faculties = facultyService.getAllFaculties().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(faculties);
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Get faculty by ID",
        description = "Retrieve a specific faculty by its ID"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Faculty found and returned",
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
            description = "Unauthorized"
        )
    })
    public ResponseEntity<FacultyResponseDto> getFacultyById(
            @Parameter(description = "Faculty ID", example = "1")
            @PathVariable Long id) {
        Faculty faculty = facultyService.getFacultyById(id);
        return ResponseEntity.ok(convertToDto(faculty));
    }

    @PutMapping("/{id}")
    @Operation(
        summary = "Update faculty",
        description = "Update an existing faculty's information"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Faculty updated successfully",
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
            responseCode = "400",
            description = "Invalid faculty data"
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Unauthorized"
        )
    })
    public ResponseEntity<FacultyResponseDto> updateFaculty(
            @Parameter(description = "Faculty ID", example = "1")
            @PathVariable Long id,
            @Valid @RequestBody FacultyRequestDto facultyRequestDto) {
        Faculty updatedFaculty = facultyService.updateFaculty(id, facultyRequestDto);
        return ResponseEntity.ok(convertToDto(updatedFaculty));
    }

    @DeleteMapping("/{id}")
    @Operation(
        summary = "Delete faculty",
        description = "Delete a faculty from the system"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "204",
            description = "Faculty deleted successfully"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Faculty not found"
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Unauthorized"
        )
    })
    public ResponseEntity<Void> deleteFaculty(
            @Parameter(description = "Faculty ID", example = "1")
            @PathVariable Long id) {
        facultyService.deleteFaculty(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/students")
    @Operation(
        summary = "Get faculty students",
        description = "Get list of students in a faculty with optional filtering by group or tutor"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "List of students retrieved successfully",
            content = @Content(
                mediaType = "application/json",
                array = @ArraySchema(schema = @Schema(implementation = FacultyStudentDto.class))
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Faculty not found"
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Unauthorized"
        )
    })
    public ResponseEntity<List<FacultyStudentDto>> getFacultyStudents(
            @Parameter(description = "Faculty ID", example = "1")
            @PathVariable("id") Long facultyId,
            @Parameter(description = "Optional group ID for filtering", example = "5")
            @RequestParam(required = false) Long groupId,
            @Parameter(description = "Optional tutor ID for filtering", example = "10")
            @RequestParam(required = false) Long tutorId) {
        log.info("FacultyController.getFacultyStudents called with facultyId: {}, groupId: {}, tutorId: {}",
                facultyId, groupId, tutorId);
        List<FacultyStudentDto> students = facultyService.getFacultyStudents(facultyId, groupId, tutorId);
        log.info("Retrieved {} students for faculty: {}", students.size(), facultyId);
        return ResponseEntity.ok(students);
    }
}
