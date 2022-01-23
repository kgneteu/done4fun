import Box from "@mui/material/Box";
import {grey} from "@mui/material/colors";
import * as React from "react";
import * as PropTypes from "prop-types";
import {Container} from "@mui/material";

export const Board = ({children}) => (
    <Box sx={{p: 2, backgroundColor: grey.A200, minHeight: "100%"}}>
        <Container>
            {children}
        </Container>
    </Box>
);

Board.propTypes = {
    children: PropTypes.node
};
