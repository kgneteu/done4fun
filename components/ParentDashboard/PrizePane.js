import * as React from "react";
import {useEffect, useState} from "react";
import {useToken} from "../../hooks/useToken";
import {Loader} from "../UI/Loader";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import AttractionsIcon from "@mui/icons-material/Attractions";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import HistoryIcon from "@mui/icons-material/History";
import TabPanel from "../UI/TabPanel";
import * as PropTypes from "prop-types";
import {apiDeletePrize, apiGetAvailablePrizes} from "../../utils/api";
import {ERROR_MSG, showToast, SUCCESS_MSG} from "../../utils/toasts";
import CasinoIcon from '@mui/icons-material/Casino';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {useTranslation} from "next-i18next";
import {useConfirm} from "material-ui-confirm";


function AvailablePrizes({user: kid}) {
    const [token, status] = useToken()
    const [prizes, setPrizes] = useState(null)
    const {t} = useTranslation();
    const confirm = useConfirm();
    console.log(prizes, token, status)
    useEffect(() => {
        if (token) apiGetAvailablePrizes(token, kid.id)
            .then(data => {
                setPrizes(data.prizes)
            })
            .catch(e => {
                showToast(ERROR_MSG, e.message)
            })
    }, [token])

    const handlePrizeDelete = id => {
        confirm({description: t('This action is permanent and unrecoverable!')})
            .then(() => {
                apiDeletePrize(token, id)
                    .then(() => showToast(SUCCESS_MSG, t("Prize has been deleted!")))
                    .catch(err => showToast(ERROR_MSG, err.message))
            })
    };

    const handlePrizeEdit = id => {

    };


    const handlePrizeAdd = () => undefined;

    return (
        <>
            <IconButton color="primary" aria-label="edit" size="medium"
                        onClick={() => handlePrizeAdd()}>
                <AddIcon/>
            </IconButton>
            {prizes && prizes.map(prize => (
                <p key={prize.id}>
                    {/*<Image width={32} height={32} src={`/images/x.png`}/>*/}
                    <img width={32} height={32} src={`/images/icons/prizes/${prize.icon}.svg`}/>
                    {prize.name}-{prize.id}
                    <CasinoIcon/>{prize.points}
                    <IconButton color="primary" aria-label="edit" size="medium"
                                onClick={() => handlePrizeEdit(prize.id)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton color="primary" aria-label="delete" size="medium"
                                onClick={() => handlePrizeDelete(prize.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </p>
            ))}
        </>
    )
}

function PrizePane({user: kid}) {
    const [activeTab, setActiveTab] = useState(0);
    if (!kid) return <Loader/>
    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
                    <Tab icon={<AttractionsIcon/>} iconPosition="start" label="Available"/>
                    <Tab icon={<DepartureBoardIcon/>} iconPosition="start" label="Awaiting"/>
                    <Tab icon={<HistoryIcon/>} iconPosition="start" label="Collected"/>
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
