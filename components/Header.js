import {signIn, signOut, useSession} from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "./UI/Link";
import AppLogo from "./AppLogo";
import Button from "@mui/material/Button";
import * as React from "react";
import {useRouter} from "next/router";
import {MenuItem, Select, useScrollTrigger} from "@mui/material";
import Box from "@mui/material/Box";

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

export const Header = () => {
    const {data: session, status} = useSession()
    const loading = status === "loading"
    const router = useRouter()
    const {pathname, asPath, query, locale, locales} = router;

    const handleLanguageChange = (event) => {
        const lang = event.target.value;
        router.push({pathname, query}, asPath, {locale: lang}).then()
    };

    return (
        <ElevationScroll>
        <AppBar position="sticky" enableColorOnDark={true} color={'default'} elevation={0}>
            <Toolbar sx={{alignContent:"center"}}>
                {/*<Link href={'/'}>*/}
                    <AppLogo/>
                {/*</Link>*/}
                <Box sx={{flexGrow: 1}}/>
                <Select value={locale} onChange={handleLanguageChange}>
                    {locales && locales.map(lang => (
                        <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                    ))}
                </Select>
                {!loading && session && <Button color="inherit" onClick={() => signOut()}>Sign Out</Button>}
                {!loading && !session && <Button color="inherit" onClick={() => signIn()}>Sign In</Button>}
            </Toolbar>
        </AppBar>
        </ElevationScroll>
    )
};
