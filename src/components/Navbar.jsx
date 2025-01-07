import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
  marginRight: theme.spacing(2),
  fontSize: "1rem",
  fontWeight: "bold",
  "&:hover": {
    color: "#FFD700", 
  },
}));

const Navbar = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <StyledLink to="/productlist">Product List</StyledLink>
        <StyledLink to="/addProduct">Add Products</StyledLink>
        <Button
          color="inherit"
          onClick={onLogout}
          sx={{ marginLeft: "auto", fontWeight: "bold" }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
