// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#2563EB", // Bright Professional Blue
            light: "#3B82F6",
            dark: "#1E40AF",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#7C3AED", // Vibrant Purple
            light: "#8B5CF6",
            dark: "#6D28D9",
            contrastText: "#FFFFFF",
        },
        background: {
            default: "#F8FAFC", // Clean Light Gray
            paper: "#FFFFFF", // Pure White
        },
        text: {
            primary: "#0F172A",
            secondary: "#475569",
            disabled: "#94A3B8",
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
        success: {
            main: "#10B981",
            light: "#34D399",
            dark: "#059669",
            contrastText: "#FFFFFF",
        },
        warning: {
            main: "#F59E0B",
            light: "#FBBF24",
            dark: "#D97706",
            contrastText: "#FFFFFF",
        },
        error: {
            main: "#EF4444",
            light: "#F87171",
            dark: "#DC2626",
            contrastText: "#FFFFFF",
        },
        info: {
            main: "#06B6D4",
            light: "#22D3EE",
            dark: "#0891B2",
            contrastText: "#FFFFFF",
        },
        divider: "#E2E8F0",
    },
    typography: {
        fontFamily: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif`,
        h1: {
            fontWeight: 800,
            fontSize: "3rem",
            lineHeight: 1.1,
            color: "#0F172A",
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        },
        h2: {
            fontWeight: 700,
            fontSize: "2.5rem",
            lineHeight: 1.2,
            color: "#0F172A",
            letterSpacing: "-0.02em",
        },
        h3: {
            fontWeight: 700,
            fontSize: "2rem",
            lineHeight: 1.3,
            color: "#0F172A",
            letterSpacing: "-0.01em",
        },
        h4: {
            fontWeight: 600,
            fontSize: "1.5rem",
            lineHeight: 1.4,
            color: "#1E293B",
        },
        h5: {
            fontWeight: 600,
            fontSize: "1.25rem",
            lineHeight: 1.5,
            color: "#1E293B",
        },
        h6: {
            fontWeight: 600,
            fontSize: "1.125rem",
            lineHeight: 1.5,
            color: "#334155",
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
        },
    },
    shape: {
        borderRadius: 16,
    },
    shadows: [
        "none",
        "0 1px 2px 0 rgba(37, 99, 235, 0.05)",
        "0 1px 3px 0 rgba(37, 99, 235, 0.1), 0 1px 2px -1px rgba(37, 99, 235, 0.05)",
        "0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -2px rgba(37, 99, 235, 0.05)",
        "0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -4px rgba(37, 99, 235, 0.05)",
        "0 20px 25px -5px rgba(37, 99, 235, 0.15), 0 8px 10px -6px rgba(37, 99, 235, 0.05)",
        "0 25px 50px -12px rgba(37, 99, 235, 0.2)",
        "0 25px 50px -12px rgba(37, 99, 235, 0.25)",
        "0 30px 60px -12px rgba(37, 99, 235, 0.3)",
        "0 35px 70px -12px rgba(37, 99, 235, 0.35)",
        "0 40px 80px -12px rgba(37, 99, 235, 0.4)",
        "0 45px 90px -12px rgba(37, 99, 235, 0.45)",
        "0 50px 100px -12px rgba(37, 99, 235, 0.5)",
        "0 55px 110px -12px rgba(37, 99, 235, 0.55)",
        "0 60px 120px -12px rgba(37, 99, 235, 0.6)",
        "0 65px 130px -12px rgba(37, 99, 235, 0.65)",
        "0 70px 140px -12px rgba(37, 99, 235, 0.7)",
        "0 75px 150px -12px rgba(37, 99, 235, 0.75)",
        "0 80px 160px -12px rgba(37, 99, 235, 0.8)",
        "0 85px 170px -12px rgba(37, 99, 235, 0.85)",
        "0 90px 180px -12px rgba(37, 99, 235, 0.9)",
        "0 95px 190px -12px rgba(37, 99, 235, 0.95)",
        "0 100px 200px -12px rgba(37, 99, 235, 1)",
        "0 105px 210px -12px rgba(37, 99, 235, 1)",
        "0 110px 220px -12px rgba(37, 99, 235, 1)",
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#F8FAFC",
                    backgroundImage: `
                        radial-gradient(circle at 15% 15%, rgba(37, 99, 235, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 85% 85%, rgba(124, 58, 237, 0.06) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.04) 0%, transparent 60%)
                    `,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: "14px 36px",
                    fontWeight: 700,
                    boxShadow: "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontSize: "0.9375rem",
                    "&:hover": {
                        transform: "translateY(-3px)",
                    },
                },
                containedPrimary: {
                    background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 20px rgba(37, 99, 235, 0.3), 0 2px 8px rgba(37, 99, 235, 0.2)",
                    "&:hover": {
                        background: "linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)",
                        boxShadow: "0 12px 40px rgba(37, 99, 235, 0.4), 0 8px 20px rgba(37, 99, 235, 0.25)",
                    },
                },
                containedSecondary: {
                    background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.3), 0 2px 8px rgba(124, 58, 237, 0.2)",
                    "&:hover": {
                        background: "linear-gradient(135deg, #6D28D9 0%, #5B21B6 100%)",
                        boxShadow: "0 12px 40px rgba(124, 58, 237, 0.4), 0 8px 20px rgba(124, 58, 237, 0.25)",
                    },
                },
                outlined: {
                    borderWidth: "2px",
                    borderColor: "#2563EB",
                    color: "#2563EB",
                    fontWeight: 700,
                    backgroundColor: "#FFFFFF",
                    "&:hover": {
                        borderWidth: "2px",
                        borderColor: "#1E40AF",
                        backgroundColor: "#EFF6FF",
                        transform: "translateY(-3px)",
                        boxShadow: "0 8px 30px rgba(37, 99, 235, 0.2)",
                    },
                },
                text: {
                    color: "#2563EB",
                    fontWeight: 600,
                    "&:hover": {
                        backgroundColor: "#EFF6FF",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 4px 20px rgba(37, 99, 235, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                    border: "1px solid #E2E8F0",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                    position: "relative",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 50%, #06B6D4 100%)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                    },
                    "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 50px rgba(37, 99, 235, 0.15), 0 8px 25px rgba(0, 0, 0, 0.08)",
                        borderColor: "#CBD5E1",
                        "&::before": {
                            opacity: 1,
                        },
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    borderBottom: "1px solid #E2E8F0",
                    boxShadow: "0 2px 20px rgba(37, 99, 235, 0.06)",
                    color: "#0F172A",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 12,
                        backgroundColor: "#FFFFFF",
                        transition: "all 0.3s ease",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#CBD5E1",
                            borderWidth: "2px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#94A3B8",
                        },
                        "&.Mui-focused": {
                            backgroundColor: "#FFFFFF",
                            boxShadow: "0 0 0 4px rgba(37, 99, 235, 0.1)",
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
                    boxShadow: "0 2px 12px rgba(37, 99, 235, 0.06)",
                },
                elevation2: {
                    boxShadow: "0 4px 20px rgba(37, 99, 235, 0.08)",
                },
                elevation3: {
                    boxShadow: "0 8px 30px rgba(37, 99, 235, 0.1)",
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: 10,
                    fontSize: "0.8125rem",
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
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: "#E2E8F0",
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
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    backgroundColor: "#E2E8F0",
                    height: 8,
                },
                bar: {
                    borderRadius: 8,
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
                    border: "1px solid #E2E8F0",
                    boxShadow: "none",
                    "&:before": {
                        display: "none",
                    },
                    "&.Mui-expanded": {
                        margin: "16px 0",
                        boxShadow: "0 4px 20px rgba(37, 99, 235, 0.08)",
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
                },
            },
        },
    },
});

export default theme;