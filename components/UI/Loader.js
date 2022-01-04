import {CircularProgress, Container, Grid} from "@mui/material";
import * as React from "react";

export const Loader = () => (
    <Container maxWidth={'xs'}>
        <Grid justifyItems='center'>
            <CircularProgress/><span>Loading...</span>
        </Grid>
    </Container>
);
