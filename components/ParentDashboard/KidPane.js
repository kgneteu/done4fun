import * as React from "react";
import {useState} from "react";
import {Loader} from "../UI/Loader";
import {Fab, Grid, Tab, Tabs} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import * as PropTypes from "prop-types";
import TabPanel from "../UI/TabPanel";
import {useToken} from "../../hooks/useToken";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PrizePane from "./Prizes/PrizePane";
import TaskPane from "./Tasks/TaskPane";
import {useTranslation} from "next-i18next";
import Link from "../UI/Link";
import StarIcon from '@mui/icons-material/Star';
import Typography from "@mui/material/Typography";
import {Board} from "../UI/Board";
import {BoardHeader} from "../UI/BoardHeader";
import AppBar from "@mui/material/AppBar";


const KidPane = ({kid}) => {
    const [token, _, user] = useToken()
    const [activeTab, setActiveTab] = useState(0);
    const {t} = useTranslation()

    if (!kid || !user) return <Loader/>

    const handleChange = (event, value) => {
        setActiveTab(value)
    }

    return (
        <>
            <BoardHeader>
                <Grid container alignItems={"center"}>
                    {user.role !== "kid" &&
                        <Fab size={"medium"} component={Link} href={'/dashboard'} color={'primary'} sx={{mr: 2}}>
                            <ArrowBack/>
                        </Fab>
                    }
                    <Typography variant="h4" component="h1" mr={3}>{kid.first_name} {kid.last_name}</Typography>
                    <StarIcon color={"warning"} sx={{height: "24px", width: "24px"}}/>
                    <h2>{kid.points}</h2>
                </Grid>
            </BoardHeader>
            <Board>

                <AppBar position={'relative'}>
                    <Tabs value={activeTab}
                          onChange={handleChange}
                          variant="fullWidth"
                          indicatorColor="secondary"
                          textColor="inherit"
                          TabIndicatorProps={{sx: {height: "4px", backgroundColor: theme=>theme.palette["warning"].main}}}
                    >
                        <Tab icon={<TaskAltIcon/>} label={t("Tasks")} iconPosition={"start"}/>
                        <Tab icon={<EmojiEventsIcon/>} label={t("Prizes")} iconPosition={"start"}/>
                    </Tabs>
                </AppBar>
                <TabPanel index={0} value={activeTab}>
                    <TaskPane user={kid}/>
                </TabPanel>
                <TabPanel index={1} value={activeTab}>
                    <PrizePane user={kid}/>
                </TabPanel>
            </Board>
        </>
    )
};

KidPane.propTypes = {kidId: PropTypes.number}

export default KidPane
