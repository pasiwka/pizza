import React, { Suspense } from "react";
import Home from "../pages/home/ui/Home";

import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart"*/ "../pages/cart/ui/Cart"),
);
const FullPizza = React.lazy(
  () =>
    import(/* webpackChunkName: "FullPizza"*/ "../pages/pizza/ui/FullPizza"),
);
const NotFound = React.lazy(
  () =>
    import(/* webpackChunkName: "NotFound"*/ "../pages/not-found/ui/NotFound"),
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense
              fallback={
                <div className="content__pizza">
                  <h2>Погоди чуток...</h2>
                </div>
              }
            >
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizzas/:id"
          element={
            <Suspense
              fallback={
                <div className="content__pizza">
                  <h2>Погоди чуток...</h2>
                </div>
              }
            >
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense
              fallback={
                <div className="content__pizza">
                  <h2>Погоди чуток...</h2>
                </div>
              }
            >
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
export default App;
