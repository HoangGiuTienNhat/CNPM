package com.yourcompany.yourproject.dto;

import lombok.Data;

@Data
public class AIAdvisorRequestDto {
    private double gpa;
    private String needs; // e.g., "I want to improve Math", "I need IELTS preparation"
    private String goals; // e.g., "Get a scholarship", "Pass the exam"
}
