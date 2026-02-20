# User Management App

A modern, feature-rich React-based user management application built with TypeScript, Tailwind CSS, Redux Toolkit, and React Router. This application demonstrates proficiency in core React concepts including components, state management, routing, forms, and data fetching.

## 🚀 Features

### Core Features
- ✅ **List Users**: Fetches and displays users from JSONPlaceholder API
- ✅ **Search Functionality**: Real-time search by name or email
- ✅ **User Details Page**: View detailed information including address, phone, and website
- ✅ **Add New User**: Client-side form to add users locally with validation
- ✅ **Form Validation**: Required field validation for name and email

### Bonus Features
- ✅ **Sorting**: Sort users by name, email, or company name (ascending/descending)
- ✅ **Redux State Management**: Complete Redux Toolkit implementation
- ✅ **Update Users**: Edit existing users with a modal form
- ✅ **Delete Users**: Remove users from the list with confirmation
- ✅ **Dual View Modes**: Switch between table and card views
- ✅ **Responsive Design**: Fully responsive layout for all screen sizes
- ✅ **Loading States**: Elegant loading indicators
- ✅ **Error Handling**: Comprehensive error handling and display

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **ESLint** - Code linting

## 📋 Prerequisites

- Node.js (v16 or later)
- npm or yarn

## 🏃 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
user-management-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx
│   │   ├── SearchBar.tsx
│   │   ├── UserCard.tsx
│   │   ├── UserTable.tsx
│   │   ├── AddUserForm.tsx
│   │   └── EditUserForm.tsx
│   ├── pages/               # Page components
│   │   ├── UserList.tsx
│   │   └── UserDetails.tsx
│   ├── store/               # Redux store configuration
│   │   ├── store.ts
│   │   ├── hooks.ts
│   │   └── slices/
│   │       └── usersSlice.ts
│   ├── services/            # API services
│   │   └── api.ts
│   ├── types/               # TypeScript type definitions
│   │   └── user.ts
│   ├── utils/               # Utility functions
│   │   ├── filtering.ts
│   │   └── sorting.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎯 Usage

### Viewing Users
- Users are automatically fetched from the API on app load
- View users in either table or card format using the toggle buttons
- Click on a user's name to view their detailed information

### Searching Users
- Use the search bar to filter users by name or email
- Search is performed in real-time as you type

### Sorting Users
- Click on column headers (Name, Email, Company) in table view to sort
- Click again to toggle between ascending and descending order

### Adding a User
1. Click the "Add User" button
2. Fill in the required fields (Name and Email)
3. Optionally fill in additional information
4. Click "Add User" to save

### Editing a User
1. Click the edit icon (pencil) next to any user
2. Modify the user information
3. Click "Update User" to save changes

### Deleting a User
1. Click the delete icon (trash) next to any user
2. Confirm the deletion in the dialog

## 🔌 API

The application fetches user data from:
- **Base URL**: `https://jsonplaceholder.typicode.com/users`

Note: Newly added users are stored locally in the application state and are not persisted to the API.

## 🎨 Features in Detail

### State Management
- Redux Toolkit for centralized state management
- Async thunks for API calls
- Optimistic updates for better UX

### Form Validation
- Required field validation for name and email
- Email format validation
- Real-time error display

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface

### User Experience
- Loading states during API calls
- Error messages for failed operations
- Confirmation dialogs for destructive actions
- Smooth transitions and hover effects

## 🧪 Development

### Linting
```bash
npm run lint
```

### Type Checking
TypeScript will automatically check types during development and build.

## 📝 Notes

- All user modifications (add, update, delete) are client-side only
- Changes are not persisted to the API
- Page refresh will reset to original API data
- User IDs for new users are generated using timestamps

## 🤝 Contributing

This is an internship challenge project. Feel free to fork and enhance!

## 📄 License

See LICENSE file for details.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
