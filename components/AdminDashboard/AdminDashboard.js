import * as React from "react";
import {useState} from "react";
import {UserPane} from "./UserPane";



function AdminDashboard() {
    const [view, setView] = useState(0);
    return (
        <>
            {view == 0 && <UserPane/>}
            {/*{view == 1 && <KidPane kidId={selectedKid}/>}*/}
        </>
    );
}

export default AdminDashboard;
