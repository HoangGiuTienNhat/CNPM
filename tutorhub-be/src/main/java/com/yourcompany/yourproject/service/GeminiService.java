package com.yourcompany.yourproject.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${groq.api.key:${GROQ_API_KEY:your-groq-api-key-here}}")
    private String apiKey;

    private static final String GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
    private static final String MODEL = "llama-3.3-70b-versatile";

    private final RestTemplate restTemplate;

    public GeminiService() {
        this.restTemplate = new RestTemplate();
    }

    public String generateContent(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        // Groq uses OpenAI-compatible API format
        Map<String, Object> message = Map.of(
                "role", "user",
                "content", prompt);

        Map<String, Object> requestBody = Map.of(
                "model", MODEL,
                "messages", Collections.singletonList(message),
                "temperature", 0.7,
                "max_tokens", 2048);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(GROQ_URL, entity, Map.class);
            return extractTextFromResponse(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            return "Error calling Groq API: " + e.getMessage();
        }
    }

    private String extractTextFromResponse(Map responseBody) {
        if (responseBody == null)
            return "";
        try {
            // Groq/OpenAI format: choices[0].message.content
            List<Object> choices = (List<Object>) responseBody.get("choices");
            if (choices == null || choices.isEmpty())
                return "";
            Map<String, Object> choice = (Map<String, Object>) choices.get(0);
            Map<String, Object> message = (Map<String, Object>) choice.get("message");
            return (String) message.get("content");
        } catch (Exception e) {
            return "Error parsing Groq response";
        }
    }
}
