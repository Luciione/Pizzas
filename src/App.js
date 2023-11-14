import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/dashboard/Dashboard';
import Restaurant from './components/restaurants/Restaurant';
import RestaurantPizzaForm from './components/restaurants/RestaurantPizzaForm';
import Pizza from './components/pizza/Pizza';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import PizzaForm from './components/pizza/PizzaForm';
import axios from 'axios';
import EditPizza from './components/pizza/EditPizza';


function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    // Fetch pizzas when the component mounts
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      axios
        .get('http://localhost:5555/pizzas', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setPizzas(response.data);
        })
        .catch((error) => {
          console.error('Error fetching pizzas:', error);
        });
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark taskbar">
        <div className="container-fluid">
          <div>
            <Link to="/signup" className="navbar-brand">
              Sign Up
            </Link>
            <Link to="/login" className="navbar-brand">
              Log In
            </Link>
            <Link to="/dashboard" className="navbar-brand">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
      <Container maxWidth="md" style={{ marginTop: '60px' }}>
        <Switch>
          {/* Pass the pizzas data to the Dashboard component */}
          <Route exact path="/dashboard">
            <Dashboard pizzas={pizzas} />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/restaurant_pizzas">
            <RestaurantPizzaForm />
          </Route>
          <Route exact path="/restaurants/:id/create-pizza">
            <PizzaForm />
          </Route>
          <Route exact path="/pizzas/:id">
            <Pizza />
          </Route>
          <Route exact path="/pizzas/:id/edit">
            <EditPizza/>
          </Route>
          <Route exact path="/restaurants/:id">
            <Restaurant />
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
