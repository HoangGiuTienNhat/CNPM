# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Spring Boot tạo file .war trong thư mục target, chúng ta copy nó ra
COPY --from=build /app/target/*.war app.war
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.war"]




# FROM maven:3-openjdk-17 AS build
# WORKDIR /app

# COPY . .
# RUN mvn clean package -DskipTests

# # Run stage
# FROM eclipse-temurin:17-jdk
# WORKDIR /app

# COPY --from=build /app/target/tutorhub-be-0.0.1-SNAPSHOT.war demo.war
# EXPOSE 8080

# ENTRYPOINT ["java","-jar","demo.war"]
















