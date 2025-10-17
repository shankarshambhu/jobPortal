import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/SideBar";

function DashboardLayout() {
    return (
        <Box display="flex" minHeight="100vh">
            {/* Sidebar on the left */}
            <Sidebar
             />

            {/* Main content area on the right */}
            <Box flex={1} display="flex" flexDirection="column">
                {/* Navbar at the top */}
                < Navbar/>

                {/* Page content */}
                <Box
                    component="main"
                    flex={1}
                    bgcolor="background.default"
                    p={3}
                    overflow="auto"
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardLayout;
