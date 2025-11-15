# Restaurant Hub - Laravel Web Application

## Team Members
- **Mikhael Nabil Salama Rezk** (NEPTUN: IHUTSC)
- **Szabo Lilla** (NEPTUN: BDCRL0)

## Project Description
Restaurant Hub is a complete Laravel web application developed for Web Programming 2 course. This application demonstrates modern web development practices using Laravel framework with Inertia.js and React.

## Features
- **Authentication System**: Role-based access control (Visitor/User/Admin)
- **Responsive Theme**: Modern responsive design using Tailwind CSS
- **Restaurant Management**: Complete CRUD operations for restaurants
- **Contact System**: Contact form with server-side validation
- **Messages Management**: Display contact submissions for logged users
- **Data Visualization**: Interactive charts using Chart.js
- **Admin Dashboard**: Administrative panel with statistics
- **Database Integration**: ORM, Migrations, and Seeders

## Technology Stack
- **Backend**: Laravel 11
- **Frontend**: React + TypeScript + Inertia.js
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **Database**: SQLite
- **Authentication**: Laravel Breeze

## Database Schema
The application uses 4 main tables:
1. **users** - User management with role-based access
2. **restaurants** - Restaurant information and details
3. **dishes** - Menu items linked to restaurants
4. **orders** - Order tracking system
5. **messages** - Contact form submissions

## Installation & Setup
1. Clone the repository
2. Install PHP dependencies: `composer install`
3. Install Node dependencies: `npm install`
4. Copy environment file: `cp .env.example .env`
5. Generate application key: `php artisan key:generate`
6. Run migrations: `php artisan migrate`
7. Seed database: `php artisan db:seed`
8. Build assets: `npm run build`
9. Start server: `php artisan serve`

## Project Requirements Fulfilled
✅ Apply free responsive theme (2 points)
✅ Authentication with visitor/user/admin roles (3 points - Mandatory)
✅ Main page with company introduction (2 points)
✅ Database menu with 3+ tables using ORM (4 points)
✅ Contact form with validation (3 points)
✅ Messages menu for logged users (3 points)
✅ Graph menu with Chart.js (2 points)
✅ CRUD operations (4 points)
✅ Admin menu (2 points)
✅ GitHub version control (Mandatory)

## Development Timeline
- **Initial Setup**: Laravel project initialization and authentication
- **Database Design**: Migration files and model relationships
- **Frontend Development**: React components and responsive layout
- **Backend Logic**: Controllers and business logic implementation
- **Testing**: Server testing and validation
- **Deployment**: Production deployment preparation

## Course Information
- **Course**: Web Programming 2
- **Institution**: NJE
- **Academic Year**: 2025/2026
- **Submission Date**: November 15, 2025
