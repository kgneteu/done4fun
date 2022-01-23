import * as React from "react";
import KidsPane from "./Kids/KidsPane";
import {BackBoard} from "../UI/BackBoard";


const ParentDashboard = () => {
    return (
        <BackBoard>
            <KidsPane/>
        </BackBoard>
    );
};

export default ParentDashboard;
