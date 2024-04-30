import React from "react";
import {
  Box,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { ShareVideosBtn } from "../../../features/videos";
import { useNavigateLink } from "../../hooks/useNavigateLink";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLoginForm } from "../../../features/authentication";

const Header: React.FC = () => {
  const { username, password, setUsername, setPassword, handleLoginSubmit, isFormValid } =
    useLoginForm();
  const [open, setOpen] = React.useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const navigate = useNavigateLink();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("xs", "md"));

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
      <List>
        {isLoggedIn ? (
          <ListItem key={"Home"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"login"} />
            </ListItemButton>
          </ListItem>
        ) : (
          <></>
        )}

        {isLoggedIn ? (
          <></>
        ) : (
          <ListItem key={"login"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={"login"} />
            </ListItemButton>
          </ListItem>
        )}

        {isLoggedIn ? (
          <></>
        ) : (
          <ListItem key={"signUp"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              <ListItemIcon>
                <AppRegistrationIcon />
              </ListItemIcon>
              <ListItemText primary={"signUp"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        {isLoggedIn ? (
          <ListItem key={"signUp"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"signUp"} />
            </ListItemButton>
          </ListItem>
        ) : (
          <></>
        )}
      </List>
    </Box>
  );

  return (
    <Box display="flex" justifyContent="space-between" p={2} borderBottom="1px solid black">
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      {isTablet ? (
        <>
          <img
            src={"https://upload.wikimedia.org/wikipedia/commons/0/04/Funny_movie_logo.png"}
            alt="Logo"
            style={{ width: "auto", height: "50px" }}
          />
          <Button onClick={toggleDrawer(true)}>
            <MenuRoundedIcon></MenuRoundedIcon>
          </Button>
        </>
      ) : (
        <>
          <img
            src={"https://upload.wikimedia.org/wikipedia/commons/0/04/Funny_movie_logo.png"}
            alt="Logo"
            style={{ width: "auto", height: "50px" }}
          />

          <Box display="flex" gap={2} alignItems="center">
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <ShareVideosBtn />

            <Button
              variant="contained"
              onClick={() => {
                if (isFormValid) {
                  navigate("/");
                } else {
                  navigate("/sign-up");
                }
              }}
            >
              {isFormValid ? "Login" : "Sign Up"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Header;
