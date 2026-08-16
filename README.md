# Ledger Blue · Task Manager

A calm, focused task management application built with React and Firebase.  
Designed with a single indigo hue, left‑edge status borders, and zero visual noise.

**Live demo:** [https://taskmanager-ed022.web.app/](https://taskmanager-ed022.web.app/)

---

## Features

- **Authentication** – Sign up, sign in, sign out with strong password validation (min 8 chars, uppercase, lowercase, number, special character).
- **Password Reset** – Users can request a password reset email via the "Forgot Password?" link on the login page.
- **Profile Management** – View and edit your first and last name, see account creation date, last login, and total task count.
- **Profile Avatar** – Automatically generated initials avatar (e.g., "AW" for Ashley Wanja) that updates when you change your name.
- **Task CRUD** – Create, edit, mark complete, and delete tasks. Each task has a title, description, status (To Do, In Progress, Done), and due date.
- **User‑owned data** – Tasks are scoped to each user via Firestore security rules and query filters.
- **Real‑time updates** – Changes appear instantly across all devices using Firestore's `onSnapshot`.
- **Filtering & Sorting** – Filter tasks by status (All, To Do, In Progress, Done) and sort by due date, created date, or title (ascending/descending).
- **Color‑coded status** – Red for To Do, Amber for In Progress, Green for Done. Overdue tasks get a brick‑red left border.
- **Notification System** – Bell icon with real‑time alerts for task actions (add, update, delete) and due‑date reminders (24h and 1h before deadline).
- **Accessibility Controls** – Adjust font size (Small/Medium/Large) and font family (Sans/Serif/Mono) directly from the profile dropdown. Settings persist across sessions.
- **Responsive design** – Works on desktop and mobile screens.
- **Ledger Blue theme** – One hue family, warm‑neutral background, minimal UI with clear states.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React (Vite) | Frontend framework & build tool |
| Tailwind CSS | Styling & theming |
| react-hook-form | Form handling & validation |
| Firebase Authentication | User management |
| Cloud Firestore | Database & real-time updates |
| Firebase Hosting | Deployment *(planned)* |

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Wendy-Okoth/TaskManager.git
cd TaskManager
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and add your Firebase configuration (see [Environment Variables](#-environment-variables) below).

### 4. Start the development server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### 5. Build for production
```bash
npm run build
```

---

## Environment Variables

Create a `.env` file with the following variables (obtain these from your Firebase project settings):

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

> **Never commit the `.env` file** – it is already included in `.gitignore`.

---

## Architecture & Design Decisions

### Component Structure

The application follows a modular, feature‑based structure:

```
src/
├── components/
│   ├── Auth/          – Login and Signup forms
│   ├── Layout/        – Navbar and Footer
│   └── Tasks/         – TaskItem, TaskForm, TaskFilters
├── contexts/          – AuthContext (user state)
├── hooks/             – useTasks (Firestore CRUD + filtering/sorting)
├── pages/             – Home, Dashboard
└── firebase.js        – Firebase initialisation
```

### State Management

- **Authentication** – React Context (`AuthContext`) with `onAuthStateChanged` listener.
- **Notifications** – React Context (`NotificationContext`) with localStorage persistence for retaining notifications across sessions. Manages unread counts, marking as read, and clearing notifications.
- **Accessibility** – React Context (`AccessibilityContext`) with localStorage persistence for font size and font family preferences. Applies CSS variables globally.
- **Tasks** – Custom hook (`useTasks`) that:
  - Subscribes to Firestore `onSnapshot` for real‑time updates.
  - Applies filtering and sorting via `useMemo` for performance.
  - Provides CRUD operations (`addTask`, `updateTask`, `deleteTask`).

### Styling Strategy

- **Tailwind CSS** with a custom `Ledger Blue` theme.
- **Single hue family** – Indigo at three weights (full, tinted, pale).
- **Status indicator** – Left‑edge border (3px) that changes colour based on task state:
  - To Do → Tinted Indigo
  - In Progress → Solid Indigo
  - Done → Transparent (task fades to 50% opacity + strikethrough)
  - Overdue → Brick Red
- **Typography** – Inter for everything, with 600 weight for titles and 400 at 90% size for metadata.

### Real‑time Updates

Using Firestore `onSnapshot` ensures tasks update instantly without page refresh – a key requirement for a modern task manager.

---

## Security & Access Control

Firestore security rules enforce that users can only access their own tasks.

**Rules (published in Firebase Console):**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

**What these rules enforce:**

- Only authenticated users can read/write.
- Users can only see tasks where `userId` matches their own UID.
- Creation requires the `userId` field to match the authenticated user.

**Additional security measures:**

- All sensitive configuration is stored in environment variables.
- `.env` is excluded from version control.
- Firebase Authentication handles password hashing and session management.

---

## Assumptions & Limitations

| Limitation | Status |
|------------|--------|
| Task archiving | Not implemented |
| Task priorities (Low/Medium/High) | Not implemented |
| Task search | Not implemented |
| Task labels/tags | Not implemented |
| Mobile testing | Limited |

---

## If I Had More Time

Here are improvements I would prioritise:

### 1. Task Priorities
Add a priority field (Low/Medium/High) with visual cues (e.g., subtle dot or border weight).

### 2. Task Search
Add a live search bar to filter tasks by title or description – a natural companion to the existing filter/sort.

### 3. Task Labels/Tags
Allow users to add custom labels for better organisation (e.g., "Work", "Personal", "Shopping").

### 4. Archive & Restore
Soft‑delete tasks and allow restoration from an archive view – avoids permanent data loss.

### 5. Keyboard Shortcuts
Add shortcuts for power users (e.g., `Ctrl+N` to add a task, `Esc` to close modals).

### 6. Automated Tests
Write unit and integration tests for critical flows:
- Authentication (signup, login, logout)
- Task CRUD operations
- Filtering and sorting logic

### 7. Performance Optimisation
Implement pagination or infinite scroll for large task lists.

### 8. Dark Mode Toggle
Though the theme respects system preferences, a dedicated toggle would improve user control.

---

## Enhancements Implemented

| Enhancement | Description |
|-------------|-------------|
| Filtering | Filter tasks by status (All, To Do, In Progress, Done) |
| Sorting | Sort by due date, created date, or title (asc/desc) |
| Real‑time updates | Firestore `onSnapshot` for instant UI updates |
| Responsive design | Works across desktop and mobile screen sizes |
| Accessibility | Semantic HTML, ARIA labels on action buttons, focus management |
| Profile Management | Edit name, view stats, initials avatar |
| Notifications | Bell icon with task alerts and due‑date reminders |
| Password Reset | Forgot password email with spam alert |
| Accessibility Controls | Font size and font family adjustments saved to localStorage |

---

## License

This project is not licensed for redistribution.

---