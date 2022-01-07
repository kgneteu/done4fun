import * as React from "react";
import {useEffect, useState} from "react";
import {apiGetUser} from "../../utils/api";
import {Loader} from "../UI/Loader";
import {Container, IconButton, Paper, Tab, Tabs, Toolbar} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import * as PropTypes from "prop-types";
import TabPanel from "../UI/TabPanel";
import {useToken} from "../../hooks/useToken";
import Box from "@mui/material/Box";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PrizePane from "./Prizes/PrizePane";
import TaskPane from "./Tasks/TaskPane";
import {useTranslation} from "next-i18next";
import {ERROR_MSG, showToast} from "../../utils/toasts";
import Link from "../UI/Link";


function Slot({children}) {
    return (
        <Paper sx={{p: 3}}>
            {children}
        </Paper>
    )
}

Slot.propTypes = {children: PropTypes.node};

const KidPane = ({kid}) => {
    const [activeTab, setActiveTab] = useState(0);
    const {t} = useTranslation()

    if (!kid) return <Loader/>

    const handleChange = (event, value) => {
        setActiveTab(value)
    }

    return (
        <>
            <Toolbar>
                <IconButton size={"large"} component={Link} href={'/dashboard'}><ArrowBack/></IconButton>
                <h1>{kid.first_name} {kid.last_name}</h1>
                {kid.points}
            </Toolbar>

            <Container>
                <Slot>
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={activeTab} onChange={handleChange}>
                                <Tab icon={<TaskAltIcon/>} label={t("Tasks")}/>
                                <Tab icon={<EmojiEventsIcon/>} label={t("Prizes")}/>
                            </Tabs>
                        </Box>
                        <TabPanel index={0} value={activeTab}>
                            <TaskPane user={kid}/>
                        </TabPanel>
                        <TabPanel index={1} value={activeTab}>
                            <PrizePane user={kid}/>
                        </TabPanel>
                    </Box>
                </Slot>
            </Container>
        </>
    )
};

KidPane.propTypes = {kidId: PropTypes.number}

export default KidPane
