import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useContext, useState } from 'react';
import './App.css';

// Context
import { AuthProvider } from './context/AuthContext';
import { ThemeContext, ThemeProvider as CustomThemeProvider } from './context/ThemeContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import HospitalDetail from './pages/HospitalDetail';
import CreateHospital from './pages/CreateHospital';
import EditHospital from './pages/EditHospital';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Theme component that uses the ThemeContext
const ThemedApp = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 500,
      },
      h2: {
        fontWeight: 500,
      },
      h3: {
        fontWeight: 500,
      },
      button: {
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 25,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
          <Navbar toggleDarkMode={toggleDarkMode} toggleSidebar={toggleSidebar} />
          <div className="container">
            <Sidebar open={sidebarOpen} />
            <div style={{ 
              width: '100%',
              marginLeft: sidebarOpen ? '240px' : '0',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              maxWidth: sidebarOpen ? 'calc(100% - 240px)' : '100%',
              position: 'absolute',
              left: 0,
              right: 0
            }}>
              <main className="content" style={{
                margin: sidebarOpen ? '0' : '0 auto',
                maxWidth: sidebarOpen ? '100%' : '1200px'
              }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/hospitals/create" element={<CreateHospital />} />
                  <Route path="/hospitals/:id" element={<HospitalDetail />} />
                  <Route path="/hospitals/:id/edit" element={<EditHospital />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <ThemedApp />
      </CustomThemeProvider>
    </AuthProvider>
  );
}

export default App;
