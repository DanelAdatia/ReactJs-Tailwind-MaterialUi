import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { useNavigate } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import StarIcon from "@mui/icons-material/Star";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Button, TextField } from "@mui/material";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [dta, setDta] = useState("");
  const [arr, setArr] = useState([
    { name: "qbo", path: "/" },
    { name: "Sales", path: "/sales" },
    { name: "Browse Channels", path: "/" },
  ]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", marginLeft: open ? `${drawerWidth}px` : 0 }}>
      <DrawerHeader />
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          mr: 2,
          ...(open && { display: "none" }),
          position: "fixed",
          top: 0,
          left: 10,
          zIndex: 999,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Starred"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <HouseIcon /> : <StarIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpenn(true);
            }}
          >
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Box className="mt-2">
                <AddToPhotosIcon />
              </Box>
              <Box>
                {openn === true ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const dd = [...arr, { name: dta, path: "/" }];
                      setArr(dd);
                      setDta("");
                      setOpenn(false);
                    }}
                  >
                    <TextField
                      value={dta}
                      onChange={(e) => setDta(e.target.value)}
                      label="Add Item"
                      variant="outlined"
                      size="small"
                      margin="dense"
                      sx={{ mx: 1, width: "120px" }}
                    />

                    <Button type="submit" variant="contained" size="small">
                      Submit
                    </Button>
                  </form>
                ) : null}
              </Box>
            </Box>
          </div>
          {arr.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <AutoAwesomeIcon /> : <StarIcon />}
                </ListItemIcon>
                <ListItemText
                  onClick={() => {
                    navigate(text.path);
                  }}
                  primary={text.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
