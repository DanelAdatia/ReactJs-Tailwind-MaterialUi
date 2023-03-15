import { BrowserRouter } from "react-router-dom";
import PersistentDrawerLeft from "./components/Sidebar";
import { Box } from "@mui/material";
import { useState } from "react";
import AppRoutes from "./Router/Routes";
import "./App.css";
import { SnackbarProvider } from "notistack";

const drawerWidth = 240;

function App() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex">
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <PersistentDrawerLeft
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          />
          <Box
            className={`flex-grow p-3 ml-${open ? drawerWidth : drawerWidth} ${
              open ? `w-calc(100% - ${drawerWidth}px)` : "w-full"
            } border-2 border-solid border-gray-400 transition-all duration-200 ease-in-out`}
            style={{ borderColor: "#ccc" }}
          >
            <AppRoutes />
          </Box>
        </BrowserRouter>
      </SnackbarProvider>
    </div>
  );
}

export default App;
