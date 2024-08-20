# Use the official OpenJDK base image
FROM openjdk:11-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Copy Gradle files
COPY build.gradle.kts settings.gradle.kts /app/

# Copy only the dependency-related files to optimize Docker caching
RUN mkdir -p build/src/main
COPY src/main/resources /app/src/main/resources
COPY build/libs /app/build/libs

# Download and install Gradle
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/* && \
    curl -L https://services.gradle.org/distributions/gradle-7.3.3-bin.zip -o gradle.zip && \
    unzip gradle.zip && \
    rm gradle.zip && \
    mv gradle-7.3.3 /usr/local && \
    ln -s /usr/local/gradle-7.3.3/bin/gradle /usr/local/bin/gradle && \
    gradle --version

# Build the application
RUN gradle build

# Copy the entire project to the container
COPY . /app

# Expose the port your application will run on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "build/libs/froom-backend-0.0.1-SNAPSHOT.jar"]