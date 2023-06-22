import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getProducts, getUser } from "./axios";
import useCatcoContext, { CatcoProvider } from "./CatcoContext";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Register from "./components/Register";
import { useEffect } from "react";

function App() {
  // Get needed functions from our context class
  const { setCurrentUser, setProducts } = useCatcoContext();

  // Get our token for our user from local storage
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    async function initAppData() {
      if (token) setCurrentUser(await getUser(token));

      const products = await getProducts();
    }

    initAppData();
  }, [setProducts, token]);

  return (
    <BrowserRouter>
      <CatcoProvider>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path='/cart' element={<Cart />} /> */}
          </Routes>
        </div>
      </CatcoProvider>
    </BrowserRouter>
  );
}

export default App;
