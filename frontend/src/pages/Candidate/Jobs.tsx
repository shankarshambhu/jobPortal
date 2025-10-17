import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    TextField,
    Chip,
    alpha,
    useTheme,
} from "@mui/material";
import {
    Work,
    LocationOn,
    AttachMoney,
    Event,
    CheckCircle,
    Send,
} from "@mui/icons-material";
import GenericModal from "../../components/GenericModal";
import CustomButton from "../../components/CustomButton";
import { toast } from "react-toastify";
import { getAllJobs } from "../../services/job";
import { createApplication, getUserApplications } from "../../services/application";

export default function JobsPage() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);
    const [coverLetter, setCoverLetter] = useState("");
    const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const theme = useTheme();

    // Fetch jobs & user's applied jobs
    const fetchJobs = async () => {
        try {
            const res = await getAllJobs();
            if (res.data.success) setJobs(res.data.jobs);

            const appliedRes = await getUserApplications();
            if (appliedRes.data.success && appliedRes.data.application) {
                // ✅ Corrected: use 'application' not 'applications'
                const appliedJobIds = appliedRes.data.application.map((a: any) => a.job.id);
                setAppliedJobs(appliedJobIds);
            }
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchJobs();
    }, []);

    // Open modal to apply
    const handleOpenModal = (job: any) => {
        setSelectedJob(job);
        setCoverLetter("");
        setOpenModal(true);
    };

    // Handle applying to a job
    const handleApply = async () => {
        if (!selectedJob) return;
        if (!coverLetter.trim()) {
            toast.error("Cover letter cannot be empty");
            return;
        }
        try {
            const res = await createApplication(selectedJob.id, coverLetter);
            if (res.data.success) {
                toast.success("Applied successfully!");
                setAppliedJobs(prev => [...prev, selectedJob.id]);
                setOpenModal(false);
                setSelectedJob(null);
                setCoverLetter("");
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Error applying for job");
        }
    };

    const getJobTypeColor = (type: string) => {
        switch (type) {
            case "fulltime":
                return "primary";
            case "parttime":
                return "secondary";
            case "internship":
                return "success";
            default:
                return "default";
        }
    };

    const formatJobType = (type: string) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    // Filter jobs based on search
    const filteredJobs = jobs.filter(job => {
        const terms = searchTerm.toLowerCase().split(" ").filter(t => t.trim() !== "");

        return terms.every(term =>
            job.title.toLowerCase().includes(term) ||
            job.location.toLowerCase().includes(term) ||
            job.jobtype.toLowerCase().includes(term) ||
            job.skills.some((skill: string) => skill.toLowerCase().includes(term))
        );
    });



    return (
        <Box sx={{
            p: 4,
            minHeight: '100vh',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`
        }}>
            {/* Header */}
            <Box sx={{
                background: '#1F2937',
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
                    Career Opportunities
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    Discover your next career move
                </Typography>
                <Chip
                    label={`${jobs.length} Jobs Available`}
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            </Box>

            {/* Search Bar */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Search jobs..."
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Location, Skills ,Title , JobType"
                    sx={{
                        backgroundColor: alpha(theme.palette.background.paper, 0.9),
                        borderRadius: 2,
                    }}
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
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
                }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress size={60} thickness={4} />
                        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                            Loading opportunities...
                        </Typography>
                    </Box>
                </Box>
            ) : filteredJobs.length === 0 ? (
                <Box sx={{
                    textAlign: 'center',
                    py: 8,
                    background: '1F2937',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
                }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No jobs found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Try adjusting your search criteria
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredJobs.map(job => {
                        const applied = appliedJobs.includes(job.id);
                        return (
                            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={job.id}>
                                <Card sx={{
                                    borderRadius: 3,
                                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    background: '1F2937',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 40px 0 rgba(0,0,0,0.15)',
                                    }
                                }}>
                                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        {/* Job Header */}
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                sx={{
                                                    lineHeight: 1.3,
                                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, yellow)`,
                                                    backgroundClip: 'text',
                                                    WebkitBackgroundClip: 'text',
                                                    color: 'transparent',
                                                }}
                                            >
                                                {job.title}
                                            </Typography>
                                            <Chip
                                                label={formatJobType(job.jobtype)}
                                                color={getJobTypeColor(job.jobtype)}
                                                size="small"
                                                variant="filled"
                                            />
                                        </Box>

                                        {/* Job Details */}
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2, flexGrow: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LocationOn fontSize="small" color="action" />
                                                <Typography variant="body2" color="text.secondary">
                                                    {job.location}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <AttachMoney fontSize="small" color="action" />
                                                <Typography variant="body2" color="text.secondary">
                                                    {`₹${job.salary.toLocaleString()} LPA`}                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                                {job.skills.map((skill: string) => (
                                                    <Chip
                                                        key={skill}
                                                        label={skill}
                                                        size="small"
                                                        color="secondary"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Event fontSize="small" color="action" />
                                                <Typography variant="body2" color="text.secondary">
                                                    Closes {new Date(job.enddate).toLocaleDateString()}
                                                </Typography>

                                            </Box>

                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Work fontSize="small" color="action" />
                                            <Typography variant="body2" color="text.secondary">
                                                {formatJobType(job.jobtype)}
                                            </Typography>
                                        </Box>


                                        {/* Description */}
                                        <Typography
                                            variant="body2"
                                            color="text.primary"
                                            sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                lineHeight: 1.6,
                                                mb: 2
                                            }}
                                        >
                                            {job.description}
                                        </Typography>

                                        {/* Apply Button */}
                                        <Box sx={{ mt: 'auto' }}>
                                            {applied ? (
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: 1,
                                                    p: 2,
                                                    borderRadius: 2,
                                                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                                                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                                                }}>
                                                    <CheckCircle color="success" fontSize="small" />
                                                    <Typography color="success.main" fontWeight="bold">
                                                        Application Submitted
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <CustomButton
                                                    label="Apply Now"
                                                    color="primary"
                                                    onClick={() => handleOpenModal(job)}
                                                    fullWidth
                                                    startIcon={<Send />}
                                                    sx={{
                                                        borderRadius: 3,
                                                        py: 1.5,
                                                        fontSize: '1rem',
                                                        fontWeight: 'bold',
                                                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                                        boxShadow: '0 4px 15px 0 rgba(0,0,0,0.2)',
                                                        '&:hover': {
                                                            boxShadow: '0 6px 20px 0 rgba(0,0,0,0.3)',
                                                            transform: 'translateY(-2px)',
                                                        },
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}

            {/* Apply Modal */}
            {selectedJob && (
                <GenericModal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false);
                        setSelectedJob(null);
                        setCoverLetter("");
                    }}
                    title={`Apply for ${selectedJob.title}`}
                    actions={
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                            <CustomButton
                                label="Cancel"
                                color="secondary"
                                variant="outlined"
                                onClick={() => {
                                    setOpenModal(false);
                                    setSelectedJob(null);
                                    setCoverLetter("");
                                }}
                                sx={{ borderRadius: 2 }}
                            />
                            <CustomButton
                                label="Submit Application"
                                color="primary"
                                onClick={handleApply}
                                startIcon={<Send />}
                                sx={{
                                    borderRadius: 2,
                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                }}
                            />
                        </Box>
                    }
                >
                    <Box display="flex" flexDirection="column" gap={3} mt={1}>
                        <Card sx={{
                            borderRadius: 2,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            background: alpha(theme.palette.primary.light, 0.05)
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    {selectedJob.title}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                                    <Chip
                                        icon={<LocationOn />}
                                        label={selectedJob.location}
                                        variant="outlined"
                                        size="small"
                                    />
                                    <Chip
                                        icon={<Work />}
                                        label={formatJobType(selectedJob.jobtype)}
                                        variant="outlined"
                                        size="small"
                                    />
                                    <Chip
                                        icon={<AttachMoney />}
                                        label={`₹${selectedJob.salary.toLocaleString()} LPA`}
                                        variant="outlined"
                                        size="small"
                                    />
                                    <Chip
                                        icon={<Event />}
                                        label={`Closes ${new Date(selectedJob.enddate).toLocaleDateString()}`}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6 }}>
                                    {selectedJob.description}
                                </Typography>
                            </CardContent>
                        </Card>

                        {/* Cover Letter Input */}
                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Cover Letter
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Tell us why you're the perfect candidate for this position
                            </Typography>
                            <TextField
                                label="Your cover letter..."
                                multiline
                                rows={6}
                                fullWidth
                                value={coverLetter}
                                onChange={e => setCoverLetter(e.target.value)}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </GenericModal>
            )}
        </Box>
    );
}
