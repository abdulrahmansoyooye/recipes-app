import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import useGetUserId from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
  duration,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import Wrapper from "../components/Wrapper";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loader, setLoader] = useState(true);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userId = useGetUserId();
  const mobileScreens = useMediaQuery("(max-width:800px)");
  const [mouse, setMouse] = useState(false);
  const theme = useTheme();
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
    <Box>
      {loader ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: !mobileScreens && "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            mt: "1rem",
          }}
        >
          {/* <h2> Recipes </h2> */}

          {recipes.map((recipe) => (
            <Box
              sx={{
                width: mobileScreens ? "400px" : "400px",
                padding: "1rem",
                borderRadius: "1rem",
                background: theme.palette.background.alt,
                margin: "1rem auto",
                color: "#FFFFF",
              }}
              theme={theme}
              mobileScreens={mobileScreens}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    sx={{ textAlign: "center", mb: "1rem" }}
                  >
                    {recipe.name}
                  </Typography>
                  <Divider />
                </Box>
                <Box
                  className="instructions"
                  sx={{
                    textAlign: "left",
                    border: "1px solid #fca311",
                    m: "1rem 0",
                    p: "1rem",
                    borderRadius: "1rem",
                  }}
                  onMouseEnter={() => setMouse(true)}
                  onMouseLeave={() => setMouse(false)}
                >
                  <Typography>{recipe.instructions}</Typography>
                </Box>
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <motion.img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    typeof="image"
                    width="100%"
                    style={{
                      borderRadius: "1rem",
                      backgroundColor: "#00000080",
                    }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ ease: "easeOut", duration: 0.5 }}
                  />
                  {mouse && (
                    <Box
                      sx={{
                        position: "absolute",
                        backgroundColor: "#00000080 ",
                        top: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "1rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => saveRecipe(recipe._id)}
                        sx={{ textAlign: "center" }}
                      >
                        {isSaved(recipe._id) ? (
                          <Favorite color="#fca311" />
                        ) : (
                          <FavoriteBorderOutlined />
                        )}
                      </IconButton>
                    </Box>
                  )}
                </Box>
                <Divider />
                <Typography
                  sx={{
                    textAlign: "center",
                    mt: "1rem",
                  }}
                >
                  Cooking Time {recipe.cookingTime} (minutes)
                </Typography>
              </motion.div>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
