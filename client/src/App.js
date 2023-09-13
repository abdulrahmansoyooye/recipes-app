import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Auth from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import SavedRecipes from "./pages/saved-recipes";
import Navbar from "./components/navbar";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
