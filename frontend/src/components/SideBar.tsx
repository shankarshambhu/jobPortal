// import React from "react";
// import {
//     Box,
//     List,
//     ListItemButton,
//     ListItemIcon,
//     ListItemText,
//     Typography,
//     Divider,
// } from "@mui/material";
// import {
//     Dashboard as DashboardIcon,
//     Work,
//     EventNote,
//     Settings,
//     People,
//     BarChart,
//     EventRepeat,
// } from "@mui/icons-material";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import TodayIcon from '@mui/icons-material/Today';


// const Sidebar: React.FC = () => {
//     const { user } = useAuth();

//     if (!user) return null;

//     const getNavItems = () => {
//         let dashboardItem;

//         switch (user.role) {
//             case "admin":
//                 dashboardItem = { label: "Dashboard", path: "/admin-dashboard", icon: <DashboardIcon /> };
//                 return [
//                     dashboardItem,
//                     { label: "Companies", path: "/admin-companies", icon: <People /> },
//                     { label: "Candidates", path: "/admin-candidates", icon: <People /> },
//                     { label: "Jobs", path: "/admin-jobs", icon: <Work /> },
//                     { label: "Applications", path: "/admin-applications", icon: <EventNote /> },
//                     { label: "Analytics", path: "/analytics", icon: <BarChart /> },
//                     { label: "Settings", path: "/settings", icon: <Settings /> },
//                 ];

//             case "company":
//                 dashboardItem = { label: "Dashboard", path: "/company-dashboard", icon: <DashboardIcon /> };
//                 return [
//                     dashboardItem,
//                     { label: "My Jobs", path: "/company/jobs", icon: <Work /> },
//                     { label: "Reschedule Requests", path: "/company/reschedule", icon: <EventRepeat /> },
//                     { label: "Today's Interview", path: "/company/todayinterview", icon: <TodayIcon /> },

//                     { label: "Profile", path: "/company-profile", icon: <Settings /> },
//                 ];

//             case "candidate":
//                 dashboardItem = { label: "Dashboard", path: "/candidate-dashboard", icon: <DashboardIcon /> };
//                 return [
//                     dashboardItem,
//                     { label: "Browse Jobs", path: "/candidate/jobs", icon: <Work /> },
//                     { label: "My Applications", path: "/candidate/applications", icon: <EventNote /> },
//                     { label: "Profile", path: "/candidate-profile", icon: <Settings /> },
//                 ];

//             default:
//                 return [{ label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> }];
//         }
//     };

//     const navItems = getNavItems();

//     return (
//         <Box
//             width={240}
//             bgcolor="background.paper"
//             borderRight="1px solid #e0e0e0"
//             height="100vh"
//             position="sticky"
//             top={0}
//         >
//             {/* Sidebar Header */}
//             <Box p={1}>
//                 <Typography variant="h6" fontWeight="bold" color="primary">
//                     JobPortal
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
//                     {user.role} Panel
//                 </Typography>
//             </Box>

//             <Divider />

//             {/* Navigation Items */}
//             <List>
//                 {navItems.map((item) => (
//                     <NavLink
//                         to={item.path}
//                         key={item.label}
//                         style={{ textDecoration: "none", color: "inherit" }}
//                     >
//                         {({ isActive }) => (
//                             <ListItemButton selected={isActive}>
//                                 <ListItemIcon>{item.icon}</ListItemIcon>
//                                 <ListItemText primary={item.label} />
//                             </ListItemButton>
//                         )}
//                     </NavLink>
//                 ))}
//             </List>
//         </Box>
//     );
// };

// export default Sidebar;






import React from "react";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    useTheme,
    alpha,
    Fade
} from "@mui/material";
import {
    Dashboard as DashboardIcon,
    Work,
    EventNote,
    Settings,
    People,
    BarChart,
    EventRepeat,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TodayIcon from '@mui/icons-material/Today';

const Sidebar: React.FC = () => {
    const { user } = useAuth();
    const theme = useTheme();

    if (!user) return null;

    const getNavItems = () => {
        let dashboardItem;

        switch (user.role) {
            case "admin":
                dashboardItem = { label: "Dashboard", path: "/admin-dashboard", icon: <DashboardIcon /> };
                return [
                    dashboardItem,
                    { label: "Companies", path: "/admin-companies", icon: <People /> },
                    { label: "Candidates", path: "/admin-candidates", icon: <People /> },
                    { label: "Jobs", path: "/admin-jobs", icon: <Work /> },
                    { label: "Applications", path: "/admin-applications", icon: <EventNote /> },
                    { label: "Analytics", path: "/analytics", icon: <BarChart /> },
                    { label: "Settings", path: "/settings", icon: <Settings /> },
                ];

            case "company":
                dashboardItem = { label: "Dashboard", path: "/company-dashboard", icon: <DashboardIcon /> };
                return [
                    dashboardItem,
                    { label: "My Jobs", path: "/company/jobs", icon: <Work /> },
                    { label: "Reschedule Requests", path: "/company/reschedule", icon: <EventRepeat /> },
                    { label: "Today's Interview", path: "/company/todayinterview", icon: <TodayIcon /> },
                    { label: "Profile", path: "/company-profile", icon: <Settings /> },
                ];

            case "candidate":
                dashboardItem = { label: "Dashboard", path: "/candidate-dashboard", icon: <DashboardIcon /> };
                return [
                    dashboardItem,
                    { label: "Browse Jobs", path: "/candidate/jobs", icon: <Work /> },
                    { label: "My Applications", path: "/candidate/applications", icon: <EventNote /> },
                    { label: "Profile", path: "/candidate-profile", icon: <Settings /> },
                ];

            default:
                return [{ label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> }];
        }
    };

    const navItems = getNavItems();

    return (
        <Fade in timeout={800}>
            <Box
                width={280}
                bgcolor="background.paper"
                height="100vh"
                position="sticky"
                top={0}
                sx={{
                    background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
                    borderRight: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.shadows[2],
                }}
            >
                {/* Sidebar Header */}
                <Box sx={{ p: 0.8, pb: 2 }}>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, yellow)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 1,


                        }}
                    >
                        JobPortal
                    </Typography>
                    <Box
                        sx={{
                            display: 'inline-block',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: "capitalize"
                        }}
                    >
                        {user.role} Panel
                    </Box>
                </Box>

                <Divider
                    sx={{
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                />
                {/* Navigation Items */}
                <List sx={{ p: 2 }}>
                    {navItems.map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={item.label}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            {({ isActive }) => (
                                <Fade in timeout={(index + 1) * 200}>
                                    <ListItemButton
                                        selected={isActive}
                                        sx={{
                                            borderRadius: 2,
                                            mb: 1,
                                            transition: 'all 0.3s ease',
                                            '&.Mui-selected': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                borderLeft: `3px solid ${theme.palette.primary.main}`,
                                                '& .MuiListItemIcon-root': {
                                                    color: theme.palette.primary.main,
                                                },
                                                '& .MuiListItemText-primary': {
                                                    color: theme.palette.primary.main,
                                                    fontWeight: 600,
                                                },
                                            },
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                                transform: 'translateX(4px)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 40,
                                                color: isActive ? theme.palette.primary.main : theme.palette.text.secondary
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontWeight: isActive ? 600 : 400,
                                                    fontSize: '0.9rem'
                                                }
                                            }}
                                        />
                                    </ListItemButton>
                                </Fade>
                            )}
                        </NavLink>
                    ))}
                </List>
            </Box>
        </Fade>
    );
};

export default Sidebar;