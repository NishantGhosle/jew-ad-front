import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ addProduct }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file" && name === "images") {
      const selectedFiles = Array.from(files);
      setFormData({ ...formData, [name]: selectedFiles });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      title: formData.title,
      price: formData.price,
      description: formData.description,
      images: formData.images.map((file) =>
        file instanceof File ? URL.createObjectURL(file) : file
      ),
    };

    addProduct(newProduct);
    navigate("/productlist");
  };

  return (
    <Box
      sx={{
        width: "90%",
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
        }}
      >
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="tel"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Upload Images"
            name="images"
            type="file"
            inputProps={{ multiple: true }}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <IconButton color="primary">
                    <CloudUpload />
                  </IconButton> */}
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {formData.images?.map((file, idx) => (
              <img
              key={idx}
              src={file instanceof File ? URL.createObjectURL(file) : file}
                // src={URL.createObjectURL(file)}
                alt={`product-${idx}`}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            ))}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              padding: "12px",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddProduct;

