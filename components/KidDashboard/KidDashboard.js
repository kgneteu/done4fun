import * as React from "react";
import KidPane from "../ParentDashboard/KidPane";
import {useToken} from "../../hooks/useToken";
import {Loader} from "../UI/Loader";
import {BackBoard} from "../UI/BackBoard";


const KidDashboard = () => {
    const [token, _, user] = useToken()
    if (!token) return <Loader/>
    return (
        <BackBoard>
            <KidPane kid={user}/>
        </BackBoard>
    )

};

export default KidDashboard;
