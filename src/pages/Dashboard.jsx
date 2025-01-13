// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Dashboard = ({ onLogout }) => {
//   const [products, setProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     description: "",
//     images: [],
//     existingImages: [],
//   });
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const response = await axios.get("http://localhost:5000/api/products");
//     setProducts(response.data);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     setFormData((prevData) => ({
//       ...prevData,
//       images: files,
//     }));
//   };

//   const handleAddProduct = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("price", formData.price);
//     data.append("description", formData.description);

//     // Append new images
//     formData.images.forEach((file) => {
//       if (file instanceof File) {
//         data.append("images", file);
//       }
//     });

//     // Normalize and append existing images
//     if (isEditing && formData.existingImages) {
//       formData.existingImages.forEach((imageUrl) => {
//         const normalizedUrl = imageUrl.replace(/\\/g, "/");
//         data.append("existingImages", normalizedUrl);
//         data.append("existingImages", JSON.stringify(formData.existingImages));
//       });
//     }

//     try {
//       const url = isEditing
//         ? `http://localhost:5000/api/products/${editingId}`
//         : "http://localhost:5000/api/products/products";
//       const method = isEditing ? "put" : "post";

//      const response = await axios({
//         method,
//         url,
//         data,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Product processed successfully!", response.data);

//       // Update existing images if editing
//       if (isEditing) {
//         setFormData((prevData) => ({
//           ...prevData,
//           existingImages: response.data.product.images || [],
//         }));
//       }

//       setFormData({
//         title: "",
//         price: "",
//         description: "",
//         images: [],
//         existingImages: [],
//       });
//       setIsEditing(false);
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDeleteProduct = async (id) => {
//     await axios.delete(`http://localhost:5000/api/products/${id}`);
//     fetchProducts();
//   };

//   const handleEditClick = (product) => {
//     setFormData({
//       title: product.title,
//       price: product.price,
//       description: product.description,
//       images: [],
//       existingImages: product.images || [],
//     });
//     setIsEditing(true);
//     setEditingId(product._id);
//   };

//   return (
//     <div className="dashboard-container">
//       <button onClick={onLogout} className="logout-button">
//         Logout
//       </button>
//       <h1>Product Management</h1>
//       <form onSubmit={handleAddProduct} className="product-form">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={formData.title}
//           onChange={handleFormChange}
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleFormChange}
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleFormChange}
//         ></textarea>
//         <input type="file" name="images" multiple onChange={handleFileChange} />
//         {isEditing && formData.existingImages.length > 0 && (
//           <div className="existing-images">
//             <h4>Existing Images:</h4>
//             {formData.existingImages.map((image, index) => (
//               <div key={index}>
//                 <img src={image} alt={`Existing ${index}`} width="100" />
//               </div>
//             ))}
//           </div>
//         )}
//         <button type="submit">
//           {isEditing ? "Update Product" : "Add Product"}
//         </button>
//       </form>
//       <div className="product-list">
//         {products.map((product) => (
//           <div key={product._id} className="product-item">
//             <h3>{product.title}</h3>
//             <p>Price: {product.price}</p>
//             <p>{product.description}</p>
//             {product.images?.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Product ${index}`}
//                 width="100"
//               />
//             ))}
//             <button onClick={() => handleEditClick(product)}>Edit</button>
//             <button onClick={() => handleDeleteProduct(product._id)}>
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ onLogout }) => {
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
    const response = await axios.get("http://localhost:5000/api/products");
    setProducts(response.data);
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
      await axios.post("http://localhost:5000/api/products/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Product added successfully!");

      setFormData({
        title: "",
        price: "",
        description: "",
        images: [],
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
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
