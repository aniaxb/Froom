# Use the official OpenJDK base image
FROM openjdk:17-slim

# Set the working directory inside the container
WORKDIR /app

# Install required dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl unzip && \
    rm -rf /var/lib/apt/lists/*

# Download and install Gradle
RUN curl -L https://services.gradle.org/distributions/gradle-7.4-bin.zip -o gradle.zip && \
    unzip gradle.zip && \
    rm gradle.zip && \
    mv gradle-7.4 /usr/local && \
    ln -s /usr/local/gradle-7.4/bin/gradle /usr/local/bin/gradle && \
    gradle --version

# Copy Gradle files
COPY build.gradle.kts settings.gradle.kts /app/

# Copy only the dependency-related files to optimize Docker caching
RUN mkdir -p build/src/main
COPY src/main/resources /app/src/main/resources
COPY build/libs /app/build/libs

# Build the application
RUN gradle build

# Copy the entire project to the container
COPY . /app

# Expose the port your application will run on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "build/libs/froom-backend-0.0.1-SNAPSHOT.jar"]