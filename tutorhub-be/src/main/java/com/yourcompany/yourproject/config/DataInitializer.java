package com.yourcompany.yourproject.config;

import com.yourcompany.yourproject.entity.Faculty;
import com.yourcompany.yourproject.entity.User;
import com.yourcompany.yourproject.repository.FacultyRepository;
import com.yourcompany.yourproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional; // Thêm dòng này

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FacultyRepository facultyRepository;

    @Override
    @Transactional // Thêm annotation này để quản lý giao dịch tốt hơn
    public void run(String... args) throws Exception {
        // 1. Tạo Faculty mặc định
        Faculty defaultFaculty = facultyRepository.findByName("Default Faculty").orElseGet(() -> {
            Faculty faculty = Faculty.builder().name("Default Faculty").build();
            return facultyRepository.save(faculty);
        });

        // 2. Tạo test user (Xóa .uid)
        if (!userRepository.existsByEmail("test@example.com")) {
            User testUser = User.builder()
                    .email("test@example.com")
                    .userName("testuser")
                    .password(passwordEncoder.encode("password123"))
                    .role("USER")
                    .build();

            userRepository.save(testUser);
            log.info("Test user created: test@example.com");
        }

        // 3. Tạo admin user (Xóa .uid)
        if (!userRepository.existsByEmail("admin@tutorhub.com")) {
            User adminUser = User.builder()
                    .email("admin@tutorhub.com")
                    .userName("Administrator")
                    .password(passwordEncoder.encode("admin123"))
                    .role("ADMIN")
                    .build();

            userRepository.save(adminUser);
            log.info("Admin user created: admin@tutorhub.com");
        }

        // 4. Tạo student user (Xóa .uid)
        if (!userRepository.existsByEmail("student@tutorhub.com")) {
            User studentUser = User.builder()
                    .email("student@tutorhub.com")
                    .userName("Nguyễn Văn A")
                    .password(passwordEncoder.encode("student123"))
                    .role("STUDENT")
                    .faculty(defaultFaculty)
                    .build();

            userRepository.save(studentUser);
            log.info("Student user created: student@tutorhub.com");
        }

        // 5. Tạo tutor user (Xóa .uid)
        if (!userRepository.existsByEmail("tutor@tutorhub.com")) {
            User tutorUser = User.builder()
                    .email("tutor@tutorhub.com")
                    .userName("Trần Thị B")
                    .password(passwordEncoder.encode("tutor123"))
                    .role("TUTOR")
                    .faculty(defaultFaculty)
                    .build();

            userRepository.save(tutorUser);
            log.info("Tutor user created: tutor@tutorhub.com");
        }
    }
}