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
import Error from "../components/Alert/Error";
import SavedRecipe from "../components/SavedRecipe";
const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loader, setLoader] = useState(true);
  const userId = useGetUserId();
  const mobileScreens = useMediaQuery("(max-width:800px)");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http:/https://nice-lime-pea-coat.cyclic.cloud/localhost:3001/recipes/savedRecipes/${userId}`
        );
        setLoader(false);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
        setLoader(false);
        setError(true);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <Box>
          <Box
            sx={{
              display: !mobileScreens && "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              mt: "1rem",
            }}
          >
            {/* <h2> Recipes </h2> */}
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
            {savedRecipes.map((recipe) => (
              <SavedRecipe recipe={recipe} key={recipe._id} />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default SavedRecipes;
