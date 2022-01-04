import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from "./UI/Link";
import {signIn, signOut, useSession} from "next-auth/react";
import AppLogo from "./AppLogo";
import * as React from "react";
import {Grid} from "@mui/material";
import {Footer} from "./Footer";

const Header = () => {
    const {data: session, status} = useSession()
    const loading = status === "loading"
    if (loading) return <p>Loading...</p>
    return (
        <AppBar position="sticky" enableColorOnDark={true} color={'default'}>
            <Toolbar>
                <Link href={'/'} sx={{ flexGrow: 1 }}>
                    <AppLogo/>
                </Link>

                {session && <Button color="inherit" onClick={() => signOut()}>Sign Out</Button>}
                {!session && <Button color="inherit" onClick={() => signIn()}>Sign In</Button>}
            </Toolbar>
        </AppBar>
    )
};

export function Layout({children}) {
    return (

        <Grid direction="column" container minHeight={"100%"}>
            <Header/>
            <Grid flexGrow={1} container>
                <Box component="main" flex={"1 1"} p={'1rem'}>
                    {children}
                </Box>
            </Grid>
            <Footer/>
        </Grid>

    );
}
