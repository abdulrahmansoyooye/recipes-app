import React, { useState } from "react";
import axios from "axios";
import useGetUserId from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Loader from "./Loader";
import Dropzone from "react-dropzone";

import {
  Box,
  Button,
  TextField,
  TextareaAutosize,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { AddCircleOutline, CreateRounded } from "@mui/icons-material";
import AlertPage from "../components/Alert/AlertPage";
import Error from "../components/Alert/Error";
export const CreateRecipe = () => {
  const [cookies] = useCookies(["access_token"]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const userId = useGetUserId();
  const [Recipes, setRecipes] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userId,
  });

  const mobileScreens = useMediaQuery("(max-width:800px)");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipes({ ...Recipes, [name]: value });
  };
  const addIngredient = (e) => {
    setRecipes({ ...Recipes, ingredients: [...Recipes.ingredients, ""] });
  };
  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    const ingredients = Recipes.ingredients;
    ingredients[index] = value;
    setRecipes({ ...Recipes }, ingredients);
  };

  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const theme = useTheme();
  const onSubmit = async (e) => {
    const recipe = new FormData();
    recipe.append("name", Recipes.name);
    recipe.append("ingredients", Recipes.ingredients);
    recipe.append("instructions", Recipes.instructions);
    recipe.append("image", Recipes.imageUrl);
    recipe.append("imageUrl", Recipes.imageUrl.name);
    recipe.append("cookingTime", Recipes.cookingTime);
    recipe.append("userOwner", Recipes.userOwner);
    e.preventDefault();
    console.log(recipe);
    try {
      const response = await axios.post(
        "https://nice-lime-pea-coat.cyclic.cloud/recipes",
        recipe,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      if (response.status === 401) navigate("/auth");
      setAlert(true);

      setTimeout(() => {
        navigate("/");
        setAlert(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <>
      <Box
        className="create-recipe"
        sx={{
          width: mobileScreens ? "93%" : "50%",
          padding: "5rem 3rem",
          borderRadius: "1rem",
          background: theme.palette.background.alt,
          margin: "2.5rem auto",
          color: "#FFFFF",
        }}
      >
        {alert && <AlertPage message="Recipe Created" />}

        <Typography
          variant="h3"
          fontWeight="500"
          textAlign="center"
          mb="1rem"
          sx={{
            color: "#14213d",
          }}
        >
          Create Recipe
        </Typography>

        <form onSubmit={onSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRow: "2fr",
              gridGap: "1rem",
            }}
          >
            <TextField
              name="name"
              onChange={handleChange}
              placeholder="Recipe Name"
              sx={{
                gridColumn: mobileScreens ? "span 2" : 1,
              }}
              required
            />

            {Recipes.ingredients.map((ingredient, index) => {
              return (
                <TextField
                  label="Add an Item"
                  value={ingredient}
                  key={index}
                  onChange={(e) => handleIngredientChange(e, index)}
                  sx={{
                    gridColumn: mobileScreens
                      ? "span 2"
                      : index % 2 === 0
                      ? "2"
                      : "1",
                  }}
                  required
                />
              );
            })}
            <Button
              type="button"
              onClick={addIngredient}
              sx={{
                gridColumn: "span 2",
                color: "#14213d",
              }}
              variant="outlined"
              startIcon={<AddCircleOutline />}
            >
              Add Ingredient
            </Button>

            <TextareaAutosize
              name="instructions"
              onChange={handleChange}
              aria-label="Instructions"
              minLength={7}
              minRows={4}
              placeholder="Instructions"
              sx={{
                gridColumn: "1",
              }}
              required
            />

            <Dropzone
              onDrop={(acceptedFiles) =>
                setRecipes({ ...Recipes, imageUrl: acceptedFiles[0] })
              }
            >
              {({ getInputProps, getRootProps }) => {
                return (
                  <Box
                    sx={{
                      gridColumn: "2",
                      border: "2px dashed #14213d",
                      cursor: "pointer",
                      // borderRadius: "1rem",
                      p: "0.5rem",
                      textAlign: "center",
                    }}
                    required
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {!Recipes.imageUrl ? (
                      <Box
                        sx={{
                          m: "0.5rem auto",
                        }}
                      >
                        <Typography>Add Image Here</Typography>
                      </Box>
                    ) : (
                      <Typography color={"#14213d"}>
                        {Recipes.imageUrl.name}
                      </Typography>
                    )}
                  </Box>
                );
              }}
            </Dropzone>
            {/* <label htmlFor="cookingTime">Cooking Time (minutes)</label> */}
            <TextField
              type="number"
              label="Cooking Time"
              name="cookingTime"
              onChange={handleChange}
              sx={{
                gridColumn: "span 2",
              }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                gridColumn: "span 2",
              }}
              startIcon={<CreateRounded />}
            >
              Create Recipe
            </Button>
          </Box>
          {error && <Error message="There was an error. Please try again" />}
        </form>
      </Box>
    </>
  );
};
