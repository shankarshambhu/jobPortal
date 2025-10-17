// // // import { useEffect, useState } from "react";
// // // import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
// // // import { getAllJobs } from "../../services/job";
// // // import { getAllApplications } from "../../services/application";
// // // import {
// // //   PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
// // //   BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend
// // // } from "recharts";

// // // function CompanyDashboard() {
// // //   const [jobs, setJobs] = useState<any[]>([]);
// // //   const [applications, setApplications] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6E6E"];

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const jobsRes = await getAllJobs();
// // //         if (jobsRes.data.success) setJobs(jobsRes.data.jobs);

// // //         const appsRes = await getAllApplications();
// // //         if (appsRes.data.success) setApplications(appsRes.data.applications);
// // //       } catch (err) {
// // //         console.log(err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchData();
// // //   }, []);

// // //   if (loading) {
// // //     return (
// // //       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
// // //         <CircularProgress />
// // //       </Box>
// // //     );
// // //   }

// // //   // Basic stats
// // //   const totalJobs = jobs.length;
// // //   const totalApplications = applications.length;

// // //   // Applications by status
// // //   const statusData = [
// // //     { name: "Applied", value: applications.filter(a => a.status === "applied").length },
// // //     { name: "Shortlisted", value: applications.filter(a => a.status === "shortlisted").length },
// // //     { name: "Rejected", value: applications.filter(a => a.status === "rejected").length },
// // //     { name: "Hired", value: applications.filter(a => a.status === "hired").length },
// // //     { name: "Scheduled", value: applications.filter(a => a.status === "scheduled").length },
// // //   ];

// // //   // Applications per Job
// // //   const applicationsPerJob = jobs.map(job => ({
// // //     name: job.title,
// // //     applicants: applications.filter(a => a.job.id === job.id).length
// // //   }));

// // //   // Skills Analysis
// // //   const skillCount: Record<string, number> = {};
// // //   jobs.forEach(job => {
// // //     job.skills.forEach((skill: string) => {
// // //       skillCount[skill] = (skillCount[skill] || 0) + 1;
// // //     });
// // //   });
// // //   const skillsData = Object.entries(skillCount).map(([name, value]) => ({ name, value }));

// // //   // Applications Over Time
// // //   const applicationsByMonth: Record<string, number> = {};
// // //   applications.forEach(app => {
// // //     const month = new Date(app.appliedAt).toLocaleString("default", { month: "short", year: "numeric" });
// // //     applicationsByMonth[month] = (applicationsByMonth[month] || 0) + 1;
// // //   });
// // //   const appsOverTimeData = Object.entries(applicationsByMonth)
// // //     .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
// // //     .map(([name, value]) => ({ name, value }));

// // //   return (
// // //     <Box sx={{ p: 4, minHeight: "100vh" }}>
// // //       <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
// // //         Company Dashboard
// // //       </Typography>

// // //       <Grid container spacing={3}>
// // //         {/* Total Jobs */}
// // //         <Grid size={{ xs: 6 }} >
// // //           <Card sx={{ p: 2 }}>
// // //             <CardContent>
// // //               <Typography variant="h6">Total Jobs Posted</Typography>
// // //               <Typography variant="h4" fontWeight="bold">{totalJobs}</Typography>
// // //             </CardContent>
// // //           </Card>
// // //         </Grid>

// // //         {/* Total Applications */}
// // //         <Grid size={{ xs: 6, md: 3 }} >
// // //           <Card sx={{ p: 2 }}>
// // //             <CardContent>
// // //               <Typography variant="h6">Total Applications</Typography>
// // //               <Typography variant="h4" fontWeight="bold">{totalApplications}</Typography>
// // //             </CardContent>
// // //           </Card>
// // //         </Grid>

// // //         {/* Applications by Status */}
// // //         <Grid size={{ xs: 12, md: 6 }}>
// // //           <Card sx={{ p: 2 }}>
// // //             <CardContent>
// // //               <Typography variant="h6" gutterBottom>Applications Status</Typography>
// // //               <ResponsiveContainer width="100%" height={200}>
// // //                 <PieChart>
// // //                   <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
// // //                     {statusData.map((__, index) => (
// // //                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// // //                     ))}
// // //                   </Pie>
// // //                   <Tooltip />
// // //                 </PieChart>
// // //               </ResponsiveContainer>
// // //             </CardContent>
// // //           </Card>
// // //         </Grid>

// // //         {/* Applications per Job */}
// // //         <Grid size={{ xs: 12, md: 6 }}>
// // //           <Card sx={{ p: 2 }}>
// // //             <CardContent>
// // //               <Typography variant="h6" gutterBottom>Applications per Job</Typography>
// // //               <ResponsiveContainer width="100%" height={250}>
// // //                 <BarChart data={applicationsPerJob} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
// // //                   <CartesianGrid strokeDasharray="3 3" />
// // //                   <XAxis dataKey="name" />
// // //                   <YAxis allowDecimals={false} />
// // //                   <Tooltip />
// // //                   <Bar dataKey="applicants" fill="#0088FE" />
// // //                 </BarChart>
// // //               </ResponsiveContainer>
// // //             </CardContent>
// // //           </Card>
// // //         </Grid>

// // //         {/* Skills Analysis */}
// // //         <Grid size={{ xs: 12, md: 6 }}>
// // //           <Card sx={{ p: 2 }}>
// // //             <CardContent>
// // //               <Typography variant="h6" gutterBottom>Skills Demand</Typography>
// // //               <ResponsiveContainer width="100%" height={250}>
// // //                 <PieChart>
// // //                   <Pie data={skillsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
// // //                     {skillsData.map((__, index) => (
// // //                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// // //                     ))}
// // //                   </Pie>
// // //                   <Tooltip />
// // //                 </PieChart>
// // //               </ResponsiveContainer>
// // //             </CardContent>
// // //           </Card>
// // //         </Grid>

// // //         {/* Applications Over Time */}
// // //         <Grid size={{ xs: 6 }}>
// // //           <Card sx={{ p: 2 }}>
// // //             <CardContent>
// // //               <Typography variant="h6" gutterBottom>Applications Over Time</Typography>
// // //               <ResponsiveContainer width="100%" height={300}>
// // //                 <LineChart data={appsOverTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
// // //                   <CartesianGrid strokeDasharray="3 3" />
// // //                   <XAxis dataKey="name" />
// // //                   <YAxis allowDecimals={false} />
// // //                   <Tooltip />
// // //                   <Legend />
// // //                   <Line type="monotone" dataKey="value" name="Applications" stroke="#FF8042" />
// // //                 </LineChart>
// // //               </ResponsiveContainer>
// // //             </CardContent>
// // //           </Card>
// // //         </Grid>
// // //       </Grid>
// // //     </Box>
// // //   );
// // // }

// // // export default CompanyDashboard;




// // import { useEffect, useState } from "react";
// // import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
// // import { getAllJobs } from "../../services/job";
// // import { getAllApplications } from "../../services/application";
// // import {
// //   PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
// //   BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend
// // } from "recharts";

// // function CompanyDashboard() {
// //   const [jobs, setJobs] = useState<any[]>([]);
// //   const [applications, setApplications] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6E6E"];

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const jobsRes = await getAllJobs();
// //         if (jobsRes.data.success) setJobs(jobsRes.data.jobs);

// //         const appsRes = await getAllApplications();
// //         if (appsRes.data.success) setApplications(appsRes.data.applications);
// //       } catch (err) {
// //         console.log(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   // Basic stats
// //   const totalJobs = jobs.length;
// //   const totalApplications = applications.length;

// //   // Applications by status
// //   const statusData = [
// //     { name: "Applied", value: applications.filter(a => a.status === "applied").length },
// //     { name: "Shortlisted", value: applications.filter(a => a.status === "shortlisted").length },
// //     { name: "Rejected", value: applications.filter(a => a.status === "rejected").length },
// //     { name: "Hired", value: applications.filter(a => a.status === "hired").length },
// //     { name: "Scheduled", value: applications.filter(a => a.status === "scheduled").length },
// //   ];

// //   // Applications per Job
// //   const applicationsPerJob = jobs.map(job => ({
// //     name: job.title,
// //     applicants: applications.filter(a => a.job.id === job.id).length
// //   }));

// //   // Skills Analysis - more informative
// //   const skillAnalysis: { name: string; jobs: number; applicants: number }[] = [];

// //   jobs.forEach(job => {
// //     job.skills.forEach((skill: string) => {
// //       let existing = skillAnalysis.find(s => s.name === skill);
// //       if (!existing) {
// //         existing = { name: skill, jobs: 0, applicants: 0 };
// //         skillAnalysis.push(existing);
// //       }
// //       existing.jobs += 1;
// //       const applicantsForJob = applications.filter(a => a.job.id === job.id).length;
// //       existing.applicants += applicantsForJob;
// //     });
// //   });

// //   // Sort by most applicants
// //   skillAnalysis.sort((a, b) => b.applicants - a.applicants);

// //   // Skills Analysis
// //   const skillsData = (() => {
// //     const count: Record<string, { applicants: number; jobs: number }> = {};

// //     // Count applicants for each skill
// //     applications.forEach(app => {
// //       app.job.skills.forEach((skill: string) => {
// //         if (!count[skill]) count[skill] = { applicants: 0, jobs: 0 };
// //         count[skill].applicants += 1;
// //       });
// //     });

// //     // Count jobs requiring each skill
// //     jobs.forEach(job => {
// //       job.skills.forEach((skill: string) => {
// //         if (!count[skill]) count[skill] = { applicants: 0, jobs: 0 };
// //         count[skill].jobs += 1;
// //       });
// //     });

// //     // Convert to array for Recharts
// //     return Object.entries(count).map(([name, data]) => ({
// //       name,
// //       value: data.applicants, // number of applicants
// //       jobs: data.jobs          // number of jobs requiring this skill
// //     }));
// //   })();


// //   // Applications Over Time
// //   const applicationsByMonth: Record<string, number> = {};
// //   applications.forEach(app => {
// //     const month = new Date(app.appliedAt).toLocaleString("default", { month: "short", year: "numeric" });
// //     applicationsByMonth[month] = (applicationsByMonth[month] || 0) + 1;
// //   });
// //   const appsOverTimeData = Object.entries(applicationsByMonth)
// //     .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
// //     .map(([name, value]) => ({ name, value }));

// //   return (
// //     <Box sx={{ p: 4, minHeight: "100vh" }}>
// //       <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
// //         Company Dashboard
// //       </Typography>

// //       <Grid container spacing={3}>
// //         {/* Total Jobs */}
// //         <Grid size={{ xs: 12, md: 4 }}>
// //           <Card sx={{ p: 2 }}>
// //             <CardContent>
// //               <Typography variant="h6">Total Jobs Posted</Typography>
// //               <Typography variant="h4" fontWeight="bold">{totalJobs}</Typography>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Total Applications */}
// //         <Grid size={{ xs: 12, md: 4 }}>
// //           <Card sx={{ p: 2 }}>
// //             <CardContent>
// //               <Typography variant="h6">Total Applications</Typography>
// //               <Typography variant="h4" fontWeight="bold">{totalApplications}</Typography>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Applications by Status */}
// //         <Grid size={{ xs: 12, md: 4 }}>
// //           <Card sx={{ p: 2 }}>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom>Applications Status</Typography>
// //               <ResponsiveContainer width="100%" height={200}>
// //                 <PieChart>
// //                   <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
// //                     {statusData.map((__, index) => (
// //                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //                     ))}
// //                   </Pie>
// //                   <Tooltip />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Applications per Job */}
// //         <Grid size={{ xs: 12, md: 6 }}>
// //           <Card sx={{ p: 2 }}>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom>Applications per Job</Typography>
// //               <ResponsiveContainer width="100%" height={250}>
// //                 <BarChart data={applicationsPerJob} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
// //                   <CartesianGrid strokeDasharray="3 3" />
// //                   <XAxis dataKey="name" />
// //                   <YAxis allowDecimals={false} />
// //                   <Tooltip />
// //                   <Bar dataKey="applicants" fill="#0088FE" />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Skills Analysis */}
// //         <Grid size={{ xs: 12, md: 6 }}>
// //           <Card sx={{ p: 2 }}>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom>Skills Demand</Typography>
// //               <ResponsiveContainer width="100%" height={250}>
// //                 <PieChart>
// //                   <Pie data={skillsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
// //                     {skillsData.map((__, index) => (
// //                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //                     ))}
// //                   </Pie>
// //                   <Tooltip
// //                     formatter={(value: any, name: any, props: any) => {
// //                       const payload = props.payload[0].payload;
// //                       return [`${value} applicants`, `${payload.jobs} jobs require "${payload.name}"`];
// //                     }}
// //                   />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Applications Over Time */}
// //         <Grid size={{ xs: 12 }}>
// //           <Card sx={{ p: 2 }}>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom>Applications Over Time</Typography>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <LineChart data={appsOverTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
// //                   <CartesianGrid strokeDasharray="3 3" />
// //                   <XAxis dataKey="name" />
// //                   <YAxis allowDecimals={false} />
// //                   <Tooltip />
// //                   <Legend />
// //                   <Line type="monotone" dataKey="value" name="Applications" stroke="#FF8042" />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // }

// // export default CompanyDashboard;



// import { useEffect, useState } from "react";
// import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
// import { getAllJobs } from "../../services/job";
// import { getAllApplications } from "../../services/application";
// import {
//   PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend
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

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6E6E"];

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

//   // Skills Analysis - more informative
//   const skillsData = (() => {
//     const count: Record<string, { applicants: number; jobs: number }> = {};

//     // Count applicants for each skill
//     applications.forEach(app => {
//       app.job.skills.forEach(skill => {
//         if (!count[skill]) count[skill] = { applicants: 0, jobs: 0 };
//         count[skill].applicants += 1;
//       });
//     });

//     // Count jobs requiring each skill
//     jobs.forEach(job => {
//       job.skills.forEach(skill => {
//         if (!count[skill]) count[skill] = { applicants: 0, jobs: 0 };
//         count[skill].jobs += 1;
//       });
//     });

//     return Object.entries(count).map(([name, data]) => ({
//       name,
//       value: data.applicants, // number of applicants
//       jobs: data.jobs          // number of jobs requiring this skill
//     }));
//   })();

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
//                 <PieChart>
//                   <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
//                     {statusData.map((__, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
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

//         {/* Skills Analysis */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Card sx={{ p: 2 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Skills Demand</Typography>
//               <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                   <Pie
//                     data={skillsData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={70}
//                     label={({ name, value }) => `${name}: ${value} apps`}
//                   >
//                     {skillsData.map((__, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value: any, __: any, props: any) => {
//                       const payload = props?.payload?.[0]?.payload;
//                       if (!payload) return [`${value} applicants`, `0 jobs`];
//                       return [`${value} applicants`, `${payload.jobs} jobs require "${payload.name}"`];
//                     }}
//                   />
//                 </PieChart>
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
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
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
  Line
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
  const totalJobs = jobs.length;
  const totalApplications = applications.length;

  // Applications by status
  const statusData = [
    { name: "Applied", value: applications.filter(a => a.status === "applied").length },
    { name: "Shortlisted", value: applications.filter(a => a.status === "shortlisted").length },
    { name: "Rejected", value: applications.filter(a => a.status === "rejected").length },
    { name: "Hired", value: applications.filter(a => a.status === "hired").length },
    { name: "Scheduled", value: applications.filter(a => a.status === "scheduled").length },
  ];

  // Applications per Job
  const applicationsPerJob = jobs.map(job => ({
    name: job.title,
    applicants: applications.filter(a => a.job.id === job.id).length
  }));

  // Skills Analysis (Stacked Bar: Jobs vs Applicants)
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
    skillsData.push({ name: skill, jobs: skillMap[skill].jobs, applicants: skillMap[skill].applicants });
  }

  // Applications Over Time
  const applicationsByMonth: Record<string, number> = {};
  applications.forEach(app => {
    const month = new Date(app.appliedAt).toLocaleString("default", { month: "short", year: "numeric" });
    applicationsByMonth[month] = (applicationsByMonth[month] || 0) + 1;
  });
  const appsOverTimeData = Object.entries(applicationsByMonth)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([name, value]) => ({ name, value }));

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Company Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Jobs */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Jobs Posted</Typography>
              <Typography variant="h4" fontWeight="bold">{totalJobs}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Applications */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Applications</Typography>
              <Typography variant="h4" fontWeight="bold">{totalApplications}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Applications by Status */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Applications Status</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Applications per Job */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Applications per Job</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={applicationsPerJob} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="applicants" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills Demand */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Skills Demand (Jobs vs Applicants)</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={skillsData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="jobs" name="Jobs" fill="#00C49F" />
                  <Bar dataKey="applicants" name="Applicants" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Applications Over Time */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Applications Over Time</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={appsOverTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" name="Applications" stroke="#FF8042" />
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

