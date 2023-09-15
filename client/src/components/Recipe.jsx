import { useTheme } from "@emotion/react";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import axios from "axios";
import { useCookies } from "react-cookie";
import useGetUserId from "../hooks/useGetUserId";
const Recipe = ({ recipe }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userId = useGetUserId();
  const mobilescreens = useMediaQuery("(max-width:800px)");

  const [hovered, setHovered] = useState(false);

  const theme = useTheme();
  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put(
        "https://nice-lime-pea-coat.cyclic.cloud/recipes",
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
    <Box
      sx={{
        width: mobilescreens ? "50%" : "400px",
        padding: "1rem",
        borderRadius: "1rem",
        background: theme.palette.background.alt,
        margin: "1rem auto",
        color: "#FFFFF",
      }}
      theme={theme}
      mobilescreens={mobilescreens}
      key={recipe._id}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
      >
        <Box>
          <Typography variant="h3" sx={{ textAlign: "center", mb: "1rem" }}>
            {recipe.name}
          </Typography>
          <Divider />
        </Box>

        <Box
          sx={{
            position: "relative",
            mt: "1rem",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              style={{
                zIndex: "20",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "0",
                  bottom: "0",
                  width: "100%",
                  height: "100%",
                  backgroundColor:
                    "rgba(0, 0, 0, 0.5)" /* Background color for button */,
                  color: "white" /* Text color for button */,
                  padding: "8px 16px",
                  borderRadius: "1rem",
                  overflow: "scroll",
                }}
              >
                <IconButton
                  onClick={() => saveRecipe(recipe._id)}
                  sx={{
                    textAlign: "center",
                    m: "0 50%",
                  }}
                  disabled={isSaved(recipe._id)}
                >
                  {!isSaved(recipe._id) && <Favorite color="#fca311" />}
                </IconButton>
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
              </Box>
            </motion.div>
          )}

          <Box>
            <motion.img
              src={`https://nice-lime-pea-coat.cyclic.cloud/assets/${recipe.imageUrl}`}
              alt={recipe.name}
              width="100%"
              height={"300px"}
              style={{
                borderRadius: "1rem",
                backgroundColor: "#00000080",
                objectFit: "cover",
              }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            />
            {!hovered && (
              <Typography
                sx={{
                  position: "absolute",
                  top: "10%",
                  margin: mobilescreens ? "1rem auto" : "1rem 5rem",
                  color: "#FFFF",
                  textAlign: "center",
                }}
              >
                {" "}
                Tap or hover to view instructions.
              </Typography>
            )}
          </Box>
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
  );
};

export default Recipe;
