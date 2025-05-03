# Smart Hostels - Hostel Management System

A full-stack web application for managing hostel operations efficiently. Built with React and Spring Boot.

## Features

- **Room Management**
  - Create and manage different room types (AC/Non-AC)
  - Track room inventory (beds, fans, lights, tables, etc.)
  - Image upload support for room photos
  - Dynamic room booking system
  - Floor-wise room organization

- **Student Management**
  - Student registration and profile management
  - Room allocation system
  - Student-room mapping

## Tech Stack

### Frontend
- React + Vite
- Axios for API integration
- Tailwind CSS for styling
- Cloudinary for image management

### Backend
- Spring Boot
- Spring Security
- JPA/Hibernate
- MySQL Database

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- Java JDK 17+
- MySQL
- Maven

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/hostel-management-system.git
cd hostel-management-system
```

2. **Backend Setup**
```bash
cd backend/hostel.management
mvn clean install
mvn spring-boot:run
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Frontend
Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:8080
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_PRESET_NAME=your_preset_name
```

### Backend
Configure `application.properties`:
```
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Project Structure

```
hostel-management-system/
├── backend/
│   └── hostel.management/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   └── resources/
│       │   └── test/
│       └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── assets/
    │   └── App.jsx
    ├── package.json
    └── vite.config.js
```

## API Documentation

The backend provides RESTful APIs for:
- Room Type Management
- Room Information
- Student Management
- Booking System

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.