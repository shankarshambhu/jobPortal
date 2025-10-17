
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  TextField,
  MenuItem,
  Chip,
  alpha,
  useTheme,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventIcon from "@mui/icons-material/Event";
import GenericModal from "../../components/GenericModal";
import CustomButton from "../../components/CustomButton";
import { toast } from "react-toastify";
import { createJobs, getAllJobs } from "../../services/job";
import { useNavigate } from "react-router-dom";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobtype: "fulltime",
    enddate: "",
    skills: [] as string[], // ✅ array of strings
  });

  const theme = useTheme();
  const navigate = useNavigate();

  // ✅ Fetch all jobs
  const fetchJobs = async () => {
    try {
      const res = await getAllJobs();
      if (res.data.success) {
        setJobs(res.data.jobs);
      }
    } catch (error) {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ✅ Handle job creation
  const handleSave = async () => {
    try {
      const payload = { ...form, salary: Number(form.salary) };
      const res = await createJobs(payload);
      if (res.data.success) {
        toast.success("Job created successfully!");
        setOpenModal(false);
        setJobs((prev) => [...prev, res.data.job]);
        setForm({
          title: "",
          description: "",
          location: "",
          salary: "",
          jobtype: "fulltime",
          enddate: "",
          skills: [] as string[], // ✅ array of strings
        });
      }
    } catch (err: any) {
      const message = err?.data?.message || "Error creating job";
      toast.error(message);
    }
  };

  // Get chip color based on job type
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

  // Format job type for display
  const formatJobType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // ✅ Modal Form Content
  const formContent = (
    <Box display="flex" flexDirection="column" gap={3}>
      <TextField
        label="Job Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        fullWidth
        variant="outlined"
        size="medium"
      />
      <TextField
        label="Job Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        multiline
        rows={4}
        fullWidth
        variant="outlined"
      />
      <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
        <TextField
          label="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Skills (comma separated)"
          value={form.skills.join(", ")} // display as comma-separated string
          onChange={(e) =>
            setForm({ ...form, skills: e.target.value.split(",").map(s => s.trim()) })
          }
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Salary"
          type="number"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          fullWidth
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">LPA</InputAdornment>,
            inputProps: { min: 0 } // optional: prevent negative numbers
          }}
        />

      </Box>
      <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
        <TextField
          select
          label="Job Type"
          value={form.jobtype}
          onChange={(e) => setForm({ ...form, jobtype: e.target.value })}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="fulltime">Full Time</MenuItem>
          <MenuItem value="parttime">Part Time</MenuItem>
          <MenuItem value="internship">Internship</MenuItem>
        </TextField>
        <TextField
          label="End Date"
          type="date"
          value={form.enddate}
          onChange={(e) => setForm({ ...form, enddate: e.target.value })}
          InputLabelProps={{ shrink: true }}
          fullWidth
          variant="outlined"
        />
      </Box>
    </Box>
  );

  return (
    <Box
      p={4}
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={6}
        sx={{
          background: '1F2937',
          p: 3,
          borderRadius: 3,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            Career Opportunities
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover your next career move from our curated job listings
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
          sx={{
            borderRadius: 3,
            px: 4,
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
        >
          Create Job
        </Button>
      </Box>

      {/* Jobs Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : jobs?.length === 0 ? (
        <Box
          textAlign="center"
          py={10}
          sx={{
            background: '1F2937',
            borderRadius: 3,
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No jobs available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create the first job listing to get started
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={job.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
                  cursor: "pointer",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  background: '1F2937',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  "&:hover": {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px 0 rgba(0,0,0,0.15)',
                  },
                }}
                onClick={() =>
                  navigate(`/job-applications/${job.id}`, { state: { job } })
                }
              >
                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Job Header */}
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
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
                  <Box display="flex" flexDirection="column" gap={1.5} mb={2} flexGrow={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {job.location}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <AttachMoneyIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {`₹${job.salary.toLocaleString()} LPA`}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <EventIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Closes {new Date(job.enddate).toLocaleDateString()}
                      </Typography>
                    </Box>
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
                    }}
                  >
                    {job.description}
                  </Typography>

                  {/* Footer */}
                  <Box
                    sx={{
                      mt: 'auto',
                      pt: 2,
                      borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="primary"
                      fontWeight="medium"
                      sx={{ display: 'block', textAlign: 'center' }}
                    >
                      View Applications →
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )
      }

      {/* ✅ Job Creation Modal */}
      <GenericModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Create New Job Opportunity"
        titleProps={{
          sx: {
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, yellow)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold'
          }
        }}
        actions={
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <CustomButton
              label="Cancel"
              color="secondary"
              variant="outlined"
              onClick={() => setOpenModal(false)}
            />
            <CustomButton
              label="Create Job"
              color="primary"
              onClick={handleSave}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              }}
            />
          </Box>
        }
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 20px 60px 0 rgba(0,0,0,0.2)',
          }
        }}
      >
        {formContent}
      </GenericModal>
    </Box >
  );
}