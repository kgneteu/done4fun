import {signIn, signOut, useSession} from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "./UI/Link";
import AppLogo from "./AppLogo";
import Button from "@mui/material/Button";
import * as React from "react";
import {useRouter} from "next/router";
import {MenuItem, Select} from "@mui/material";

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
        <AppBar position="sticky" enableColorOnDark={true} color={'default'}>
            <Toolbar>
                <Link href={'/'} sx={{flexGrow: 1}}>
                    <AppLogo/>
                </Link>
                <Select value={locale} onChange={handleLanguageChange}>
                    {locales && locales.map(lang => (
                        <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                    ))}
                </Select>
                {!loading && session && <Button color="inherit" onClick={() => signOut()}>Sign Out</Button>}
                {!loading && !session && <Button color="inherit" onClick={() => signIn()}>Sign In</Button>}
            </Toolbar>
        </AppBar>
    )
};
