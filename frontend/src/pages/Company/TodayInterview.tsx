import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    Chip,
    Button,
    Box,
    alpha,
    useTheme,
    Avatar,
    Divider
} from "@mui/material";
import {
    VideoCall,
    Schedule,
    Work,
    Link,
    Send,
    AccessTime,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { sendRoomLink, todayInterview } from "../../services/interview";

function TodayInterview() {
    const [interviews, setInterviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [sendingLinkId, setSendingLinkId] = useState<number | null>(null);
    const theme = useTheme();

    const fetchTodaysInterviews = async () => {
        setLoading(true);
        try {
            const res = await todayInterview();
            setInterviews(res.data.todayInterview);
        } catch (error: any) {
            console.error(error);
            toast.error(error.data?.message || "Failed to fetch today's interviews");
        } finally {
            setLoading(false);
        }
    };

    const handleSendRoomLink = async (interview: any) => {
        setSendingLinkId(interview.id);
        try {
            const email = interview.application.user.email;
            const candidateName = interview.application.user.firstName;
            const jobTitle = interview.application.job.title;

            const res = await sendRoomLink(email, candidateName, jobTitle);
            if (res.data.success) {
                toast.success("Video room link sent successfully!");

                // Update the roomLink directly in the interviews state
                setInterviews(prev =>
                    prev.map(i =>
                        i.id === interview.id
                            ? { ...i, roomLink: res.data.handleInterview.roomLink }
                            : i
                    )
                );
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong while sending the room link");
        } finally {
            setSendingLinkId(null);
        }
    };


    useEffect(() => {
        fetchTodaysInterviews();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "scheduled": return "primary";
            case "completed": return "success";
            case "cancelled": return "error";
            case "ongoing": return "warning";
            default: return "default";
        }
    };

    const getStatusVariant = (status: string) => {
        return status.toLowerCase() === "completed" ? "filled" : "outlined";
    };

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

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
                    Today's Interviews
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    Manage your scheduled interviews for {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
                <Chip
                    icon={<VideoCall />}
                    label={`${interviews.length} Interview${interviews.length !== 1 ? 's' : ''} Scheduled`}
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            </Box>

            {loading ? (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 300,
                    background: '1F2937',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
                }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress size={60} thickness={4} />
                        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                            Loading today's interviews...
                        </Typography>
                    </Box>
                </Box>
            ) : interviews?.length === 0 ? (
                <Box sx={{
                    textAlign: 'center',
                    py: 8,
                    background: '1F2937',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
                }}>
                    <VideoCall sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No Interviews Today
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        You have no interviews scheduled for today. Enjoy your day!
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {interviews.map((interview) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={interview.id}>
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
                                                width: 60,
                                                height: 60,
                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                color: theme.palette.primary.main,
                                                fontWeight: 'bold',
                                                fontSize: '1.25rem',
                                                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`
                                            }}
                                        >
                                            {getInitials(interview.application.user.firstName, interview.application.user.lastName)}
                                        </Avatar>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                                                {interview.application.user.firstName} {interview.application.user.lastName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {interview.application.user.email}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            icon={<Schedule />}
                                            label={interview.status.toUpperCase()}
                                            color={getStatusColor(interview.status)}
                                            variant={getStatusVariant(interview.status)}
                                            size="small"
                                            sx={{ fontWeight: 'bold', minWidth: 120 }}
                                        />
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    {/* Interview Details */}
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3, flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Work fontSize="small" color="action" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    Position
                                                </Typography>
                                                <Typography variant="body1" fontWeight="medium">
                                                    {interview.application.job.title}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <AccessTime fontSize="small" color="action" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">
                                                    Scheduled Time
                                                </Typography>
                                                <Typography variant="body1" fontWeight="medium">
                                                    {formatTime(interview.scheduledAt)}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {interview.roomLink && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Link fontSize="small" color="action" />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Meeting Link
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight="medium"
                                                        sx={{
                                                            wordBreak: 'break-all',
                                                            color: theme.palette.primary.main
                                                        }}
                                                    >
                                                        {interview.roomLink }
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>

                                    {/* Action Button */}
                                    {/* Action Button */}
                                    {!interview.roomLink ? (
                                        <Button
                                            variant="contained"
                                            startIcon={sendingLinkId === interview.id ? <CircularProgress size={16} color="inherit" /> : <Send />}
                                            onClick={() => handleSendRoomLink(interview)}
                                            disabled={sendingLinkId === interview.id}
                                            sx={{
                                                borderRadius: 2,
                                                py: 1.5,
                                                background: `linear-gradient(45deg, ${theme.palette.secondary.main}, yellow)`,
                                                boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
                                                '&:hover': {
                                                    boxShadow: '0 6px 16px 0 rgba(0,0,0,0.3)',
                                                    transform: 'translateY(-1px)',
                                                },
                                                transition: 'all 0.3s ease',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {sendingLinkId === interview.id ? "Sending Link..." : "Send Room Link"}
                                        </Button>
                                    ) : (
                                        <Chip
                                            label="Link Already sent"
                                            color="success"
                                            variant="outlined"
                                            sx={{ fontWeight: 'bold', minWidth: 120 }}
                                        />
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

export default TodayInterview;