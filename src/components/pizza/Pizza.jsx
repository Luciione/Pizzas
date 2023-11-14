import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function Pizza() {
  const [pizzas, setPizzas] = useState([]);  
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("pending");
  const { id } = useParams();

  useEffect(() => {
    fetch(`/pizzas/${id}`)
      .then((r) => {
        if (r.ok) {
          return r.json();  
        } else {
          throw new Error("Failed to fetch pizzas");
        }
      })
      .then((data) => {
        setPizzas(data);  
        setStatus("resolved");
        console.log("Pizza fetched successfully:", data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setStatus("rejected");
      });
  }, [id]);

  if (status === "pending") return <Typography variant="h4">Loading...</Typography>;
  if (status === "rejected") return <Typography variant="h4" color="error">Error: {error}</Typography>;

  return (
    <section>
      <List>
        {pizzas.map((pizza) => (
          <ListItem key={pizza.id} component={Link} to={`/pizzas/${pizza.id}`}>
            <ListItemText primary={pizza.pizza_name} />
          </ListItem>
        ))}
      </List>

      {pizzas.map((pizza) => (
        <div key={pizza.id}>
          <Typography variant="body1" component="p">{pizza.ingredients}</Typography>
          <Typography variant="body1" component="p">
            <Link color="primary" underline="hover" to="/restaurant_pizzas/new">
              Add Restaurant Pizza
            </Link>
          </Typography>
          <Typography variant="body1" component="p">
            <Link color="primary" underline="hover" to={`/pizzas/${pizza.id}/edit`}>
              Edit Pizza Ingredients
            </Link>
          </Typography>
        </div>
      ))}
    </section>
  );
}

export default Pizza;
