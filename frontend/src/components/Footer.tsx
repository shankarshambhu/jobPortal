
// // import {
// //     Box,
// //     Container,
// //     Typography,
// //     Link,
// //     Grid,
// //     IconButton,
// //     useTheme
// // } from '@mui/material';
// // import {
// //     Facebook,
// //     Twitter,
// //     LinkedIn,
// //     Instagram,
// //     Email
// // } from '@mui/icons-material';
// // import { useAuth } from '../context/AuthContext';

// // const Footer = () => {
// //     const theme = useTheme();
// //     const { user } = useAuth(); // ✅ get user role from AuthContext
// //     const role = user?.role;

// //     return (
// //         <Box
// //             component="footer"
// //             sx={{
// //                 backgroundColor: theme.palette.background.paper,
// //                 borderTop: `1px solid ${theme.palette.divider}`,
// //                 py: 6,
// //                 mt: 8
// //             }}
// //         >
// //             <Container maxWidth="lg">
// //                 <Grid container spacing={4}>
// //                     {/* Company Info */}
// //                     <Grid size={{ xs: 12, md: 4 }}>
// //                         <Typography
// //                             variant="h5"
// //                             fontWeight="bold"
// //                             sx={{
// //                                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, #FACC15)`,
// //                                 WebkitBackgroundClip: 'text',
// //                                 WebkitTextFillColor: 'transparent',
// //                                 mb: 2
// //                             }}
// //                         >
// //                             JobPortal
// //                         </Typography>
// //                         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
// //                             Connecting talented professionals with amazing opportunities.
// //                             Your career journey starts here.
// //                         </Typography>
// //                         <Box display="flex" gap={1}>
// //                             <IconButton size="small"><Facebook /></IconButton>
// //                             <IconButton size="small"><Twitter /></IconButton>
// //                             <IconButton size="small"><LinkedIn /></IconButton>
// //                             <IconButton size="small"><Instagram /></IconButton>
// //                             <IconButton size="small"><Email /></IconButton>
// //                         </Box>
// //                     </Grid>

// //                     {/* Quick Links — role based */}
// //                     <Grid size={{ xs: 12, md: 2 }}>
// //                         <Typography variant="h6" gutterBottom>
// //                             {role === 'company' ? 'For Employers' : 'For Job Seekers'}
// //                         </Typography>

// //                         {role === 'candidate' && (
// //                             <>
// //                                 <Link href="/candidate/jobs" color="text.secondary" display="block" sx={{ mb: 1 }}>
// //                                     Browse Jobs
// //                                 </Link>
// //                                 <Link href="/companies" color="text.secondary" display="block" sx={{ mb: 1 }}>
// //                                     Companies
// //                                 </Link>
// //                                 <Link href="/candidate/dashboard" color="text.secondary" display="block" sx={{ mb: 1 }}>
// //                                     Dashboard
// //                                 </Link>
// //                             </>
// //                         )}

// //                         {role === 'company' && (
// //                             <>
// //                                 <Link href="/company/post-job" color="text.secondary" display="block" sx={{ mb: 1 }}>
// //                                     Post a Job
// //                                 </Link>
// //                                 <Link href="/company/applications" color="text.secondary" display="block" sx={{ mb: 1 }}>
// //                                     View Applications
// //                                 </Link>
// //                                 <Link href="/company/dashboard" color="text.secondary" display="block" sx={{ mb: 1 }}>
// //                                     Dashboard
// //                                 </Link>
// //                             </>
// //                         )}

// //                         {!role && (
// //                             <>
// //                                 <Link href="/jobs" color="text.secondary" display="block" sx={{ mb: 1 }}>
// //                                     Explore Jobs
// //                                 </Link>
// //                                 <Link href="/companies" color="text.secondary" display="block" sx={{ mb: 1 }}>
// //                                     Companies
// //                                 </Link>
// //                                 <Link href="/login" color="text.secondary" display="block" sx={{ mb: 1 }}>
// //                                     Login / Signup
// //                                 </Link>
// //                             </>
// //                         )}
// //                     </Grid>

// //                     {/* Resources */}
// //                     <Grid size={{ xs: 12, md: 2 }}>
// //                         <Typography variant="h6" gutterBottom>
// //                             Resources
// //                         </Typography>
// //                         <Link href="/blog" color="text.secondary" display="block" sx={{ mb: 1 }}>
// //                             Career Blog
// //                         </Link>
// //                         <Link href="/resume-tips" color="text.secondary" display="block" sx={{ mb: 1 }}>
// //                             Resume Tips
// //                         </Link>
// //                         <Link href="/interview-prep" color="text.secondary" display="block" sx={{ mb: 1 }}>
// //                             Interview Prep
// //                         </Link>
// //                     </Grid>

// //                     {/* Support */}
// //                     <Grid size={{ xs: 12, md: 4 }}>
// //                         <Typography variant="h6" gutterBottom>
// //                             Support
// //                         </Typography>
// //                         <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
// //                             Email: support@jobportal.com
// //                         </Typography>
// //                         <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
// //                             Phone: +1 (555) 123-4567
// //                         </Typography>
// //                         <Typography variant="body2" color="text.secondary">
// //                             Available 24/7 for your career needs
// //                         </Typography>
// //                     </Grid>
// //                 </Grid>

// //                 {/* Copyright */}
// //                 <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 3, mt: 3 }}>
// //                     <Typography variant="body2" color="text.secondary" align="center">
// //                         © {new Date().getFullYear()} JobPortal. All rights reserved.
// //                     </Typography>
// //                 </Box>
// //             </Container>
// //         </Box>
// //     );
// // };

// // export default Footer;







// import {
//     Box,
//     Container,
//     Typography,
//     Link,
//     Grid,
//     IconButton,
//     useTheme,
//     Button,
//     TextField,
//     Stack,
//     Divider,
//     alpha
// } from '@mui/material';
// import {
//     Facebook,
//     Twitter,
//     LinkedIn,
//     Instagram,
//     Email,
//     LocationOn,
//     Phone,
//     Send,
//     RocketLaunch,
//     TrendingUp,
//     Groups,
//     Security
// } from '@mui/icons-material';
// import { useAuth } from '../context/AuthContext';

// const Footer = () => {
//     const theme = useTheme();
//     const { user } = useAuth();
//     const role = user?.role;

//     const socialLinks = [
//         { icon: <Facebook />, color: "#1877F2", label: "Facebook" },
//         { icon: <Twitter />, color: "#1DA1F2", label: "Twitter" },
//         { icon: <LinkedIn />, color: "#0A66C2", label: "LinkedIn" },
//         { icon: <Instagram />, color: "#E4405F", label: "Instagram" },
//         { icon: <Email />, color: "#EA4335", label: "Email" },
//     ];

//     const features = [
//         { icon: <RocketLaunch />, text: "Fast Hiring Process" },
//         { icon: <TrendingUp />, text: "Career Growth" },
//         { icon: <Groups />, text: "Top Companies" },
//         { icon: <Security />, text: "Secure & Private" },
//     ];

//     return (
//         <Box
//             component="footer"
//             sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
//                 borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 py: 8,
//                 mt: 12,
//                 position: 'relative',
//                 overflow: 'hidden',
//                 '&::before': {
//                     content: '""',
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     height: '4px',
//                     background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                 }
//             }}
//         >
//             {/* Features Banner */}
//             <Box sx={{
//                 backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                 py: 3,
//                 mb: 6,
//                 borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}>
//                 <Container maxWidth="lg">
//                     <Grid container spacing={3} alignItems="center">
//                         {features.map((feature, index) => (
//                             <Grid size={{ xs: 12, md: 3 }} key={index}>
//                                 <Box display="flex" alignItems="center" gap={2}>
//                                     <Box
//                                         sx={{
//                                             p: 1,
//                                             borderRadius: 2,
//                                             backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                                             color: theme.palette.primary.main,
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                         }}
//                                     >
//                                         {feature.icon}
//                                     </Box>
//                                     <Typography
//                                         variant="body2"
//                                         fontWeight="600"
//                                         color="text.primary"
//                                     >
//                                         {feature.text}
//                                     </Typography>
//                                 </Box>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Container>
//             </Box>

//             <Container maxWidth="lg">
//                 <Grid container spacing={6}>
//                     {/* Company Info */}
//                     <Grid size={{ xs: 12, md: 4 }}>
//                         <Box display="flex" alignItems="center" gap={2} mb={3}>
//                             <Typography
//                                 variant="h4"
//                                 fontWeight="bold"
//                                 sx={{
//                                     background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                                     WebkitBackgroundClip: 'text',
//                                     WebkitTextFillColor: 'transparent',
//                                 }}
//                             >
//                                 JobPortal
//                             </Typography>
//                             <Box
//                                 sx={{
//                                     px: 1.5,
//                                     py: 0.5,
//                                     borderRadius: 2,
//                                     background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                                     color: 'white',
//                                     fontSize: '0.7rem',
//                                     fontWeight: 'bold',
//                                 }}
//                             >
//                                 PRO
//                             </Box>
//                         </Box>
//                         <Typography
//                             variant="body1"
//                             color="text.secondary"
//                             sx={{ mb: 3, lineHeight: 1.6 }}
//                         >
//                             Connecting exceptional talent with world-class opportunities.
//                             Your dream career is just a click away.
//                         </Typography>

//                         {/* Newsletter Subscription */}
//                         <Box sx={{ mb: 3 }}>
//                             <Typography variant="subtitle1" fontWeight="600" gutterBottom>
//                                 Stay Updated
//                             </Typography>
//                             <Stack direction="row" spacing={1}>
//                                 <TextField
//                                     placeholder="Enter your email"
//                                     size="small"
//                                     fullWidth
//                                     sx={{
//                                         '& .MuiOutlinedInput-root': {
//                                             borderRadius: 2,
//                                             backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                                         }
//                                     }}
//                                 />
//                                 <Button
//                                     variant="contained"
//                                     endIcon={<Send />}
//                                     sx={{
//                                         borderRadius: 2,
//                                         background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                                         minWidth: 'auto',
//                                         px: 2,
//                                     }}
//                                 >
//                                     Join
//                                 </Button>
//                             </Stack>
//                         </Box>

//                         {/* Social Links */}
//                         <Box display="flex" gap={1}>
//                             {socialLinks.map((social, index) => (
//                                 <IconButton
//                                     key={index}
//                                     size="medium"
//                                     sx={{
//                                         backgroundColor: alpha(social.color, 0.1),
//                                         color: social.color,
//                                         borderRadius: 2,
//                                         '&:hover': {
//                                             backgroundColor: alpha(social.color, 0.2),
//                                             transform: 'translateY(-2px)',
//                                         },
//                                         transition: 'all 0.3s ease',
//                                     }}
//                                     aria-label={social.label}
//                                 >
//                                     {social.icon}
//                                 </IconButton>
//                             ))}
//                         </Box>
//                     </Grid>

//                     {/* Role-based Quick Links */}
//                     <Grid size={{ xs: 12, md: 2 }}>
//                         <Typography
//                             variant="h6"
//                             fontWeight="700"
//                             gutterBottom
//                             sx={{ color: theme.palette.primary.main }}
//                         >
//                             {role === 'company' ? 'For Employers' : 'For Job Seekers'}
//                         </Typography>

//                         <Stack spacing={1.5}>
//                             {role === 'candidate' && (
//                                 <>
//                                     <Link
//                                         href="/candidate/jobs"
//                                         color="text.secondary"
//                                         sx={{
//                                             textDecoration: 'none',
//                                             '&:hover': {
//                                                 color: theme.palette.primary.main,
//                                                 transform: 'translateX(4px)',
//                                             },
//                                             transition: 'all 0.3s ease',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             gap: 1,
//                                         }}
//                                     >
//                                         <Box
//                                             sx={{
//                                                 width: 4,
//                                                 height: 4,
//                                                 borderRadius: '50%',
//                                                 backgroundColor: theme.palette.primary.main,
//                                             }}
//                                         />
//                                         Browse Jobs
//                                     </Link>
//                                     <Link
//                                         href="/companies"
//                                         color="text.secondary"
//                                         sx={{
//                                             textDecoration: 'none',
//                                             '&:hover': {
//                                                 color: theme.palette.primary.main,
//                                                 transform: 'translateX(4px)',
//                                             },
//                                             transition: 'all 0.3s ease',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             gap: 1,
//                                         }}
//                                     >
//                                         <Box
//                                             sx={{
//                                                 width: 4,
//                                                 height: 4,
//                                                 borderRadius: '50%',
//                                                 backgroundColor: theme.palette.primary.main,
//                                             }}
//                                         />
//                                         Companies
//                                     </Link>
//                                     <Link
//                                         href="/candidate/dashboard"
//                                         color="text.secondary"
//                                         sx={{
//                                             textDecoration: 'none',
//                                             '&:hover': {
//                                                 color: theme.palette.primary.main,
//                                                 transform: 'translateX(4px)',
//                                             },
//                                             transition: 'all 0.3s ease',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             gap: 1,
//                                         }}
//                                     >
//                                         <Box
//                                             sx={{
//                                                 width: 4,
//                                                 height: 4,
//                                                 borderRadius: '50%',
//                                                 backgroundColor: theme.palette.primary.main,
//                                             }}
//                                         />
//                                         Dashboard
//                                     </Link>
//                                 </>
//                             )}

//                             {role === 'company' && (
//                                 <>
//                                     <Link
//                                         href="/company/post-job"
//                                         color="text.secondary"
//                                         sx={{
//                                             textDecoration: 'none',
//                                             '&:hover': {
//                                                 color: theme.palette.primary.main,
//                                                 transform: 'translateX(4px)',
//                                             },
//                                             transition: 'all 0.3s ease',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             gap: 1,
//                                         }}
//                                     >
//                                         <Box
//                                             sx={{
//                                                 width: 4,
//                                                 height: 4,
//                                                 borderRadius: '50%',
//                                                 backgroundColor: theme.palette.primary.main,
//                                             }}
//                                         />
//                                         Post a Job
//                                     </Link>
//                                     <Link
//                                         href="/company/applications"
//                                         color="text.secondary"
//                                         sx={{
//                                             textDecoration: 'none',
//                                             '&:hover': {
//                                                 color: theme.palette.primary.main,
//                                                 transform: 'translateX(4px)',
//                                             },
//                                             transition: 'all 0.3s ease',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             gap: 1,
//                                         }}
//                                     >
//                                         <Box
//                                             sx={{
//                                                 width: 4,
//                                                 height: 4,
//                                                 borderRadius: '50%',
//                                                 backgroundColor: theme.palette.primary.main,
//                                             }}
//                                         />
//                                         View Applications
//                                     </Link>
//                                     <Link
//                                         href="/company/dashboard"
//                                         color="text.secondary"
//                                         sx={{
//                                             textDecoration: 'none',
//                                             '&:hover': {
//                                                 color: theme.palette.primary.main,
//                                                 transform: 'translateX(4px)',
//                                             },
//                                             transition: 'all 0.3s ease',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             gap: 1,
//                                         }}
//                                     >
//                                         <Box
//                                             sx={{
//                                                 width: 4,
//                                                 height: 4,
//                                                 borderRadius: '50%',
//                                                 backgroundColor: theme.palette.primary.main,
//                                             }}
//                                         />
//                                         Dashboard
//                                     </Link>
//                                 </>
//                             )}

//                             {!role && (
//                                 <>
//                                     <Link
//                                         href="/jobs"
//                                         color="text.secondary"
//                                         sx={{
//                                             textDecoration: 'none',
//                                             '&:hover': {
//                                                 color: theme.palette.primary.main,
//                                                 transform: 'translateX(4px)',
//                                             },
//                                             transition: 'all 0.3s ease',
//                                         }}
//                                     >
//                                         Explore Jobs
//                                     </Link>
//                                     <Link
//                                         href="/companies"
//                                         color="text.secondary"
//                                         sx={{
//                                             textDecoration: 'none',
//                                             '&:hover': {
//                                                 color: theme.palette.primary.main,
//                                                 transform: 'translateX(4px)',
//                                             },
//                                             transition: 'all 0.3s ease',
//                                         }}
//                                     >
//                                         Companies
//                                     </Link>
//                                     <Link
//                                         href="/login"
//                                         color="text.secondary"
//                                         sx={{
//                                             textDecoration: 'none',
//                                             '&:hover': {
//                                                 color: theme.palette.primary.main,
//                                                 transform: 'translateX(4px)',
//                                             },
//                                             transition: 'all 0.3s ease',
//                                         }}
//                                     >
//                                         Login / Signup
//                                     </Link>
//                                 </>
//                             )}
//                         </Stack>
//                     </Grid>

//                     {/* Resources */}
//                     <Grid size={{ xs: 12, md: 2 }}>
//                         <Typography
//                             variant="h6"
//                             fontWeight="700"
//                             gutterBottom
//                             sx={{ color: theme.palette.primary.main }}
//                         >
//                             Resources
//                         </Typography>
//                         <Stack spacing={1.5}>
//                             <Link
//                                 href="/blog"
//                                 color="text.secondary"
//                                 sx={{
//                                     textDecoration: 'none',
//                                     '&:hover': {
//                                         color: theme.palette.primary.main,
//                                         transform: 'translateX(4px)',
//                                     },
//                                     transition: 'all 0.3s ease',
//                                 }}
//                             >
//                                 Career Blog
//                             </Link>
//                             <Link
//                                 href="/resume-tips"
//                                 color="text.secondary"
//                                 sx={{
//                                     textDecoration: 'none',
//                                     '&:hover': {
//                                         color: theme.palette.primary.main,
//                                         transform: 'translateX(4px)',
//                                     },
//                                     transition: 'all 0.3s ease',
//                                 }}
//                             >
//                                 Resume Tips
//                             </Link>
//                             <Link
//                                 href="/interview-prep"
//                                 color="text.secondary"
//                                 sx={{
//                                     textDecoration: 'none',
//                                     '&:hover': {
//                                         color: theme.palette.primary.main,
//                                         transform: 'translateX(4px)',
//                                     },
//                                     transition: 'all 0.3s ease',
//                                 }}
//                             >
//                                 Interview Prep
//                             </Link>
//                             <Link
//                                 href="/salary-guide"
//                                 color="text.secondary"
//                                 sx={{
//                                     textDecoration: 'none',
//                                     '&:hover': {
//                                         color: theme.palette.primary.main,
//                                         transform: 'translateX(4px)',
//                                     },
//                                     transition: 'all 0.3s ease',
//                                 }}
//                             >
//                                 Salary Guide
//                             </Link>
//                         </Stack>
//                     </Grid>

//                     {/* Support & Contact */}
//                     <Grid size={{ xs: 12, md: 4 }}>
//                         <Typography
//                             variant="h6"
//                             fontWeight="700"
//                             gutterBottom
//                             sx={{ color: theme.palette.primary.main }}
//                         >
//                             Get In Touch
//                         </Typography>

//                         <Stack spacing={2}>
//                             <Box display="flex" alignItems="center" gap={2}>
//                                 <Box
//                                     sx={{
//                                         p: 1,
//                                         borderRadius: 2,
//                                         backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                                         color: theme.palette.primary.main,
//                                         display: 'flex',
//                                     }}
//                                 >
//                                     <Email fontSize="small" />
//                                 </Box>
//                                 <Box>
//                                     <Typography variant="subtitle2" fontWeight="600">
//                                         Email Support
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         support@jobportal.com
//                                     </Typography>
//                                 </Box>
//                             </Box>

//                             <Box display="flex" alignItems="center" gap={2}>
//                                 <Box
//                                     sx={{
//                                         p: 1,
//                                         borderRadius: 2,
//                                         backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                                         color: theme.palette.primary.main,
//                                         display: 'flex',
//                                     }}
//                                 >
//                                     <Phone fontSize="small" />
//                                 </Box>
//                                 <Box>
//                                     <Typography variant="subtitle2" fontWeight="600">
//                                         Call Us
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         +1 (555) 123-4567
//                                     </Typography>
//                                 </Box>
//                             </Box>

//                             <Box display="flex" alignItems="center" gap={2}>
//                                 <Box
//                                     sx={{
//                                         p: 1,
//                                         borderRadius: 2,
//                                         backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                                         color: theme.palette.primary.main,
//                                         display: 'flex',
//                                     }}
//                                 >
//                                     <LocationOn fontSize="small" />
//                                 </Box>
//                                 <Box>
//                                     <Typography variant="subtitle2" fontWeight="600">
//                                         Headquarters
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         123 Career Street, Tech City
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                         </Stack>

//                         {/* Trust Badges */}
//                         <Box
//                             sx={{
//                                 mt: 3,
//                                 p: 2,
//                                 borderRadius: 3,
//                                 backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                             }}
//                         >
//                             <Typography variant="caption" fontWeight="600" color="text.primary">
//                                 🛡️ 100% Secure & Private
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary" display="block">
//                                 Your data is protected with enterprise-grade security
//                             </Typography>
//                         </Box>
//                     </Grid>
//                 </Grid>

//                 <Divider sx={{ my: 6, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//                 {/* Copyright & Bottom Links */}
//                 <Box sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     flexDirection: { xs: 'column', md: 'row' },
//                     gap: 2,
//                 }}>
//                     <Typography variant="body2" color="text.secondary">
//                         © {new Date().getFullYear()} JobPortal Pro. Empowering careers worldwide.
//                     </Typography>

//                     <Box display="flex" gap={3}>
//                         <Link href="/privacy" color="text.secondary" variant="body2" sx={{ textDecoration: 'none' }}>
//                             Privacy Policy
//                         </Link>
//                         <Link href="/terms" color="text.secondary" variant="body2" sx={{ textDecoration: 'none' }}>
//                             Terms of Service
//                         </Link>
//                         <Link href="/cookies" color="text.secondary" variant="body2" sx={{ textDecoration: 'none' }}>
//                             Cookie Policy
//                         </Link>
//                     </Box>
//                 </Box>
//             </Container>
//         </Box>
//     );
// };

// export default Footer;







import {
    Box,
    Container,
    Typography,
    Link,
    Grid,
    IconButton,
    Stack,
    Divider,
    Chip,
    alpha
} from '@mui/material';
import {
    LinkedIn,
    Twitter,
    Facebook,
    Instagram,
    YouTube,
    WorkOutline,
    BusinessCenter,
    TrendingUp,
    VerifiedUser,
    EmojiEvents,
    Speed
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
    // Simulating theme and auth context
    const theme = {
        palette: {
            primary: { main: '#2563eb' },
            secondary: { main: '#f59e0b' },
            background: { paper: '#ffffff' },
            text: { primary: '#1f2937', secondary: '#6b7280' },
            divider: '#e5e7eb'
        }
    };

     const { user } = useAuth();
    const role = user?.role;

    const stats = [
        { icon: <WorkOutline />, label: '50,000+', sublabel: 'Active Jobs' },
        { icon: <BusinessCenter />, label: '10,000+', sublabel: 'Companies' },
        { icon: <TrendingUp />, label: '1M+', sublabel: 'Job Seekers' },
        { icon: <EmojiEvents />, label: '95%', sublabel: 'Success Rate' }
    ];

    const socialLinks = [
        { icon: <LinkedIn />, href: '#', label: 'LinkedIn', color: '#0077b5' },
        { icon: <Twitter />, href: '#', label: 'Twitter', color: '#1da1f2' },
        { icon: <Facebook />, href: '#', label: 'Facebook', color: '#4267B2' },
        { icon: <Instagram />, href: '#', label: 'Instagram', color: '#E1306C' },
        { icon: <YouTube />, href: '#', label: 'YouTube', color: '#FF0000' }
    ];

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#f9fafb',
                borderTop: '1px solid #e5e7eb',
                mt: 'auto'
            }}
        >
            {/* Stats Bar */}
            <Box
                sx={{
                    // backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    py: 4
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        {stats.map((stat, index) => (
                            <Grid size={{ xs: 6, md: 3 }} key={index}>
                                <Stack alignItems="center" spacing={1}>
                                    <Box
                                        sx={{
                                            backgroundColor: alpha('#ffffff', 0.2),
                                            borderRadius: '50%',
                                            p: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {stat.icon}
                                    </Box>
                                    <Typography variant="h5" fontWeight="700">
                                        {stat.label}
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        {stat.sublabel}
                                    </Typography>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Main Footer Content */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={4}>
                    {/* Brand Section */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography
                            variant="h5"
                            fontWeight="800"
                            sx={{
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}
                        >
                            JobPortal
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 3, lineHeight: 1.8 }}
                        >
                            Your career starts here. Connect with top employers and discover
                            opportunities that match your skills and ambitions.
                        </Typography>

                        {/* Trust Indicators */}
                        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                            <Chip
                                icon={<VerifiedUser sx={{ fontSize: 16 }} />}
                                label="Verified Jobs"
                                size="small"
                                sx={{
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    fontWeight: 600
                                }}
                            />
                            <Chip
                                icon={<Speed sx={{ fontSize: 16 }} />}
                                label="Fast Apply"
                                size="small"
                                sx={{
                                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                                    color: theme.palette.secondary.main,
                                    fontWeight: 600
                                }}
                            />
                        </Stack>

                        {/* Social Links */}
                        <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                            Follow Us
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {socialLinks.map((social, index) => (
                                <IconButton
                                    key={index}
                                    size="small"
                                    href={social.href}
                                    sx={{
                                        backgroundColor: alpha(social.color, 0.1),
                                        color: social.color,
                                        '&:hover': {
                                            backgroundColor: social.color,
                                            color: 'white',
                                            transform: 'translateY(-3px)'
                                        },
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {social.icon}
                                </IconButton>
                            ))}
                        </Stack>
                    </Grid>

                    {/* For Job Seekers */}
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography variant="subtitle1" fontWeight="700" gutterBottom color="text.primary">
                            For Job Seekers
                        </Typography>
                        <Stack spacing={1.5}>
                            {role === 'candidate' ? (
                                <>
                                    <Link href="/candidate/jobs" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Browse Jobs
                                    </Link>
                                    <Link href="/companies" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Companies
                                    </Link>
                                    <Link href="/candidate/dashboard" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        My Dashboard
                                    </Link>
                                    <Link href="/candidate/applications" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        My Applications
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/jobs" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Browse Jobs
                                    </Link>
                                    <Link href="/companies" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Companies
                                    </Link>
                                    <Link href="/salary-guide" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Salary Guide
                                    </Link>
                                    <Link href="/login" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </Stack>
                    </Grid>

                    {/* For Employers */}
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography variant="subtitle1" fontWeight="700" gutterBottom color="text.primary">
                            For Employers
                        </Typography>
                        <Stack spacing={1.5}>
                            {role === 'company' ? (
                                <>
                                    <Link href="/company/post-job" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Post a Job
                                    </Link>
                                    <Link href="/company/applications" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Applications
                                    </Link>
                                    <Link href="/company/dashboard" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Dashboard
                                    </Link>
                                    <Link href="/company/analytics" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Analytics
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/employers" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Employer Overview
                                    </Link>
                                    <Link href="/post-job" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Post a Job
                                    </Link>
                                    <Link href="/pricing" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Pricing
                                    </Link>
                                    <Link href="/employer-login" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                        Employer Login
                                    </Link>
                                </>
                            )}
                        </Stack>
                    </Grid>

                    {/* Resources */}
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography variant="subtitle1" fontWeight="700" gutterBottom color="text.primary">
                            Resources
                        </Typography>
                        <Stack spacing={1.5}>
                            <Link href="/blog" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                Career Blog
                            </Link>
                            <Link href="/resume-tips" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                Resume Tips
                            </Link>
                            <Link href="/interview-prep" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                Interview Prep
                            </Link>
                            <Link href="/career-advice" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                Career Advice
                            </Link>
                        </Stack>
                    </Grid>

                    {/* Company */}
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography variant="subtitle1" fontWeight="700" gutterBottom color="text.primary">
                            Company
                        </Typography>
                        <Stack spacing={1.5}>
                            <Link href="/about" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                About Us
                            </Link>
                            <Link href="/contact" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                Contact
                            </Link>
                            <Link href="/faq" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                FAQ
                            </Link>
                            <Link href="/support" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                                Support
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>

            <Divider />

            {/* Bottom Bar */}
            <Container maxWidth="lg">
                <Box
                    sx={{
                        py: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} JobPortal. All rights reserved.
                    </Typography>

                    <Stack direction="row" spacing={3}>
                        <Link href="/privacy" variant="body2" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                            Privacy Policy
                        </Link>
                        <Link href="/terms" variant="body2" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                            Terms of Service
                        </Link>
                        <Link href="/cookies" variant="body2" underline="none" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                            Cookies
                        </Link>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;