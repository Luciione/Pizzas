// Restaurant.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import "./Restaurant.css"; // Import the CSS file

function Restaurant() {
  const [{ data: restaurant, error, status }, setRestaurant] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`/restaurants/${id}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((hero) =>
            setRestaurant({ data: hero, error: null, status: "resolved" })
          );
        } else {
          r.json().then((err) =>
            setRestaurant({ data: null, error: err.error, status: "rejected" })
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error);
        setRestaurant({ data: null, error: "Failed to fetch data", status: "rejected" });
      });
  }, [id]);

  if (status === "pending") return <Typography variant="h4">Loading...</Typography>;
  if (status === "rejected") return <Typography variant="h4" color="error">Error: {error}</Typography>;

  return (
    <section className="restaurant-container">
      <Typography variant="h4" component="h2" className="restaurant-name">
        <Link color="primary" underline="hover" to={`/restaurants/${restaurant.id}`}>
          {restaurant.restaurant_name}
        </Link>
      </Typography>
      <Typography variant="h5" component="h2" className="restaurant-address">
        {restaurant.address}
      </Typography>
      <Typography variant="h6" component="h3" className="restaurant-pizzas-heading">
        Pizzas:
      </Typography>
      <List className="restaurant-pizza-list">
        {restaurant.pizzas &&
          restaurant.pizzas.map((pizza) => (
            <ListItem key={pizza.id} component={Link} to={`/pizzas/${pizza.id}`} className="restaurant-pizza-item">
              <ListItemText primary={pizza.pizza_name} />
            </ListItem>
          ))}
      </List>
      <Button variant="contained" color="primary" to="/restaurant_pizzas/new" component={Link} className="add-pizza-button">
        Add Restaurant Pizza
      </Button>
    </section>
  );
}

export default Restaurant;
