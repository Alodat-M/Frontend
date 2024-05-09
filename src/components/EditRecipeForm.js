import React, { useState, useEffect } from 'react';
import '../App.css';

const EditRecipeForm = ({ match, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    cuisine: '',
    nutritionalInformation: '',
    allergens: ''
  });

  useEffect(() => {
    fetch(`/api/recipes/${match.params.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFormData(data);
      })
      .catch(error => {
        console.error('Error fetching recipe details:', error);
      });
  }, [match.params.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/recipes/${match.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Recipe updated successfully:', data);
        onUpdate(data); // Call the onUpdate function passed from parent component
      })
      .catch(error => {
        console.error('Error updating recipe:', error);
      });
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
  
        <label>Ingredients:</label>
        <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} />
  
        <label>Instructions:</label>
        <textarea name="instructions" value={formData.instructions} onChange={handleChange} />
  
        {/* Include input fields for other recipe properties here */}
  
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
  
};

export default EditRecipeForm;