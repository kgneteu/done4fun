import Box from '@mui/material/Box';
import * as React from "react";
import {Grid} from "@mui/material";
import {Footer} from "./Footer";
import {Header} from "./Header";

export function Layout({children}) {
    return (

        <Grid direction="column" container minHeight={"100%"}>
            <Header/>
            <Grid flexGrow={1} container>
                <Box component="main" flex={"1 1"}>
                    {children}
                </Box>
            </Grid>
            <Footer/>
        </Grid>

    );
}
