import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";

export function Footer() {
    return (
        <Box py="0.5rem" textAlign="center">
            <Typography variant={"body2"}>
            Copyright &copy; 2021 by Zdolski, Rośko, Pawełczyk
            </Typography>
        </Box>
    );
}
