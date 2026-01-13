# BMW - Angular Application

A modern, full-featured BMW web application built with Angular 19. This project demonstrates a complete CRUD application with authentication, product management, and a beautiful user interface.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [User Guide](#user-guide)
- [Code Structure for Beginners](#code-structure-for-beginners)

## ✨ Features

### Authentication System
- **User Registration** with comprehensive validation:
  - First name and last name (min 5 characters, must contain uppercase and lowercase)
  - Email validation with pattern matching
  - Strong password requirements (min 8 chars, number, uppercase, lowercase, special character)
- **User Login** with email and password
- **Session Management** using localStorage
- **Protected Routes** for authenticated users

### Product Management
- **View All Products** - Browse BMW car models with detailed specifications
- **Filter by Category** - Filter cars by gamme (Electrique, Essence, Hybride, Diesel)
- **Add New Products** - Authenticated users can add new BMW models
- **Product Details** including:
  - Model name, power, transmission type
  - Price with promotional pricing support
  - Battery range for electric/hybrid vehicles
  - Stock availability
  - High-quality images

### User Interface
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** with Bootstrap 5 and custom styling
- **Interactive Navigation** - Dynamic navbar based on authentication state
- **Loading States** - Visual feedback during API calls
- **Form Validation** - Real-time validation with user-friendly error messages

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 19.2.0
- **UI Library**: Bootstrap 5.3.8 + Bootstrap Icons 1.13.1
- **Backend**: JSON Server (mock REST API)
- **Language**: TypeScript 5.7.2
- **Forms**: Reactive Forms (FormBuilder, FormGroup, Validators)
- **HTTP Client**: Angular HttpClient with RxJS Observables
- **Routing**: Angular Router with lazy loading support

## 📁 Project Structure

```
bmw-website/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── navbar/          # Navigation bar with auth state
│   │   │   ├── footer/          # Footer component
│   │   │   ├── hero/            # Hero section for home page
│   │   │   ├── models/          # Models showcase section
│   │   │   └── innovation/      # Innovation section
│   │   │
│   │   ├── pages/               # Page components (routed)
│   │   │   ├── home/            # Landing page
│   │   │   ├── login/           # Login page with form validation
│   │   │   ├── register/        # Registration page with validation
│   │   │   ├── produit/         # Product listing with filtering
│   │   │   └── ajouter/         # Add new product form
│   │   │
│   │   ├── services/            # Business logic and API communication
│   │   │   ├── auth.service.ts        # Authentication state management
│   │   │   ├── userapi.service.ts     # User CRUD operations
│   │   │   └── produitapi.service.ts  # Product CRUD operations
│   │   │
│   │   ├── models/              # TypeScript interfaces
│   │   │   ├── users.interface.ts     # User data structure
│   │   │   └── produits.interface.ts  # Product data structure
│   │   │
│   │   ├── app.component.ts     # Root component
│   │   ├── app.routes.ts        # Application routing configuration
│   │   └── app.config.ts        # App configuration (providers)
│   │
│   ├── styles.css               # Global styles
│   └── index.html               # Main HTML file
│
├── db.json                      # JSON Server database
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Angular CLI** (optional, but recommended)
  ```bash
  npm install -g @angular/cli
  ```

## 📥 Installation

1. **Navigate to the project directory**:
   ```bash
   cd c:\Users\nour_\Desktop\learning\angular\bmw-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install JSON Server** (if not already installed):
   ```bash
   npm install -g json-server
   ```

## 🚀 Running the Application

You need to run **two servers** simultaneously:

### Step 1: Start the JSON Server (Backend)

Open a terminal and run:
```bash
npm run server
```

This will start the JSON Server on **http://localhost:3000**

You should see:
```
JSON Server is running on http://localhost:3000
```

### Step 2: Start the Angular Development Server (Frontend)

Open a **second terminal** and run:
```bash
npm start
```

This will start the Angular app on **http://localhost:4200**

You should see:
```
Angular Live Development Server is listening on localhost:4200
```

### Step 3: Open the Application

Open your browser and navigate to:
```
http://localhost:4200
```

The application will automatically redirect to the home page!

## 🔌 API Endpoints

The JSON Server provides the following REST API endpoints:

### Users API
- `GET /users` - Get all users
- `GET /users?email={email}` - Get user by email
- `GET /users?email={email}&password={password}` - Login authentication
- `POST /users` - Create new user

### Products API
- `GET /produits` - Get all products
- `GET /produits/{id}` - Get product by ID
- `GET /produits?gamme={gamme}` - Get products by category
- `POST /produits` - Create new product
- `PUT /produits/{id}` - Update product
- `DELETE /produits/{id}` - Delete product

**Base URL**: `http://localhost:3000`

## 📖 User Guide

### For First-Time Users

1. **Register an Account**:
   - Click "S'inscrire" in the navbar
   - Fill in your details (remember the password requirements!)
   - Click "S'inscrire" button
   - You'll be redirected to the login page

2. **Login**:
   - Enter your email and password
   - Click "Se connecter"
   - You'll be redirected to the home page

3. **Browse Products**:
   - Click "Nos Modèles" in the navbar
   - Use the filter buttons to view specific categories
   - See detailed information for each BMW model

4. **Add a New Product** (when logged in):
   - Click "Ajouter" in the navbar
   - Fill in all product details
   - Click "Ajouter le produit"
   - The new product will appear in the products list

5. **Logout**:
   - Click on your name in the navbar
   - Select "Déconnexion"

### Test Accounts

You can use these pre-configured accounts:

**Admin Account**:
- Email: `admin@bmw.com`
- Password: `Admin@123`

**Customer Account**:
- Email: `jean.dupont@email.com`
- Password: `Password@123`

## 💡 Code Structure for Beginners

### Understanding Components

**Components** are the building blocks of Angular applications. Each component has:
- **TypeScript file (.ts)**: Contains the logic (data, methods)
- **HTML file (.html)**: Contains the template (what you see)
- **CSS file (.css)**: Contains the styles (how it looks)

Example: `login.component.ts` + `login.component.html` + `login.component.css`

### Understanding Services

**Services** handle business logic and data operations. They:
- Communicate with the backend API
- Manage application state
- Can be injected into components

Example: `produitapi.service.ts` handles all product-related API calls

### Understanding Routing

**Routing** allows navigation between pages without page reload:
- Routes are defined in `app.routes.ts`
- Each route maps a URL to a component
- Example: `/login` → `LoginComponent`

### Understanding Reactive Forms

**Reactive Forms** provide:
- Form validation
- Dynamic form controls
- Type safety with TypeScript

Example in `login.component.ts`:
```typescript
this.loginForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]]
});
```

### Understanding Interfaces

**Interfaces** define the structure of data:
- Provide type checking
- Make code more maintainable
- Document data structures

Example: `Produits` interface defines what a product object looks like

### Key Angular Concepts Used

1. **Dependency Injection**: Services are injected into components via constructor
2. **Observables**: Asynchronous data streams (used with HTTP requests)
3. **Directives**: `@if`, `@for` for conditional rendering and loops
4. **Data Binding**: `[property]="value"` and `(event)="handler()"`
5. **Routing**: Navigation between pages

## 🎨 Customization

### Changing Colors

Edit `src/styles.css` and component CSS files to change the color scheme.

### Adding New Products

1. Login to the application
2. Navigate to "Ajouter"
3. Fill in the product form
4. Submit

Or manually edit `db.json` and restart the JSON Server.

### Modifying Validation Rules

Edit the validators in component TypeScript files:
- `login.component.ts` for login validation
- `register.component.ts` for registration validation
- `ajouter.component.ts` for product form validation

## 🐛 Troubleshooting

**Problem**: "Cannot find module '@angular/core'"
- **Solution**: Run `npm install`

**Problem**: JSON Server not starting
- **Solution**: Make sure port 3000 is not in use, or change the port in package.json

**Problem**: Angular app not loading
- **Solution**: Make sure both servers are running (JSON Server + Angular dev server)

**Problem**: Login not working
- **Solution**: Check that JSON Server is running and accessible at http://localhost:3000

## 📝 Notes for Beginners

- **All code is heavily commented** - Read the comments to understand what each part does
- **Start with simple components** - Look at `home.component.ts` first
- **Understand the flow** - User clicks → Component method → Service → API → Response → Update UI
- **Use browser DevTools** - Check the Console and Network tabs for errors
- **Read Angular docs** - [angular.io](https://angular.io) is your friend!

## 🎓 Learning Resources

- [Angular Official Documentation](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [RxJS Documentation](https://rxjs.dev/)

## 📄 License

This project is for educational purposes.

---

**Happy Coding! 🚗💨**

For questions or issues, please review the code comments or consult the Angular documentation.
