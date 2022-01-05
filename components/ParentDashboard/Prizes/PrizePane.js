import * as React from "react";
import {useState} from "react";
import {Loader} from "../../UI/Loader";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import AttractionsIcon from "@mui/icons-material/Attractions";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import HistoryIcon from "@mui/icons-material/History";
import TabPanel from "../../UI/TabPanel";
import * as PropTypes from "prop-types";
import {AvailablePrizes} from "./AvailablePrizes";
import {useTranslation} from "next-i18next";




function PrizePane({user: kid}) {
    const [activeTab, setActiveTab] = useState(0);
    const {t} = useTranslation();
    if (!kid) return <Loader/>
    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
                    <Tab icon={<AttractionsIcon/>} iconPosition="start" label={t("Available")}/>
                    <Tab icon={<DepartureBoardIcon/>} iconPosition="start" label={t("Awaiting")}/>
                    <Tab icon={<HistoryIcon/>} iconPosition="start" label={t("Collected")}/>
                </Tabs>
            </Box>
            <TabPanel index={0} value={activeTab}>
                <AvailablePrizes user={kid}/>
            </TabPanel>
            <TabPanel index={1} value={activeTab}>
                <h1>sdded</h1>
            </TabPanel>
            <TabPanel index={2} value={activeTab}>
                <h1>sdded</h1>
            </TabPanel>
        </Box>
    )
}

PrizePane.propTypes =
    {
        user: PropTypes.any
    };

export default PrizePane
