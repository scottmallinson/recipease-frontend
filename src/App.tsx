import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Recipes from "./views/Recipes";
import RecipeCreate from "./views/RecipeCreate";
import RecipeDetailWrapper from "./views/RecipeDetailWrapper";
import Pantry from "./views/Pantry";
import Profile from "./views/Profile";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Home from "./views/Home";
import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";
import AuthProvider from "./lib/AuthProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/recipes/create" element={<PrivateRoute><RecipeCreate /></PrivateRoute>} />
        <Route path="/recipes/:id" element={<RecipeDetailWrapper />} />
        <Route path="/signup" element={<AnonRoute><Signup /></AnonRoute>} />
        <Route path="/login" element={<AnonRoute><Login /></AnonRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/pantry" element={<PrivateRoute><Pantry /></PrivateRoute>} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
};

export default App;
