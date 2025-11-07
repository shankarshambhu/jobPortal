import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Grid,
    Card,
    CardContent,
    Button,
    Chip,
    CircularProgress,
    Avatar,
    alpha,
    useTheme,
    Divider,
} from "@mui/material";
import {
    Schedule,
    Work,
    Business,
    AccessTime,
    Event,
    CheckCircle,
    Cancel,
    Pending,
    Chat,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { getRescheduleRequests, updateRescheduleStatus } from "../../services/interview";

// Custom Tab Component
function StyledTab(props: any) {
    const theme = useTheme();
    return (
        <Tab
            {...props}
            sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                minHeight: 48,
                color: theme.palette.text.secondary,
                '&.Mui-selected': {
                    color: theme.palette.primary.main,
                },
                '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                },
            }}
        />
    );
}

function Reschedule() {
    const [tab, setTab] = useState(0);
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const statusTabs = ["pending", "accepted", "rejected"];

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await getRescheduleRequests();
            if (res.data.success) {
                setRequests(res.data?.reschedule || []);
            }
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to load reschedule requests");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (rescheduleId: number, id: number, dateTime: Date, status: string) => {
        try {
            const res = await updateRescheduleStatus(rescheduleId, id, dateTime, status);
            if (res.data.success) {
                toast.success(res.data.message)
                fetchRequests();
            }
        } catch (err: any) {
            toast.error(err.data.message || "Failed to update status");
        }
    };

    const filteredRequests = requests.filter(
        (r) => r.status.toLowerCase() === statusTabs[tab]
    );

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending": return <Pending />;
            case "accepted": return <CheckCircle />;
            case "rejected": return <Cancel />;
            default: return <Schedule />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending": return "warning";
            case "accepted": return "success";
            case "rejected": return "error";
            default: return "default";
        }
    };

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    const formatDateTime = (dateString: string) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const tabConfig = [
        { value: "pending", label: "Pending", count: requests.filter(r => r.status.toLowerCase() === "pending").length },
        { value: "accepted", label: "Accepted", count: requests.filter(r => r.status.toLowerCase() === "accepted").length },
        { value: "rejected", label: "Rejected", count: requests.filter(r => r.status.toLowerCase() === "rejected").length },
    ];

    return (
        <Box sx={{
            padding: 3,
            maxWidth: 1400,
            margin: "0 auto",
            minHeight: '100vh',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`
        }}>
            {/* Header */}
            <Box sx={{
                background: '1F2937',
                p: 4,
                borderRadius: 3,
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.1)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                mb: 4
            }}>
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, yellow)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        mb: 1
                    }}
                >
                    Reschedule Requests
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    Manage interview rescheduling requests from candidates
                </Typography>
                <Chip
                    icon={<Schedule />}
                    label={`${requests.length} Total Request${requests.length !== 1 ? 's' : ''}`}
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            </Box>

            {/* Tabs */}
            <Card sx={{
                mb: 4,
                borderRadius: 3,
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}>
                <CardContent sx={{ p: 3 }}>
                    <Tabs
                        value={tab}
                        onChange={(_, newVal) => setTab(newVal)}
                        textColor="primary"
                        indicatorColor="primary"
                        variant="fullWidth"
                        sx={{
                            '& .MuiTabs-indicator': {
                                height: 3,
                                borderRadius: 3,
                            }
                        }}
                    >
                        {tabConfig?.map((tabItem, index) => (
                            <StyledTab
                                key={tabItem.value}
                                value={index}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {getStatusIcon(tabItem.value)}
                                        {tabItem.label}
                                        <Chip
                                            label={tabItem.count}
                                            size="small"
                                            sx={{
                                                height: 20,
                                                minWidth: 20,
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                backgroundColor: tab === index
                                                    ? theme.palette.primary.main
                                                    : alpha(theme.palette.text.secondary, 0.1),
                                                color: tab === index ? '1F2937' : theme.palette.text.secondary,
                                            }}
                                        />
                                    </Box>
                                }
                            />
                        ))}
                    </Tabs>
                </CardContent>
            </Card>

            {/* Requests Grid */}
            {loading ? (
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 300,
                    background: '1F2937',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
                }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress size={60} thickness={4} />
                        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                            Loading reschedule requests...
                        </Typography>
                    </Box>
                </Box>
            ) : filteredRequests?.length === 0 ? (
                <Card sx={{
                    textAlign: 'center',
                    py: 8,
                    borderRadius: 3,
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
                    background: '1F2937'
                }}>
                    <CardContent>
                        <Schedule sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No {statusTabs[tab]} requests
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {tab === 0
                                ? "No pending reschedule requests at the moment."
                                : `No ${statusTabs[tab]} reschedule requests.`
                            }
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Grid container spacing={3}>
                    {filteredRequests?.map((req) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={req.id}>
                            <Card sx={{
                                borderRadius: 3,
                                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
                                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                background: '1F2937',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                "&:hover": {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 40px 0 rgba(0,0,0,0.15)',
                                },
                            }}>
                                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    {/* Candidate Header */}
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                                        <Avatar
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                color: theme.palette.primary.main,
                                                fontWeight: 'bold',
                                                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`
                                            }}
                                        >
                                            {getInitials(req.candidate?.firstName, req.candidate?.lastName)}
                                        </Avatar>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                                                {req.candidate?.firstName} {req.candidate?.lastName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {req.candidate?.email}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            icon={getStatusIcon(req.status)}
                                            label={req.status.toUpperCase()}
                                            color={getStatusColor(req.status)}
                                            variant="filled"
                                            size="small"
                                            sx={{ fontWeight: 'bold', minWidth: 100 }}
                                        />
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    {/* Job Information */}
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Work fontSize="small" color="action" />
                                            <Typography variant="body2" fontWeight="medium">
                                                {req.interview?.application?.job?.title || "N/A"}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Business fontSize="small" color="action" />
                                            <Typography variant="body2" color="text.secondary">
                                                {req.interview?.application?.job?.user?.companyProfile.companyName || "N/A"}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Interview Times */}
                                    {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                ORIGINAL SCHEDULE
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Event fontSize="small" color="action" />
                                                <Typography variant="body2" fontWeight="medium">
                                                    {formatDateTime(req.interview?.scheduledAt)}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                REQUESTED TIME
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <AccessTime fontSize="small" color="action" />
                                                <Typography variant="body2" fontWeight="medium" color="primary">
                                                    {formatDateTime(req.newDateTime)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box> */}

                                    {req.status === "pending" && (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                                            {/* Original Schedule */}
                                            <Box>
                                                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                    ORIGINAL SCHEDULE
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Event fontSize="small" color="action" />
                                                    <Typography variant="body2" fontWeight="medium">
                                                        {formatDateTime(req.interview?.scheduledAt)}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* Requested Time */}
                                            <Box>
                                                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                    REQUESTED TIME
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <AccessTime fontSize="small" color="action" />
                                                    <Typography variant="body2" fontWeight="medium" color="primary">
                                                        {formatDateTime(req.newDateTime)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}

                                    {req.status === "accepted" && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                            <AccessTime fontSize="small" color="action" />
                                            <Typography variant="body2" fontWeight="medium" color="primary">
                                                <strong>Interview On: </strong>
                                                {formatDateTime(req.newDateTime)}
                                            </Typography>
                                        </Box>
                                    )}

                                    {req.status === "rejected" && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                            <Event fontSize="small" color="action" />
                                            <Typography variant="body2" fontWeight="medium">
                                                {formatDateTime(req.interview?.scheduledAt)}
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* Reason */}
                                    {req.status === "pending" && req.reason && (
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                REASON
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Chat fontSize="small" color="action" />
                                                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                                    "{req.reason}"
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}

                                    {/* Action Buttons */}
                                    {req.status === "pending" && (
                                        <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                startIcon={<CheckCircle />}
                                                onClick={() => handleStatusUpdate(req.id, req.interview.id, req.newDateTime, "accepted")}
                                                fullWidth
                                                sx={{
                                                    borderRadius: 2,
                                                    py: 1,
                                                    background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                                                    '&:hover': {
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                startIcon={<Cancel />}
                                                onClick={() => handleStatusUpdate(req.id, req.interview.id, req.interview.scheduledAt, "rejected")}
                                                fullWidth
                                                sx={{
                                                    borderRadius: 2,
                                                    py: 1,
                                                    borderWidth: 2,
                                                    '&:hover': {
                                                        borderWidth: 2,
                                                        transform: 'translateY(-1px)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                Reject
                                            </Button>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default Reschedule;