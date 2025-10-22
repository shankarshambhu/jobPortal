import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function DashboardLayout() {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            {/* Navbar at the top */}
            <Navbar />

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

            {/* Footer at the bottom */}
            <Footer />
        </Box>
    );
}

export default DashboardLayout;
