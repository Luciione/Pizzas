import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [pizzas, setPizzas] = useState([]);
    const history = useHistory();
  
    useEffect(() => {
      
      const accessToken = localStorage.getItem("access_token");
  
      if (!accessToken) {
        
        toast.info("Please log in to access the Dashboard.");
        history.push("/login");
      } else {
        
        axios
          .get("http://localhost:5555/restaurants", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setRestaurants(response.data);
          })
          .catch((error) => {
            console.error("Error fetching restaurants:", error);
          });
  
        
        axios
          .get("http://localhost:5555/pizzas", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setPizzas(response.data);
          })
          .catch((error) => {
            console.error("Error fetching pizzas:", error);
          });
      }
    }, [history]);
  
    const handleRestaurantClick = (restaurant) => {
      setSelectedRestaurant(restaurant);
      
    };
  
    const handleAddPizza = (restaurant) => {
      
      history.push(`/restaurants/${restaurant.id}/create-pizza`);
    };
  
    const handleEditPizza = (pizzaId) => {
      
      history.push(`/pizzas/${pizzaId}/edit`);
    };
  
    return (
      <div className="container">
        <div className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Restaurant Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Pizzas</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurants.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell>
                    {restaurant.name}
                  </TableCell>
                  <TableCell>{restaurant.description}</TableCell>
                  <TableCell>
                    {}
                    {selectedRestaurant && selectedRestaurant.id === restaurant.id && (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Pizza Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pizzas
                            .filter((pizza) => pizza.restaurant_id === selectedRestaurant.id)
                            .map((pizza) => (
                              <TableRow key={pizza.id}>
                                <TableCell>{pizza.name}</TableCell>
                                <TableCell>{pizza.price}</TableCell>
                                <TableCell>
                                  {}
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleEditPizza(pizza.id)}
                                  >
                                    Edit Pizza
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    )}
                  </TableCell>
                  <TableCell>
                    {}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddPizza(restaurant)}
                    >
                      Create Pizzas
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  
  export default Dashboard;
  