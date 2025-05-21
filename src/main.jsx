// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

// Punto de entrada de la app con contextos globales
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>          {/* Proveedor de contexto de usuario */}
      <CartProvider>        {/* Proveedor de contexto del carrito */}
        <App />             {/* Componente principal */}
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
