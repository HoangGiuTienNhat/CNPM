package com.yourcompany.yourproject.dto;

import lombok.Data;
import java.util.List;

@Data
public class AIAdvisorResponseDto {
    private String learningPath;
    private List<GroupResponseDto> suggestedGroups;
}
