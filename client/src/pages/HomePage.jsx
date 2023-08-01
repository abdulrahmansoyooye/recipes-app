import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import useGetUserId from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loader, setLoader] = useState(true);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userId = useGetUserId();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        setLoader(false);
      } catch (err) {
        console.log(err);
        setLoader(false);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userId}`
        );

        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeId,
          userId,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };
  const isSaved = (id) => savedRecipes.includes(id);
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <h2> Recipes </h2>
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe._id}>
                <div>
                  <h2>{recipe.name}</h2>
                  <button
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isSaved(recipe._id)}
                  >
                    {isSaved(recipe._id) ? "Saved" : "Save"}
                  </button>
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

export default HomePage;
