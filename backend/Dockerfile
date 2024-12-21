# l'image officiel de maven en specifiant la version
FROM maven:3.9.9-eclipse-temurin-23-noble AS build

WORKDIR /app

# Copie du code vers l'image à construire
COPY . .

# Construction du jar executable
RUN mvn clean package

# Image pour executer le code java
FROM openjdk:19-jdk-alpine3.16

WORKDIR /app

EXPOSE 8080

# Copie du Jar généré lors de la phase précédente
COPY --from=build /app/target/*.jar app.jar

# L'execution du jar lors du demarrage du conteneur
ENTRYPOINT ["java", "-jar", "app.jar"]
