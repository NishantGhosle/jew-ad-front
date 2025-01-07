import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/`); 
        setProducts(response.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  });

  const addProduct = async (product) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/products/`, product); 
      setProducts([...products, response.data.product]);
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product!");
    }
  };

  const deleteProduct = async (index) => {
    try {
      const _id = products[index]._id; 
      if (!_id) {
        toast.error("Product ID is missing!");
        return;
      }
      await axios.delete(`${BASE_URL}/api/products/product/${_id}`); 
      setProducts(products.filter((_, i) => i !== index));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product!");
    }
  };

  const editProduct = async (index, updatedProduct) => {
    try {
      const _id = products[index]._id;
      console.log("Line 133",products);
      if (!_id) {
        toast.error("Product ID is missing or undefined!");
        return;
      }
      const response = await axios.put(`${BASE_URL}/api/products/${_id}`, updatedProduct); 
      const updatedProducts = [...products];
      updatedProducts[index] = response.data; 
      setProducts(updatedProducts);
      console.log("Product updated successfully:", response.data);
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error editing product:", error);
      toast.error("Failed to update product!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth"); 
    setIsAuthenticated(false); 
    toast.success("Logged out successfully!");
  };

  return (
    <>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/productlist" />
            ) : (
              <Login onLogin={() => setIsAuthenticated(true)} />
            )
          }
        />
        {isAuthenticated ? (
          <>
            <Route
              path="/productlist"
              element={
                <ProductList
                  products={products}
                  deleteProduct={deleteProduct}
                  editProduct={editProduct}
                />
              }
            />
            <Route
              path="/addProduct"
              element={<AddProduct addProduct={addProduct} />}
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default App;
