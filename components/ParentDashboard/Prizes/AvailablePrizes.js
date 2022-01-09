import {useToken} from "../../../hooks/useToken";
import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import {apiCreatePrize, apiDeletePrize, apiGetAvailablePrizes, apiGetPrize, apiUpdatePrize} from "../../../utils/api";
import {ERROR_MSG, showToast, SUCCESS_MSG} from "../../../utils/toasts";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import {grey} from "@mui/material/colors";
import {Grid} from "@mui/material";
import {PrizeCard} from "./PrizeCard";
import ResponsiveDialog from "../../UI/ResponsiveDialog";
import {PrizeEditor} from "./PrizeEditor";
import Typography from "@mui/material/Typography";
import {Loader} from "../../UI/Loader";
import {useDeleteConfirm} from "../../../hooks/useDeleteConfirm";
import {sleep} from "../../../utils/form-tools";

export const AvailablePrizes = ({user: kid}) => {
        const [token, status] = useToken()
        const [prizes, setPrizes] = useState(null)
        const {t} = useTranslation();
        const confirm = useDeleteConfirm();
        const [dialog, setDialog] = useState(null);
        const [loading, setLoading] = useState(true)
        useEffect(() => {
            if (token) reload()
        }, [token])


        const reload = () => {
            if (token) apiGetAvailablePrizes(token, kid.id)
                .then(data => {
                    setPrizes(data.prizes)
                })
                .catch(e => {
                    showToast(ERROR_MSG, e.message)
                }).finally(() => setLoading(false))
        };

        if (loading || !token) return <Loader/>

        const handleDialogClose = () => {
            setDialog(null)
        }

        const handlePrizeDelete = id => {
            confirm().then(() => {
                    apiDeletePrize(token, id)
                        .then(() => {
                                showToast(SUCCESS_MSG, t("Prize has been deleted!"))
                                reload();
                            }
                        )
                        .catch(err => showToast(ERROR_MSG, err.message))
                }
            )
        };

        const handlePrizeUpdate = async (id, values) => {
            try {
                await apiUpdatePrize(token, id, {...values})
                showToast(SUCCESS_MSG, t("Prize has been saved!"))
                reload();
                handleDialogClose()
            } catch (e) {
                showToast(ERROR_MSG, e.message)
            }
        }

        const handlePrizeCreate = async (values) => {
            try {
                await apiCreatePrize(token, kid.id, {...values})
                showToast(SUCCESS_MSG, t("Prize has been created!"))
                reload();
                handleDialogClose()
            } catch (e) {
                showToast(ERROR_MSG, e.message)
            }
        };

        const handlePrizeEdit = id => {
            apiGetPrize(token, id)
                .then((prize) => {
                    if (prize?.prize && prize.prize.id === id) {
                        setDialog({
                            component: <PrizeEditor prize={prize.prize} onClose={handleDialogClose}
                                                    onSubmit={(values) => handlePrizeUpdate(id, values)}/>,
                            title: t("Edit Prize")
                        })
                    }
                })
                .catch(err => showToast(ERROR_MSG, err.message))
        };


        const handlePrizeAdd = () => {
            setDialog({
                component: <PrizeEditor onClose={handleDialogClose} onSubmit={(values) => handlePrizeCreate(values)}/>,
                title: t("New Prize")
            })

        };

        return (
            <>
                <IconButton color="primary" aria-label="edit" size="medium"
                            onClick={() => handlePrizeAdd()}>
                    <AddIcon/>
                    <Typography>{t("Add Prize")}</Typography>
                </IconButton>
                <Box sx={{p: 2, backgroundColor: grey.A200}}>
                    <Grid container spacing={2} justifyContent={"center"}>
                        {prizes && prizes.map(prize => (
                            <Grid item key={prize.id}>
                                <PrizeCard prize={prize}
                                           onPrizeEdit={() => handlePrizeEdit(prize.id)}
                                           onPrizeDelete={() => handlePrizeDelete(prize.id)}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                {dialog && <ResponsiveDialog open={true} title={dialog.title} onClose={handleDialogClose}>
                    {dialog.component}
                </ResponsiveDialog>}
            </>
        )
    }
;
