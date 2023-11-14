import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";


import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


export default function PizzaForm() {
  const [pizza_name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pizza_name", pizza_name);
    formData.append("ingredients", ingredients);
    formData.append("image", image);

    axios
    .post("/create-pizza", formData)
    .then((response) => {
      console.log("Pizza created successfully:", response.data);
      history.push("/pizzas");
      })
    .catch((error) => {
      console.error("Pizza creation error:", error);
      
    });
  };

  return (
    <div>
      <h2>Create Pizza</h2>
      <form onSubmit={handleSubmit}>
        {}
        <TextField
          label="Pizza Name"
          variant="outlined"
          color="primary"
          margin="normal"
          required
          fullWidth
          value={pizza_name}
          onChange={(e) => setName(e.target.value)}
        />
        {}
        <TextField
          label="Ingredients"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        {}
        <TextField
          label="Image"
          type="file"
          accept="image/*"
          margin="normal"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {}
        <Button
          variant="contained"
          color="primary"
        
          type="submit"
        >
          Create Pizza
        </Button>
      </form>
    </div>
  );
}