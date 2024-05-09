import React, { useState } from "react";
import '../App.css';

const RecipeList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch(`/api/recipes/search?query=${searchQuery}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  return (
    <div>
      <h2>Recipe List</h2>
      <div>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {searchResults.map((recipe) => (
          <li key={recipe.id}>
            <a href={`/recipes/${recipe.id}`}>{recipe.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
