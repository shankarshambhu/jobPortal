import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
type Role = "company" | "candidate" | "admin";


function ProtectedRouteLayout({ allowedRoles }: { allowedRoles: Role[] }) {
    const { user } = useAuth();
    console.log(user);
    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRouteLayout;
