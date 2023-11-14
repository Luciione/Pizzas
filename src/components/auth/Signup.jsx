import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { BiUser } from "react-icons/bi";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

function Signup() {
  const [restaurant_name, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("restaurant_name", restaurant_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("profile_picture", image);
    formData.append("address", address);

    axios
      .post("http://localhost:5555/get-access-token", {
        email: email,
        password: password,
      })
      .then((response) => {
        const accessToken = response.data.access_token;

        localStorage.setItem("access_token", accessToken);

        axios
          .post("/signup", formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(() => {
            toast.success("Restaurant created");
            history.push("/restaurant");
          })
          .catch((error) => {
            console.error("Signup error:", error);
          });
      })
      .catch((error) => {
        console.error("Access token error:", error);
      });
  };

  return (
    <div className="signup-container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <div className="relative my-4">
            <BiUser className="absolute top-4 right-4" />
          </div>
          <TextField
            label="Restaurant Name"
            type="restaurant Name"
            value={restaurant_name}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
            fullWidth
          />
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
          <TextField
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            fullWidth
          />
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            id="profilePicture"
            name="profilePicture"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="mt-1 block w-full"
          />
          <Button variant="contained" color="primary" type="submit">
            Sign up
          </Button>
        </Stack>
      </form>
      <div>
        <span className="m-4">
          Already have an account? <Link className="text-blue-500" to="/login">Log in</Link>
        </span>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
