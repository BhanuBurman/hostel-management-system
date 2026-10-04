# 🏨 Hostel Management System — System Design

> **Project:** Smart Hostels — VIT Hostel Management System  
> **Stack:** Java 21 + Spring Boot 3.4 (Backend) · React + Vite (Frontend) · MySQL (DB)  
> **Deployment:** Netlify (Frontend) · Docker (Backend)

---

## Table of Contents

1. [High-Level Design (HLD)](#high-level-design-hld)
   - [System Overview](#1-system-overview)
   - [Technology Stack](#2-technology-stack)
   - [Deployment Architecture](#3-deployment-architecture)
   - [User Roles & Capabilities](#4-user-roles--capabilities)
   - [Core Module Map](#5-core-module-map)
2. [Low-Level Design (LLD)](#low-level-design-lld)
   - [Database Schema](#6-database-schema-er-diagram)
   - [Backend Package Structure](#7-backend-package-structure)
   - [Security & Authentication Flow](#8-security--authentication-flow)
   - [API Endpoints](#9-api-endpoints)
   - [Service Layer Interaction](#10-service-layer-interaction)
   - [Room Booking — Sequence Diagram](#11-room-booking-sequence-diagram)
   - [Complaint Lifecycle](#12-complaint-lifecycle)
   - [Frontend Architecture](#13-frontend-architecture)
   - [Frontend Route Map](#14-frontend-route-map)
   - [Axios Interceptor Flow](#15-axios-interceptor-flow)

---

## High-Level Design (HLD)

### 1. System Overview

```mermaid
graph TD
    User["👤 User (Browser)"]

    subgraph Frontend["Frontend — Netlify CDN"]
        React["React + Vite SPA"]
    end

    subgraph Backend["Backend — Spring Boot (Docker)"]
        API["REST API Layer"]
        Security["Spring Security + JWT Filter"]
        BL["Business Logic — Services"]
        DAL["Data Access Layer — JPA Repositories"]
    end

    DB[("🗄️ MySQL Database")]
    Swagger["📄 Swagger UI — /swagger-ui.html"]

    User -->|HTTPS| React
    React -->|Axios + JWT Bearer Token| API
    API --> Security
    Security --> BL
    BL --> DAL
    DAL --> DB
    API -.->|OpenAPI Docs| Swagger
```

---

### 2. Technology Stack

| Layer                | Technology                          | Purpose                               |
| -------------------- | ----------------------------------- | ------------------------------------- |
| **Frontend**         | React 18 + Vite                     | SPA, fast HMR builds                  |
| **Routing**          | React Router DOM                    | Client-side routing                   |
| **HTTP Client**      | Axios (with interceptors)           | API calls + token injection           |
| **State**            | React Context API                   | Global user state                     |
| **Backend**          | Spring Boot 3.4 (Java 21)           | REST API server                       |
| **Security**         | Spring Security + JWT (jjwt 0.12.6) | Stateless auth                        |
| **ORM**              | Spring Data JPA + Hibernate         | Database abstraction                  |
| **Database**         | MySQL                               | Relational persistence                |
| **API Docs**         | SpringDoc OpenAPI (Swagger)         | Auto-generated REST docs              |
| **Build Tool**       | Maven                               | Backend build & dependency management |
| **Containerization** | Docker                              | Backend packaging                     |
| **Frontend Hosting** | Netlify                             | CDN deployment                        |

---

### 3. Deployment Architecture

```mermaid
graph LR
    Browser["🌐 Browser"]

    subgraph Netlify["Netlify CDN"]
        FE["React SPA\n(smart-hostels.netlify.app)"]
    end

    subgraph DockerHost["Docker Host / Cloud VM"]
        Docker["🐳 Docker Container\nSpring Boot JAR :8080"]
    end

    subgraph MySQL["Database Server"]
        DB[("MySQL\nhostel_db")]
    end

    Browser -->|HTTPS| FE
    FE -->|HTTPS REST API| Docker
    Docker -->|JDBC| DB
```

---

### 4. User Roles & Capabilities

```mermaid
graph TD
    System["🏨 Hostel Management System"]

    System --> Student["👨‍🎓 Student"]
    System --> Admin["🧑‍💼 Admin / Warden"]

    Student --> S1["Register / Login"]
    Student --> S2["View & Book Rooms"]
    Student --> S3["Vacate Room"]
    Student --> S4["Raise Complaints"]
    Student --> S5["View Food Menu"]
    Student --> S6["View Own Profile"]

    Admin --> A1["Register as Admin"]
    Admin --> A2["Add Room Types"]
    Admin --> A3["Add Single / Bulk Rooms"]
    Admin --> A4["View All Complaints"]
    Admin --> A5["Update Complaint Status"]
    Admin --> A6["View All Students"]
```

---

### 5. Core Module Map

```mermaid
mindmap
  root((Hostel System))
    Auth Module
      Student Login
      Admin Login
      JWT Token Issuance
      User Details Fetch
    Room Module
      View All Rooms
      View by Floor
      Check Availability
      Book Room
      Vacate Room
      Add Room Types
    Complaint Module
      Categories & Subcategories
      Submit Complaint
      View Complaints by Student
      View All Complaints
      Update Status
    Food Menu Module
      Weekly Menu by Day & Meal
    User Module
      Student Profile
      Warden Registration
```

---

## Low-Level Design (LLD)

### 6. Database Schema (ER Diagram)

```mermaid
erDiagram
    students {
        INT user_id PK
        VARCHAR reg_number UK
        VARCHAR password
    }

    students_info {
        INT student_id PK
        VARCHAR name
        VARCHAR email
        VARCHAR phone
        VARCHAR room_number FK
        VARCHAR reg_number FK
        VARCHAR address
        VARCHAR gender
        DATE dob
        VARCHAR branch
        YEAR admission_year
    }

    admins {
        INT admin_id PK
        VARCHAR name
        VARCHAR email
        VARCHAR phone
        VARCHAR password_hash
        VARCHAR reg_number UK
    }

    rooms {
        INT room_id PK
        VARCHAR room_number UK
        INT room_type_id FK
        INT total_beds
        INT available_beds
        INT occupied_beds
        INT floor_number
    }

    room_types {
        INT room_type_id PK
        VARCHAR type_name
        DECIMAL price
    }

    food_menu {
        BIGINT id PK
        VARCHAR day
        ENUM meal_type
        TEXT food_items
        TIMESTAMP created_at
    }

    complaints {
        INT complaint_id PK
        VARCHAR student_reg_number FK
        INT category_id FK
        INT subcategory_id FK
        TEXT description
        VARCHAR status
        TIMESTAMP submitted_at
        TIMESTAMP updated_at
        VARCHAR admin_reg_number FK
    }

    complaint_categories {
        INT category_id PK
        VARCHAR category_name
    }

    complaint_subcategories {
        INT subcategory_id PK
        INT category_id FK
        VARCHAR subcategory_name
    }

    complaint_comments {
        INT comment_id PK
        INT complaint_id FK
        VARCHAR commenter_reg_number
        TEXT comment
        TIMESTAMP created_at
    }

    students ||--o{ students_info : "has profile"
    students ||--o{ complaints : "raises"
    admins ||--o{ complaints : "handles"
    rooms }o--|| room_types : "is of type"
    students_info }o--o| rooms : "assigned to"
    complaints }o--|| complaint_categories : "categorized by"
    complaints }o--|| complaint_subcategories : "sub-categorized by"
    complaints ||--o{ complaint_comments : "has comments"
    complaint_categories ||--o{ complaint_subcategories : "has"
```

---

### 7. Backend Package Structure

```mermaid
graph TD
    Root["com.vit.hostel.management"]

    Root --> Application["Application.java\n(Entry Point)"]
    Root --> Config["config/\nCorsConfig\nSecurityConfig\nJwtUtils\nJwtAuthenticationFilter"]
    Root --> Controllers["controllers/\nAuthController\nRoomController\nComplaintController\nFoodMenuController\nCreateRoomTypesController"]
    Root --> Common["common/\nUserController"]
    Root --> DTOs["dtos/\nRoomInfoDTO · RoomBookingRequestDTO\nRoomAvailabilityDTO · RoomVacateRequestDTO\nStudentDTO · FoodMenuDTO\nRoomTypeDTO · AuthRequestDTO\nAuthResponseDTO · ComplaintDTO ..."]
    Root --> Entities["entities/\nStudentEntity · StudentInfoEntity\nAdminEntity · RoomEntity\nRoomTypeEntity · FoodMenuEntity\ncomplain/ComplaintEntity\ncomplain/ComplaintCategoryEntity\ncomplain/ComplaintSubCategoryEntity\ncomplain/ComplaintCommentEntity"]
    Root --> Enums["enums/\nMealType · RoleTypeName\nEnumConverter · MealConverter\nPersistableEnum · RoleConverter"]
    Root --> Repositories["repository/\nStudentRepository\nAdminRepository\nRoomInfoRepository\nCreateRoomTypeRepository\nFoodMenuRepository\ncomplain/ComplaintRepository\ncomplain/ComplaintCategoryRepository\ncomplain/ComplaintSubCategoryRepository"]
    Root --> Services["service/\nAuthService · RoomInfoService\nComplaintService · FoodMenuService\nCreateRoomTypeService\nStudentDetailsService\nAdminDetailsService\nRoleBasedAuthenticationProvider\nimpl/ (Service Implementations)"]
```

---

### 8. Security & Authentication Flow

```mermaid
sequenceDiagram
    participant C as 🌐 Client (React)
    participant F as JwtAuthenticationFilter
    participant S as Spring Security
    participant A as AuthController
    participant SVC as AuthService
    participant DB as MySQL

    Note over C,DB: LOGIN FLOW
    C->>A: POST /auth/login {regNumber, password}
    A->>SVC: verify(authRequestDTO)
    SVC->>DB: findByRegNumber(regNumber)
    DB-->>SVC: Student/Admin entity
    SVC->>SVC: BCrypt.matches(password, hash)
    SVC->>SVC: JwtUtils.generateToken(username, role)
    SVC-->>A: AuthResponseDTO {token, role, name}
    A-->>C: 200 OK {token, role, name}
    C->>C: localStorage.setItem("token", ...)

    Note over C,DB: AUTHENTICATED REQUEST FLOW
    C->>F: GET /room/get-all-room-info\nAuthorization: Bearer <JWT>
    F->>F: JwtUtils.extractUsername(token)
    F->>F: validate token signature & expiry
    F->>S: set SecurityContextHolder (user + role)
    S->>S: authorize request
    S-->>C: 401 if invalid/expired
    S->>A: forward to actual controller
```

---

### 9. API Endpoints

#### Auth Controller — `/auth`

| Method | Endpoint                     | Description                 | Auth   |
| ------ | ---------------------------- | --------------------------- | ------ |
| `POST` | `/auth/login`                | Login and get JWT           | Public |
| `POST` | `/auth/signup-student`       | Register student            | Public |
| `POST` | `/auth/signup-admin`         | Register admin              | Public |
| `POST` | `/auth/user-details`         | Get user details from token | Public |
| `POST` | `/auth/student-full-details` | Get student by reg number   | Public |

#### Room Controller — `/room`

| Method | Endpoint                                  | Description                    | Auth   |
| ------ | ----------------------------------------- | ------------------------------ | ------ |
| `GET`  | `/room/get-all-room-info`                 | All rooms                      | 🔒 JWT |
| `GET`  | `/room/get-rooms-by-floor-number/{floor}` | Rooms by floor                 | 🔒 JWT |
| `GET`  | `/room/get-total-floors`                  | Total floor count              | 🔒 JWT |
| `GET`  | `/room/availability/{roomNumber}`         | Live bed availability          | 🔒 JWT |
| `GET`  | `/room/my-booking/{regNumber}`            | Student's current booking      | 🔒 JWT |
| `POST` | `/room/add-room-info`                     | Add single room (Admin)        | 🔒 JWT |
| `POST` | `/room/add-multiple-rooms-info`           | Bulk add rooms (Admin)         | 🔒 JWT |
| `PUT`  | `/room/book-room`                         | Book room (Pessimistic Lock)   | 🔒 JWT |
| `PUT`  | `/room/vacate-room`                       | Vacate room (Pessimistic Lock) | 🔒 JWT |

#### Complaint Controller — `/complain`

| Method | Endpoint                                           | Description             | Auth   |
| ------ | -------------------------------------------------- | ----------------------- | ------ |
| `GET`  | `/complain/get-all-complaint-categories`           | All categories          | 🔒 JWT |
| `GET`  | `/complain/get-all-complaint-subcategories`        | All subcategories       | 🔒 JWT |
| `GET`  | `/complain/get-all-complaints`                     | All complaints (Admin)  | 🔒 JWT |
| `GET`  | `/complain/get-complain-detailsById/{id}`          | Complaint by ID         | 🔒 JWT |
| `GET`  | `/complain/complain/get-complaints-by-regno/{reg}` | By student              | 🔒 JWT |
| `POST` | `/complain/add-complaint`                          | Submit complaint        | 🔒 JWT |
| `PUT`  | `/complain/update-complaint`                       | Update complaint status | 🔒 JWT |

#### Food Menu Controller — `/food`

| Method | Endpoint              | Description      | Auth   |
| ------ | --------------------- | ---------------- | ------ |
| `GET`  | `/food/get-food-menu` | Weekly food menu | 🔒 JWT |

#### Room Types Controller — `/room-types`

| Method | Endpoint                              | Description              | Auth   |
| ------ | ------------------------------------- | ------------------------ | ------ |
| `GET`  | `/room-types/get-all-room-types`      | All room types           | 🔒 JWT |
| `GET`  | `/room-types/get-roomType-by-id/{id}` | Room type by ID          | 🔒 JWT |
| `POST` | `/room-types/add-room-type`           | Create room type (Admin) | 🔒 JWT |

---

### 10. Service Layer Interaction

```mermaid
graph LR
    Controllers["REST Controllers"] --> Services

    subgraph Services["Service Layer"]
        AS["AuthService"] --> ARBS["RoleBasedAuthenticationProvider"]
        RIS["RoomInfoService"]
        CS["ComplaintService"]
        FMS["FoodMenuService"]
        CRTS["CreateRoomTypeService"]
    end

    subgraph Repositories["JPA Repositories"]
        SR["StudentRepository"]
        SIR["StudentInfoRepository"]
        AR["AdminRepository"]
        RIR["RoomInfoRepository"]
        CRTR["CreateRoomTypeRepository"]
        FMR["FoodMenuRepository"]
        CR["ComplaintRepository"]
        CCR["ComplaintCategoryRepository"]
        CSCR["ComplaintSubCategoryRepository"]
    end

    AS --> SR
    AS --> SIR
    AS --> AR
    RIS --> RIR
    RIS --> SIR
    RIS --> CRTR
    CS --> CR
    CS --> CCR
    CS --> CSCR
    FMS --> FMR
    CRTS --> CRTR

    Repositories --> DB[("MySQL")]
```

---

### 11. Room Booking — Sequence Diagram

```mermaid
sequenceDiagram
    participant C as 🌐 React Client
    participant RC as RoomController
    participant RIS as RoomInfoService
    participant SIR as StudentInfoRepository
    participant RIR as RoomInfoRepository
    participant DB as MySQL (Pessimistic Lock)

    C->>RC: PUT /room/book-room\n{studentRegNumber, roomNumber}
    RC->>RIS: bookRoom(RoomBookingRequestDTO)

    RIS->>DB: BEGIN TRANSACTION
    RIS->>RIR: findByRoomNumber(roomNumber)\nLOCK FOR UPDATE

    alt Room not found
        RIS-->>RC: "Room not found"
    else No beds available
        RIS-->>RC: "No beds available"
    else Beds available
        RIS->>SIR: findByRegNumber(studentRegNumber)

        alt Student already has a room
            RIS->>RIR: increment available_beds on OLD room
        end

        RIS->>RIR: decrement available_beds on NEW room
        RIS->>SIR: update studentInfo.roomNumber = newRoom
        RIS->>DB: COMMIT TRANSACTION
        RIS-->>RC: "Room booked successfully"
    end
    RC-->>C: 200 OK / Error Message
```

---

### 12. Complaint Lifecycle

```mermaid
stateDiagram-v2
    [*] --> PENDING : Student submits complaint
    PENDING --> IN_PROGRESS : Admin acknowledges
    IN_PROGRESS --> RESOLVED : Admin marks resolved
    IN_PROGRESS --> REJECTED : Admin rejects
    PENDING --> REJECTED : Admin rejects directly
    RESOLVED --> [*]
    REJECTED --> [*]

    note right of PENDING
        complaintService.addComplaint()
        status = "PENDING"
        submittedAt = NOW()
    end note

    note right of IN_PROGRESS
        complaintService.updateComplain()
        updatedAt = NOW()
        adminRegNumber assigned
    end note
```

---

### 13. Frontend Architecture

```mermaid
graph TD
    main["main.jsx\n(ReactDOM.render)"]

    main --> App["App.jsx\n(BrowserRouter + UserProvider)"]

    App --> Navbar["Navbar.jsx\n(Global Nav + Login Modal)"]
    App --> Routes["React Router Routes"]
    App --> Footer["Footer.jsx"]

    subgraph Pages["Pages"]
        Home["Home.jsx"]
        Room["Room.jsx"]
        RoomView["RoomViewPage.jsx"]
        CreateRoom["CreateRoomType.jsx"]
        Complain["ComplainPage.jsx"]
        ComplainDetail["ComplainDetailPage.jsx"]
        FoodMenu["FoodMenuPage.jsx"]
        UserProfile["UserProfile.jsx"]
        Register["RegisterPage.jsx"]
    end

    subgraph Components["Reusable Components"]
        Login["Login.jsx"]
        CreateComplaint["CreateComplaint.jsx"]
        CreateRooms["CreateRooms.jsx"]
        StudentReg["StudentRegistration.jsx"]
        WardenReg["WardenRegistration.jsx"]
        Spinner["Spinner.jsx"]
        AboutUs["AboutUs.jsx"]
        ContactUs["ContactUs.jsx"]
    end

    subgraph State["Global State"]
        Context["UserContext.jsx\n(user, setUser)"]
    end

    subgraph API["API Layer"]
        Axios["AxiosConfig.js\n(Interceptors + Base URL)"]
    end

    Routes --> Pages
    Pages --> Components
    Pages --> Axios
    Navbar --> Login
    App --> State
    Components --> Axios
```

---

### 14. Frontend Route Map

```mermaid
graph LR
    Root["/"]
    Root --> Home["/ → Home + AboutUs + ContactUs + Footer"]
    Root --> CreateRoomType["/create-room-type → CreateRoomType"]
    Root --> Rooms["/rooms → Room (Floor-wise Browser)"]
    Root --> RoomView["/room-view → RoomViewPage (Book/Vacate)"]
    Root --> ComplainPage["/complain-page → ComplainPage (List)"]
    Root --> ComplainDetail["/complain-detail-page → ComplainDetailPage"]
    Root --> FoodMenu["/food-menu → FoodMenuPage"]
    Root --> UserProfile["/user-profile → UserProfile"]
    Root --> Register["/register → RegisterPage"]
```

---

### 15. Axios Interceptor Flow

```mermaid
flowchart TD
    A["React Component calls api.get/post/put"] --> B["Request Interceptor"]
    B --> C{Token in localStorage?}
    C -- Yes --> D["Attach\nAuthorization: Bearer token"]
    C -- No --> E["Send request without auth header"]
    D --> F["HTTP Request sent to Backend"]
    E --> F

    F --> G["Response Interceptor"]
    G --> H{HTTP Status?}
    H -- "200-299" --> I["Return response to component"]
    H -- "401 AND\nnot /auth/login" --> J["Remove token from localStorage"]
    J --> K["alert: Must be logged in"]
    K --> L["Redirect to /"]
    H -- "Other Error" --> M["Reject promise (component handles)"]
```

---

## Summary

| Aspect                 | Detail                                                        |
| ---------------------- | ------------------------------------------------------------- |
| **Architecture Style** | Layered MVC (Backend) + SPA (Frontend)                        |
| **Auth Mechanism**     | Stateless JWT, BCrypt password hashing                        |
| **DB Strategy**        | JPA/Hibernate with Pessimistic Locking for concurrent booking |
| **API Documentation**  | Auto-generated via SpringDoc OpenAPI (Swagger UI)             |
| **CORS Policy**        | Whitelisted: localhost:5173 + smart-hostels.netlify.app       |
| **Global State**       | React Context (UserContext)                                   |
| **Error Handling**     | Global 401 interceptor on Axios                               |
| **Containerization**   | Docker (backend), Netlify CI/CD (frontend)                    |
