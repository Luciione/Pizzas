import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    setAccessToken("");
    setError("");

    axios
      .post("http://localhost:5555/get-access-token", {
        email: email,
        password: password,
      })
      .then((response) => {
        const newAccessToken = response.data.access_token;

        
        toast.success(`Login successful. Token: ${newAccessToken}`);

        
        localStorage.setItem("access_token", newAccessToken);

        
        setAccessToken(newAccessToken);

        
        history.push("/Dashboard");
      })
      .catch((error) => {
        console.error("Access token error:", error);
        setError("Invalid credentials");
      });
  };

  return (
    <div className="login-container">
      <h1>Log in</h1>
      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Log in
        </Button>
      </Stack>
      {error && 
        <Alert severity="error" icon={false} sx={{ mt: 2 }}>
          {error}
        </Alert>
      }
      {accessToken && (
        <div>
          <p>Token: {accessToken}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
