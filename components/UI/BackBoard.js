import Box from "@mui/material/Box";
import {grey} from "@mui/material/colors";
import * as React from "react";
import * as PropTypes from "prop-types";

export const BackBoard = ({children}) => (
    <Box sx={{minHeight: "100%", backgroundColor: grey.A200}}>
        {children}
    </Box>
);

BackBoard.propTypes = {
    children: PropTypes.node
};
