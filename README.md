# NestJS MariaDB API

A NestJS products application using MariaDB with Docker and Prisma ORM.

## Requirements

- Node.js 20+
- Docker & Docker Compose
- Yarn package manager
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/theviniis/silapay-api.git
cd silapay-api
```

### 2. Environment Setup

Create a `.env` file in the root directory based on `.env.example` file

### 3. Install Dependencies

```bash
yarn install
```

### 4. Start Docker Container

```bash
docker-compose up -d
```

> **_NOTE:_** Wait for the MariaDB container to be fully initialized

### 5. Database Setup

```bash
yarn prisma db push
yarn prisma generate
```

### 6. Start the Application

```bash
yarn start:dev
```

The application will be available at `http://localhost:${DB_PORT}/api`

## Deployment

### Option 1: Docker Deployment

1. Build the Docker image:

```bash
docker build -t nestjs .
```

2. Run the container:

```bash
docker run -p ${DB_PORT}:${DB_PORT} --env-file .env nestjs
```

### Option 2: Traditional Deployment

1. Build the application:

```bash
yarn build
```

2. Start the production server:

```bash
yarn start:prod
```

## Database Migrations

To create a new migration:

```bash
yarn prisma migrate dev --name migration_name
```

To apply migrations:

```bash
yarn prisma migrate deploy
```

## Scripts

- `yarn start:dev - Start the application in development mode`
- `yarn build - Build the application`
- `yarn start:prod - Start the application in production mode`
- `yarn test - Run tests`
- `yarn lint - Run linting`
- `yarn prisma studio - Open Prisma Studio`
