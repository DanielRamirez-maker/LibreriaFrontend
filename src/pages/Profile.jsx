import { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';

function Profile() {
  const { user, updateProfile, logout } = useContext(UserContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    country: '',
    age: '',
    gender: '',
    profession: '',
  });
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setForm({ ...user });
    }
  }, [user]);

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

    updateProfile(form);
    setMessage('Perfil actualizado con éxito.');
  };

  const handleRecharge = () => {
    const amount = parseInt(rechargeAmount, 10);
    if (isNaN(amount) || amount < 50000 || amount > 200000) {
      setMessage('Ingresa un monto entre $50.000 y $200.000.');
      return;
    }

    const updatedUser = {
      ...user,
      membership: {
        ...user.membership,
        balance: user.membership.balance + amount
      }
    };

    updateProfile(updatedUser);
    setRechargeAmount('');
    setMessage(`Saldo recargado con éxito: +$${amount.toLocaleString()}`);
  };

  if (!user) {
    return <div style={styles.page}><p style={{ textAlign: 'center' }}>No has iniciado sesión.</p></div>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>Mi Perfil</h2>

        <div style={styles.columns}>
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
            <button type="submit" style={styles.button}>Actualizar</button>
            <button type="button" onClick={logout} style={styles.logoutBtn}>Cerrar sesión</button>
          </form>

          <div style={styles.rightColumn}>
            {user.membership && (
              <div style={styles.cardBox}>
                <h3>💳 Tarjeta de membresía</h3>
                <p><strong>Saldo disponible:</strong> ${user.membership.balance.toLocaleString()}</p>
                <div style={styles.rechargeBox}>
                  <input
                    type="number"
                    placeholder="Monto a recargar"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                    style={styles.input}
                  />
                  <button onClick={handleRecharge} style={styles.button}>Recargar</button>
                </div>
              </div>
            )}

            {user.purchaseHistory && user.purchaseHistory.length > 0 && (
              <div style={styles.historyBox}>
                <h3>📚 Historial de Compras</h3>
                <div style={styles.historyGrid}>
                  {user.purchaseHistory.map((item) => (
                    <div key={item.id} style={styles.bookCard}>
                      <img src={item.imageUrl} alt={item.title} style={styles.bookImage} />
                      <p style={styles.bookTitle}>{item.title}</p>
                      <p>Cantidad: {item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#dddddd',
    minHeight: '100vh',
    padding: '20px',
  },
  container: {
    maxWidth: '1000px',
    margin: 'auto',
    padding: '20px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  },
  columns: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minWidth: '280px',
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
  logoutBtn: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#e74c3c',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
  rightColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    minWidth: '280px',
  },
  cardBox: {
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#fff',
  },
  rechargeBox: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  historyBox: {
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#fff',
  },
  historyGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginTop: '10px',
  },
  bookCard: {
    width: '120px',
    padding: '10px',
    background: '#fff',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  },
  bookImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  bookTitle: {
    fontWeight: 'bold',
    marginTop: '6px',
  }
};

export default Profile;
