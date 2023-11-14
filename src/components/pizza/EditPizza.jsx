import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function EditPizza() {
  const { id } = useParams();
  const history = useHistory();
  const [pizza, setPizza] = useState({
    pizza_name: "",
    ingredients: "",
    
  });

  useEffect(() => {
    
    axios.get(`http://localhost:5555/pizzas/${id}`)
      .then((response) => {
        setPizza(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pizza:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setPizza({
      ...pizza,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .put(`http://localhost:5555/pizzas/${id}`, pizza)
      .then(() => {
        console.log("Pizza updated successfully!");
        history.push(`/pizzas/${id}`);
      })
      .catch((error) => {
        console.error("Error updating pizza:", error);
        
      });
  };

  return (
    <div>
      <h2>Edit Pizza</h2>
      <form onSubmit={handleSubmit}>
        {}
        <TextField
          label="Pizza Name"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="pizza_name"
          value={pizza.pizza_name}
          onChange={handleInputChange}
        />
        <TextField
          label="Ingredients"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="ingredients"
          value={pizza.ingredients}
          onChange={handleInputChange}
        />
        {}
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}

export default EditPizza;