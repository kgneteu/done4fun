import {useToken} from "../../../hooks/useToken";
import * as React from "react";
import {useEffect, useState} from "react";
import {apiDeleteUser, apiGetSubUserList, apiGetUser, apiUpdatePrize, apiUpdateUser} from "../../../utils/api";
import {ERROR_MSG, showToast, SUCCESS_MSG} from "../../../utils/toasts";
import {Loader} from "../../UI/Loader";
import Grid from "@mui/material/Grid";
import KidCard from "./KidCard";
import {Pager} from "../../UI/Pager";
import {useTranslation} from "next-i18next";
import ResponsiveDialog from "../../UI/ResponsiveDialog";
import UserEditor from "../../UserEditor";
import {useDeleteConfirm} from "../../../hooks/useDeleteConfirm";


const KidsPane = () => {
    const [token, status, currentUser] = useToken()
    const [pageNo, setPageNo] = useState(1)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const {t} = useTranslation();
    const confirm = useDeleteConfirm();
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialog, setDialog] = useState(null);
    const [dialogTitle, setDialogTitle] = useState(null);

    useEffect(() => {

        reload()

    }, [pageNo, token])

    function reload() {
        setLoading(true)
        if (token)
            apiGetSubUserList(pageNo, 16, token)
                .then(data => {
                    setData(data)
                    setLoading(false)
                })
                .catch(err => showToast(ERROR_MSG, err.message))
    }

    if (!token) return <Loader/>

    const handlePageChange = (event, value) => {
        setPageNo(value)
    };


    const handleKidDelete = id => {
        confirm().then(() => {
                    apiDeleteUser(token, id)
                        .then(() => {
                                showToast(SUCCESS_MSG, t("Kid has been deleted!"))
                                reload();
                            }
                        )
                        .catch(err => showToast(ERROR_MSG, err.message))
                }
            )
    };


    const handleKidUpdate = (id, values) => {
        if (currentUser.role !=="admin"){
            delete values.role;
        }
        apiUpdateUser(token, id, {...values})
            .then(() => {
                    showToast(SUCCESS_MSG, t("User has been saved!"))
                    reload();
                    handleDialogClose()
                }
            )
            .catch(err => showToast(ERROR_MSG, err.message))
    }

    const handleKidEdit = id => {
        apiGetUser(token, id)
            .then((data) => {
                if (data?.user && data.user.id === id) {
                    setDialogTitle(t("Edit User"))
                    setDialog(<UserEditor user={data.user}
                                          onClose={handleDialogClose}
                                          onSubmit={(values) => handleKidUpdate(id, values)}/>)
                    setDialogOpen(true)
                }
            })
            .catch(err => showToast(ERROR_MSG, err.message))
    };

    const handleDialogClose = () => {
        setDialogOpen(false)
        setDialog(null)
        setDialogTitle(null)
    }

    const handleKidAdd = () => {
        setDialogTitle(t("New User"))
        setDialog(<UserEditor onClose={handleDialogClose} onSubmit={(values) => handlePrizeCreate(values)}/>)
        setDialogOpen(true)
    };

    return (
        <>
            {data?.users &&
            <Grid container spacing={2} justifyContent={"center"}>
                {data.users.map(user =>
                    <Grid item key={user.id}>
                        <KidCard user={user}
                                 onKidDelete={() => handleKidDelete(user.id)}
                                 onKidEdit={() => handleKidEdit(user.id)}/>
                    </Grid>)
                }
                <Pager page={pageNo} total={data.total} limit={16} onChange={handlePageChange}/>
            </Grid>}
            <ResponsiveDialog open={dialogOpen} title={dialogTitle} onClose={handleDialogClose}>
                {dialog}
            </ResponsiveDialog>
        </>
    );
};

export default KidsPane
