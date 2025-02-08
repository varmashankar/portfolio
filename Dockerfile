# Use Windows Server 2022 compatible base image
FROM mcr.microsoft.com/dotnet/aspnet:9.0-nanoserver-ltsc2022 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Use Windows Server 2022 compatible SDK for building
FROM mcr.microsoft.com/dotnet/sdk:9.0-nanoserver-ltsc2022 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy and restore dependencies
COPY ["portfolio.csproj", "."]
RUN dotnet restore "./portfolio.csproj"

# Copy the rest of the files and build the project
COPY . .
WORKDIR "/src/."
RUN dotnet build "./portfolio.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish the application
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./portfolio.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final production stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "portfolio.dll"]
