import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import UserContextProvider from "./UserContext";
import Account from "./pages/Account";
import ListedPage from "./pages/ListedPage";
import ViewImage from "./pages/ViewImage";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  return (
    <div>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:subPage?" element={<Account />} />
          <Route path="/account/:subPage/:action/:id?" element={<Account />} />
          {/* <Route path="/account/places/:id" element={<Account />} /> */}
          <Route path="/places/:id" element={<ListedPage />} />
          <Route path="/places/view/:data" element={<ViewImage />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
