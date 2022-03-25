import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar2 = () => {
  const navigate = useNavigate();
  const occupation = localStorage.getItem("occupation");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

           {/* my profile is common */}
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/profile/")}
          >
            My Profile
          </Typography>
          

          {/* ----------------starting with buyer------------------------------  */}

          <Box sx={{ flexGrow: 1 }} />
          
          {occupation == "Buyer" && <Button color="inherit" onClick={() => navigate("/profile/dashboard")}>
            Dashboard
          </Button>}
          
          {occupation == "Buyer" && <Button color="inherit" onClick={() => navigate("/profile/wallet")}>
            Wallet
          </Button>}
          
          {occupation == "Buyer" && <Button color="inherit" onClick={() => navigate("/profile/my_order")}>
            My Order
          </Button>}


          {/* ----------------------now vendor------------------------- */}

          {occupation == "Vendor" && <Button color="inherit" onClick={() => navigate("/profile/food_menu")}>
            Food_Menu
          </Button>}

          {occupation == "Vendor" && <Button color="inherit" onClick={() => navigate("/profile/order_dashboard")}>
            Order_Dashboard
          </Button>}

          {occupation == "Vendor" && <Button color="inherit" onClick={() => navigate("/profile/stat")}>
            Stat
          </Button>}


          {/* ------------------ commong at last ------------------------- */}

          <Button color="inherit" onClick={() => navigate("/profile/logout")}>
            Logout
          </Button>
          
          <Button color="inherit" onClick={() => navigate("/")}>
            HomePage
          </Button>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar2;
