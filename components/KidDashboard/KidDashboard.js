import * as React from "react";
import KidPane from "../ParentDashboard/KidPane";
import {useToken} from "../../hooks/useToken";
import {Loader} from "../UI/Loader";


const KidDashboard = () => {
    const [token, _, user] = useToken()

    if (!token) return <Loader/>
    return (
        <KidPane kid={user}/>
    )

};

export default KidDashboard;
