
import {
    Card,
    CardContent,
    Typography,
    Box,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    Avatar,
    Button,
    TextField,
    CircularProgress,
} from "@mui/material";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { updateApplicationStatus } from "../services/application";
import GenericModal from "./GenericModal"; // your generic modal
import { sendInterview } from "../services/interview";

export default function ApplicationCard({
    application,
    onStatusChange,
    sx: { }
}: {
    application: any;
    onStatusChange: (id: number, status: string) => void;
    sx?: any;
}) {
    const [status, setStatus] = useState(application.status);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [scheduledTime, setScheduledTime] = useState("");
    const [scheduledInterview, setScheduledInterview] = useState<String | null>(
        application.scheduledInterview || null
    );
    const user = application.user;
    const backendURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";


    const [sendingLink, setSendingLink] = useState(false);

    const availableOptions = useMemo(() => {
        switch (status) {
            case "applied":
                return ["shortlisted", "rejected"];
            case "shortlisted":
                return []; // no dropdown for shortlisted
            case "scheduled":
                return ["hired", "rejected"];
            case "rejected":
            case "hired":
                return [];
            default:
                return [];
        }
    }, [status]);

    const handleChange = async (e: any) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setLoading(true);
        try {
            const res = await updateApplicationStatus(application.id, newStatus);
            if (res.data.success) {
                toast.success("Status updated");
                onStatusChange(application.id, newStatus);
            } else {
                throw new Error();
            }
        } catch (error: any) {
            toast.error(error.data.message || "Failed to update status");
            setStatus(application.status);
        } finally {
            setLoading(false);
        }
    };

    const formatStatus = (s: string) =>
        s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

    const handleScheduleInterview = async () => {
        if (!scheduledTime) return toast.error("Please select a date/time");

        setSendingLink(true); // start loading
        const candidateId = user.id;
        const jobId = application.jobId;
        const scheduledAt = new Date(scheduledTime).toISOString();

        try {
            const res = await sendInterview(candidateId, jobId, scheduledAt, application.id);
            if (res.data.success) {
                toast.success("Interview scheduled and email sent!");
                setModalOpen(false);
                setScheduledInterview(scheduledAt);
                setStatus("scheduled");
                onStatusChange(application.id, "scheduled");
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to schedule interview");
        } finally {
            setSendingLink(false); // stop loading
        }
    };

    return (
        <>
            <Card sx={{ borderRadius: 2, p: 2 }}>
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar sx={{ mr: 2 }}>
                            {user?.firstName?.[0]}
                            {user?.lastName?.[0]}
                        </Avatar>
                        <Box>
                            <Typography fontWeight="bold">
                                {user?.firstName} {user?.lastName}
                            </Typography>
                            <Typography color="text.secondary">{user?.email}</Typography>
                        </Box>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Skills:</strong> {user?.candidateProfile?.skills?.join(", ")}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Experience:</strong>{" "}
                        {user?.candidateProfile?.experienceYears || 0} years
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Cover Letter:</strong> {application.coverLetter}
                    </Typography >
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        <a
                            href={`${backendURL}${user?.candidateProfile?.resume}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 12px',
                                color: '#1976d2',
                                textDecoration: 'none',
                                borderRadius: '6px',
                                fontWeight: '500',
                                border: '1px solid #e0e0e0',
                                transition: 'all 0.2s ease',
                                backgroundColor: 'white'
                            }}
                            onMouseEnter={(e) => {
                                const target = e.currentTarget;
                                target.style.backgroundColor = '#f5f5f5';
                                target.style.borderColor = '#1976d2';
                            }}
                            onMouseLeave={(e) => {
                                const target = e.currentTarget;
                                target.style.backgroundColor = 'white';
                                target.style.borderColor = '#e0e0e0';
                            }}
                        >
                            <span>📄</span>
                            <strong>View Resume</strong>
                        </a>
                    </Typography>

                    {/* Status Section */}
                    <Box sx={{ mt: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: availableOptions.length > 0 ? 1 : 0,
                                fontWeight: 600,
                                color:
                                    status === "hired"
                                        ? "success.main"
                                        : status === "rejected"
                                            ? "error.main"
                                            : status === "scheduled"
                                                ? "info.main"
                                                : "text.primary",
                            }}
                        >
                            Current Status: {formatStatus(status)}
                        </Typography>

                        {/* Dropdown only if availableOptions > 0 */}
                        {availableOptions.length > 0 && status !== "shortlisted" && (
                            <FormControl fullWidth size="small">
                                <InputLabel>Change Status</InputLabel>
                                <Select
                                    value={status}
                                    label="Change Status"
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    {availableOptions.map((opt) => (
                                        <MenuItem key={opt} value={opt}>
                                            {formatStatus(opt)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        {/* Schedule Interview button or show scheduled date */}
                        {status === "shortlisted" && !scheduledInterview ? (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={() => setModalOpen(true)}
                            >
                                Schedule Interview
                            </Button>
                        ) : scheduledInterview ? (
                            <Typography sx={{ mt: 2, fontWeight: 600, color: "primary.main" }}>
                            </Typography>
                        ) : null}
                    </Box>
                </CardContent>
            </Card>

            {/* Generic Modal */}
            <GenericModal
                open={modalOpen}
                title="Schedule Interview"
                onClose={() => setModalOpen(false)}
                actions={
                    <>
                        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                        <Button
                            variant="contained"
                            onClick={handleScheduleInterview}
                            disabled={sendingLink} // disable while loading
                        >
                            {sendingLink ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Send Invite"
                            )}
                        </Button>

                    </>
                }
            >
                <TextField
                    label="Interview Date & Time"
                    type="datetime-local"
                    fullWidth
                    sx={{ mt: 2 }}
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </GenericModal>
        </>
    );
}
