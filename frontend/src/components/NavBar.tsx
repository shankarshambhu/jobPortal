// import { useState } from "react";
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     IconButton,
//     Avatar,
//     Menu,
//     MenuItem,
//     Divider,
//     Box
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Logout, Notifications as Bell, AccountCircle } from "@mui/icons-material";
// import { useAuth } from "../context/AuthContext";
// import { useTheme } from "@mui/material/styles";

// function Navbar() {
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const { user, logout } = useAuth();
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const open = Boolean(anchorEl);

//     if (!user) return null;

//     const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => setAnchorEl(null);

//     const handleLogout = () => {
//         handleClose();
//         logout();
//         navigate("/login");
//     };

//     return (
//         <AppBar
//             position="static"
//             sx={{
//                 backgroundColor: theme.palette.background.paper,
//                 color: theme.palette.text.primary,
//                 boxShadow: theme.shadows[1],
//                 borderBottom: `1px solid ${theme.palette.divider}`,
//                 zIndex: 1100,
//                 padding:"1.5px"
//             }}
//         >
//             <Toolbar sx={{ justifyContent: "space-between" }}>
//                 {/* Logo */}
//                 <Typography
//                     variant="h6"
//                     fontWeight="bold"
//                     color="primary"
//                     sx={{ cursor: "pointer" }}
//                 >
//                     JobPortal
//                 </Typography>

//                 <Box display="flex" alignItems="center" gap={2}>
//                     {/* Notification Icon */}
//                     <IconButton>
//                         <Bell fontSize="small" />
//                     </IconButton>

//                     {/* User Info */}
//                     <Box display="flex" flexDirection="column" alignItems="flex-end">
//                         <Typography variant="body2" fontWeight={500}>
//                             {user.firstName} {user.lastName}
//                         </Typography>
//                         <Typography
//                             variant="caption"
//                             color="text.secondary"
//                             sx={{ textTransform: "capitalize" }}
//                         >
//                             {user.role}
//                         </Typography>
//                     </Box>

//                     {/* Avatar */}
//                     <IconButton onClick={handleMenu}>
//                         <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
//                             <AccountCircle />
//                         </Avatar>
//                     </IconButton>

//                     {/* Menu */}
//                     <Menu
//                         open={open}
//                         anchorEl={anchorEl}
//                         onClose={handleClose}
//                         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                         transformOrigin={{ vertical: "top", horizontal: "right" }}
//                     >
//                         <Divider />
//                         <MenuItem onClick={handleLogout} sx={{ color: "#ef4444" }}>
//                             <Logout fontSize="small" sx={{ mr: 1 }} />
//                             Logout
//                         </MenuItem>
//                     </Menu>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// }

// export default Navbar;







import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    Box,
    Badge,
    Chip,
    useTheme,
    alpha,
    Fade
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Logout, Notifications as Bell, AccountCircle, Settings } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const notificationOpen = Boolean(notificationAnchor);

    if (!user) return null;

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setNotificationAnchor(null);
    };

    const handleLogout = () => {
        handleClose();
        logout();
        navigate("/login");
    };

    const handleProfile = () => {
        handleClose();
        navigate("/profile");
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: alpha(theme.palette.background.paper, 0.95),
                backdropFilter: "blur(20px)",
                color: theme.palette.text.primary,
                boxShadow: theme.shadows[1],
                borderBottom: `1px solid ${theme.palette.divider}`,
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
                {/* Logo */}
                <Fade in timeout={500}>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, yellow)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            cursor: 'pointer',
                            letterSpacing: '-0.5px'
                        }}
                    >
                        JobPortal
                    </Typography>
                </Fade>

                <Box display="flex" alignItems="center" gap={3}>
                    {/* Notification Icon with Badge */}
                    <IconButton
                        onClick={handleNotificationMenu}
                        sx={{
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                transform: 'scale(1.05)'
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <Badge
                            badgeContent={3}
                            color="error"
                            variant="dot"
                        >
                            <Bell
                                fontSize="small"
                                sx={{
                                    color: theme.palette.primary.main
                                }}
                            />
                        </Badge>
                    </IconButton>

                    {/* User Info */}
                    <Fade in timeout={800}>
                        <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                            sx={{
                                px: 2,
                                py: 1,
                                borderRadius: 3,
                                backgroundColor: alpha(theme.palette.primary.main, 0.03),
                                border: `1px solid ${theme.palette.divider}`,
                            }}
                        >
                            <Box display="flex" flexDirection="column" alignItems="flex-end">
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {user.firstName} {user.lastName}
                                </Typography>
                                <Chip
                                    label={user.role}
                                    size="small"
                                    variant="filled"
                                    sx={{
                                        textTransform: "capitalize",
                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        color: theme.palette.primary.main,
                                        fontWeight: 500,
                                        fontSize: '0.7rem',
                                        height: 20
                                    }}
                                />
                            </Box>

                            {/* Avatar */}
                            <IconButton
                                onClick={handleMenu}
                                sx={{
                                    padding: 0,
                                    '&:hover': {
                                        transform: 'scale(1.1)'
                                    },
                                    transition: 'transform 0.3s ease',
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.primary.main,
                                        width: 40,
                                        height: 40,
                                        border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                        boxShadow: theme.shadows[2]
                                    }}
                                >
                                    <AccountCircle />
                                </Avatar>
                            </IconButton>
                        </Box>
                    </Fade>

                    {/* User Menu */}
                    <Menu
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        sx={{
                            '& .MuiPaper-root': {
                                borderRadius: 2,
                                marginTop: 1,
                                minWidth: 180,
                                boxShadow: theme.shadows[8],
                                border: `1px solid ${theme.palette.divider}`,
                            }
                        }}
                    >
                        <MenuItem onClick={handleProfile}>
                            <AccountCircle fontSize="small" sx={{ mr: 2, color: theme.palette.primary.main }} />
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Settings fontSize="small" sx={{ mr: 2, color: theme.palette.text.secondary }} />
                            Settings
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={handleLogout}
                            sx={{
                                color: theme.palette.error.main,
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.error.main, 0.08),
                                }
                            }}
                        >
                            <Logout fontSize="small" sx={{ mr: 2 }} />
                            Logout
                        </MenuItem>
                    </Menu>

                    {/* Notifications Menu */}
                    <Menu
                        open={notificationOpen}
                        anchorEl={notificationAnchor}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        sx={{
                            '& .MuiPaper-root': {
                                borderRadius: 2,
                                marginTop: 1,
                                minWidth: 320,
                                boxShadow: theme.shadows[8],
                                border: `1px solid ${theme.palette.divider}`,
                            }
                        }}
                    >
                        <MenuItem disabled>
                            <Typography variant="subtitle2" color="text.secondary">
                                Notifications (3)
                            </Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <Typography variant="body2">
                                New job application received
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Typography variant="body2">
                                Interview scheduled for tomorrow
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Typography variant="body2">
                                Profile verification completed
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;