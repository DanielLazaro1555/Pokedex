import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { Navigation } from "./Components/Navigation";
import { HomePage, PokemonPage, SearchPage } from "./pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path="pokemon/:id" element={<PokemonPage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
