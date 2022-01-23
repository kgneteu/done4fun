import {Container, Grid, Toolbar} from "@mui/material";
import * as React from "react";
import * as PropTypes from "prop-types";
import Box from "@mui/material/Box";

export const BoardHeader = ({children}) => (
    <Toolbar>
        <Container>
            <Grid container alignContent={'center'} sx={{borderBottom: 5, borderColor: 'divider', minHeight:"80px"}}>
                {children}
            </Grid>
        </Container>
    </Toolbar>
);

BoardHeader.propTypes = {children: PropTypes.node};
