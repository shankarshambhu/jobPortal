// import React from "react";
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     IconButton,
//     Box,
//     type TypographyProps,
//     type DialogProps,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";


// interface GenericModalProps {
//     open: boolean;
//     onClose: () => void;
//     title?: string;
//     children: React.ReactNode;
//     actions?: React.ReactNode;
//     maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
//     titleProps?: TypographyProps;
//     PaperProps?: DialogProps['PaperProps']
// }

// const GenericModal: React.FC<GenericModalProps> = ({
//     open,
//     onClose,
//     title,
//     children,
//     actions,
//     maxWidth = "sm",
// }) => {
//     return (
//         <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
//             {title && (
//                 <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     {title}
//                     <IconButton onClick={onClose} size="small">
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//             )}

//             <DialogContent dividers>
//                 <Box>{children}</Box>
//             </DialogContent>

//             {actions && <DialogActions>{actions}</DialogActions>}
//         </Dialog>
//     );
// };

// export default GenericModal;



import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Box,
    type TypographyProps,
    type DialogProps,
    alpha,
    useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface GenericModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    titleProps?: TypographyProps;
    PaperProps?: DialogProps['PaperProps'];
    showCloseButton?: boolean;
}

const GenericModal: React.FC<GenericModalProps> = ({
    open,
    onClose,
    title,
    children,
    actions,
    maxWidth = "sm",
    titleProps,
    PaperProps,
    showCloseButton = true,
}) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={maxWidth}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 24px 80px 0 rgba(0,0,0,0.25)',
                    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    overflow: 'hidden',
                    ...PaperProps?.sx,
                },
                ...PaperProps,
            }}
        >
            {/* Header with gradient background */}
            {title && (
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        py: 2.5,
                        px: 3,
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '2px',
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            opacity: 0.6,
                        }
                    }}
                    {...titleProps}
                >
                    <Box
                        sx={{
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, yellow)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            ...titleProps?.sx,
                        }}
                    >
                        {title}
                    </Box>

                    {showCloseButton && (
                        <IconButton
                            onClick={onClose}
                            size="small"
                            sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                width: 32,
                                height: 32,
                                borderRadius: 2,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )}
                </DialogTitle>
            )}

            {/* Content area */}
            <DialogContent
                dividers
                sx={{
                    p: 0,
                    '&.MuiDialogContent-dividers': {
                        border: 'none',
                    }
                }}
            >
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            </DialogContent>

            {/* Actions with subtle background */}
            {actions && (
                <DialogActions
                    sx={{
                        py: 2.5,
                        px: 3,
                        background: alpha(theme.palette.background.default, 0.5),
                        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        gap: 1.5,
                    }}
                >
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default GenericModal;