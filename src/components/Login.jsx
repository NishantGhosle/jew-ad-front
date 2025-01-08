import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const hardcodedUsername = "admin";
  const hardcodedPassword = "123";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      credentials.username === hardcodedUsername &&
      credentials.password === hardcodedPassword
    ) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      localStorage.setItem(
        "auth",
        JSON.stringify({
          username: credentials.username,
          expiry: expirationDate.toISOString(),
        })
      );

      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        width: "90%",
        maxWidth: 400,
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          marginBottom: 2,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        Admin Login
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          margin="normal"
          sx={{
            fontSize: { xs: "0.875rem", sm: "1rem" },
            marginBottom: { xs: 1, sm: 2 },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={credentials.password}
          onChange={handleChange}
          margin="normal"
          sx={{
            fontSize: { xs: "0.875rem", sm: "1rem" },
            marginBottom: { xs: 1, sm: 2 },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <Typography
            color="error"
            sx={{
              marginTop: 1,
              fontSize: { xs: "0.75rem", sm: "1rem" },
              textAlign: "center",
            }}
          >
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            marginTop: 2,
            padding: { xs: "10px", sm: "15px" },
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;