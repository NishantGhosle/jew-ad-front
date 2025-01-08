import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { CloudUpload, Cancel } from "@mui/icons-material";
import { Edit, Delete } from "@mui/icons-material";

const ProductList = ({ products, deleteProduct, editProduct }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditFormData(products[index]);
    setIsDialogOpen(true);
  };

  const saveEdit = () => {
    const imageUrls = editFormData.images.map((file) =>
      file instanceof File ? URL.createObjectURL(file) : file
    );
    editProduct(editingIndex, { ...editFormData, images: imageUrls });
    setIsDialogOpen(false);
    setEditingIndex(null);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setEditingIndex(null);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can upload up to 5 images.");
      return;
    }
    setEditFormData({
      ...editFormData,
      images: [...editFormData.images, ...files],
    });
  };

  const handleImageRemove = (index) => {
    const newImages = [...editFormData.images];
    newImages.splice(index, 1);
    setEditFormData({
      ...editFormData,
      images: newImages,
    });
  };

  return (
    <Box
      sx={{
        width: "90%",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
        Product List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">S.No</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Images</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell align="center">${product.price}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "200px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.description}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {product.images?.map((image, idx) => (
                          <Box key={idx} sx={{ position: "relative" }}>
                            <img
                              src={image}
                              alt={`product-${idx}`}
                              style={{
                                width: 50,
                                height: 50,
                                objectFit: "cover",
                                borderRadius: 4,
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(index)}
                        sx={{ marginRight: 1 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => deleteProduct(index)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            value={editFormData.title || ""}
            onChange={(e) =>
              setEditFormData({ ...editFormData, title: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Price"
            type="number"
            value={editFormData.price || ""}
            onChange={(e) =>
              setEditFormData({ ...editFormData, price: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            value={editFormData.description || ""}
            onChange={(e) =>
              setEditFormData({ ...editFormData, description: e.target.value })
            }
          />
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: 2 }}
            startIcon={<CloudUpload />}
          >
            Upload Images
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageChange}
            />
          </Button>
          <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
            {editFormData.images?.map((file, idx) => {
              const imageUrl =
                file instanceof File ? URL.createObjectURL(file) : file;
              return (
                <Box key={idx} sx={{ position: "relative" }}>
                  <img
                    src={imageUrl}
                    alt={`edit-preview-${idx}`}
                    style={{
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                      borderRadius: "50%",
                    }}
                    onClick={() => handleImageRemove(idx)}
                  >
                    <Cancel color="error" />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={saveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
