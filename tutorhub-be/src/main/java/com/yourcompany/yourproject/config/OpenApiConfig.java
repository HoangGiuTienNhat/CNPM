package com.yourcompany.yourproject.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for OpenAPI/Swagger documentation
 * Enables Swagger UI for API testing and documentation
 * 
 * Access Swagger UI at: http://localhost:8080/api/swagger-ui.html
 * Access OpenAPI JSON at: http://localhost:8080/api/v3/api-docs
 */
@Configuration
public class OpenApiConfig {

    /**
     * Customizes the OpenAPI configuration
     * @return OpenAPI configuration with API information and security schemes
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .addServersItem(new Server()
                        .url("http://localhost:8080/api")
                        .description("Local Development Server"))
                .info(new Info()
                        .title("TutorHub API")
                        .version("1.0.0")
                        .description("Comprehensive API documentation for TutorHub Backend - A modern tutoring platform")
                        .contact(new Contact()
                                .name("TutorHub Development Team")
                                .email("support@tutorhub.com")
                                .url("https://tutorhub.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")))
                .components(new Components()
                        .addSecuritySchemes("Bearer Token", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("JWT token for API authentication. Obtain token from /auth/signin endpoint")));
    }
}
