// import { useState } from "react";
// import {
//     Box,
//     Container,
//     TextField,
//     Button,
//     Typography,
//     Paper,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     InputAdornment,
//     IconButton,
//     Fade,
//     useTheme,
// } from "@mui/material";
// import {
//     Person,
//     Email,
//     Lock,
//     Work,
//     HowToReg,
//     Badge,
//     Visibility,
//     VisibilityOff,
// } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { registerApi } from "../../services/auth";

// export default function RegisterPage() {
//     const [form, setForm] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         role: "",
//     });

//     const navigate = useNavigate();
//     const [errors, setErrors] = useState<{ [key: string]: string }>({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const theme = useTheme();

//     const handleChange = (e: any) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value,
//         });

//         // Clear error when user starts typing
//         if (errors[e.target.name]) {
//             setErrors({
//                 ...errors,
//                 [e.target.name]: "",
//             });
//         }
//     };

//     const validateForm = () => {
//         const newErrors: { [key: string]: string } = {};

//         if (!form.firstName.trim()) newErrors.firstName = "First name is required";
//         else if (form.firstName.trim().length < 2) {
//             newErrors.firstName = "First name must be at least 2 characters";
//         }

//         if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
//         else if (form.lastName.trim().length < 2) {
//             newErrors.lastName = "Last name must be at least 2 characters";
//         }

//         if (!form.email.trim()) {
//             newErrors.email = "Email is required";
//         } else if (!/\S+@\S+\.\S+/.test(form.email)) {
//             newErrors.email = "Email is invalid";
//         }

//         if (!form.password) {
//             newErrors.password = "Password is required";
//         } else if (form.password.length < 6) {
//             newErrors.password = "Password must be at least 6 characters";
//         } else if (!/\d/.test(form.password)) {
//             newErrors.password = "Password must contain at least one number";
//         }

//         if (!form.confirmPassword) {
//             newErrors.confirmPassword = "Please confirm your password";
//         } else if (form.confirmPassword !== form.password) {
//             newErrors.confirmPassword = "Passwords do not match";
//         }

//         if (!form.role) newErrors.role = "Please select a role";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         if (validateForm()) {
//             try {
//                 const { confirmPassword, ...formDataToSend } = form;

//                 const response = await registerApi(formDataToSend);
//                 console.log(response);

//                 if (response.data.success) {
//                     toast.success("Registration successful");
//                     navigate("/login");
//                 }
//             } catch (error: any) {
//                 toast.error(error?.data?.message || "Registration failed");
//             }
//         }
//     };


//     return (
//         <Container
//             maxWidth="sm"
//             sx={{
//                 minHeight: "100vh",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 py: 4,
//             }}
//         >
//             <Fade in timeout={800}>
//                 <Paper
//                     elevation={8}
//                     sx={{
//                         p: 4,
//                         width: "100%",
//                         borderRadius: 4,
//                         background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
//                         border: `1px solid ${theme.palette.divider}`,
//                     }}
//                 >
//                     <Box textAlign="center" mb={4}>
//                         <Badge
//                             sx={{
//                                 fontSize: 48,
//                                 color: theme.palette.primary.main,
//                                 mb: 2,
//                             }}
//                         />
//                         <Typography
//                             variant="h4"
//                             fontWeight="bold"
//                             gutterBottom
//                             sx={{
//                                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, yellow)`,
//                                 WebkitBackgroundClip: "text",
//                                 WebkitTextFillColor: "transparent",
//                             }}
//                         >
//                             Join Our Talent Network
//                         </Typography>
//                         <Typography variant="body1" color="text.secondary">
//                             Create your account and find your dream job
//                         </Typography>
//                     </Box>

//                     {/* Name fields */}
//                     <Box display="flex" gap={2} mb={3}>
//                         <TextField
//                             fullWidth
//                             name="firstName"
//                             label="First Name"
//                             value={form.firstName}
//                             onChange={handleChange}
//                             error={!!errors.firstName}
//                             helperText={errors.firstName}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Person color="action" />
//                                     </InputAdornment>
//                                 ),
//                             }}
//                             sx={{
//                                 "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                             }}
//                         />
//                         <TextField
//                             fullWidth
//                             name="lastName"
//                             label="Last Name"
//                             value={form.lastName}
//                             onChange={handleChange}
//                             error={!!errors.lastName}
//                             helperText={errors.lastName}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Person color="action" />
//                                     </InputAdornment>
//                                 ),
//                             }}
//                             sx={{
//                                 "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                             }}
//                         />
//                     </Box>

//                     {/* Email */}
//                     <TextField
//                         fullWidth
//                         name="email"
//                         label="Email Address"
//                         type="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         error={!!errors.email}
//                         helperText={errors.email}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <Email color="action" />
//                                 </InputAdornment>
//                             ),
//                         }}
//                         sx={{
//                             mb: 3,
//                             "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                         }}
//                     />

//                     {/* Password */}
//                     <TextField
//                         fullWidth
//                         name="password"
//                         label="Password"
//                         type={showPassword ? "text" : "password"}
//                         value={form.password}
//                         onChange={handleChange}
//                         error={!!errors.password}
//                         helperText={errors.password}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <Lock color="action" />
//                                 </InputAdornment>
//                             ),
//                             endAdornment: (
//                                 <InputAdornment position="end">
//                                     <IconButton onClick={() => setShowPassword(!showPassword)}>
//                                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                                     </IconButton>
//                                 </InputAdornment>
//                             ),
//                         }}
//                         sx={{
//                             mb: 3,
//                             "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                         }}
//                     />

//                     {/* Confirm Password */}
//                     <TextField
//                         fullWidth
//                         name="confirmPassword"
//                         label="Confirm Password"
//                         type={showConfirmPassword ? "text" : "password"}
//                         value={form.confirmPassword}
//                         onChange={handleChange}
//                         error={!!errors.confirmPassword}
//                         helperText={errors.confirmPassword}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <Lock color="action" />
//                                 </InputAdornment>
//                             ),
//                             endAdornment: (
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         onClick={() =>
//                                             setShowConfirmPassword(!showConfirmPassword)
//                                         }
//                                     >
//                                         {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                                     </IconButton>
//                                 </InputAdornment>
//                             ),
//                         }}
//                         sx={{
//                             mb: 3,
//                             "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                         }}
//                     />

//                     {/* Role */}
//                     <FormControl
//                         fullWidth
//                         error={!!errors.role}
//                         sx={{
//                             mb: 4,
//                             "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                         }}
//                     >
//                         <InputLabel>I am a...</InputLabel>
//                         <Select
//                             name="role"
//                             value={form.role}
//                             onChange={handleChange}
//                             label="I am a..."
//                             startAdornment={
//                                 <InputAdornment position="start">
//                                     <Work color="action" />
//                                 </InputAdornment>
//                             }
//                         >
//                             <MenuItem value="" disabled>
//                                 Select your role
//                             </MenuItem>
//                             <MenuItem value="candidate">
//                                 <Box display="flex" alignItems="center" gap={1}>
//                                     <Person fontSize="small" />
//                                     Job Seeker / Candidate
//                                 </Box>
//                             </MenuItem>
//                             <MenuItem value="company">
//                                 <Box display="flex" alignItems="center" gap={1}>
//                                     <Work fontSize="small" />
//                                     Employer / Company
//                                 </Box>
//                             </MenuItem>
//                         </Select>
//                         {errors.role && (
//                             <Typography
//                                 variant="caption"
//                                 color="error"
//                                 sx={{ mt: 1, display: "block" }}
//                             >
//                                 {errors.role}
//                             </Typography>
//                         )}
//                     </FormControl>

//                     {/* Submit */}
//                     <Button
//                         onClick={handleSubmit}
//                         fullWidth
//                         variant="contained"
//                         size="large"
//                         startIcon={<HowToReg />}
//                         sx={{
//                             py: 1.5,
//                             borderRadius: 2,
//                             fontSize: "1.1rem",
//                             fontWeight: "bold",
//                             background: `linear-gradient(45deg, ${theme.palette.primary.main}, yellow)`,
//                             "&:hover": {
//                                 transform: "translateY(-2px)",
//                                 boxShadow: 4,
//                             },
//                             transition: "all 0.3s ease",
//                         }}
//                     >
//                         Create Account
//                     </Button>

//                     <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         textAlign="center"
//                         mt={3}
//                     >
//                         By registering, you agree to our Terms of Service and Privacy Policy
//                     </Typography>
//                 </Paper>
//             </Fade>
//         </Container>
//     );
// }


import { useState } from "react";
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    IconButton,
    Fade,
    useTheme,
    alpha,
    Divider,
    CircularProgress
} from "@mui/material";
import {
    Person,
    Email,
    Lock,
    Work,
    HowToReg,
    Badge,
    Visibility,
    VisibilityOff,
    CorporateFare,
    School
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../services/auth";

export default function RegisterPage() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: "",
            });
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!form.firstName.trim()) newErrors.firstName = "First name is required";
        else if (form.firstName.trim().length < 2) {
            newErrors.firstName = "First name must be at least 2 characters";
        }

        if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
        else if (form.lastName.trim().length < 2) {
            newErrors.lastName = "Last name must be at least 2 characters";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (!/\d/.test(form.password)) {
            newErrors.password = "Password must contain at least one number";
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (form.confirmPassword !== form.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!form.role) newErrors.role = "Please select a role";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                const { confirmPassword, ...formDataToSend } = form;
                const response = await registerApi(formDataToSend);

                if (response.data.success) {
                    toast.success("Registration successful! Please login to continue.");
                    navigate("/login");
                }
            } catch (error: any) {
                toast.error(error?.data?.message || "Registration failed");
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
            <Container maxWidth="md">
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
                                <Badge
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
                                Join Our Talent Network
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ fontSize: '1.1rem' }}
                            >
                                Create your account and find your dream job
                            </Typography>
                        </Box>

                        {/* Form Section */}
                        <Box component="form" onSubmit={handleSubmit}>
                            {/* Name Fields */}
                            <Box display="flex" gap={2} mb={3}>
                                <TextField
                                    fullWidth
                                    name="firstName"
                                    label="First Name"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    disabled={isLoading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person
                                                    sx={{
                                                        color: errors.firstName
                                                            ? theme.palette.error.main
                                                            : theme.palette.primary.main
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 3,
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
                                <TextField
                                    fullWidth
                                    name="lastName"
                                    label="Last Name"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    disabled={isLoading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person
                                                    sx={{
                                                        color: errors.lastName
                                                            ? theme.palette.error.main
                                                            : theme.palette.primary.main
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 3,
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
                            </Box>

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
                                    mb: 3,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
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

                            {/* Confirm Password Field */}
                            <TextField
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={form.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                disabled={isLoading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock
                                                sx={{
                                                    color: errors.confirmPassword
                                                        ? theme.palette.error.main
                                                        : theme.palette.primary.main
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                disabled={isLoading}
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    '&:hover': {
                                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                    }
                                                }}
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    mb: 3,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
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

                            {/* Role Selection */}
                            <FormControl
                                fullWidth
                                error={!!errors.role}
                                disabled={isLoading}
                                sx={{
                                    mb: 4,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                        "&:hover fieldset": {
                                            borderColor: theme.palette.primary.light,
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: theme.palette.primary.main,
                                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
                                        },
                                    },
                                }}
                            >
                                <InputLabel>I am a...</InputLabel>
                                <Select
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    label="I am a..."
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Work
                                                sx={{
                                                    color: errors.role
                                                        ? theme.palette.error.main
                                                        : theme.palette.primary.main
                                                }}
                                            />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="" disabled>
                                        Select your role
                                    </MenuItem>
                                    <MenuItem value="candidate">
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <School fontSize="small" />
                                            Job Seeker / Candidate
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="company">
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <CorporateFare fontSize="small" />
                                            Employer / Company
                                        </Box>
                                    </MenuItem>
                                </Select>
                                {errors.role && (
                                    <Typography
                                        variant="caption"
                                        color="error"
                                        sx={{ mt: 1, display: "block" }}
                                    >
                                        {errors.role}
                                    </Typography>
                                )}
                            </FormControl>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress size={20} /> : <HowToReg />}
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
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </Button>

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
                                        Already have an account?
                                    </Typography>
                                </Divider>
                                <Box textAlign="center">
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => navigate("/login")}
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
                                        Sign In to Existing Account
                                    </Button>
                                </Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    textAlign="center"
                                    mt={3}
                                    sx={{ opacity: 0.8 }}
                                >
                                    By registering, you agree to our Terms of Service and Privacy Policy
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
}
