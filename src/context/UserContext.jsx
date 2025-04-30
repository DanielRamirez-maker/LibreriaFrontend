// src/context/UserContext.jsx
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const EXAMPLE_USER = {
  name: 'Usuario de Ejemplo',
  email: 'example@gmail.com',
  password: 'uwu',
  city: 'EjemploCity',
  country: 'EjemploLand',
  age: 30,
  gender: 'Otro',
  profession: 'Tester',
  membership: {
    id: 'CARD0001',
    balance: 100000
  },
  purchaseHistory: []
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage al inicio
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (!parsed.purchaseHistory) {
          parsed.purchaseHistory = [];
        }
        setUser(parsed);
      } catch (e) {
        console.error('Error al cargar usuario:', e);
      }
    }
  }, []);

  // Guardar usuario en localStorage cuando cambie (excepto el ejemplo)
  useEffect(() => {
    if (user && user.email !== EXAMPLE_USER.email) {
      localStorage.setItem('user', JSON.stringify(user));
    } else if (!user) {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Inicio de sesión
  const login = ({ email, password }) => {
    if (email === EXAMPLE_USER.email && password === EXAMPLE_USER.password) {
      setUser({ ...EXAMPLE_USER });
      return true;
    }

    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (
        parsed.email === email &&
        parsed.password === password
      ) {
        if (!parsed.purchaseHistory) {
          parsed.purchaseHistory = [];
        }
        setUser(parsed);
        return true;
      }
    }

    return false;
  };

  // Registro
  const signup = (newUser) => {
    if (newUser.email === EXAMPLE_USER.email) return;
    const completeUser = {
      ...newUser,
      membership: {
        id: 'CARD' + Date.now(),
        balance: 100000
      },
      purchaseHistory: []
    };
    setUser(completeUser);
    localStorage.setItem('user', JSON.stringify(completeUser));
  };

  // Cierre de sesión
  const logout = () => {
    setUser(null);
  };

  // Actualización de perfil o tarjeta
  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
  };

  // Registro de compras
  const registerPurchase = (items) => {
    if (!user) return;

    const newHistory = [...(user.purchaseHistory || [])];

    items.forEach(item => {
      const existing = newHistory.find(b => b.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        newHistory.push({
          id: item.id,
          title: item.title,
          author: item.author,
          imageUrl: item.imageUrl,
          quantity: item.quantity
        });
      }
    });

    const updatedUser = { ...user, purchaseHistory: newHistory };
    setUser(updatedUser);

    // Solo guardar en localStorage si no es el usuario de ejemplo
    if (user.email !== EXAMPLE_USER.email) {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
      signup,
      logout,
      updateProfile,
      registerPurchase
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
