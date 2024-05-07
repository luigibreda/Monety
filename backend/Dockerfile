# Use uma imagem base do OpenJDK para o Java
FROM openjdk:17-jdk-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo JAR do seu aplicativo Spring Boot para o diretório de trabalho no contêiner
COPY ./target/login-auth-api-0.0.1-SNAPSHOT.jar /app/login-auth-api-0.0.1-SNAPSHOT.jar

# Exponha a porta que o aplicativo Spring Boot está ouvindo
EXPOSE 8080

# Comando a ser executado quando o contêiner for iniciado
CMD ["java", "-jar", "login-auth-api-0.0.1-SNAPSHOT.jar"]
