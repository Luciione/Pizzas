// RestaurantPizzas.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";

function RestaurantPizzas() {
  const { id } = useParams();
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/restaurants/${id}/pizzas`)
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pizzas:", error);
      });
  }, [id]);

  return (
    <div>
      <Typography variant="h2">Pizzas for Restaurant {id}</Typography>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            {pizza.pizza_name} - {pizza.ingredients}
            <IconButton
              component={Link}
              to={`/edit-pizza/${pizza.id}`}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantPizzas;
