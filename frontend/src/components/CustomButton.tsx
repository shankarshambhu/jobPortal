import React from "react";
import { Button, type ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
    label: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, ...props }) => {
    return (
        <Button
            variant="contained"
            {...props}
            sx={{
                borderRadius: 2,
                padding: "6px 16px",
                textTransform: "none",
                ...props.sx,
            }}
        >
            {label}
        </Button>
    );
};

export default CustomButton;
