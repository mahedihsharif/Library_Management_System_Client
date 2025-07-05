#Live Link: https://library-management-app-one-mu.vercel.app/

# 📚 Library Management System

A **minimal and modern Library Management System** built with **React, Vite, Redux Toolkit Query (RTK Query), TypeScript, Tailwind CSS**, and **Shadcn/UI**. This is a fully functional frontend client that interacts with a RESTful API to perform core library operations such as book CRUD, borrowing books, and viewing a borrow summary—all without authentication or category filtering.

---

## ✨ Features

### ✅ Public Routes

- No authentication required
- All features accessible publicly

### 📘 Book Management

- **Book List Table:** Displays all books with columns:
  - Title, Author, Genre, ISBN, Copies, Availability, Actions
- **Edit Book:** Updates book info via form and reflects changes immediately
- **Delete Book:** Confirmation before removing a book
- **Borrow Book:** Opens a borrow form (quantity, due date)
- **Add Book:** Form with fields (title, author, genre, ISBN, description, copies)
  - Auto-marks books as unavailable when copies reach 0

### 📦 Borrow Functionality

- **Borrow Form:** Quantity must not exceed available copies
- On successful borrow:
  - Shows toast/alert
  - Redirects to borrow summary
  - Auto-updates availability if copies = 0

### 📊 Borrow Summary

- Displays an aggregated list of borrowed books
- Columns: Book Title, ISBN, Total Quantity Borrowed

---

## 🗂️ Pages & Routes

| Route             | Description                                       |
| ----------------- | ------------------------------------------------- |
| `/books`          | List of all books with edit/delete/borrow actions |
| `/create-book`    | Form to add a new book                            |
| `/books/:id`      | Detailed view of a single book                    |
| `/edit-book/:id`  | Update form for book information                  |
| `/borrow/:bookId` | Borrow form for the selected book                 |
| `/borrow-summary` | Summary of all borrowed books                     |

---

## 🧩 UI/UX

- **Minimalist & Clean Design:** Tailwind CSS + Shadcn/UI components
- **Responsive Layout:** Works seamlessly on mobile, tablet, and desktop
- **Simple Navigation:** Navbar with links to core pages
- **Feedback Alerts:** Success or error messages on actions

---

## 🧪 Tech Stack

| Tech         | Purpose                           |
| ------------ | --------------------------------- |
| React        | UI Development                    |
| Vite         | Fast build tool for development   |
| TypeScript   | Type safety and better DX         |
| RTK Query    | Data fetching & state management  |
| Tailwind CSS | Utility-first styling             |
| Shadcn/UI    | Prebuilt accessible UI components |

---

## 🚀 Installation & Setup Guide

Follow these steps to run the project locally:

### ✅ Prerequisites

- Node.js (v18 or above recommended)
- npm or yarn
- Backend API ready and running (ensure it supports expected RESTful endpoints)

---

### ⚙️ Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/mahedihsharif/Library_Management_System_Client.git
cd Library_Management_System_Client

# 2. Install dependencies
npm install
# or
yarn install

# 3. Setup environment variables (if needed)
# Create a .env file in root and define:
# VITE_API_BASE_URL=https://your-api-url.com/api

# 4. Run the app in development mode
npm run dev
# or
yarn dev
```

📁 Project Structure (Example)
src/
├── app/ # Redux store setup
├── components/ # UI and reusable components
├── features/ # Slices for books and borrow
├── pages/ # Page-level components
├── routes/ # Route definitions
├── types/ # TypeScript types
└── utils/ # Utility functions (optional)
