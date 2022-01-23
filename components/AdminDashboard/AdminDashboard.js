import * as React from "react";
import {useState} from "react";
import {UserPane} from "./UserPane";
import {BackBoard} from "../UI/BackBoard";


function AdminDashboard() {
    const [view, setView] = useState(0);
    return (
        <>
            {view == 0 &&
                <BackBoard>
                    <UserPane/>
                </BackBoard>
            }
            {/*{view == 1 && <KidPane kidId={selectedKid}/>}*/}
        </>
    );
}

export default AdminDashboard;
