## Healthcare Backend (Node.js + Express + PostgreSQL)

## Features

- Authentication: Users can register & log in with JWT.
- Patients: Authenticated users can create, view, update, and delete their patients.
- Doctors: Authenticated users can create, view, update, and delete doctors.
- Mappings: Assign one or more doctors to a patient, view mappings, and remove them.
- Secure Storage: Data is stored securely in PostgreSQL.

## Tech Stack

- Node.js + Express
- PostgreSQL
- JWT for authentication
- bcrypt for password hashing
- dotenv for environment variables

## Installation

1. Clone repo 
```
https://github.com/Rachit333/WhatBytes_assignment.git
cd healthcare-backend
```
2. Install dependencies
```
npm install
```
3. Configure environment variables (.env):
```
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=healthcare
DB_HOST=localhost
DB_PORT=
JWT_SECRET=supersecretkey
PORT=
```
4. Setup PostgreSQL
```
psql -U postgres
CREATE DATABASE healthcare;
```
Run SQL schema for users, patients, doctors, mappings tables.
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100),
    age INT,
    condition TEXT
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    specialization VARCHAR(100)
);

CREATE TABLE patient_doctor_mappings (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INT REFERENCES doctors(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);
```
5. Start server
```
npm run dev
```

## API Endpoints

Auth:
  
| Method  | Endpoint | Description  |
| ------------- | ------------- | ------------- |
| POST  | /api/auth/register  | Register new user  |
| POST  | /api/auth/login  | Login and get JWT  |

Patients:
  
| Method  | Endpoint | Description  |
| ------------- | ------------- | ------------- |
| POST  | /api/patients  | Add new patient  |
| GET  | /api/patients  | Get all patients  |
| GET  | /api/patients/:id  | Get one patient |
| PUT  | /api/patients/:id  | Update patient  |
| DELETE  | /api/patients/:id  | Delete patient  |

Doctors:

| Method  | Endpoint | Description  |
| ------------- | ------------- | ------------- |
| POST  | /api/doctors | Add new doctor  |
| GET  | /api/doctors  | Get all doctors  |
| GET  | /api/doctors/:id | Get one doctor |
| PUT  | /api/patients/:id  | Update doctor  |
| DELETE  | /api/doctors/:id  | Delete doctor  |

Mappings:

| Method  | Endpoint | Description  |
| ------------- | ------------- | ------------- |
| POST  | /api/mappings | Assign doctor to patient |
| GET  | /api/mappings  | Get all mappings  |
| GET  | /api/mappings/:patient_id | Get doctors for a patient |
| DELETE  | /api/mappings/:id  | Remove mapping  |

