Below is a **complete, production-grade backend README** tailored **exactly** to the system you have built.
You can copy this directly into `backend/README.md` without modification.

---

# Hostel Management System – Backend

## Overview

This backend powers a **Hostel Management System** designed for university-level accommodation management.
It enforces **real institutional rules**, including:

- Role-based access control
- Gender-based hostel eligibility
- Payment-gated room allocation
- Capacity-aware room booking
- Full audit logging for accountability

The system is built with scalability, security, and academic correctness in mind.

---

## Core Features

### Authentication & Authorization

- JWT-based authentication
- Role-based access control (`ADMIN`, `STUDENT`)
- Protected routes using middleware
- Secure password hashing with bcrypt

---

### Hostel & Room Management (Admin)

- Create and manage hostels
- Gender-specific hostels (Male / Female)
- Create rooms with capacity limits
- Automatic room availability tracking

---

### Student Allocation System

- One active room allocation per student
- Capacity enforcement (no overbooking)
- Gender eligibility enforcement
- Allocation lifecycle (`ACTIVE`, `VACATED`)
- Safe vacating with availability updates

---

### Payment Clearance System

- Payment initiation by students
- Admin confirmation of payments
- Allocation **blocked until payment is confirmed**
- Full payment history retained

---

### Audit & Accountability

- Logs critical actions:

  - Room booking
  - Room vacating
  - Payment confirmation

- Immutable audit records
- Admin-only audit log access

---

## Technology Stack

### Backend

- **Node.js**
- **Express.js**

### Database

- **MySQL**
- **Sequelize ORM**

### Security

- **JWT (jsonwebtoken)**
- **bcryptjs**
- **dotenv**

### Development Tools

- **nodemon**

---

## Project Structure

```text
backend/
│
├── app.js
├── server.js
├── package.json
├── .env
│
├── config/
│   └── database.js
│
├── models/
│   ├── index.js
│   ├── User.js
│   ├── Student.js
│   ├── Hostel.js
│   ├── Room.js
│   ├── Allocation.js
│   ├── Payment.js
│   └── AuditLog.js
│
├── controllers/
│   ├── authController.js
│   ├── hostelController.js
│   ├── roomController.js
│   ├── allocationController.js
│   ├── paymentController.js
│   └── auditController.js
│
├── routes/
│   ├── authRoutes.js
│   ├── hostelRoutes.js
│   ├── roomRoutes.js
│   ├── allocationRoutes.js
│   ├── paymentRoutes.js
│   └── auditRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
└── utils/
    └── auditLogger.js
```

---

## Environment Variables

Create a `.env` file in the backend root:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=hostel_management
JWT_SECRET=your_secure_secret_key
```

---

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

---

### 2. Create Database

```sql
CREATE DATABASE hostel_management;
```

---

### 3. Run the Server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## API Overview

### Authentication

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | `/api/auth/register` | Register user   |
| POST   | `/api/auth/login`    | Login & get JWT |

---

### Hostels (Admin)

| Method | Endpoint       |
| ------ | -------------- |
| POST   | `/api/hostels` |
| GET    | `/api/hostels` |

---

### Rooms (Admin)

| Method | Endpoint     |
| ------ | ------------ |
| POST   | `/api/rooms` |
| GET    | `/api/rooms` |

---

### Payments

| Method | Endpoint                    | Role    |
| ------ | --------------------------- | ------- |
| POST   | `/api/payments`             | Student |
| PUT    | `/api/payments/:id/confirm` | Admin   |

---

### Allocations

| Method | Endpoint                  | Role    |
| ------ | ------------------------- | ------- |
| POST   | `/api/allocations/book`   | Student |
| POST   | `/api/allocations/vacate` | Student |
| GET    | `/api/allocations`        | Admin   |
| GET    | `/api/allocations/filter` | Admin   |

---

### Audit Logs

| Method | Endpoint          | Role  |
| ------ | ----------------- | ----- |
| GET    | `/api/audit-logs` | Admin |

---

## Business Rules Enforced

- A student **must pay before booking**
- A student can have **only one active room**
- Room capacity **cannot be exceeded**
- Hostel gender **must match student gender**
- Allocations are **never deleted**
- Payments are **never deleted**
- All critical actions are audited

---

## Security Considerations

- JWT protected routes
- Role-based authorization
- Passwords hashed using bcrypt
- No destructive deletes on core entities
- Transaction safety for allocation operations

---

## Backend Status

✔ Feature-complete
✔ Rule-enforced
✔ Auditable
✔ Frontend-ready
✔ Suitable for academic submission or real deployment

---

## Next Phase

**Frontend Integration (React + Tailwind CSS)**
Role-based dashboards and API consumption.

## Sample user backend registeration

POST http://localhost:5000/api/auth/register

BODY
{
"email": "",
"password": "",
"regNumber": "",
"firstName": "",
"middleName": "",
"lastName": "",
"gender": "",
"phoneNumber": "07",
"school": ""
}
