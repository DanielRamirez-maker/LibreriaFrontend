// src/pages/SignUp.jsx
import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';

function SignUp() {
  const { login } = useContext(UserContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    country: '',
    age: '',
    gender: '',
    profession: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'email', 'password', 'city', 'country', 'age', 'gender', 'profession'];
    const missing = requiredFields.some(field => !form[field]);
    if (missing) {
      setMessage('Todos los campos son obligatorios.');
      return;
    }

    if (form.email === 'example@gmail.com') {
      setMessage('No puedes registrar ese correo, ya está reservado.');
      return;
    }

    const newUser = {
      ...form,
      membership: {
        id: 'CARD' + Date.now(),
        balance: 100000
      }
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    login(newUser);
    setMessage('Usuario registrado con éxito.');
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} style={styles.input} />
          <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} style={styles.input} />
          <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} style={styles.input} />
          <input type="text" name="city" placeholder="Ciudad" value={form.city} onChange={handleChange} style={styles.input} />
          <input type="text" name="country" placeholder="País" value={form.country} onChange={handleChange} style={styles.input} />
          <input type="number" name="age" placeholder="Edad" value={form.age} onChange={handleChange} style={styles.input} />
          <select name="gender" value={form.gender} onChange={handleChange} style={styles.input}>
            <option value="">Seleccionar sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          <input type="text" name="profession" placeholder="Profesión" value={form.profession} onChange={handleChange} style={styles.input} />
          <button type="submit" style={styles.button}>Registrarse</button>
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
    padding: '40px 20px',
  },
  container: {
    maxWidth: '450px',
    margin: '0 auto',
    padding: '20px',
    background: '#fff',
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
    color: 'green',
    textAlign: 'center',
  },
};

export default SignUp;
