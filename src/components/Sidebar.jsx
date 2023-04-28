import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import ScheduleIcon from "@mui/icons-material/CalendarMonthOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CasinoIcon from "@mui/icons-material/CasinoOutlined";
import TableIcon from "@mui/icons-material/TableRestaurantOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Divider } from "@mui/material";

const drawerWidth = 220;

function CustomDrawer(props) {
  const { handleLogout } = props;

  const logout = () => {
    handleLogout();
  };
  // const { window } = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };
  const iconStyle = {
    color: "#031927",
  };
  const listStyle = {
    backgroundColor: "#508aa8",
    color: "#fff",
  };

  const drawer = (
    <>
      <Toolbar
        sx={{
          ...listStyle,
          borderTopRightRadius: "25px",
        }}
      >
        <Button href="/">
          <ScheduleIcon
            sx={{
              color: "#031927",
              marginRight: "10px",
              height: "30px",
              width: "30px",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontStyle: "none",
              color: "#fff",
              textTransform: "capitalize",
            }}
            noWrap
          >
            Scheduler
          </Typography>
        </Button>
      </Toolbar>
      <Divider color="white" width="2px" />

      <List
        sx={{
          ...listStyle,
        }}
      >
        <ListItem sx={{ margin: 0 }}>
          <ListItemButton href="/presenters">
            <ListItemIcon sx={iconStyle}>
              <CasinoIcon />
            </ListItemIcon>
            <ListItemText>Presenters</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem sx={{ margin: 0 }}>
          <ListItemButton href="/tables">
            <ListItemIcon sx={iconStyle}>
              <TableIcon />
            </ListItemIcon>
            <ListItemText>Tables</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider color="white" width="2px" />

      <List
        sx={{ ...listStyle, borderBottomRightRadius: "25px", height: "100vh" }}
      >
        <ListItem sx={{ margin: 0 }}>
          <ListItemButton>
            <ListItemIcon sx={iconStyle}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ margin: 0 }}>
          <ListItemButton onClick={logout}>
            <ListItemIcon sx={iconStyle}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        // onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          // container={container}
          variant="temporary"
          // open={mobileOpen}
          // onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: { border: "none" },
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
CustomDrawer.propTypes = {
  window: PropTypes.func,
};

export default CustomDrawer;
