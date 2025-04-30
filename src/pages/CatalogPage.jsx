// src/pages/CatalogPage.jsx
import books from '../data/books';
import BookCard from '../components/BookCard';

function CatalogPage() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
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
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
  },
};

export default CatalogPage;
