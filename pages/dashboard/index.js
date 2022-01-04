import * as React from "react";
import {Loader} from "../../components/UI/Loader";
import ParentDashboard from "../../components/ParentDashboard/ParentDashboard";
import KidDashboard from "../../components/KidDashboard/KidDashboard";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";
import {useToken} from "../../hooks/useToken";
import {signIn, useSession} from "next-auth/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


const DashboardPage = () => {
    const [_, status, user] = useToken()
 //debugger
    if (status === "loading") return <Loader/>
    if (status !== "authorized") {
         signIn()
         return <Loader/>
    }
    switch (user.role) {
        case 'admin':
            return <AdminDashboard/>
        case 'parent':
            return <ParentDashboard/>
        default:
            return <KidDashboard/>
    }
}
//
// DashboardPage.getLayout = function (page) {
//     return (
//         <AdminLayout>
//             {page}
//         </AdminLayout>
//     )
// }

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            // Will be passed to the page component as props
        },
    };
}

export default DashboardPage;
