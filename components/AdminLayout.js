import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import {Grid} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import {ResponsiveDrawer} from "./UI/ResponsiveDrawer";
import {Footer} from "./Footer";
import Link from "./UI/Link";
import AppLogo from "./AppLogo";

const AdminLayout = ({children, drawer}) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <Grid direction="column" container minHeight={"100%"}>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {md: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Link href={'/'}>
                        <AppLogo/>
                    </Link>
                </Toolbar>
            </AppBar>
            <Grid flexGrow={1}
                  container
            >
                <Box component="main" flex={"1 1"} px={'1rem'} marginTop={"64px"}>
                    {children}
                </Box>

                {drawer && <ResponsiveDrawer open={mobileOpen} onClose={handleDrawerToggle}>
                    {drawer}
                </ResponsiveDrawer>
                }
            </Grid>
            <Footer/>
        </Grid>
    );
};

export default AdminLayout;
