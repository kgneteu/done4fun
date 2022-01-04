import {useContext, useEffect} from "react";
import {getSession, useSession} from "next-auth/react";
import {TokenContext} from "../context/token-context";
export function useToken() {
    const {data: session, status} = useSession();
    if (status ==="authenticated") status = "authorized"
    return [session?.user?.access_token, status, session?.user]
    // const sessionInfo = useContext(TokenContext)
    // useEffect(() => {
    //     if (!sessionInfo?.token) {
    //         getSession()
    //             .then(session => {
    //                 const t = session?.user?.access_token;
    //                 if (t) {
    //                     sessionInfo.setData(t,"authorized",session.user)
    //                 } else {
    //                     sessionInfo.setStatus("unauthorized")
    //                 }
    //             }).catch(e => {
    //             sessionInfo.setStatus("error")
    //         })
    //     }
    // }, [sessionInfo]);
    // return [sessionInfo.token, sessionInfo.status, sessionInfo.user]
}
