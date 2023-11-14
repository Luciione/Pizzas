import React from "react";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import PizzaIcon from "@material-ui/icons/LocalPizza";

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(to right, #ff5f6d, #ffc371);
`;

const StyledTypography = styled(Typography)`
  font-family: "Pacifico", cursive;
  font-size: 2rem;
  margin-left: 0.5rem;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

function Header() {
  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <PizzaIcon fontSize="large" />
          <StyledTypography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link color="inherit" underline="none" to="/">
              Pizzafari
            </Link>
          </StyledTypography>
          {isLoggedIn ? (
            <>
              <Link color="inherit" underline="hover" to="/Dashboard">
                Dashboard
              </Link>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link color="inherit" underline="hover" to="/login">
              Login
            </Link>
          )}
        </Toolbar>
      </StyledAppBar>
    </>
  );
}

export default Header;
