# Healthcare Appointment Management System

A full-stack web application for managing medical appointments from both the **doctor** and **customer** perspectives. The system supports viewing and scheduling appointments, updating customer profiles, and completing appointments with atomic database transactions that move records from active queues into history.

This project was developed as a final internship assignment and follows a consistent three-layer architecture across all modules.

---

## Project Overview

The application models a clinic workflow where:

- **Doctors** can view patients, manage appointment details, update treatment descriptions, and finish appointments.
- **Customers** can view upcoming and past appointments, schedule or update appointments, update personal settings, and complete appointments (moving them to history).

The backend exposes a REST API built with ASP.NET Core, and the frontend is a standalone Angular application that consumes those endpoints through typed HTTP services.

---

## Architecture

The project uses a **three-layer architecture** (Controller → Service → Repository/DAL), mirrored for both Doctor and Customer modules:

| Layer | Responsibility | Examples |
|-------|----------------|----------|
| **Controller** | HTTP routing, request validation, status codes | `DoctorController`, `CustomerController` |
| **Service (BL)** | Business logic orchestration | `DoctorService`, `CustomerService` |
| **Repository (DAL)** | Entity Framework data access | `DoctorDal`, `CustomerDal` |

### Data Flow

```
Angular Component → HTTP Service → API Controller → BL Service → DAL → SQL Server (LocalDB)
```

### Database Transactions

Critical write operations—especially **appointment completion**—use an **EF Core database transaction** to guarantee atomicity:

1. Insert the appointment into `QueueHistory`
2. Delete the appointment from `Queues`

If either step fails, the transaction is rolled back so the database never ends up in a partial state.

Connection strings are configured externally via `appsettings.json` rather than hardcoded in the DbContext.

---

## Tech Stack

| Area | Technology |
|------|------------|
| Backend | .NET 8, ASP.NET Core Web API |
| ORM | Entity Framework Core 8 (SQL Server) |
| Frontend | Angular 21 (standalone components) |
| HTTP Client | Angular `HttpClient` + RxJS |
| API Docs | Swagger (development) |
| Database | SQL Server LocalDB |

---

## Project Structure

```
Internship-project-1/
├── backend/
│   ├── Bl/                 # Business logic layer (services + interfaces)
│   ├── Dal/                # Data access layer (EF repositories + models)
│   └── project/            # Web API host (controllers, Program.cs)
├── frontend/
│   └── src/
│       ├── app/            # Customer appointments module
│       ├── components/     # Doctor & patient UI components
│       └── services/       # Shared HTTP services
└── README.md
```

---

## How to Run

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18+ recommended)
- SQL Server LocalDB (included with Visual Studio or SQL Server Express)

### 1. Database Configuration

Update the connection string in `backend/project/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename='C:\\path\\to\\MyDb.mdf';Integrated Security=True;Connect Timeout=30"
  }
}
```

Point `AttachDbFilename` to your local `.mdf` database file. For production or team environments, prefer environment variables:

```bash
set ConnectionStrings__DefaultConnection="your-connection-string"
```

### 2. Run the Backend

```bash
cd backend
dotnet build
dotnet run --project project/server.csproj
```

The API starts at `https://localhost:7084` (HTTPS) or `http://localhost:5141` (HTTP). Swagger UI is available at `/swagger` in Development mode.

### 3. Run the Frontend

```bash
cd frontend
npm install
npm start
```

The Angular dev server runs at `http://localhost:4200`. Ensure API requests are proxied or served from the same origin as configured in your environment.

### 4. Build for Production

```bash
# Backend
dotnet publish backend/project/server.csproj -c Release

# Frontend
cd frontend && npm run build
```

---

## API Endpoints (Customer Module)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/appointments/client/{clientId}` | Booked (upcoming) appointments |
| `GET` | `/api/history/client/{clientId}` | Past appointments |
| `PUT` | `/api/appointments/update/{id}` | Update / schedule appointment |
| `PUT` | `/api/clients/{id}` | Update customer profile |
| `POST` | `/api/appointments/complete` | Complete appointment (atomic history + delete) |

Doctor endpoints are available under `/api/Doctor/...`.

---

## Implemented Features

### Customer Side
- View booked (upcoming) appointments
- View past appointment history
- Create and update appointments
- Update customer profile settings
- Complete appointments with atomic transaction (history insert + queue delete)
- UI state refresh after each action

### Doctor Side
- View patients associated with a doctor
- View doctor shifts
- Fetch appointment details by ID
- Update treatment description
- Finish appointment (move to history)

---

## Error Handling

- **400 Bad Request** — missing or invalid input
- **404 Not Found** — customer or appointment not found
- **500 Internal Server Error** — unexpected failures in create, update, settings, or completion operations

The Angular `CustomerService` logs API failures to the console and propagates errors to components for user-facing messages.

---

## Development Notes

- C# models use PascalCase (`Id`, `WorkerId`); the API returns camelCase JSON (`id`, `workerId`) which matches the TypeScript interfaces.
- Generated folders (`bin/`, `obj/`, `dist/`, `node_modules/`) are excluded via `.gitignore`.
- Doctor patient/shift routes: `GET /api/Doctor/patients/{doctorId}` and `GET /api/Doctor/shifts/{doctorId}`.

---

## Authors

Final internship project — developed collaboratively with separate doctor-side and customer-side modules following a shared architectural standard.
