# Use an OpenJDK image as the base
FROM openjdk:23-jdk-slim

# Set the working directory
WORKDIR /app



# Expose the application port (default: 8080)
EXPOSE 8080

COPY target/*.jar /opt/app.jar
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar
