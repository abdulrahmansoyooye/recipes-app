import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import useGetUserId from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
import {
  Avatar,
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
import Error from "../components/Alert/Error";
import Recipe from "../components/Recipe";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loader, setLoader] = useState(true);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userId = useGetUserId();
  const mobilescreens = useMediaQuery("(max-width:800px)");

  const [error, setError] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://nice-lime-pea-coat.cyclic.cloud/recipes"
        );
        setRecipes(response.data);
        setLoader(false);
      } catch (err) {
        console.log(err);
        setLoader(false);
        setError(true);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://nice-lime-pea-coat.cyclic.cloud/recipes/savedRecipes/ids/${userId}`
        );

        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  return (
    <Box>
      {loader ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: !mobilescreens && "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            mt: "2rem",
          }}
        >
          {error && (
            <Box
              sx={{
                margin: "10rem auto",
                width: "200px",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#FFFF",
                borderRadius: "1rem",
              }}
            >
              <Error message={"Failed to load page"} />
            </Box>
          )}
          {recipes.map((recipe) => (
            <Recipe recipe={recipe} key={recipe._id} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
