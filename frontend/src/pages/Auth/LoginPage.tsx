
import { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Fade,
  useTheme,
  alpha,
  Divider,
  CircularProgress
} from "@mui/material";
import {
  Email,
  Lock,
  Login,
  Visibility,
  VisibilityOff,
  Person,

  Security
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await loginApi(form);
        if (response.data.sucesss) {
          login(response?.data?.user, response?.data?.accessToken);
          const user = response.data.user.role;
          toast.success("Login successful!");
          if (user === 'candidate') navigate('/candidate-dashboard');
          else if (user === 'company') navigate('/company-dashboard');
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Login failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at 50% 50%, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${theme.palette.background.default} 100%)`,
        py: 2,
      }}
    >
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 5 },
              width: "100%",
              borderRadius: 4,
              background: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: "blur(20px)",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: theme.shadows[8],
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.warning.main})`,
              }
            }}
          >
            {/* Header Section */}
            <Box textAlign="center" mb={4}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.warning.main})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              >
                <Security
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.contrastText
                  }}
                />
              </Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.warning.light})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  mb: 1,
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: '1.1rem' }}
              >
                Sign in to access your career dashboard
              </Typography>
            </Box>

            {/* Form Section */}
            <Box component="form" onSubmit={handleSubmit}>
              {/* Email Field */}
              <TextField
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email
                        sx={{
                          color: errors.email
                            ? theme.palette.error.main
                            : theme.palette.primary.main
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    fontSize: '1rem',
                    transition: theme.transitions.create(['border-color', 'box-shadow']),
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
                    },
                  },
                }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock
                        sx={{
                          color: errors.password
                            ? theme.palette.error.main
                            : theme.palette.primary.main
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        sx={{
                          color: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          }
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    fontSize: '1rem',
                    transition: theme.transitions.create(['border-color', 'box-shadow']),
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
                    },
                  },
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <Login />}
                sx={{
                  py: 2,
                  borderRadius: 3,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 100%)`,
                  boxShadow: theme.shadows[4],
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: theme.shadows[8],
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.warning.dark} 100%)`,
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                  "&:disabled": {
                    background: theme.palette.grey[600],
                    transform: "none",
                    boxShadow: "none",
                  },
                  transition: theme.transitions.create(['all'], {
                    duration: theme.transitions.duration.standard,
                  }),
                }}
              >
                {isLoading ? "Signing In..." : "Sign In to Your Account"}
              </Button>
            </Box>

            {/* Footer Section */}
            <Box mt={4}>
              <Divider
                sx={{
                  mb: 3,
                  "&::before, &::after": {
                    borderColor: theme.palette.divider,
                  }
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    px: 2,
                    background: theme.palette.background.paper,
                  }}
                >
                  New to our platform?
                </Typography>
              </Divider>
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Start your journey with us
                </Typography>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Person />}
                  onClick={() => navigate("/register")}
                  disabled={isLoading}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    borderWidth: 2,
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: theme.palette.primary.light,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      transform: "translateY(-1px)",
                      boxShadow: theme.shadows[4],
                    },
                    transition: theme.transitions.create(['all'], {
                      duration: theme.transitions.duration.standard,
                    }),
                  }}
                >
                  Create Account
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}