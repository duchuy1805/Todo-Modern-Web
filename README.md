# ToDo Modern Web

**A high-performance, minimalist task management application designed for focus and productivity.**

ToDo Modern Web is a comprehensive task management application built on the **MERN Stack** and **TypeScript**. The project focuses on providing a minimalist interface, high responsiveness, and a robust data processing workflow, meeting the standards of a production-ready application.

<div align="center">

[![Project Status: Active](https://img.shields.io/badge/Project%20Status-Active-brightgreen.svg)](https://github.com/duchuy1805/Todo-Modern-Web)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss_4-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

## Core Features

The system is engineered with the following core functional modules:

### Task Management (CRUD)
- **Comprehensive Lifecycle:** Manage the full lifecycle of a task from creation to completion or removal.
- **Dynamic Updates:** Edit task information directly with real-time status synchronization.
- **Task Filtering:** Categorize and filter tasks by completion status to optimize workflow efficiency.

### Database & Performance
- **Optimized Queries:** Database interactions are optimized via an independent Service layer.
- **Type-Safe Interaction:** Utilizes TypeScript Interfaces to define strict data structures, minimizing runtime errors.

### User Interface & Experience
- **Modern Design System:** Built on **Tailwind CSS v4** and **Shadcn UI** for a modern, professional interface.
- **Responsive Layout:** Fully optimized for multi-device displays (Mobile, Tablet, Desktop).
- **Clean Interactions:** Smooth user experience focused on minimalism and practicality.

## Tech Stack

### Backend
- **Framework:** [Express.js](https://expressjs.com/)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Using `tsx` for development environment)
- **Database:** [MongoDB](https://www.mongodb.com/) (Native Driver)
- **Environment:** Dotenv for secure configuration management.

### Frontend (Planned)
- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)

## Project Structure

```bash
todo-web
 ┣ backend                    # Server-side application
 ┃ ┣ src
 ┃ ┃ ┣ controllers            # Request/Response handling logic
 ┃ ┃ ┣ routes                 # API endpoint definitions
 ┃ ┃ ┣ services               # Business logic & Database interactions
 ┃ ┃ ┣ models                 # Data schemas & Type definitions
 ┃ ┃ ┗ server.ts              # Server entry point
 ┃ ┣ .env                     # Local environment variables
 ┃ ┣ tsconfig.json            # TypeScript configuration
 ┃ ┗ package.json
 ┣ .gitignore                 # Git exclusion rules
 ┗ README.md                  # Project documentation
 ```
## Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/duchuy1805/Todo-Modern-Web.git](https://github.com/duchuy1805/Todo-Modern-Web.git)
cd Todo-Modern-Web
```
### 2. Backend Setup
```bash
cd backend
npm install
# Tạo file .env dựa trên mục Environment Variables bên dưới
npm run dev
```
Environment Variables
Ensure your backend/.env file is correctly configured with the following parameters:

PORT: Backend server port (Default: 5001).

MONGODB_URI: Connection string to your MongoDB Atlas cluster.

DB_NAME: The name of the database used in the project.