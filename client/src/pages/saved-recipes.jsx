import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import useGetUserId from "../hooks/useGetUserId";
const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loader, setLoader] = useState(true);
  const userId = useGetUserId();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userId}`
        );
        setLoader(false);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
        setLoader(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <h2>Saved Recipes </h2>
          <ul>
            {savedRecipes.map((recipe) => (
              <li key={recipe._id}>
                <div>
                  <h2>{recipe.name}</h2>
                </div>
                <div className="instructions">
                  <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} typeof="image" />
                <p>Cooking Time:{recipe.cookingTime} (minutes)</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
