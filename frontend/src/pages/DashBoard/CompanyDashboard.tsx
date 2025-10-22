
// import { useEffect, useState } from "react";
// import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
// import { getAllJobs } from "../../services/job";
// import { getAllApplications } from "../../services/application";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   LineChart,
//   Line
// } from "recharts";

// // Types for Job and Application
// interface Job {
//   id: string;
//   title: string;
//   skills: string[];
// }

// interface Application {
//   id: string;
//   status: "applied" | "shortlisted" | "rejected" | "hired" | "scheduled";
//   appliedAt: string;
//   job: Job;
// }

// function CompanyDashboard() {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const jobsRes = await getAllJobs();
//         if (jobsRes.data.success) setJobs(jobsRes.data.jobs);

//         const appsRes = await getAllApplications();
//         if (appsRes.data.success) setApplications(appsRes.data.applications);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Basic stats
//   const totalJobs = jobs.length;
//   const totalApplications = applications.length;

//   // Applications by status
//   const statusData = [
//     { name: "Applied", value: applications.filter(a => a.status === "applied").length },
//     { name: "Shortlisted", value: applications.filter(a => a.status === "shortlisted").length },
//     { name: "Rejected", value: applications.filter(a => a.status === "rejected").length },
//     { name: "Hired", value: applications.filter(a => a.status === "hired").length },
//     { name: "Scheduled", value: applications.filter(a => a.status === "scheduled").length },
//   ];

//   // Applications per Job
//   const applicationsPerJob = jobs.map(job => ({
//     name: job.title,
//     applicants: applications.filter(a => a.job.id === job.id).length
//   }));

//   // Skills Analysis (Stacked Bar: Jobs vs Applicants)
//   const skillsData: { name: string; jobs: number; applicants: number }[] = [];
//   const skillMap: Record<string, { jobs: number; applicants: number }> = {};

//   jobs.forEach(job => {
//     job.skills.forEach(skill => {
//       if (!skillMap[skill]) skillMap[skill] = { jobs: 0, applicants: 0 };
//       skillMap[skill].jobs += 1;
//     });
//   });

//   applications.forEach(app => {
//     app.job.skills.forEach(skill => {
//       if (!skillMap[skill]) skillMap[skill] = { jobs: 0, applicants: 0 };
//       skillMap[skill].applicants += 1;
//     });
//   });

//   for (const skill in skillMap) {
//     skillsData.push({ name: skill, jobs: skillMap[skill].jobs, applicants: skillMap[skill].applicants });
//   }

//   // Applications Over Time
//   const applicationsByMonth: Record<string, number> = {};
//   applications.forEach(app => {
//     const month = new Date(app.appliedAt).toLocaleString("default", { month: "short", year: "numeric" });
//     applicationsByMonth[month] = (applicationsByMonth[month] || 0) + 1;
//   });
//   const appsOverTimeData = Object.entries(applicationsByMonth)
//     .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
//     .map(([name, value]) => ({ name, value }));

//   return (
//     <Box sx={{ p: 4, minHeight: "100vh" }}>
//       <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
//         Company Dashboard
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Total Jobs */}
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Card sx={{ p: 2 }}>
//             <CardContent>
//               <Typography variant="h6">Total Jobs Posted</Typography>
//               <Typography variant="h4" fontWeight="bold">{totalJobs}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Total Applications */}
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Card sx={{ p: 2 }}>
//             <CardContent>
//               <Typography variant="h6">Total Applications</Typography>
//               <Typography variant="h4" fontWeight="bold">{totalApplications}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Applications by Status */}
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Card sx={{ p: 2 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Applications Status</Typography>
//               <ResponsiveContainer width="100%" height={200}>
//                 <BarChart data={statusData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis allowDecimals={false} />
//                   <Tooltip />
//                   <Bar dataKey="value" fill="#FF8042" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Applications per Job */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Card sx={{ p: 2 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Applications per Job</Typography>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={applicationsPerJob} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis allowDecimals={false} />
//                   <Tooltip />
//                   <Bar dataKey="applicants" fill="#0088FE" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Skills Demand */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Card sx={{ p: 2 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Skills Demand (Jobs vs Applicants)</Typography>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={skillsData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis allowDecimals={false} />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="jobs" name="Jobs" fill="#00C49F" />
//                   <Bar dataKey="applicants" name="Applicants" fill="#FF8042" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Applications Over Time */}
//         <Grid size={{ xs: 12 }}>
//           <Card sx={{ p: 2 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Applications Over Time</Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={appsOverTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis allowDecimals={false} />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="value" name="Applications" stroke="#FF8042" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default CompanyDashboard;




import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  alpha,
  useTheme
} from "@mui/material";
import {
  WorkOutline,
  People,
  TrendingUp,
  CheckCircle,
} from "@mui/icons-material";
import { getAllJobs } from "../../services/job";
import { getAllApplications } from "../../services/application";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Types for Job and Application
interface Job {
  id: string;
  title: string;
  skills: string[];
}

interface Application {
  id: string;
  status: "applied" | "shortlisted" | "rejected" | "hired" | "scheduled";
  appliedAt: string;
  job: Job;
}

function CompanyDashboard() {
  const theme = useTheme();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsRes = await getAllJobs();
        if (jobsRes.data.success) setJobs(jobsRes.data.jobs);

        const appsRes = await getAllApplications();
        if (appsRes.data.success) setApplications(appsRes.data.applications);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  // Basic stats
  // const totalJobs = jobs.length;
  const totalApplications = applications.length;
  const activeJobs = jobs.length; // Assuming all jobs are active for simplicity
  const conversionRate = totalApplications > 0
    ? ((applications.filter(a => a.status === "hired").length / totalApplications) * 100).toFixed(1)
    : "0";

  // Applications by status for pie chart
  const statusData = [
    { name: "Applied", value: applications.filter(a => a.status === "applied").length, color: theme.palette.info.main },
    { name: "Shortlisted", value: applications.filter(a => a.status === "shortlisted").length, color: theme.palette.warning.main },
    { name: "Scheduled", value: applications.filter(a => a.status === "scheduled").length, color: theme.palette.secondary.main },
    { name: "Hired", value: applications.filter(a => a.status === "hired").length, color: theme.palette.success.main },
    { name: "Rejected", value: applications.filter(a => a.status === "rejected").length, color: theme.palette.error.main },
  ];

  // Applications per Job (top 5)
  const applicationsPerJob = jobs
    .map(job => ({
      name: job.title.length > 15 ? job.title.substring(0, 15) + "..." : job.title,
      applicants: applications.filter(a => a.job.id === job.id).length,
      fullName: job.title
    }))
    .sort((a, b) => b.applicants - a.applicants)
    .slice(0, 5);

  // Skills Analysis (Top 6 skills)
  const skillsData: { name: string; jobs: number; applicants: number }[] = [];
  const skillMap: Record<string, { jobs: number; applicants: number }> = {};

  jobs.forEach(job => {
    job.skills.forEach(skill => {
      if (!skillMap[skill]) skillMap[skill] = { jobs: 0, applicants: 0 };
      skillMap[skill].jobs += 1;
    });
  });

  applications.forEach(app => {
    app.job.skills.forEach(skill => {
      if (!skillMap[skill]) skillMap[skill] = { jobs: 0, applicants: 0 };
      skillMap[skill].applicants += 1;
    });
  });

  for (const skill in skillMap) {
    skillsData.push({
      name: skill.length > 10 ? skill.substring(0, 10) + "..." : skill,
      jobs: skillMap[skill].jobs,
      applicants: skillMap[skill].applicants
    });
  }

  const topSkills = skillsData
    .sort((a, b) => b.jobs - a.jobs)
    .slice(0, 6);

  // Applications Over Time (Last 6 months)
  const applicationsByMonth: Record<string, number> = {};
  applications.forEach(app => {
    const month = new Date(app.appliedAt).toLocaleString("default", { month: "short", year: "numeric" });
    applicationsByMonth[month] = (applicationsByMonth[month] || 0) + 1;
  });

  const appsOverTimeData = Object.entries(applicationsByMonth)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-6)
    .map(([name, value]) => ({ name, value }));

  // Status icons for quick stats
  // const statusIcons = {
  //   applied: <People sx={{ color: theme.palette.info.main }} />,
  //   shortlisted: <Schedule sx={{ color: theme.palette.warning.main }} />,
  //   scheduled: <TrendingUp sx={{ color: theme.palette.secondary.main }} />,
  //   hired: <CheckCircle sx={{ color: theme.palette.success.main }} />,
  //   rejected: <Cancel sx={{ color: theme.palette.error.main }} />,
  // };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      py: 3,
      px: { xs: 2, md: 3 }
    }}>
      {/* Header Section */}
      <Box mb={3}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
        >
          Company Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of your hiring activities and performance
        </Typography>
      </Box>

      {/* Summary Cards - Compact */}
      <Grid container spacing={2} mb={3}>
        {[
          {
            label: "Active Jobs",
            value: activeJobs,
            icon: <WorkOutline sx={{ fontSize: 24 }} />,
            color: theme.palette.primary.main
          },
          {
            label: "Total Applications",
            value: totalApplications,
            icon: <People sx={{ fontSize: 24 }} />,
            color: theme.palette.info.main
          },
          {
            label: "Conversion Rate",
            value: `${conversionRate}%`,
            icon: <TrendingUp sx={{ fontSize: 24 }} />,
            color: theme.palette.success.main
          },
          {
            label: "Hired Candidates",
            value: applications.filter(a => a.status === "hired").length,
            icon: <CheckCircle sx={{ fontSize: 24 }} />,
            color: theme.palette.success.main
          },
        ].map((item, idx) => (
          <Grid size={{ xs: 6, sm: 3 }} key={idx}>
            <Card
              sx={{
                background: "white",
                borderRadius: 2,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                },
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1.5,
                      backgroundColor: alpha(item.color, 0.1),
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </Box>
                </Box>
                <Typography variant="h5" fontWeight="bold" color="text.primary" mb={0.5}>
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                  {item.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section - Compact */}
      <Grid container spacing={2}>
        {/* Application Status Distribution */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="600" fontSize="1rem" gutterBottom>
                Application Status
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Applications per Job */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="600" fontSize="1rem" gutterBottom>
                Top Jobs by Applications
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={applicationsPerJob} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={40}
                    fontSize={11}
                  />
                  <YAxis allowDecimals={false} fontSize={11} />
                  <Tooltip
                    formatter={(value) => [value, "Applicants"]}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return payload[0].payload.fullName;
                      }
                      return label;
                    }}
                  />
                  <Bar
                    dataKey="applicants"
                    fill={theme.palette.primary.main}
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills Demand */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="600" fontSize="1rem" gutterBottom>
                Top Skills Demand
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={topSkills} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={40}
                    fontSize={11}
                  />
                  <YAxis allowDecimals={false} fontSize={11} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar
                    dataKey="jobs"
                    name="Jobs Requiring"
                    fill={theme.palette.success.main}
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="applicants"
                    name="Applicants With"
                    fill={theme.palette.info.main}
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Applications Over Time */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="600" fontSize="1rem" gutterBottom>
                Applications Trend (Last 6 Months)
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={appsOverTimeData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis allowDecimals={false} fontSize={11} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Applications"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                    dot={{ fill: theme.palette.primary.main, strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: theme.palette.primary.main }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CompanyDashboard;