
import { useEffect, useState, useMemo } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Tabs,
    Tab,
    Grid,
    Card,
    CardContent,
    Chip,
    TextField,
    alpha,
    useTheme,
    Avatar,
} from "@mui/material";
import {
    LocationOn,
    Event,
    Schedule,
    EditCalendar,
    Work,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { interviewReschedule } from "../../services/interview";
import type { Application } from "../../types/type";
import GenericModal from "../../components/GenericModal";
import CustomButton from "../../components/CustomButton";
import {  getUserApplications } from "../../services/application";

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

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState("All");
    const theme = useTheme();

    // Modal state
    const [openModal, setOpenModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [reason, setReason] = useState("");
    const [newDate, setNewDate] = useState<string>("");

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const res = await getUserApplications();
            if (res.data.success) {
                setApplications(res.data.application || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const filteredApplications = useMemo(() => {
        if (selectedTab === "All") return applications;
        return applications.filter(
            (a) => a.status?.toLowerCase() === selectedTab.toLowerCase()
        );
    }, [applications, selectedTab]);

    const handleTabChange = (_: any, newValue: string) => {
        setSelectedTab(newValue);
    };

    const statusColors: Record<string, "default" | "success" | "error" | "warning" | "info"> = {
        pending: "warning",
        applied: "info",
        shortlisted: "info",
        scheduled: "success",
        rejected: "error",
    };

    const getStatusIcon = (status: string) => {
        const statusIcons: { [key: string]: any } = {
            scheduled: <Schedule />,
            applied: <Work />,
            shortlisted: <Event />,
            pending: <Schedule />,
        };
        return statusIcons[status?.toLowerCase()] || <Work />;
    };

    const handleOpenModal = (app: any) => {
        setSelectedApplication(app);
        setOpenModal(true);
    };

    const handleSubmitModal = async () => {
        if (!selectedApplication) return;

        if (!reason || !newDate) {
            toast.warning("Please fill reason and new date");
            return;
        }

        try {
            const res = await interviewReschedule(
                selectedApplication.user,
                selectedApplication.id,
                reason,
                newDate,
            );
            if (res.data.success) {
                toast.success("Interview rescheduled successfully!");
                setOpenModal(false);
                setReason("");
                setNewDate("");
                fetchApplications(); // Refresh applications
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.data?.message || "Failed to reschedule interview");
        }
    };

    const getInitials = (companyName: string) => {
        return companyName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'CO';
    };

    const tabConfig = [
        { value: "All", label: "All", count: applications.length },
        { value: "Applied", label: "Applied", count: applications.filter(app => app.status?.toLowerCase() === 'applied').length },
        { value: "Shortlisted", label: "Shortlisted", count: applications.filter(app => app.status?.toLowerCase() === 'shortlisted').length },
        { value: "Scheduled", label: "Scheduled", count: applications.filter(app => app.status?.toLowerCase() === 'scheduled').length },
        { value: "Rejected", label: "Rejected", count: applications.filter(app => app.status?.toLowerCase() === 'rejected').length },
    ];

    return (
        <Box sx={{
            padding: 3,
            maxWidth: 1400,
            margin: "0 auto",
            minHeight: '100vh',
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.8)} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`
        }}>
            {/* Header Section */}
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
                    My Applications
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    Track your job applications and interview status
                </Typography>
                <Chip
                    label={`${applications.length} Total Applications`}
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            </Box>

            {/* Tabs Section */}
            <Card sx={{
                mb: 4,
                borderRadius: 3,
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}>
                <CardContent sx={{ p: 3 }}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        textColor="primary"
                        indicatorColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTabs-indicator': {
                                height: 3,
                                borderRadius: 3,
                            }
                        }}
                    >
                        {tabConfig.map((tab) => (
                            <StyledTab
                                key={tab.value}
                                value={tab.value}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {tab.label}
                                        <Chip
                                            label={tab.count}
                                            size="small"
                                            sx={{
                                                height: 20,
                                                minWidth: 20,
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                backgroundColor: selectedTab === tab.value
                                                    ? theme.palette.primary.main
                                                    : alpha(theme.palette.text.secondary, 0.1),
                                                color: selectedTab === tab.value ? '1F2937' : theme.palette.text.secondary,
                                            }}
                                        />
                                    </Box>
                                }
                            />
                        ))}
                    </Tabs>
                </CardContent>
            </Card>

            {/* Applications Grid */}
            {loading ? (
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 400,
                    background: '1F2937',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
                }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress size={60} thickness={4} />
                        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                            Loading your applications...
                        </Typography>
                    </Box>
                </Box>
            ) : filteredApplications.length === 0 ? (
                <Card sx={{
                    textAlign: 'center',
                    py: 8,
                    borderRadius: 3,
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
                    background: '1F2937'
                }}>
                    <CardContent>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No applications found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {selectedTab === 'All'
                                ? "You haven't applied to any jobs yet."
                                : `No applications with status "${selectedTab}".`
                            }
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Grid container spacing={3}>
                    {filteredApplications.map((app) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={app.id}>
                            <Card
                                sx={{
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
                                }}
                            >
                                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    {/* Company Header */}
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
                                            {getInitials(app.job?.user?.companyProfile?.companyName)}
                                        </Avatar>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                                                {app.job?.title || "N/A"}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {app.job?.user?.companyProfile?.companyName || "Company"}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Job Details */}
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2, flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LocationOn fontSize="small" color="action" />
                                            <Typography variant="body2" color="text.secondary">
                                                {app.job?.location || "Remote"}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Event fontSize="small" color="action" />
                                            <Typography variant="body2" color="text.secondary">
                                                Applied {new Date(app.appliedAt).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Status Chip */}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Chip
                                            icon={getStatusIcon(app.status)}
                                            label={app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
                                            color={statusColors[app.status?.toLowerCase()] || "default"}
                                            variant="filled"
                                            sx={{
                                                fontWeight: 'bold',
                                                minWidth: 120,
                                            }}
                                        />
                                    </Box>

                                    {/* Action Button */}
                                    {app.status?.toLowerCase() === "scheduled" && (
                                        <CustomButton
                                            label="Reschedule Interview"
                                            color="secondary"
                                            onClick={() => handleOpenModal(app)}
                                            startIcon={<EditCalendar />}
                                            fullWidth
                                            sx={{
                                                borderRadius: 2,
                                                py: 1,
                                                mt: 'auto',
                                                background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Reschedule Modal */}
            {selectedApplication && (
                <GenericModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    title="Reschedule Interview"
                >
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" fontWeight="bold" gutterBottom>
                            {selectedApplication.job?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {selectedApplication.job?.user?.companyProfile?.companyName}
                        </Typography>

                        <TextField
                            label="Reason for rescheduling"
                            fullWidth
                            multiline
                            minRows={3}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            sx={{ mb: 2 }}
                            placeholder="Please provide a reason for rescheduling the interview..."
                        />
                        <TextField
                            label="Preferred New Date & Time"
                            type="datetime-local"
                            fullWidth
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                        <CustomButton
                            label="Cancel"
                            color="secondary"
                            variant="outlined"
                            onClick={() => setOpenModal(false)}
                        />
                        <CustomButton
                            label="Submit Request"
                            color="primary"
                            onClick={handleSubmitModal}
                            startIcon={<EditCalendar />}
                        />
                    </Box>
                </GenericModal>
            )}
        </Box>
    );
}