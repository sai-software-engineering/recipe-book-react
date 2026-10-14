import { useState, useEffect } from 'react';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/api/recipes/getall')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch recipes from server.');
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not connect to Spring Boot. Make sure backend is running on port 8081!');
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: '20px' }}>Loading recipes...</p>;
  if (error) return <p style={{ color: 'red', padding: '20px' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', textAlign: 'left' }}>
      <h1>ChefScale Recipe Book</h1>
      {recipes.length === 0 ? (
        <p>No recipes found in database.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', background: '#fff' }}
            >
              <p><strong>Id: </strong>{recipe.id}</p>
              <h2 style={{ fontSize: '1.2rem', marginTop: '0' }}>{recipe.name}</h2>
              <p><strong>Servings:</strong> {recipe.servings}</p>

              <div>
                <strong>Ingredients:</strong>
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                  <ul style={{ paddingLeft: '20px', marginTop: '6px', marginBottom: '12px', fontSize: '0.9rem' }}>
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={ing.id || idx}>
                        {ing.quantity} {ing.unit} {ing.masterIngredient?.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: '0.85rem', color: '#888', margin: '4px 0 12px' }}>No ingredients listed.</p>
                )}
              </div>

              <p style={{ fontSize: '0.9rem', color: '#555' }}>
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;