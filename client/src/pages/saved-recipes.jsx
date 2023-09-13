import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import useGetUserId from "../hooks/useGetUserId";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { motion } from "framer-motion";
const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loader, setLoader] = useState(true);
  const userId = useGetUserId();
  const mobileScreens = useMediaQuery("(max-width:800px)");
  const theme = useTheme();
  const [mouse, setMouse] = useState(false);
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

          {savedRecipes.map((recipe) => (
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
                    onMouseEnter={() => setMouse(true)}
                    onMouseLeave={() => setMouse(false)}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ ease: "easeOut", duration: 0.5 }}
                  />
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

export default SavedRecipes;
