import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { auth } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };
  const handleNavigateToRec = () => {
    navigate("/recommendation");
  };
  const handelNavigateToFav = () => {
    navigate("/favorite");
  };
  const handleNavigateToCreate = () => {
    navigate("/create");
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "#9ACD32" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LunchDiningIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="http://localhost:3000/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            VNFood
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleNavigateToCreate}
            >
              料理を共有する
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handelNavigateToFav}
            >
              お気に入りの料理
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleNavigateToRec}
            >
              あなたへのおすすめの料理
            </Button>
          </Box>
          {auth?.isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="設定を開く">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={auth?.user?.username}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    プロフィール
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    ログアウト
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleNavigateToLogin}
              >
                ログイン
              </Button>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                登録
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
