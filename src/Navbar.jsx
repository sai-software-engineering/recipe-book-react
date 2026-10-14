import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      background: '#343a40',
      color: '#fff',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: 0, fontSize: '1.4rem' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>🍳 ChefScale</Link>
      </h2>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0 }}>
        <li>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        </li>
        <li>
          <Link to="/add-recipe" style={{ color: '#fff', textDecoration: 'none' }}>Add Recipe</Link>
        </li>

          <li>
          <Link to="/get-all-recipes" style={{ color: '#fff', textDecoration: 'none' }}>Get all Recipes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;