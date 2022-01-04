import * as React from "react";
import {useState} from "react";
import * as PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {UserPane} from "./UserPane";
import {useTranslation} from "next-i18next";
import {Container} from "@mui/material";

UserPane.propTypes = {onKidSelect: PropTypes.func};

function AdminDashboard() {
    const [view, setView] = useState(0);
    const [selectedKid, setSelectedKid] = useState(0);
    const {t} = useTranslation()

    function kidSelectedHandler(id) {
        setSelectedKid(id)
        setView(1)
    }

    return (
        <>
            <h1>{t("Users")}</h1>
            {view == 0 && <UserPane onKidSelect={kidSelectedHandler}/>}
            {/*{view == 1 && <KidPane kidId={selectedKid}/>}*/}
        </>
    );
}

export default AdminDashboard;
