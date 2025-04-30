import { useState } from 'react';
import books from '../data/books';
import BookCard from '../components/BookCard';

function Home({ searchQuery, setSearchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'Novels', 'Stories', 'Poems', 'Art', 'Science', 'Technology',
    'Computing', 'Sports', 'Law', 'Economy', 'Entertainment',
    'Fiction', 'Philosophy', 'History', 'Medicine', 'Comics', 'Health',
  ];

  const filteredBooks = books.filter((book) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.genre.toLowerCase().includes(term) ||
      book.isbn.toLowerCase().includes(term);

    const matchesCategory = selectedCategory
      ? book.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <aside style={styles.sidebar}>
          <h2>Category</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  cursor: 'pointer',
                  fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                  marginBottom: '6px',
                  color: selectedCategory === cat ? '#007acc' : '#000'
                }}
              >
                {cat}
              </li>
            ))}
            {selectedCategory && (
              <li
                onClick={() => setSelectedCategory("")}
                style={{ cursor: 'pointer', color: 'red', marginTop: '10px' }}
              >
                Limpiar filtro
              </li>
            )}
          </ul>
        </aside>

        <main style={styles.main}>
          <h1>Catalog</h1>
          <div style={styles.grid}>
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </main>

        <aside style={styles.recommend}>
          <h2>Recommended</h2>
          {books.slice(0, 3).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </aside>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#dddddd',
    minHeight: '100vh',
  },
  container: {
    display: 'flex',
    padding: '20px',
  },
  sidebar: {
    width: '200px',
    marginRight: '20px',
  },
  main: {
    flex: 1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '20px',
  },
  recommend: {
    width: '220px',
    marginLeft: '20px',
  },
};

export default Home;
