# Project Nexus - Folder Structure

## Backend/: Root directory for the backend.

- **.env**: Environment variables file.
- **.env.sample**: Sample environment variables file.
- **.gitignore**: Files/folders to exclude from version control.
- **.prettierignore**: Files to ignore for Prettier formatting.
- **.prettierrc**: Prettier configuration for code formatting.
- **package.json**: Manages dependencies and scripts.
- **README.md**: Backend documentation.
- **logs/**: Directory for log files (auto-created).
- **public/**: Holds static files served by the backend.
- **scripts/**: Utility and seeding scripts.
- **temp/**: Temporary file storage.
- **src/**: Contains backend source code.
  - **server.js**: Main server entry point.
  - **controllers/**: Request handlers and business logic.
  - **middlewares/**: Express middleware functions.
  - **models/**: MongoDB data models/schemas.
    - UserModel.js: User model schema.
  - **routes/**: API route definitions.
  - **services/**: Business logic services.
  - **utils/**: Utility functions and helpers.
    - db.js: Database connection utility.

---

## Frontend/: Root directory for the frontend.

- **.env**: Environment variables file.
- **.env.example**: Example environment variables file.
- **.gitignore**: Files/folders to exclude from version control.
- **eslint.config.js**: ESLint configuration for linting.
- **index.css**: Main CSS file.
- **index.html**: Main HTML file.
- **package.json**: Manages dependencies and scripts.
- **package-lock.json**: Locks dependency versions.
- **README.md**: Frontend documentation.
- **vite.config.js**: Vite build configuration.
- **public/**: Holds static files.
- **src/**: Contains React source code.
  - **App.jsx**: Main App component.
  - **Layout.jsx**: Layout wrapper component.
  - **main.jsx**: React entry point.
  - **index.css**: Component styles.
  - **assets/**: Images and assets.
  - **components/**: Reusable React components.
    - **extras/**: Extra utility components.
      - **Footer/**: Footer component.
        - Footer.jsx
      - **Header/**: Header component.
        - Header.jsx
      - **Navbar/**: Navigation bar component.
        - Navbar.jsx
      - **Sidebar/**: Sidebar navigation component.
        - Sidebar.jsx
  - **contexts/**: React context providers for state management.
  - **hooks/**: Custom React hooks.
  - **middleware/**: Middleware functions.
  - **pages/**: Page components.
    - HomePage.jsx: Home landing page.
  - **redux/**: Redux store setup.
    - **store.js**: Redux store configuration.
    - **slices/**: Redux slice definitions.
  - **Routes/**: Routing configuration.
  - **styles/**: CSS and styling files.
  - **utils/**: Utility functions and helpers.
