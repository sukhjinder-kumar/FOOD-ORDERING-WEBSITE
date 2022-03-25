import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";

import Logout from "./components/users/logout";
import Dashboard from "./components/users/dashboard";
import Wallet from "./components/users/wallet";
import Navbar2 from "./components/users/navbar2";
import My_Order from "./components/users/my_order";
import Food_Menu from "./components/users/food_menu";
import Order_Dashboard from "./components/users/order_dashboard";
import Stat from "./components/users/stat";
import Edit from "./components/users/edit"

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Layout2 = () => {
  return (
    <div>
      <Navbar2 />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
// outlet , let's us use App function routes here , when layout is called , it further calls navbar and onclick it changes url to /users say , now however control is in layout , to let it execute that we use <outlet />
// class cantainer , so that executing child route lies inside this container , bootstrap library.

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/profile/" element={<Layout2 />}>
          <Route path="/profile/" element={<Profile />} />
          <Route path="/profile/dashboard" element={<Dashboard />} />
          <Route path="/profile/wallet" element={<Wallet />} />
          <Route path="/profile/my_order" element={<My_Order />} />

          <Route path="/profile/food_menu" element={<Food_Menu />} />
          <Route path="/profile/order_dashboard" element={<Order_Dashboard />} />
          <Route path="/profile/stat" element={<Stat />} />
          <Route path="/profile/edit/:id" element={<Edit />} />

          <Route path="/profile/logout" element={<Logout />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
// also understand how route is subrouting and check home "/" , a very good way to present navbar and home.js together.

export default App;
