import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HousePlug,
  LogOut,
  LucideShoppingCart,
  Menu,
  ShoppingCart,
  UserCog,
  UserStar,
} from "lucide-react";
// import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "@/pages/shopping-view/cart-wrapper";

const drawerWidth = 240;
const navItems = ["Home", "Men", "Women", "Kids", "Footwear", "Accessories"];

const ShoppingHeader = (props) => {
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/");
    });
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link
          to="/shop/home"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user);

  function stringAvatar(name) {
    const nameParts = name.split(" ");
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : `${nameParts[0][0]}`;

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "background.default",
          color: "text.primary",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link
              to="/shop/home"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <HousePlug className="h-6 w-6" />
              <span className="font-bold ml-2">Ecommerce</span>
            </Link>
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "text.primary", mx: 1 }}>
                {item}
              </Button>
            ))}
          </Box>
          <Sheet
            open={openCartSheet}
            onOpenChange={() => setOpenCartSheet(false)}
          >
            <IconButton
              sx={{ color: "text.primary" }}
              onClick={() => setOpenCartSheet(true)}
            >
              <LucideShoppingCart />
              <UserCartWrapper />
            </IconButton>
          </Sheet>

          <Stack
            onClick={handleClick}
            className="ml-4"
            direction="row"
            spacing={2}
          >
            <Avatar {...stringAvatar(user?.userName || "User")} />
          </Stack>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography component="div" sx={{ p: 2 }}>
              <div>Logged in as {user?.userName}</div>
              <div
                onClick={() => navigate("/shop/account")}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <UserStar />
                <span>Account</span>
              </div>

              <div
                onClick={handleLogout}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <LogOut />
                <span>LogOut</span>
              </div>
            </Typography>
          </Popover>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default ShoppingHeader;
