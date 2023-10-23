import { FC, MouseEvent, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header: FC = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleStatus = (event: MouseEvent<HTMLElement>) => {
    if (user) {
      signOut();
    } else {
      router.push("/login");
    }
  };

  return (
    <Stack
      sx={{
        height: 60,
        position: "fixed",
        zIndex: 2,
        backgroundColor: "#fff",
        width: "100vw",
        borderBottom: "1px solid gray",
        boxShadow: "0 1px 3px gray",
        paddingRight: 3,
      }}
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title={user ? "Otvori opcije" : "Uloguj se"}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="user">
              {user ? user?.email?.[0]?.toUpperCase() : null}
            </Avatar>
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
          {user?.email && (
            <Typography textAlign="center" padding={2} color="GrayText">
              {user.email}
            </Typography>
          )}
          <MenuItem onClick={handleStatus}>
            <Typography textAlign="center">
              {user ? "Izloguj se" : "Log In"}
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Stack>
  );
};

export default Header;
