import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

// Import pages
import Login from './Pages/Login/Login';
import Homepage from './Pages/Homepage/Homepage';
import Register from './Pages/Register/Register';
import Usuarios from './Pages/Usuarios/Usuarios';
import CadastrarUsuario from './Pages/Usuarios/CadastrarUsuario';
import Monitores from './Pages/Monitores/Monitores';
import Pcs from './Pages/Pcs/Pcs';
import Smartphone from './Pages/Smartphone/Smartphone';
import Softwares from './Pages/Softwares/Softwares';
import Chips from './Pages/Chips/Chips';
import AssociarAtivo from './Pages/AssociarAtivo/AssociarAtivo'
import Logger from './Pages/Logger/Logger'

// Import components
import Navigator from './Components/Navigator';
import Header from './Components/Header';

// Definição do tema
const theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    // Definições de estilo para os componentes
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
          width: 256, // Garantir que a largura seja a mesma em todos os lugares
        },
      },
    },
    // Outros componentes
  },
});

function App() {
  const [user, setUser] = useState(undefined);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Navigator />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
              <Routes>
                <Route path="/" element={!user ? <Login /> : <Navigate to="/homepage" />} />
                <Route path="/homepage" element={!user ? <Homepage /> : <Navigate to="/login" />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/homepage" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/cadastrar-usuario" element={!user ? <CadastrarUsuario /> : <Navigate to="/login" />} />
                <Route path="/ativos" element={!user ? <AssociarAtivo /> : <Navigate to="/login" />} />
                <Route path="/monitores" element={!user ? <Monitores /> : <Navigate to="/login" />} />
                <Route path="/pcs" element={!user ? <Pcs /> : <Navigate to="/login" />} />
                <Route path="/smartphone" element={!user ? <Smartphone /> : <Navigate to="/login" />} />
                <Route path="/softwares" element={!user ? <Softwares /> : <Navigate to="/login" />} />
                <Route path="/chips" element={!user ? <Chips /> : <Navigate to="/login" />} />
                <Route path="/logger" element={!user ? <Logger /> : <Navigate to="/login" />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
