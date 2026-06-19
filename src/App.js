import React from "react";
import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import { Routes, Route } from "react-router-dom";

function App() {
  const [seacrhValue, setSeacrhValue] = React.useState("");

  return (
    <div className="wrapper">
      <Header seacrhValue={seacrhValue} setSeacrhValue={setSeacrhValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home seacrhValue={seacrhValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
