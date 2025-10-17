// // CandidateDashboardAnalytics.tsx
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
// } from "@mui/material";
// import { Line, Pie, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
// } from "chart.js";
// import { getCandidateStats } from "../../services/candidate";
// import {
//   getApplicationStatus,
//   getApplicationTrends,
// } from "../../services/application";
// import { getSkillsMatch } from "../../services/job";
// import { todayInterviewCandidate } from "../../services/interview";

// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement
// );

// interface Stats {
//   application: any[];
//   interview: any[];
//   offers: number;
// }

// const CandidateDashboardAnalytics = () => {
//   const [stats, setStats] = useState<Stats | null>(null);
//   const [trends, setTrends] = useState<{ month: string; count: number }[]>([]);
//   const [statusData, setStatusData] = useState<{ status: string; count: number }[]>([]);
//   const [skillMatch, setSkillMatch] = useState<
//     { skill: string; match: number; jobsCount: number; totalJobs: number }[]
//   >([]);
//   const [interviews, setInterviews] = useState<any[]>([]);

//   useEffect(() => {
//     fetchCandidateDetails();
//     fetchApplicationTrends();
//     fetchApplicationStatus();
//     fetchSkillMatch();
//     fetchTodaysInterviews();
//   }, []);

//   const fetchCandidateDetails = async () => {
//     try {
//       const res = await getCandidateStats();
//       if (res.data.success) {
//         setStats(res.data.result);
//       }
//     } catch (error) {
//       console.log("Could not find details");
//     }
//   };

//   const offersReceived = stats?.application.filter((app) => app.status === "hired")
//     .length;

//   const fetchApplicationTrends = async () => {
//     try {
//       const res = await getApplicationTrends();
//       if (res.data.success) setTrends(res.data.result);
//     } catch (error) {
//       console.log("Error fetching trends");
//     }
//   };

//   const fetchApplicationStatus = async () => {
//     try {
//       const res = await getApplicationStatus();
//       if (res.data.success) setStatusData(res.data.result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchSkillMatch = async () => {
//     try {
//       const res = await getSkillsMatch();
//       if (res.data.success) setSkillMatch(res.data.result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchTodaysInterviews = async () => {
//     try {
//       const res = await todayInterviewCandidate();
//       if (res.data.success) setInterviews(res.data.todayInterview);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // ------------------- Chart Data -------------------
//   const lineData = {
//     labels: trends.map((r) => r.month),
//     datasets: [
//       {
//         label: "Applications",
//         data: trends.map((r) => r.count),
//         borderColor: "#FACC15",
//         backgroundColor: "#EAB30833",
//         tension: 0.3,
//       },
//     ],
//   };

//   const pieData = {
//     labels: statusData.map((s) => s.status),
//     datasets: [
//       {
//         data: statusData.map((s) => s.count),
//         backgroundColor: ["#FACC15", "#22C55E", "#EF4444", "#3B82F6"],
//       },
//     ],
//   };

//   // Stacked horizontal bar for skill match
//   const barData = {
//     labels: skillMatch.map((s) => s.skill),
//     datasets: [
//       {
//         label: "Jobs Requiring Skill",
//         data: skillMatch.map((s) => s.totalJobs),
//         backgroundColor: "#EAB30888",
//       },
//       {
//         label: "Jobs Matched",
//         data: skillMatch.map((s) => Math.round((s.totalJobs * s.match) / 100)),
//         backgroundColor: "#FACC15",
//       },
//     ],
//   };

//   const barOptions = {
//     indexAxis: "y" as const, // horizontal bars
//     responsive: true,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (context: any) {
//             const skill = skillMatch[context.dataIndex];
//             return `${skill.skill}: ${skill.match}% (${skill.jobsCount} of ${skill.totalJobs})`;
//           },
//         },
//       },
//       legend: { position: "top" as const },
//     },
//     scales: {
//       x: {
//         stacked: true,
//         beginAtZero: true,
//         title: { display: true, text: "Number of Jobs" },
//       },
//       y: { stacked: true },
//     },
//   };

//   return (
//     <Box p={3}>
//       {/* Top Stats */}
//       <Grid container spacing={3}>
//         {stats && (
//           <>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Card>
//                 <CardContent>
//                   <Typography>Total Applications</Typography>
//                   <Typography variant="h5">{stats.application.length}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Card>
//                 <CardContent>
//                   <Typography>Interviews Scheduled</Typography>
//                   <Typography variant="h5">{stats.interview.length}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid size={{ xs: 12, md: 4 }}>
//               <Card>
//                 <CardContent>
//                   <Typography>Offers Received</Typography>
//                   <Typography variant="h5">{offersReceived}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </>
//         )}
//       </Grid>

//       {/* Applications Over Time & Status */}
//       <Grid container spacing={3} mt={3}>
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Applications Over Time</Typography>
//               <Line data={lineData} />
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Application Status</Typography>
//               <Pie data={pieData} />
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Skills Match */}
//       <Grid container spacing={3} mt={3}>
//         <Grid size={{xs:12}}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Skills Match</Typography>
//               <Bar data={barData} options={barOptions} />
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Upcoming Interviews */}
//       <Grid container spacing={3} mt={3}>
//         <Grid size={{xs:12}}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Upcoming Interviews</Typography>
//               <List>
//                 {interviews.map((i) => (
//                   <div key={i.id}>
//                     <ListItem>
//                       <ListItemText
//                         primary={`${i?.application?.job?.title} at ${i?.interviewer?.companyProfile?.companyName}`}
//                         secondary={new Date(i.scheduledAt).toLocaleString()}
//                       />
//                     </ListItem>
//                     <Divider />
//                   </div>
//                 ))}
//                 {interviews.length === 0 && (
//                   <Typography color="text.secondary" mt={2}>
//                     No upcoming interviews.
//                   </Typography>
//                 )}
//               </List>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default CandidateDashboardAnalytics;




// CandidateDashboardAnalytics.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
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

const CandidateDashboardAnalytics = () => {
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
    stats?.application.filter((app) => app.status === "hired").length || 0;

  // ------------------- Chart Data -------------------
  const lineData = {
    labels: trends.map((r) => r.month),
    datasets: [
      {
        label: "Applications Submitted",
        data: trends.map((r) => r.count),
        borderColor: "#FACC15",
        backgroundColor: "#EAB30833",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: statusData.map((s) => s.status),
    datasets: [
      {
        data: statusData.map((s) => s.count),
        backgroundColor: ["#FACC15", "#22C55E", "#EF4444", "#3B82F6"],
      },
    ],
  };

  const barData = {
    labels: skillMatch.map((s) => s.skill),
    datasets: [
      {
        label: "Jobs Requiring Skill",
        data: skillMatch.map((s) => s.totalJobs),
        backgroundColor: "#EAB30855",
      },
      {
        label: "Jobs Matched",
        data: skillMatch.map((s) => Math.round((s.totalJobs * s.match) / 100)),
        backgroundColor: "#FACC15",
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
      legend: { position: "top" as const },
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        title: { display: true, text: "Number of Jobs" },
      },
      y: { stacked: true },
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
        <CircularProgress color="warning" />
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* Summary Cards */}
      {stats && (
        <Grid container spacing={3}>
          {[
            { label: "Total Applications", value: stats.application.length },
            { label: "Interviews Scheduled", value: stats.interview.length },
            { label: "Offers Received", value: offersReceived },
          ].map((item, idx) => (
            <Grid key={idx} size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  background: "rgba(250, 204, 21, 0.08)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Charts Section */}
      <Grid container spacing={3} mt={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Applications Over Time
              </Typography>
              <Line data={lineData} />
              <Typography variant="body2" color="text.secondary" mt={1}>
                Track how your job applications have trended month over month.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Application Status Breakdown
              </Typography>
              <Pie data={pieData} />
              <Typography variant="body2" color="text.secondary" mt={1}>
                See how many applications are pending, shortlisted, or hired.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Skill Match Section */}
      <Grid container spacing={3} mt={3}>
        <Grid size={{ xs: 6 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skill Match Insights
              </Typography>
              <Bar data={barData} options={barOptions} />
              <Typography variant="body2" color="text.secondary" mt={1}>
                This compares your skills with the current job market demands.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Upcoming Interviews */}
      <Grid container spacing={3} mt={3}>
        <Grid size={{ xs: 6 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Interviews
              </Typography>
              <List>
                {interviews.length > 0 ? (
                  interviews.map((i) => (
                    <div key={i.id}>
                      <ListItem>
                        <ListItemText
                          primary={`${i?.application?.job?.title} — ${i?.interviewer?.companyProfile?.companyName}`}
                          secondary={new Date(i.scheduledAt).toLocaleString()}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))
                ) : (
                  <Typography color="text.secondary" mt={2}>
                    No upcoming interviews scheduled.
                  </Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateDashboardAnalytics;
