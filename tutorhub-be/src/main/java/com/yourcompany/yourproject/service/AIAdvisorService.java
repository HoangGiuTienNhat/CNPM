package com.yourcompany.yourproject.service;

import com.yourcompany.yourproject.dto.*;
import com.yourcompany.yourproject.entity.Group;
import com.yourcompany.yourproject.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.util.List;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AIAdvisorService {

    private final GroupRepository groupRepository;
    private final GeminiService geminiService;

    public AIAdvisorResponseDto getLearningPath(AIAdvisorRequestDto request) {
        List<Group> allGroups = groupRepository.findAll();

        // 1. Generate Learning Path using Gemini
        StringBuilder prompt = new StringBuilder();
        prompt.append("Act as an academic advisor. A student has the following profile:\n");
        prompt.append("GPA: ").append(request.getGpa()).append("\n");
        prompt.append("Needs: ").append(request.getNeeds()).append("\n");
        prompt.append("Goals: ").append(request.getGoals()).append("\n\n");
        prompt.append("We have the following study groups available in our system:\n");

        for (Group group : allGroups) {
            prompt.append("- ID: ").append(group.getId()).append(", Name: ").append(group.getGroupName())
                    .append(", Subject/Description: ").append(group.getDescription()).append("\n");
        }

        prompt.append("\nPlease provide a personalized learning path for this student. ");
        prompt.append("Also, recommend the best 3 groups from the list above that match their needs. ");
        prompt.append("Format the response as follows:\n");
        prompt.append("Learning Path: [Your detailed advice]\n");
        prompt.append("Recommended Group IDs: [id1, id2, id3]");

        String aiResponse = geminiService.generateContent(prompt.toString());

        // 2. Parse Suggested Groups (Simple heuristic parsing or just return all logic)
        // For simplicity, we will just return the AI text and try to find groups
        // mentioned in the response ID list if possible.
        // Or we can ask Gemini to return JSON. For now, let's just return the text and
        // maybe filter groups if we can.

        // Let's improve prompt to ask for standard format to parse easier if we want
        // structured data?
        // For this MVP, we will return the text and a filtered list of groups based on
        // simple keyword matching or just return top matches if logic permits.
        // Actually, let's keep it simple: Return the full text response.
        // AND validation: try to identifying IDs in the response?

        List<GroupResponseDto> suggestedGroups = new ArrayList<>();
        // Simple parser to find IDs in brackets like [1, 5, 10]
        try {
            if (aiResponse.contains("Recommended Group IDs:")) {
                String idPart = aiResponse.split("Recommended Group IDs:")[1].trim();
                idPart = idPart.replace("[", "").replace("]", "");
                String[] ids = idPart.split(",");
                for (String id : ids) {
                    try {
                        Long groupId = Long.parseLong(id.trim());
                        allGroups.stream().filter(g -> g.getId().equals(groupId)).findFirst()
                                .ifPresent(g -> suggestedGroups.add(mapToDto(g)));
                    } catch (NumberFormatException ignored) {
                    }
                }
            }
        } catch (Exception e) {
            // parsing failed, no groups suggested in structured format
        }

        AIAdvisorResponseDto response = new AIAdvisorResponseDto();
        response.setLearningPath(aiResponse);
        response.setSuggestedGroups(suggestedGroups);

        return response;
    }

    private GroupResponseDto mapToDto(Group group) {
        GroupResponseDto dto = new GroupResponseDto();
        dto.setId(group.getId());
        dto.setGroupName(group.getGroupName());
        dto.setDescription(group.getDescription());
        dto.setStudentLimit(group.getStudentLimit());
        dto.setStatus(group.getStatus());
        dto.setStartDate(group.getStartDate());
        dto.setEndDate(group.getEndDate());

        // Basic mapping for Tutor and Faculty (might need more detailed mapping if
        // null)
        if (group.getTutor() != null) {
            UserDto tutorDto = new UserDto();
            tutorDto.setUid(group.getTutor().getUid());
            tutorDto.setUserName(group.getTutor().getUserName()); // Assuming User has getUserName
            dto.setTutor(tutorDto);
        }

        return dto;
    }
}
