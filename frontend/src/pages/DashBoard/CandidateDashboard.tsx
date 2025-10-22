import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  CircularProgress,
  Chip,
  Paper,
} from "@mui/material";
import {
  Timeline,
  TrendingUp,
  WorkOutline,
  CheckCircle,
  Schedule,
  EmojiEvents,
} from "@mui/icons-material";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { getCandidateStats } from "../../services/candidate";
import { getApplicationStatus, getApplicationTrends } from "../../services/application";
import { getSkillsMatch } from "../../services/job";
import { todayInterviewCandidate } from "../../services/interview";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

interface Stats {
  application: any[];
  interview: any[];
  offers: number;
}

const CandidateDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [trends, setTrends] = useState<{ month: string; count: number }[]>([]);
  const [statusData, setStatusData] = useState<{ status: string; count: number }[]>([]);
  const [skillMatch, setSkillMatch] = useState<
    { skill: string; match: number; jobsCount: number; totalJobs: number }[]
  >([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchCandidateDetails(),
      fetchApplicationTrends(),
      fetchApplicationStatus(),
      fetchSkillMatch(),
      fetchTodaysInterviews(),
    ]).finally(() => setLoading(false));
  }, []);

  const fetchCandidateDetails = async () => {
    try {
      const res = await getCandidateStats();
      if (res.data.success) setStats(res.data.result);
    } catch (error) {
      console.log("Could not find details");
    }
  };

  const fetchApplicationTrends = async () => {
    try {
      const res = await getApplicationTrends();
      if (res.data.success) setTrends(res.data.result);
    } catch (error) {
      console.log("Error fetching trends");
    }
  };

  const fetchApplicationStatus = async () => {
    try {
      const res = await getApplicationStatus();
      if (res.data.success) setStatusData(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSkillMatch = async () => {
    try {
      const res = await getSkillsMatch();
      if (res.data.success) setSkillMatch(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodaysInterviews = async () => {
    try {
      const res = await todayInterviewCandidate();
      if (res.data.success) setInterviews(res.data.todayInterview);
    } catch (error) {
      console.error(error);
    }
  };

  const offersReceived =
    stats?.application.filter((app) => app.status === "hired")?.length || 0;

  // ------------------- Chart Data -------------------
  const lineData = {
    labels: trends.map((r) => r.month),
    datasets: [
      {
        label: "Applications Submitted",
        data: trends.map((r) => r.count),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        tension: 0.3,
        fill: true,
        borderWidth: 3,
      },
    ],
  };

  const pieData = {
    labels: statusData.map((s) => s.status),
    datasets: [
      {
        data: statusData.map((s) => s.count),
        backgroundColor: [
          "#f59e0b", // Pending - Amber
          "#3b82f6", // Shortlisted - Blue
          "#10b981", // Hired - Green
          "#ef4444", // Rejected - Red
          "#8b5cf6", // Interview - Purple
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const barData = {
    labels: skillMatch.map((s) => s.skill),
    datasets: [
      {
        label: "Jobs Requiring Skill",
        data: skillMatch.map((s) => s.totalJobs),
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        borderColor: "#2563eb",
        borderWidth: 1,
      },
      {
        label: "Jobs Matched",
        data: skillMatch.map((s) => Math.round((s.totalJobs * s.match) / 100)),
        backgroundColor: "#10b981",
        borderColor: "#059669",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const skill = skillMatch[context.dataIndex];
            return `${skill.skill}: ${skill.match}% (${skill.jobsCount} of ${skill.totalJobs})`;
          },
        },
      },
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
    },
    scales: {
      x: {
        stacked: false,
        beginAtZero: true,
        title: { display: true, text: "Number of Jobs" },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        }
      },
      y: {
        stacked: false,
        grid: {
          display: false,
        }
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
    },
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      py: 4,
      px: { xs: 2, md: 4 }
    }}>
      {/* Header Section */}
      <Box mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
        >
          Candidate Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Track your job search progress and applications
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} mb={4}>
        {[
          {
            label: "Total Applications",
            value: stats?.application?.length || 0,
            icon: <WorkOutline sx={{ fontSize: 32 }} />,
            color: "#3b82f6"
          },
          {
            label: "Interviews Scheduled",
            value: stats?.interview?.length || 0,
            icon: <Schedule sx={{ fontSize: 32 }} />,
            color: "#8b5cf6"
          },
          {
            label: "Offers Received",
            value: offersReceived,
            icon: <EmojiEvents sx={{ fontSize: 32 }} />,
            color: "#10b981"
          },
          {
            label: "Application Trend",
            value: trends?.length > 0 ? `${trends[trends?.length - 1]?.count || 0} this month` : "0",
            icon: <TrendingUp sx={{ fontSize: 32 }} />,
            color: "#f59e0b"
          },
        ].map((item, idx) => (
          <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                background: "white",
                borderRadius: 3,
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: `1px solid rgba(0, 0, 0, 0.08)`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                },
                height: "95%",
                width:'80%'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </Box>
                </Box>
                <Typography variant="h4" fontWeight="bold" color="text.primary" mb={1}>
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight="medium">
                  {item.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mb={4}>
        {/* Application Trends */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.08)",
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Timeline sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" fontWeight="bold">
                  Applications Over Time
                </Typography>
              </Box>
              <Box sx={{ height: 200 }}> {/* Reduced height */}
                <Line data={lineData} options={lineOptions} />
              </Box>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Track how your job applications have trended over time.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Application Status */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.08)" }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" justifyContent={'center'} mb={3}>
                <CheckCircle sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" fontWeight="bold">
                  Application Status
                </Typography>
              </Box>
              <Box sx={{ height: 250 }} display={'flex'} justifyContent={'center'}> {/* Smaller pie chart */}
                <Pie data={pieData} options={pieOptions} />
              </Box>
            </CardContent>
          </Card>

        </Grid>
      </Grid>

      {/* Bottom Section - Skill Match and Interviews */}
      <Grid container spacing={3}>
        {/* Skill Match Insights */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Skill Match Insights
              </Typography>
        <Box sx={{ height: { xs: 180, sm: 200, md: 250 } }}>
                <Bar data={barData} options={barOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Interviews */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Schedule sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" fontWeight="bold">
                  Upcoming Interviews
                </Typography>
              </Box>

              {interviews?.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {interviews.map((interview, index) => (
                    <Box key={interview.id}>
                      <ListItem
                        sx={{
                          px: 0,
                          py: 2,
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box width="100%" mb={1}>
                          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                            {interview?.application?.job?.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {interview?.interviewer?.companyProfile?.companyName}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                          <Chip
                            label={new Date(interview.scheduledAt).toLocaleDateString()}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                          <Typography variant="caption" color="text.secondary">
                            {new Date(interview.scheduledAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Typography>
                        </Box>
                      </ListItem>
                      {index < interviews?.length - 1 && (
                        <Divider sx={{ my: 1 }} />
                      )}
                    </Box>
                  ))}
                </List>
              ) : (
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    borderRadius: 2,
                  }}
                >
                  <Schedule sx={{ fontSize: 48, color: "text.secondary", mb: 2, opacity: 0.5 }} />
                  <Typography color="text.secondary" variant="body1">
                    No upcoming interviews scheduled.
                  </Typography>
                  <Typography color="text.secondary" variant="body2" mt={1}>
                    Check back later for scheduled interviews.
                  </Typography>
                </Paper>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateDashboard;





