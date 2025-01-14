import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

const Dashboard = ({ onLogout }) => {
  const BASE_URL=process.env.REACT_APP_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      // const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (err) {
      toast.error("Failed to fetch products!");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("description", formData.description);

    // Append images
    formData.images.forEach((file) => {
      if (file instanceof File) {
        data.append("images", file);
      }
    });

    try {
      await axios.post(`${BASE_URL}/api/products`, data, {
      // await axios.post("http://localhost:5000/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully!");

      setFormData({
        title: "",
        price: "",
        description: "",
        images: [],
      });
      fetchProducts();
    } catch (err) {
      toast.error("Failed to add product!");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      // await axios.delete(`http://localhost:5000/api/products/${id}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product!");
    }
  };

  return (
    <div className="dashboard-container">
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
      <h1>Product Management</h1>
      <form onSubmit={handleAddProduct} className="product-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleFormChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleFormChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleFormChange}
        ></textarea>
        <input type="file" name="images" multiple onChange={handleFileChange} />
        <button type="submit">Add Product</button>
      </form>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h3>{product.title}</h3>
            <p>Price: {product.price}</p>
            <p>{product.description}</p>
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index}`}
                width="100"
              />
            ))}
            <button onClick={() => handleDeleteProduct(product._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
