import React, { useState } from "react";
import axios from "axios";
import useGetUserId from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Loader from "./Loader";
export const CreateRecipe = () => {
  const [cookies] = useCookies(["access_token"]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const userId = useGetUserId();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userId,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };
  const addIngredient = (e) => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe }, ingredients);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      navigate("/");
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="create-recipe">
          <h2>Create Recipe</h2>
          <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={handleChange} />
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <input
                  type="text"
                  value={ingredient}
                  key={index}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
              );
            })}
            <button type="button" onClick={addIngredient}>
              Add Ingredient
            </button>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              onChange={handleChange}
            />
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              onChange={handleChange}
            />
            <button type="submit">Create Recipe</button>
          </form>
        </div>
      )}
    </>
  );
};
