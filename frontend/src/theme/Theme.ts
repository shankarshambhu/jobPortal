// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//     palette: {
//         mode: "light",
//         primary: {
//             main: "#2563EB", // Bright Professional Blue
//             light: "#3B82F6",
//             dark: "#1E40AF",
//             contrastText: "#FFFFFF",
//         },
//         secondary: {
//             main: "#7C3AED", // Vibrant Purple
//             light: "#8B5CF6",
//             dark: "#6D28D9",
//             contrastText: "#FFFFFF",
//         },
//         background: {
//             default: "#F8FAFC", // Clean Light Gray
//             paper: "#FFFFFF", // Pure White
//         },
//         text: {
//             primary: "#0F172A",
//             secondary: "#475569",
//             disabled: "#94A3B8",
//         },
//         grey: {
//             50: "#F8FAFC",
//             100: "#F1F5F9",
//             200: "#E2E8F0",
//             300: "#CBD5E1",
//             400: "#94A3B8",
//             500: "#64748B",
//             600: "#475569",
//             700: "#334155",
//             800: "#1E293B",
//             900: "#0F172A",
//         },
//         success: {
//             main: "#10B981",
//             light: "#34D399",
//             dark: "#059669",
//             contrastText: "#FFFFFF",
//         },
//         warning: {
//             main: "#F59E0B",
//             light: "#FBBF24",
//             dark: "#D97706",
//             contrastText: "#FFFFFF",
//         },
//         error: {
//             main: "#EF4444",
//             light: "#F87171",
//             dark: "#DC2626",
//             contrastText: "#FFFFFF",
//         },
//         info: {
//             main: "#06B6D4",
//             light: "#22D3EE",
//             dark: "#0891B2",
//             contrastText: "#FFFFFF",
//         },
//         divider: "#E2E8F0",
//     },
//     typography: {
//         fontFamily: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif`,
//         h1: {
//             fontWeight: 800,
//             fontSize: "3rem",
//             lineHeight: 1.1,
//             color: "#0F172A",
//             letterSpacing: "-0.03em",
//             background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             backgroundClip: "text",
//         },
//         h2: {
//             fontWeight: 700,
//             fontSize: "2.5rem",
//             lineHeight: 1.2,
//             color: "#0F172A",
//             letterSpacing: "-0.02em",
//         },
//         h3: {
//             fontWeight: 700,
//             fontSize: "2rem",
//             lineHeight: 1.3,
//             color: "#0F172A",
//             letterSpacing: "-0.01em",
//         },
//         h4: {
//             fontWeight: 600,
//             fontSize: "1.5rem",
//             lineHeight: 1.4,
//             color: "#1E293B",
//         },
//         h5: {
//             fontWeight: 600,
//             fontSize: "1.25rem",
//             lineHeight: 1.5,
//             color: "#1E293B",
//         },
//         h6: {
//             fontWeight: 600,
//             fontSize: "1.125rem",
//             lineHeight: 1.5,
//             color: "#334155",
//         },
//         body1: {
//             fontSize: "1rem",
//             lineHeight: 1.7,
//             color: "#475569",
//         },
//         body2: {
//             fontSize: "0.875rem",
//             lineHeight: 1.6,
//             color: "#64748B",
//         },
//         button: {
//             textTransform: "none",
//             fontWeight: 600,
//             fontSize: "0.9375rem",
//             letterSpacing: "0.02em",
//         },
//         caption: {
//             fontSize: "0.75rem",
//             color: "#94A3B8",
//             lineHeight: 1.5,
//         },
//     },
//     shape: {
//         borderRadius: 16,
//     },
//     shadows: [
//         "none",
//         "0 1px 2px 0 rgba(37, 99, 235, 0.05)",
//         "0 1px 3px 0 rgba(37, 99, 235, 0.1), 0 1px 2px -1px rgba(37, 99, 235, 0.05)",
//         "0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -2px rgba(37, 99, 235, 0.05)",
//         "0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -4px rgba(37, 99, 235, 0.05)",
//         "0 20px 25px -5px rgba(37, 99, 235, 0.15), 0 8px 10px -6px rgba(37, 99, 235, 0.05)",
//         "0 25px 50px -12px rgba(37, 99, 235, 0.2)",
//         "0 25px 50px -12px rgba(37, 99, 235, 0.25)",
//         "0 30px 60px -12px rgba(37, 99, 235, 0.3)",
//         "0 35px 70px -12px rgba(37, 99, 235, 0.35)",
//         "0 40px 80px -12px rgba(37, 99, 235, 0.4)",
//         "0 45px 90px -12px rgba(37, 99, 235, 0.45)",
//         "0 50px 100px -12px rgba(37, 99, 235, 0.5)",
//         "0 55px 110px -12px rgba(37, 99, 235, 0.55)",
//         "0 60px 120px -12px rgba(37, 99, 235, 0.6)",
//         "0 65px 130px -12px rgba(37, 99, 235, 0.65)",
//         "0 70px 140px -12px rgba(37, 99, 235, 0.7)",
//         "0 75px 150px -12px rgba(37, 99, 235, 0.75)",
//         "0 80px 160px -12px rgba(37, 99, 235, 0.8)",
//         "0 85px 170px -12px rgba(37, 99, 235, 0.85)",
//         "0 90px 180px -12px rgba(37, 99, 235, 0.9)",
//         "0 95px 190px -12px rgba(37, 99, 235, 0.95)",
//         "0 100px 200px -12px rgba(37, 99, 235, 1)",
//         "0 105px 210px -12px rgba(37, 99, 235, 1)",
//         "0 110px 220px -12px rgba(37, 99, 235, 1)",
//     ],
//     components: {
//         MuiCssBaseline: {
//             styleOverrides: {
//                 body: {
//                     backgroundColor: "#F8FAFC",
//                     backgroundImage: `
//                         radial-gradient(circle at 15% 15%, rgba(37, 99, 235, 0.08) 0%, transparent 50%),
//                         radial-gradient(circle at 85% 85%, rgba(124, 58, 237, 0.06) 0%, transparent 50%),
//                         radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.04) 0%, transparent 60%)
//                     `,
//                 },
//             },
//         },
//         MuiButton: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: 12,
//                     padding: "14px 36px",
//                     fontWeight: 700,
//                     boxShadow: "none",
//                     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                     fontSize: "0.9375rem",
//                     "&:hover": {
//                         transform: "translateY(-3px)",
//                     },
//                 },
//                 containedPrimary: {
//                     background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
//                     color: "#FFFFFF",
//                     boxShadow: "0 4px 20px rgba(37, 99, 235, 0.3), 0 2px 8px rgba(37, 99, 235, 0.2)",
//                     "&:hover": {
//                         background: "linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)",
//                         boxShadow: "0 12px 40px rgba(37, 99, 235, 0.4), 0 8px 20px rgba(37, 99, 235, 0.25)",
//                     },
//                 },
//                 containedSecondary: {
//                     background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
//                     color: "#FFFFFF",
//                     boxShadow: "0 4px 20px rgba(124, 58, 237, 0.3), 0 2px 8px rgba(124, 58, 237, 0.2)",
//                     "&:hover": {
//                         background: "linear-gradient(135deg, #6D28D9 0%, #5B21B6 100%)",
//                         boxShadow: "0 12px 40px rgba(124, 58, 237, 0.4), 0 8px 20px rgba(124, 58, 237, 0.25)",
//                     },
//                 },
//                 outlined: {
//                     borderWidth: "2px",
//                     borderColor: "#2563EB",
//                     color: "#2563EB",
//                     fontWeight: 700,
//                     backgroundColor: "#FFFFFF",
//                     "&:hover": {
//                         borderWidth: "2px",
//                         borderColor: "#1E40AF",
//                         backgroundColor: "#EFF6FF",
//                         transform: "translateY(-3px)",
//                         boxShadow: "0 8px 30px rgba(37, 99, 235, 0.2)",
//                     },
//                 },
//                 text: {
//                     color: "#2563EB",
//                     fontWeight: 600,
//                     "&:hover": {
//                         backgroundColor: "#EFF6FF",
//                     },
//                 },
//             },
//         },
//         MuiCard: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: 20,
//                     backgroundColor: "#FFFFFF",
//                     boxShadow: "0 4px 20px rgba(37, 99, 235, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
//                     border: "1px solid #E2E8F0",
//                     transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                     overflow: "hidden",
//                     position: "relative",
//                     "&::before": {
//                         content: '""',
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         height: "3px",
//                         background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 50%, #06B6D4 100%)",
//                         opacity: 0,
//                         transition: "opacity 0.3s ease",
//                     },
//                     "&:hover": {
//                         transform: "translateY(-8px)",
//                         boxShadow: "0 20px 50px rgba(37, 99, 235, 0.15), 0 8px 25px rgba(0, 0, 0, 0.08)",
//                         borderColor: "#CBD5E1",
//                         "&::before": {
//                             opacity: 1,
//                         },
//                     },
//                 },
//             },
//         },
//         MuiAppBar: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: "rgba(255, 255, 255, 0.8)",
//                     backdropFilter: "blur(20px) saturate(180%)",
//                     borderBottom: "1px solid #E2E8F0",
//                     boxShadow: "0 2px 20px rgba(37, 99, 235, 0.06)",
//                     color: "#0F172A",
//                 },
//             },
//         },
//         MuiTextField: {
//             styleOverrides: {
//                 root: {
//                     "& .MuiOutlinedInput-root": {
//                         borderRadius: 12,
//                         backgroundColor: "#FFFFFF",
//                         transition: "all 0.3s ease",
//                         "& .MuiOutlinedInput-notchedOutline": {
//                             borderColor: "#CBD5E1",
//                             borderWidth: "2px",
//                         },
//                         "&:hover .MuiOutlinedInput-notchedOutline": {
//                             borderColor: "#94A3B8",
//                         },
//                         "&.Mui-focused": {
//                             backgroundColor: "#FFFFFF",
//                             boxShadow: "0 0 0 4px rgba(37, 99, 235, 0.1)",
//                             "& .MuiOutlinedInput-notchedOutline": {
//                                 borderColor: "#2563EB",
//                                 borderWidth: "2px",
//                             },
//                         },
//                     },
//                     "& .MuiInputLabel-root": {
//                         color: "#64748B",
//                         fontWeight: 500,
//                     },
//                     "& .MuiInputLabel-root.Mui-focused": {
//                         color: "#2563EB",
//                         fontWeight: 600,
//                     },
//                     "& .MuiInputBase-input": {
//                         color: "#0F172A",
//                         fontSize: "0.9375rem",
//                         fontWeight: 500,
//                     },
//                 },
//             },
//         },
//         MuiPaper: {
//             styleOverrides: {
//                 root: {
//                     backgroundImage: "none",
//                     backgroundColor: "#FFFFFF",
//                 },
//                 elevation1: {
//                     boxShadow: "0 2px 12px rgba(37, 99, 235, 0.06)",
//                 },
//                 elevation2: {
//                     boxShadow: "0 4px 20px rgba(37, 99, 235, 0.08)",
//                 },
//                 elevation3: {
//                     boxShadow: "0 8px 30px rgba(37, 99, 235, 0.1)",
//                 },
//             },
//         },
//         MuiChip: {
//             styleOverrides: {
//                 root: {
//                     fontWeight: 600,
//                     borderRadius: 10,
//                     fontSize: "0.8125rem",
//                 },
//                 colorPrimary: {
//                     backgroundColor: "#DBEAFE",
//                     color: "#1E40AF",
//                     border: "1px solid #BFDBFE",
//                     "&:hover": {
//                         backgroundColor: "#BFDBFE",
//                     },
//                 },
//                 colorSecondary: {
//                     backgroundColor: "#EDE9FE",
//                     color: "#6D28D9",
//                     border: "1px solid #DDD6FE",
//                     "&:hover": {
//                         backgroundColor: "#DDD6FE",
//                     },
//                 },
//                 colorSuccess: {
//                     backgroundColor: "#D1FAE5",
//                     color: "#065F46",
//                     border: "1px solid #A7F3D0",
//                 },
//                 colorWarning: {
//                     backgroundColor: "#FEF3C7",
//                     color: "#92400E",
//                     border: "1px solid #FDE68A",
//                 },
//                 colorError: {
//                     backgroundColor: "#FEE2E2",
//                     color: "#991B1B",
//                     border: "1px solid #FECACA",
//                 },
//             },
//         },
//         MuiDivider: {
//             styleOverrides: {
//                 root: {
//                     borderColor: "#E2E8F0",
//                 },
//             },
//         },
//         MuiBadge: {
//             styleOverrides: {
//                 badge: {
//                     backgroundColor: "#EF4444",
//                     color: "#FFFFFF",
//                     fontWeight: 700,
//                     boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
//                 },
//             },
//         },
//         MuiLinearProgress: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: 8,
//                     backgroundColor: "#E2E8F0",
//                     height: 8,
//                 },
//                 bar: {
//                     borderRadius: 8,
//                     background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)",
//                 },
//             },
//         },
//         MuiSwitch: {
//             styleOverrides: {
//                 switchBase: {
//                     "&.Mui-checked": {
//                         color: "#2563EB",
//                         "& + .MuiSwitch-track": {
//                             backgroundColor: "#2563EB",
//                             opacity: 0.5,
//                         },
//                     },
//                 },
//                 track: {
//                     backgroundColor: "#CBD5E1",
//                 },
//             },
//         },
//         MuiAccordion: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: 12,
//                     border: "1px solid #E2E8F0",
//                     boxShadow: "none",
//                     "&:before": {
//                         display: "none",
//                     },
//                     "&.Mui-expanded": {
//                         margin: "16px 0",
//                         boxShadow: "0 4px 20px rgba(37, 99, 235, 0.08)",
//                     },
//                 },
//             },
//         },
//         MuiAvatar: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: "#2563EB",
//                     color: "#FFFFFF",
//                     fontWeight: 600,
//                 },
//             },
//         },
//     },
// });

// export default theme;




import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#2563EB", // Professional Blue
            light: "#3B82F6",
            dark: "#1E40AF",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#7C3AED", // Creative Purple
            light: "#8B5CF6",
            dark: "#6D28D9",
            contrastText: "#FFFFFF",
        },
        success: {
            main: "#10B981", // Success Green
            light: "#34D399",
            dark: "#059669",
            contrastText: "#FFFFFF",
        },
        warning: {
            main: "#F59E0B", // Warning Amber
            light: "#FBBF24",
            dark: "#D97706",
            contrastText: "#FFFFFF",
        },
        error: {
            main: "#EF4444", // Error Red
            light: "#F87171",
            dark: "#DC2626",
            contrastText: "#FFFFFF",
        },
        info: {
            main: "#06B6D4", // Info Cyan
            light: "#22D3EE",
            dark: "#0891B2",
            contrastText: "#FFFFFF",
        },
        background: {
            default: "#F8FAFC", // Light Gray
            paper: "#FFFFFF", // Pure White
        },
        text: {
            primary: "#0F172A", // Almost Black
            secondary: "#475569", // Dark Gray
            disabled: "#94A3B8", // Medium Gray
        },
        grey: {
            50: "#F8FAFC",
            100: "#F1F5F9",
            200: "#E2E8F0",
            300: "#CBD5E1",
            400: "#94A3B8",
            500: "#64748B",
            600: "#475569",
            700: "#334155",
            800: "#1E293B",
            900: "#0F172A",
        },
        divider: "#E2E8F0",
        // Job Portal Specific Colors
        job: {
            featured: "#FFD700", // Gold for featured jobs
            urgent: "#EF4444", // Red for urgent jobs
            remote: "#10B981", // Green for remote jobs
            new: "#3B82F6", // Blue for new listings
        },
    },
    typography: {
        fontFamily: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", sans-serif`,
        h1: {
            fontWeight: 800,
            fontSize: "3.5rem",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        },
        h2: {
            fontWeight: 700,
            fontSize: "2.75rem",
            lineHeight: 1.2,
            color: "#0F172A",
            letterSpacing: "-0.02em",
        },
        h3: {
            fontWeight: 700,
            fontSize: "2.25rem",
            lineHeight: 1.3,
            color: "#0F172A",
            letterSpacing: "-0.01em",
        },
        h4: {
            fontWeight: 600,
            fontSize: "1.75rem",
            lineHeight: 1.4,
            color: "#1E293B",
        },
        h5: {
            fontWeight: 600,
            fontSize: "1.5rem",
            lineHeight: 1.5,
            color: "#1E293B",
        },
        h6: {
            fontWeight: 600,
            fontSize: "1.25rem",
            lineHeight: 1.5,
            color: "#334155",
        },
        subtitle1: {
            fontWeight: 500,
            fontSize: "1.125rem",
            lineHeight: 1.6,
            color: "#475569",
        },
        subtitle2: {
            fontWeight: 500,
            fontSize: "1rem",
            lineHeight: 1.5,
            color: "#64748B",
        },
        body1: {
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#475569",
        },
        body2: {
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: "#64748B",
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.9375rem",
            letterSpacing: "0.02em",
        },
        caption: {
            fontSize: "0.75rem",
            color: "#94A3B8",
            lineHeight: 1.5,
            fontWeight: 500,
        },
        overline: {
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#64748B",
        },
    },
    shape: {
        borderRadius: 12,
    },
  shadows: [
    "none",
    "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
    "0 1px 3px 0 rgba(15, 23, 42, 0.1), 0 1px 2px 0 rgba(15, 23, 42, 0.06)",
    "0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06)",
    "0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)",
    "0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.15)",
    "0 30px 60px -14px rgba(15, 23, 42, 0.18)",
    "0 35px 70px -16px rgba(15, 23, 42, 0.20)",
    "0 40px 80px -18px rgba(15, 23, 42, 0.22)",
    "0 45px 90px -20px rgba(15, 23, 42, 0.25)",
    "0 50px 100px -22px rgba(15, 23, 42, 0.28)",
    "0 55px 110px -24px rgba(15, 23, 42, 0.30)",
    "0 60px 120px -26px rgba(15, 23, 42, 0.32)",
    "0 65px 130px -28px rgba(15, 23, 42, 0.35)",
    "0 70px 140px -30px rgba(15, 23, 42, 0.38)",
    "0 75px 150px -32px rgba(15, 23, 42, 0.40)",
    "0 80px 160px -34px rgba(15, 23, 42, 0.42)",
    "0 85px 170px -36px rgba(15, 23, 42, 0.45)",
    "0 90px 180px -38px rgba(15, 23, 42, 0.48)",
    "0 95px 190px -40px rgba(15, 23, 42, 0.50)",
    "0 100px 200px -42px rgba(15, 23, 42, 0.52)",
    "0 105px 210px -44px rgba(15, 23, 42, 0.55)",
    "0 110px 220px -46px rgba(15, 23, 42, 0.58)",
    "0 115px 230px -48px rgba(15, 23, 42, 0.60)"
],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#F8FAFC",
                    backgroundImage: `
                        radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 100% 100%, rgba(124, 58, 237, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.03) 0%, transparent 70%)
                    `,
                    backgroundAttachment: "fixed",
                },
                ".job-card-featured": {
                    border: "2px solid #FFD700",
                    position: "relative",
                    "&::before": {
                        content: '"⭐ Featured"',
                        position: "absolute",
                        top: "-12px",
                        right: "20px",
                        backgroundColor: "#FFD700",
                        color: "#92400E",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        zIndex: 1,
                    },
                },
                ".job-card-urgent": {
                    border: "2px solid #EF4444",
                    position: "relative",
                    "&::before": {
                        content: '"🚨 Urgent"',
                        position: "absolute",
                        top: "-12px",
                        right: "20px",
                        backgroundColor: "#EF4444",
                        color: "#FFFFFF",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        zIndex: 1,
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: "12px 32px",
                    fontWeight: 600,
                    boxShadow: "none",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontSize: "0.9375rem",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    },
                    "&:active": {
                        transform: "translateY(0)",
                    },
                },
                containedPrimary: {
                    background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
                    "&:hover": {
                        background: "linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)",
                        boxShadow: "0 8px 25px rgba(37, 99, 235, 0.5)",
                    },
                },
                containedSecondary: {
                    background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 14px rgba(124, 58, 237, 0.4)",
                    "&:hover": {
                        background: "linear-gradient(135deg, #6D28D9 0%, #5B21B6 100%)",
                        boxShadow: "0 8px 25px rgba(124, 58, 237, 0.5)",
                    },
                },
                outlined: {
                    borderWidth: "2px",
                    borderColor: "#E2E8F0",
                    color: "#475569",
                    fontWeight: 600,
                    backgroundColor: "transparent",
                    "&:hover": {
                        borderColor: "#2563EB",
                        backgroundColor: "#EFF6FF",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 15px rgba(37, 99, 235, 0.15)",
                    },
                },
                text: {
                    color: "#475569",
                    fontWeight: 500,
                    "&:hover": {
                        backgroundColor: "#F1F5F9",
                        color: "#2563EB",
                    },
                },
                sizeSmall: {
                    padding: "8px 20px",
                    fontSize: "0.875rem",
                },
                sizeLarge: {
                    padding: "16px 40px",
                    fontSize: "1rem",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 4px 20px rgba(15, 23, 42, 0.06), 0 1px 4px rgba(15, 23, 42, 0.04)",
                    border: "1px solid #F1F5F9",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06)",
                        borderColor: "#E2E8F0",
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    borderBottom: "1px solid #F1F5F9",
                    boxShadow: "0 2px 20px rgba(15, 23, 42, 0.04)",
                    color: "#0F172A",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 10,
                        backgroundColor: "#FFFFFF",
                        transition: "all 0.2s ease",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                            borderWidth: "2px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#CBD5E1",
                        },
                        "&.Mui-focused": {
                            backgroundColor: "#FFFFFF",
                            boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#2563EB",
                                borderWidth: "2px",
                            },
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#64748B",
                        fontWeight: 500,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#2563EB",
                        fontWeight: 600,
                    },
                    "& .MuiInputBase-input": {
                        color: "#0F172A",
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                        "&::placeholder": {
                            color: "#94A3B8",
                            opacity: 1,
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    backgroundColor: "#FFFFFF",
                },
                elevation1: {
                    boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                },
                elevation2: {
                    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)",
                },
                elevation3: {
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: 8,
                    fontSize: "0.8125rem",
                    height: "32px",
                    "& .MuiChip-label": {
                        padding: "0 12px",
                    },
                },
                colorPrimary: {
                    backgroundColor: "#DBEAFE",
                    color: "#1E40AF",
                    border: "1px solid #BFDBFE",
                    "&:hover": {
                        backgroundColor: "#BFDBFE",
                    },
                },
                colorSecondary: {
                    backgroundColor: "#EDE9FE",
                    color: "#6D28D9",
                    border: "1px solid #DDD6FE",
                    "&:hover": {
                        backgroundColor: "#DDD6FE",
                    },
                },
                colorSuccess: {
                    backgroundColor: "#D1FAE5",
                    color: "#065F46",
                    border: "1px solid #A7F3D0",
                },
                colorWarning: {
                    backgroundColor: "#FEF3C7",
                    color: "#92400E",
                    border: "1px solid #FDE68A",
                },
                colorError: {
                    backgroundColor: "#FEE2E2",
                    color: "#991B1B",
                    border: "1px solid #FECACA",
                },
                outlined: {
                    borderWidth: "2px",
                    backgroundColor: "transparent",
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: "#F1F5F9",
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    backgroundColor: "#EF4444",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
                    fontSize: "0.75rem",
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    backgroundColor: "#F1F5F9",
                    height: 6,
                },
                bar: {
                    borderRadius: 6,
                    background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)",
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    "&.Mui-checked": {
                        color: "#2563EB",
                        "& + .MuiSwitch-track": {
                            backgroundColor: "#2563EB",
                            opacity: 0.5,
                        },
                    },
                },
                track: {
                    backgroundColor: "#CBD5E1",
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: "1px solid #F1F5F9",
                    boxShadow: "none",
                    "&:before": {
                        display: "none",
                    },
                    "&.Mui-expanded": {
                        margin: "16px 0",
                        boxShadow: "0 4px 20px rgba(15, 23, 42, 0.06)",
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#2563EB",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    border: "3px solid #FFFFFF",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.1)",
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: "#2563EB",
                    height: "3px",
                    borderRadius: "3px 3px 0 0",
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    "&.Mui-selected": {
                        color: "#2563EB",
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: "1px solid #F1F5F9",
                    backgroundColor: "#FFFFFF",
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: "4px 8px",
                    "&:hover": {
                        backgroundColor: "#F1F5F9",
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#EFF6FF",
                        "&:hover": {
                            backgroundColor: "#E0F2FE",
                        },
                    },
                },
            },
        },
    },
});

// Add custom palette types for TypeScript
declare module "@mui/material/styles" {
    interface Palette {
        job: {
            featured: string;
            urgent: string;
            remote: string;
            new: string;
        };
    }
    interface PaletteOptions {
        job?: {
            featured?: string;
            urgent?: string;
            remote?: string;
            new?: string;
        };
    }
}

export default theme;