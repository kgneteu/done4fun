import * as React from 'react';
import {appWithTranslation} from 'next-i18next';
import 'react-toastify/dist/ReactToastify.css';
import {SessionProvider} from "next-auth/react"
import {CacheProvider, ThemeProvider} from "@emotion/react";
import {CssBaseline} from "@mui/material";
import Head from "next/head";
import theme from "../styles/theme";
import {ToastContainer} from "react-toastify";
import {Layout} from "../components/Layout";
import createEmotionCache from "../styles/createEmotionCache";
import {ConfirmProvider} from "material-ui-confirm";
import TokenProvider from "../context/token-context";
import ToastPortal from "../components/UI/ToastPortal";


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function defaultLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

//todo check emotion cache is working
function App({Component, emotionCache = clientSideEmotionCache, pageProps, ...rest}) {
    const customLayout = Component.getLayout || defaultLayout;
    return (
        <>
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>Done4Fun</title>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <ConfirmProvider>
                        {customLayout(<Component {...pageProps} />)}
                    </ConfirmProvider>
                </ThemeProvider>
            </CacheProvider>
        </>
    )
}

//export default appWithTranslation(App);
//export default App;
//export default appWithTranslation(App, nextI18NextConfig)


const AppWithI18n = appWithTranslation(App);


function ToastContainerPortal() {
    return (
        <ToastContainer/>
    );
}

const AppWithAuth = (props) => (

    <SessionProvider session={props.pageProps.session}>
        <TokenProvider>
            <AppWithI18n {...props} />
        </TokenProvider>
        <ToastPortal>
            <ToastContainer/>
        </ToastPortal>
    </SessionProvider>
)

export default AppWithAuth;

// {/*<SessionProvider*/}
// {/*    options={{*/}
// {/*        // Stale Time controls how often the useSession in the client should*/}
// {/*        // contact the server to sync the session state. Value in seconds.*/}
// {/*        // e.g.*/}
// {/*        // * 0  - Disabled (always use cache value)*/}
// {/*        // * 60 - Sync session state with server if it's older than 60 seconds*/}
// {/*        staleTime: 0,*/}
// {/*        // Refetch Interval tells windows / tabs that are signed in to keep sending*/}
// {/*        // a keep alive request (which extends the current session expiry) to*/}
// {/*        // prevent sessions in open windows from expiring. Value in seconds.*/}
// {/*        //*/}
// {/*        // Note: If a session has expired when keep alive is triggered, all open*/}
// {/*        // windows / tabs will be updated to reflect the user is signed out.*/}
// {/*        refetchInterval: 0*/}
// {/*    }}*/}
// {/*    session={pageProps.session}>*/}
// {customLayout(<Component {...pageProps} />)}
// {/*<Component {...pageProps} />*/}
// {/*</SessionProvider>*/}
