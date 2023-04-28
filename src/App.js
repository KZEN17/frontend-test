import { useState } from "react";
import AllUsers from "./components/AllPresenters";
import AddUser from "./components/AddPresenter";
import EditUser from "./components/EditUser";
import CustomDrawer from "./components/Sidebar";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import AllTables from "./components/AllTables";
import AddTable from "./components/AddTable";
import EditTable from "./components/EditTable";
import "./index.css";
import Home from "./components/Home";
import Login from "./components/Login";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    window.sessionStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
  };
  return (
    <BrowserRouter>
      {!loggedIn ? (
        <Login setLoggedIn={setLoggedIn} />
      ) : (
        <>
          {" "}
          <CustomDrawer handleLogout={handleLogout} />
          <Box
            sx={{
              marginLeft: "15%",
              marginBottom: "15%",
              backgroundColor: "white",
              padding: "1%",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/presenters" element={<AllUsers />} />
              <Route path="/add-presenter" element={<AddUser />} />
              <Route path="/edit-presenter/:id" element={<EditUser />} />
              <Route path="/tables" element={<AllTables />} />
              <Route path="/add-table" element={<AddTable />} />
              <Route path="/edit-table/:id" element={<EditTable />} />
              <Route element={<NotFound />} />
            </Routes>
          </Box>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
