import {signIn, signOut, useSession} from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AppLogo from "./AppLogo";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {ClickAwayListener, Fab, Grow, MenuItem, MenuList, Paper, Popper, useScrollTrigger} from "@mui/material";
import Box from "@mui/material/Box";
import * as PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import UkFlag from "flag-icons/flags/1x1/gb.svg"
import PlFlag from "flag-icons/flags/1x1/pl.svg"

function ElevationScroll(props) {
    const {children, window} = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

function LangButton({locale, locales, onLocaleChange}) {
    const paperProps = {
        elevation: 0,
        sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
            },
            '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
            },
        },
    }

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = (event) => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleClick = (langCode) => {
        setOpen(false);
        onLocaleChange(langCode)
    };

    const prevOpen = React.useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Fab size={'small'} color ={"primary"} ref={anchorRef} onClick={handleToggle} sx={{overflow:"hidden",mr:1}}>
                {locale === "pl" ?
                    <PlFlag width={64} height={64}/> :
                    <UkFlag width={64} height={64}/>
                }
            </Fab>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper {...paperProps}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    <MenuItem onClick={() => handleClick("en")}>
                                        <Avatar><UkFlag width={64} height={64}/></Avatar>
                                        English
                                    </MenuItem>
                                    <MenuItem onClick={() => handleClick("pl")}>
                                        <Avatar><PlFlag width={64} height={64}/></Avatar>
                                        Polish
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>)}
            </Popper>
        </>
    );
}

LangButton.propTypes = {
    locales: PropTypes.arrayOf(PropTypes.string),
    locale: PropTypes.string,
    onLocaleChange: PropTypes.func
};
export const Header = () => {
    const {data: session, status} = useSession()
    const loading = status === "loading"
    const router = useRouter()
    const {pathname, asPath, query, locale, locales} = router;

    const handleLanguageChange = (lang) => {
        router.push({pathname, query}, asPath, {locale: lang}).then()
    };

    return (
        <ElevationScroll>
            <AppBar position="sticky" enableColorOnDark={true} color={'default'} elevation={0}>
                <Toolbar sx={{alignContent: "center", minHeight:{xs: "80px"}}}>
                    {/*<Link href={'/'}>*/}
                    <AppLogo/>
                    {/*</Link>*/}
                    <Box sx={{flexGrow: 1}}/>
                    <LangButton locale={locale} locales={locales} onLocaleChange={handleLanguageChange}/>
                    {!loading && session && <Button color="inherit" onClick={() => signOut()}>Sign Out</Button>}
                    {!loading && !session && <Button color="inherit" onClick={() => signIn()}>Sign In</Button>}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
};
