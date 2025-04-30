// src/App.jsx
import { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaShoppingCart,
  FaSearch
} from 'react-icons/fa';

import Home from './pages/Home';
import CartView from './components/CartView';
import SignUp from './pages/SignUp';
import Login from './pages/LogIn';
import Profile from './pages/Profile';

import UserContext from './context/UserContext';

function App() {
  const [showCart, setShowCart] = useState(false);
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState('');

  return (
    <div style={{ backgroundColor: '#dddddd', minHeight: '100vh' }}>
      <Router>
        <header style={styles.header}>
          <div style={styles.topBar}>
            <nav style={styles.nav}>
              <Link to="/" style={styles.iconLink} title="Inicio"><FaHome /></Link>
              {!user && <Link to="/signup" style={styles.iconLink} title="Registro"><FaUserPlus /></Link>}
              {!user && <Link to="/login" style={styles.iconLink} title="Iniciar sesión"><FaSignInAlt /></Link>}
              {user && <Link to="/profile" style={styles.iconLink} title="Perfil"><FaUser /></Link>}
            </nav>

            <div style={styles.searchBar}>
              <FaSearch />
              <input
                type="text"
                placeholder="Buscar libros..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <button onClick={() => setShowCart(true)} style={styles.cartBtn} title="Ver carrito">
              <FaShoppingCart size={24} />
            </button>
          </div>
        </header>

        <main style={{ position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Home searchQuery={search} setSearchQuery={setSearch} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

          {showCart && (
            <>
              <div style={styles.overlay} onClick={() => setShowCart(false)} />
              <CartView onClose={() => setShowCart(false)} />
            </>
          )}
        </main>
      </Router>
    </div>
  );
}

const styles = {
  header: {
    background: '#E36F71',
    color: 'white',
    padding: '10px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nav: {
    display: 'flex',
    gap: '16px',
  },
  iconLink: {
    color: 'white',
    fontSize: '20px',
    textDecoration: 'none',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    padding: '4px 8px',
    borderRadius: '5px',
    color: '#333',
    flexGrow: 1,
    margin: '0 20px',
    maxWidth: '400px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    padding: '6px',
    fontSize: '14px',
    flex: 1,
    marginLeft: '6px',
  },
  cartBtn: {
    backgroundColor: '#007acc',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    color: 'white',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 999,
  },
};

export default App;
