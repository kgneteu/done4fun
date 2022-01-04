import Cookies from "js-cookie";
// import {getSession} from "next-auth/react";
//
// export function SaveAccessToken(token){
//     window.sessionStorage.setItem("x-access-token",token)
// }
//
// export async function GetAccessToken(){
//     let token =  window.sessionStorage.getItem("x-access-token")
//     if (!token){
//         // const sessionCookie = Cookies.get('next-auth.session-token')
//         // if (sessionCookie){
//         //     console.log("aaa",sessionCookie)
//         // }
//         const session = await getSession()
//         token = session?.user?.access_token;
//         if (token) {
//             SaveAccessToken(token)
//         }
//     }
//     return token
// }
//
// export function ClearAccessToken(){
//     return window.sessionStorage.removeItem("x-access-token")
// }
