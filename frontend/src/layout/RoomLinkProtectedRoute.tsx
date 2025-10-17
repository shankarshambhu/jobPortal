import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { findRoomAccess } from "../services/interview";

interface RoomLinkProtectedRouteProps {
    allowedRoles: string[];
}

function RoomLinkProtectedRoute({ allowedRoles }: RoomLinkProtectedRouteProps) {
    const { user } = useAuth();
    const { roomId } = useParams<{ roomId: string }>();
    const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

    useEffect(() => {
        const checkRoomAccess = async () => {
            try {
                if (!user) {
                    setIsAllowed(false);
                    return;
                }

                // Company can always access
                if (user.role === "company") {
                    setIsAllowed(true);
                    return;
                }

                // Candidate must have a roomId
                if (!roomId) {
                    setIsAllowed(false);
                    return;
                }

                const res = await findRoomAccess(roomId);
                setIsAllowed(res.data.success === true);

            } catch (error) {
                console.error(error);
                setIsAllowed(false);
            }
        };

        checkRoomAccess();
    }, [roomId, user]);

    // Loading state while checking access
    if (isAllowed === null) return <div>Checking access...</div>;

    // If not allowed or role not allowed, redirect
    if (!isAllowed || !allowedRoles.includes(user?.role || "")) {
        return <Navigate to="/dashboard" replace />;
    }

    // If allowed, render the child route
    return <Outlet />;
}

export default RoomLinkProtectedRoute;
