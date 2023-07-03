import React, { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./home";
import Books from "./books";

const ContentRoute = (props) => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        exact
        path="books"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Books props={props} />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default ContentRoute;
