import {getSession} from "next-auth/react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {apiGetUser} from "../../../utils/api";
import {Loader} from "../../../components/UI/Loader";
import KidPane from "../../../components/ParentDashboard/KidPane";
import * as React from "react";
import {BackBoard} from "../../../components/UI/BackBoard";

const KidPage = ({kid}) => {
    if (!kid){
        return <Loader/>
    }
    return (
        <BackBoard>
            <KidPane kid={kid}/>
        </BackBoard>
    );
};

export async function getServerSideProps({locale, ...context}) {
    const id = +context.params?.id;
    if (!Number.isInteger(id)) {
        return {
            notFound: true
        }
    }
    const session = await getSession(context);
    if (!session?.user) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }

    try {
        const kid = await apiGetUser(session.user.access_token, id)
        return {
            props: {
                ...(await serverSideTranslations(locale, ['common'])),
                kid: kid?.user,
            },
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export default KidPage;
