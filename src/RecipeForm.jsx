import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [servings, setServings] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState([
    { quantity: '', unit: '', masterIngredient: { name: '' } }
  ]);

  const handleAddIngredientRow = () => {
    setIngredients([...ingredients, { quantity: '', unit: '', masterIngredient: { name: '' } }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    if (field === 'name') {
      updated[index].masterIngredient.name = value;
    } else {
      updated[index][field] = value;
    }
    setIngredients(updated);
  };

  const handleRemoveIngredientRow = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      name,
      servings: parseInt(servings, 10),
      instructions,
      ingredients: ingredients.map(ing => ({
        quantity: parseFloat(ing.quantity),
        unit: ing.unit,
        masterIngredient: {
          name: ing.masterIngredient.name.trim()
        }
      }))
    };

    fetch('http://localhost:8081/api/recipes/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create recipe');
        return res.json();
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error('Error adding recipe:', err);
        alert('Failed to add recipe. Check console for details.');
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '700px',
        margin: '0 auto 30px',
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
        textAlign: 'left'
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>Add New Recipe with Ingredients</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <textarea
        placeholder="Cooking instructions..."
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
        rows="3"
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '16px', boxSizing: 'border-box' }}
      />

      <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>Ingredients</h3>
      {ingredients.map((ing, index) => (
        <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            type="text"
            placeholder="Ingredient Name"
            value={ing.masterIngredient.name}
            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
            required
            style={{ flex: 2, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="number"
            step="any"
            placeholder="Qty"
            value={ing.quantity}
            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
            required
            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Unit"
            value={ing.unit}
            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
            required
            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {ingredients.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveIngredientRow(index)}
              style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddIngredientRow}
        style={{ padding: '6px 12px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '16px', fontSize: '0.9rem' }}
      >
        + Add Another Ingredient
      </button>

      <div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Save Recipe to Database
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;