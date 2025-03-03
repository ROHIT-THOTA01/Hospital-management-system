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
        main: '#2563eb', // Modern blue
        light: '#60a5fa',
        dark: '#1d4ed8',
      },
      secondary: {
        main: '#7c3aed', // Modern purple
        light: '#a78bfa',
        dark: '#5b21b6',
      },
      background: {
        default: darkMode ? '#0f172a' : '#f8fafc',
        paper: darkMode ? '#1e293b' : '#ffffff',
      },
      error: {
        main: '#ef4444',
      },
      warning: {
        main: '#f59e0b',
      },
      success: {
        main: '#10b981',
      },
      info: {
        main: '#3b82f6',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1rem',
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 16px',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
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
