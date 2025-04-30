import { useContext } from 'react';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import books from '../data/books';
import { useNavigate } from 'react-router-dom';

function CartView({ onClose }) {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  const { user, updateProfile } = useContext(UserContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (!user) {
      onClose();
      navigate('/login');
      return;
    }

    // Verificar stock
    for (let item of cartItems) {
      const found = books.find(book => book.id === item.id);
      if (!found || found.stock < item.quantity) {
        alert(`No hay suficiente stock de "${item.title}".`);
        return;
      }
    }

    // Verificar saldo
    if (!user.membership || user.membership.balance < total) {
      alert('Saldo insuficiente en la tarjeta de membresía.');
      return;
    }

    // Descontar stock
    for (let item of cartItems) {
      const found = books.find(book => book.id === item.id);
      if (found) found.stock -= item.quantity;
    }

    // Actualizar historial de compra en memoria
    const currentHistory = [...(user.purchaseHistory || [])];

    cartItems.forEach(item => {
      const existing = currentHistory.find(book => book.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        currentHistory.push({
          id: item.id,
          title: item.title,
          author: item.author,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
        });
      }
    });

    // Actualizar usuario con historial y nuevo saldo
    const updatedUser = {
      ...user,
      membership: {
        ...user.membership,
        balance: user.membership.balance - total,
      },
      purchaseHistory: currentHistory
    };

    updateProfile(updatedUser);
    clearCart();
    alert('¡Compra realizada con éxito!');
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <button onClick={onClose} style={styles.close}>×</button>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul style={styles.list}>
            {cartItems.map(item => (
              <li key={item.id} style={styles.item}>
                <img src={item.imageUrl} alt={item.title} style={styles.image} />
                <div>
                  <h4>{item.title}</h4>
                  <p><em>{item.author}</em></p>
                  <p>${item.price.toLocaleString()} x {item.quantity}</p>
                  <div style={styles.controls}>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>Eliminar</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toLocaleString()}</h3>
          <button onClick={handlePayment} style={styles.payBtn}>
            Proceder al pago
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
    overlay: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '400px',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    boxShadow: '-2px 0 10px rgba(0,0,0,0.2)',
    padding: '20px',
    overflowY: 'auto',
    zIndex: 1000,
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    fontSize: '24px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    display: 'flex',
    gap: '10px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  image: {
    width: '60px',
    height: '80px',
    objectFit: 'cover',
  },
  controls: {
    marginTop: '5px',
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
  },
  removeBtn: {
    background: 'red',
    color: 'white',
    border: 'none',
    padding: '4px 8px',
    cursor: 'pointer',
  },
  payBtn: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    background: '#007acc',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default CartView;
