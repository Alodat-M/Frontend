import React, { useState } from 'react';
import '../App.css';

const AddRecipeForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    cuisine: '',
    nutritionalInformation: '',
    allergens: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to backend API
    fetch('/api/recipes', {
      method: 'POST',
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
        console.log('Recipe added successfully:', data);
        onAdd(data); // Call the onAdd function passed from parent component
        // Reset form fields
        setFormData({
          name: '',
          ingredients: '',
          instructions: '',
          cookingTime: '',
          cuisine: '',
          nutritionalInformation: '',
          allergens: ''
        });
      })
      .catch(error => {
        console.error('Error adding recipe:', error);
      });
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Ingredients:</label>
        <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} />

        <label>Instructions:</label>
        <textarea name="instructions" value={formData.instructions} onChange={handleChange} />

        <label>Cooking Time:</label>
        <input type="text" name="cookingTime" value={formData.cookingTime} onChange={handleChange} />

        <label>Cuisine:</label>
        <input type="text" name="cuisine" value={formData.cuisine} onChange={handleChange} />

        <label>Nutritional Information:</label>
        <input type="text" name="nutritionalInformation" value={formData.nutritionalInformation} onChange={handleChange} />

        <label>Allergens:</label>
        <input type="text" name="allergens" value={formData.allergens} onChange={handleChange} />

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipeForm;