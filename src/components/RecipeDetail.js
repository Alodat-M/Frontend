import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        return response.json();
      })
      .then(data => {
        setRecipe(data);
      })
      .catch(error => {
        console.error('Error fetching recipe:', error);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`/api/recipes/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete recipe');
        }
        // Redirect to recipe list after deletion
        window.location.href = '/recipes'; // or navigate to any other route
      })
      .catch(error => {
        console.error('Error deleting recipe:', error);
      });
  };

  return (
    <div>
      <h2>Recipe Detail</h2>
      {recipe && (
        <div>
          <h3>{recipe.name}</h3>
          <p>Cuisine: {recipe.cuisine}</p>
          <p>Cooking Time: {recipe.cookingTime}</p>
          <p>Ingredients: {recipe.ingredients.join(', ')}</p>
          <p>Instructions: {recipe.instructions}</p>
          <p>Allergens: {recipe.allergens.join(', ')}</p>
          <p>Nutritional Information:</p>
          <ul>
            <li>Calories: {recipe.nutritionalInformation.calories}</li>
            <li>Fat: {recipe.nutritionalInformation.fat}g</li>
            <li>Protein: {recipe.nutritionalInformation.protein}g</li>
            <li>Carbs: {recipe.nutritionalInformation.carbs}g</li>
          </ul>
          <button onClick={handleDelete}>Delete Recipe</button>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
