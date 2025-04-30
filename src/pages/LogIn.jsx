import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

function Login() {
  const { login } = useContext(UserContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(form);
    if (success) {
      setMessage('Inicio de sesión exitoso.');
    } else {
      setMessage('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Ingresar</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#dddddd',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007acc',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    color: 'crimson',
    textAlign: 'center',
  },
};

export default Login;
