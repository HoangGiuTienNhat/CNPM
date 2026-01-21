package com.yourcompany.yourproject.controller;

import com.yourcompany.yourproject.dto.AIAdvisorRequestDto;
import com.yourcompany.yourproject.dto.AIAdvisorResponseDto;
import com.yourcompany.yourproject.service.AIAdvisorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({ "/api/ai", "/ai" })
@RequiredArgsConstructor
@Slf4j
public class AIAdvisorController {

    private final AIAdvisorService aiAdvisorService;

    @PostMapping("/advisor")
    public ResponseEntity<AIAdvisorResponseDto> getLearningPath(@RequestBody AIAdvisorRequestDto request) {
        log.info("Received AI Advisor request. Data: {}", request);
        return ResponseEntity.ok(aiAdvisorService.getLearningPath(request));
    }
}
