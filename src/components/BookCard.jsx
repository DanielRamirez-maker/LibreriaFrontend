import { useContext } from 'react';
import CartContext from '../context/CartContext';

function BookCard({ book }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={styles.card}>
      <img src={book.imageUrl} alt={book.title} style={styles.image} />
      <h3 style={styles.title}>{book.title}</h3>
      <p style={styles.author}>{book.author}</p>
      <p style={styles.price}><strong>${book.price.toLocaleString()}</strong></p>
      <p style={styles.stock}>Stock disponible: {book.stock}</p>
      <button onClick={() => addToCart(book)} style={styles.button}>Agregar al carrito</button>
    </div>
  );
}

const styles = {
  card: {
    width: '180px',
    background: '#f1f1f1',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '380px', // Ajustado para incluir stock
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '8px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '4px 0',
  },
  author: {
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#555',
    margin: '4px 0',
  },
  price: {
    fontSize: '15px',
    margin: '4px 0',
  },
  stock: {
    fontSize: '13px',
    color: '#007acc',
    margin: '4px 0',
  },
  button: {
    marginTop: '10px',
    padding: '6px',
    backgroundColor: '#007acc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default BookCard;
