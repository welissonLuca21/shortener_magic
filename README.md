# Project Documentation

This documentation provides an overview of the project structure, setup instructions, and important information regarding the Shortener Magic application. It includes details about the folder structure, scripts, naming conventions, design patterns, and coding standards used in the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Design Patterns](#design-patterns)
- [Naming Conventions](#naming-conventions)
- [API Documentation](#api-documentation)
- [Communication](#communication)

## Prerequisites

Before setting up the Shortener Magic application, make sure you have the following prerequisites installed on your system:

- Node.js (version 18.x or later)
- npm (version 6.x or later)
- Docker (version 17.06 or later)
- Docker Compose (version 1.17 or later)

## Getting Started

To get the Shortener Magic application up and running, follow the steps below:

### Installation

1. Clone the repository:

git clone {repo}
cd {repo}


2. Install the dependencies:

npm install


### Environment Variables

Create a `.env` file in the root directory and add the following environment variables with their respective values:

```bash
# Postgres configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=shortener
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/shortener

# JWT configuration
JWT_SECRET_KEY=
JWT_EXPIRES_IN=

# Sentry configuration
SENTRY_DNS=

# SendGrid configuration
SENDGRID_CONFIRM_ACCOUNT_TEMPLATE_ID=
SENDGRID_WELCOME_SUBJECT="Bem-vindo ao Shortener Magic!"
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

# Application configuration
APP_URL=http://localhost:4000
APP_PORT=4000
```

Note: Please replace the values with appropriate ones or use fake data for development purposes.

Database Setup
Start the PostgreSQL database using Docker Compose

docker-compose up -d
Run the database migrations:
npm run prisma generate

Scripts
The following scripts are available to run various tasks in the Shortener Magic application:
```bash
build: Builds the application using NestJS.
start: Starts the application in production mode.
start:dev: Starts the application in development mode with hot-reloading.
start:debug: Starts the application in debug mode with hot-reloading.
lint: Lints the TypeScript source code using ESLint with the Airbnb rules and applies automatic fixes.
test: Runs the unit tests using Jest.
To execute a script, use the command npm run <script-name>.
```

### Technologies Used
The Shortener Magic application utilizes the following main technologies and libraries:

*NestJS*: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
*Prisma ORM*: An object-relational mapping (ORM) tool for TypeScript and JavaScript, providing database access and manipulation.
*SendGrid*: An email delivery service for sending transactional and marketing emails.
*Docker*: A platform for developing, shipping, and running applications in containers.

### Project Structure
The project follows a specific folder structure to maintain organization and separation of concerns. Here's an overview of the main directories and their purposes:

```bash
📂 src/
├── 📂 configs/         # Project configuration files and settings
├── 📂 database/        # Database configuration and manipulation
│   ├── 📂 repositories/  #  Perform database operations and encapsulate data access logic.
├── 📂 modules/         # Main project modules
│   ├── 📂 auth/        # Authentication module: handles user authentication and authorization
│   │   ├── 📂 controllers/  # Controllers for handling HTTP requests
│   │   ├── 📂 services/     # Business logic services
│   │   ├── 📂 interfaces/   # Shared interfaces and type definitions
│   │   └── 📂 dtos/         # Data Transfer Objects used for data validation and transformation
├── 📂 providers/       # Providers for external services or libraries
└── 📂 shared/          # Shared components and utilities
    ├── 📂 database/    # Shared database components and utilities
    ├── 📂 decorators/  # Custom decorators used throughout the project
    ├── 📂 interfaces/  # Shared interfaces and type definitions
    ├── 📂 interceptors/       # Custom interceptors used for request validation
    └── 📂 utils/       # Shared utility functions and helper modules
```
## Design Patterns
The Shortener Magic application follows the Module design pattern to organize the codebase into self-contained modules. Each module consists of the following layers:

Controllers: Handle HTTP requests and invoke services to process the requests.
Services: Contain the business logic and interact with repositories and providers.
Repositories: Perform database operations and encapsulate data access logic.
In addition to these module-specific layers, the Shortener Magic application also utilizes a Providers layer. The Providers layer consists of globally accessible classes that encapsulate logic for external services or libraries. These classes can be shared among all modules and files in the project.

This modular approach, along with the inclusion of a Providers layer, promotes separation of concerns, reusability, and maintainability of the codebase. It also facilitates easier testing and enhances overall code comprehension.

### Naming Conventions
The Shortener Magic application follows the following naming conventions for files:

*kebab-case*: Used for naming files and directories.
Examples: create-user.service.ts, create-user.controller.ts, user.repository.ts
The use of clear and descriptive names helps improve code readability and maintainability.

### API Documentation
The Shortener Magic application provides interactive API documentation generated from the Swagger specification. To access the documentation, start the application and navigate to http://localhost:4000/docs or https://shortener-magic.onrender.com/docs in your browser.

### Communication
For any questions, concerns, or feedback related to the Shortener Magic application, please reach out to the project team through the designated communication channels.



### Melhorias
- [ ] Adicionar testes unitários e de integração
- [ ] Adicionar testes de e2e
- [ ] Separar ambientes de desenvolvimento, homologação e produção
- [ ] Adicionar autenticação via OAuth
- [ ] Adicionar cache para consultas frequentes
- [ ] Adicionar rate limiting para proteção contra ataques de força bruta
- [ ] Utilizar arquitetura de microsserviços para escalabilidade
- [ ] Adicionar modulo de administração para gerenciamento de usuários e links
- [ ] Adicionar suporte para múltiplos domínios
- [ ] Adicionar suporte para personalização de links
- [ ] Adicionar escaneamento de links para detecção de malware