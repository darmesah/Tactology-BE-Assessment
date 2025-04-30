<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Department Management API

A robust GraphQL API built with NestJS, TypeORM, and PostgreSQL for managing departments and sub-departments.

## 🚀 Features

- **Authentication System**
  - JWT-based authentication
  - User signup and login functionality
  - Protected GraphQL endpoints

- **Department Management**
  - Create departments with optional sub-departments
  - Retrieve all departments in a hierarchical structure
  - Get specific department details
  - Update department information
  - Delete departments (with cascading delete of sub-departments)

- **Sub-Department Management**
  - Create sub-departments
  - List all sub-departments
  - Get specific sub-department details
  - Update sub-department information
  - Delete sub-departments

- **Data Validation & Security**
  - Input validation using class-validator
  - JWT protection for all sensitive endpoints
  - TypeORM entity relationships with proper constraints

## 🔧 Technologies Used

- **NestJS**: Progressive Node.js framework
- **GraphQL**: Query language for APIs
- **TypeORM**: ORM for TypeScript and JavaScript
- **PostgreSQL**: Open-source relational database
- **Passport-JWT**: Authentication middleware
- **Class Validator**: Decorator-based property validation

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📋 API Documentation

### Authentication Endpoints

#### Sign Up
```graphql
mutation signup {
  signup(signupInput: {email: "example@domain.com", password: "123456"}) {
    access_token
    user {
      id,
      email
    }
  }
}
```

#### Login
```graphql
mutation login {
  login(loginInput: {email: "example@domain.com", password: "123456"}) {
    access_token
    user {
      id,
      email
    }
  }
}
```

### Department Management Endpoints

#### Create Department
Creates a new department with optional sub-departments.

```graphql
mutation createDepartment {
  createDepartment(input: {
    name: "Finance", 
    subDepartments: [
      {name: "Accounting"}, 
      {name: "Budget Planning"}
    ]
  }) {
    id
    name
    subDepartments {
      id,
      name
    }
  }
}
```

#### Get All Departments
Retrieves all departments with their sub-departments.

```graphql
query getDepartments {
  departments {
    id
    name
    subDepartments {
      id,
      name
    }
  }
}
```

#### Get Department by ID
Retrieves a specific department by its ID.

```graphql
query getDepartment {
  department(id: 2) {
    id
    name
    subDepartments {
      id,
      name
    }
  }
}
```

#### Update Department
Updates an existing department's information.

```graphql
mutation updateDepartment {
  updateDepartment(input: {id: 2, name: "Finance & Operations"}) {
    id
    name
    subDepartments {
      id,
      name
    }
  }
}
```

#### Delete Department
Deletes a department and all its sub-departments.

```graphql
mutation removeDepartment {
  removeDepartment(id: 2)
}
```

### Sub-Department Management Endpoints

#### Create Sub-Department
Creates a new sub-department under a specific department.

```graphql
mutation createSubDepartment {
  createSubDepartment(input: {departmentId: 3, name: "Business Analytics"}) {
    id
    name
  }
}
```

#### Get All Sub-Departments
Retrieves all sub-departments.

```graphql
query subDepartments {
  subDepartments {
    id
    name
  }
}
```

#### Get Sub-Department by ID
Retrieves a specific sub-department by its ID.

```graphql
query subDepartment {
  subDepartment(id: 5) {
    id
    name
  }
}
```

#### Update Sub-Department
Updates an existing sub-department's information.

```graphql
mutation updateSubDepartment {
  updateSubDepartment(input: {subDepartmentId: 5, name: "Financial Analytics"}) {
    id
    name
  }
}
```

#### Delete Sub-Department
Deletes a specific sub-department.

```graphql
mutation removeSubDepartment {
  removeSubDepartment(id: 5)
}
```

## 🛠️ Project Structure

```
src/
├── app.module.ts              # Main application module
├── main.ts                    # Application entry point
├── schema.gql                 # Auto-generated GraphQL schema
├── auth/                      # Authentication module
│   ├── auth.module.ts
│   ├── auth.resolver.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   ├── dto/
│   │   ├── login.input.ts
│   │   ├── signup.input.ts
│   │   └── auth-response.ts
│   └── entities/
│       └── user.entity.ts
├── departments/               # Departments module
│   ├── department.module.ts
│   ├── department.resolver.ts
│   ├── department.service.ts
│   ├── dto/
│   │   ├── create-department.input.ts
│   │   └── update-department.input.ts
│   └── entities/
│       └── department.entity.ts
└── sub-departments/           # Sub-departments module
    ├── sub-department.module.ts
    ├── sub-department.resolver.ts
    ├── sub-department.service.ts
    ├── dto/
    │   ├── create-sub-department.input.ts
    │   └── update-sub-department.input.ts
    └── entities/
        └── sub-department.entity.ts
```

## Environment Setup

Create a `.env` file in the project root with the following:
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_postgres_username
DATABASE_PASSWORD=your_postgres_password
DATABASE_NAME=department_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION_TIME=24h
PORT=3000
```

## ✅ Implementation Details

### Entity Relationships

- One-to-Many relationship between Department and Sub-Department
- Sub-departments are eagerly loaded with their parent department
- Cascade delete ensures sub-departments are deleted when their parent department is removed

### Authentication Flow

1. User signs up or logs in through GraphQL mutations
2. Backend validates credentials and issues a JWT token
3. Token must be included in Authorization header for protected endpoints
4. JWT Strategy verifies token authenticity on protected requests

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).