import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Import the necessary components from @mui/material
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

function RestaurantPizzaForm() {
  const [restaurants, setRestaurants] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [pizzaId, setPizzaId] = useState("");
  const [price, setPrice] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("/restaurants")
      .then((r) => r.json())
      .then(setRestaurants);
  }, []);

  useEffect(() => {
    fetch("/pizzas")
      .then((r) => r.json())
      .then(setPizzas);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      restaurant_id: restaurantId,
      pizza_id: pizzaId, 
      price,
    };
    fetch("/restaurant_pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        history.push(`/restaurants/${restaurantId}`);
      } else {
        r.json().then((err) => setFormErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Replace the native HTML label and select elements with the MUI FormControl, InputLabel, and Select components and use the props to customize them */}
      <FormControl margin="normal" fullWidth>
        <InputLabel id="pizza-label">Pizza</InputLabel>
        <Select
          labelId="pizza-label"
          id="pizza_id"
          name="pizza_id"
          value={pizzaId}
          onChange={(e) => setPizzaId(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>Select a pizza</em>
          </MenuItem>
          {pizzas.map((pizza) => (
            <MenuItem key={pizza.id} value={pizza.id}>
              {pizza.pizza_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Replace the native HTML label and select elements with the MUI FormControl, InputLabel, and Select components and use the props to customize them */}
      <FormControl margin="normal" fullWidth>
        <InputLabel id="restaurant-label">Restaurant</InputLabel>
        <Select
          labelId="restaurant-label"
          id="restaurant_id"
          name="restaurant_id"
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>Select a restaurant</em>
          </MenuItem>
          {restaurants.map((restaurant) => (
            <MenuItem key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Replace the native HTML input element with the MUI TextField component and use the props to customize it */}
      <TextField
        label="Price"
        type="text"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
        fullWidth
      />
      {formErrors.length > 0
        ? formErrors.map((err) => (
            // Use the sx prop to add custom styles to the FormHelperText component
            <FormHelperText key={err} sx={{ color: "red" }}>
              {err}
            </FormHelperText>
          ))
        : null}
      {/* Replace the native HTML button element with the MUI Button component and use the props to customize it */}
      <Button variant="contained" color="primary" type="submit">
        Add Restaurant Pizza
      </Button>
    </form>
  );
}

export default RestaurantPizzaForm;
