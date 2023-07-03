import React, { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Layout from "./components/Layout";
import Books from "./pages/books";
import ContentRoute from "./pages";
function App(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route
            exact
            path="/home"
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
          /> */}
          <Route path="/books/*" element={<ContentRoute />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
