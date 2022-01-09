import {useToken} from "../../../hooks/useToken";
import * as React from "react";
import {useEffect, useState} from "react";
import {apiCreateUser, apiDeleteUser, apiGetSubUserList, apiGetUser, apiUpdateUser} from "../../../utils/api";
import {ERROR_MSG, showToast, SUCCESS_MSG} from "../../../utils/toasts";
import {Loader} from "../../UI/Loader";
import Grid from "@mui/material/Grid";
import KidCard from "./KidCard";
import {Pager} from "../../UI/Pager";
import {useTranslation} from "next-i18next";
import ResponsiveDialog from "../../UI/ResponsiveDialog";
import UserEditor from "../../Shared/UserEditor";
import {useDeleteConfirm} from "../../../hooks/useDeleteConfirm";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {Fab} from "@mui/material";


const KidsPane = () => {
    const [token, status, currentUser] = useToken()
    const [pageNo, setPageNo] = useState(1)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const {t} = useTranslation();
    const confirm = useDeleteConfirm();
    // const [dialogOpen, setDialogOpen] = useState(false)
    const [dialog, setDialog] = useState(null);
    // const [dialogTitle, setDialogTitle] = useState(null);

    const reload = () => {
        setLoading(true)
        if (token)
            apiGetSubUserList(pageNo, 16, token)
                .then(data => {
                    setData(data)
                    setLoading(false)
                })
                .catch(err => showToast(ERROR_MSG, err.message))
    };

    useEffect(() => {
        reload()
    }, [pageNo, token])


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


    const handleKidUpdate = async (id, values) => {
        delete values.role;
        await apiUpdateUser(token, id, {...values})
            .then(() => {
                    showToast(SUCCESS_MSG, t("User has been saved!"))
                    reload();
                    handleDialogClose()
                }
            )
            .catch(err => showToast(ERROR_MSG, err.message))
    }

    const handleKidCreate = async (values) => {
        delete values.role;
        try {
            await apiCreateUser(token, {...values})
            showToast(SUCCESS_MSG, t("User has been saved!"))
            reload();
            handleDialogClose()
        }
        catch (e) {
            showToast(ERROR_MSG, e.message)
        }
    }


    const handleKidEdit = id => {
        apiGetUser(token, id)
            .then((data) => {
                if (data?.user && data.user.id === id) {
                    //          setDialogTitle(t("Edit User"))
                    setDialog({
                        component: <UserEditor user={data.user}
                                               onClose={handleDialogClose}
                                               onSubmit={(values) => handleKidUpdate(id, values)}/>,
                        title: t("Edit User"),
                        open: true,
                    })
                    //        setDialogOpen(true)
                }
            })
            .catch(err => showToast(ERROR_MSG, err.message))
    };

    const handleDialogClose = () => {
        //setDialogOpen(false)
        setDialog(null)
        //setDialogTitle(null)
    }

    const handleKidAdd = () => {
        //    setDialogTitle(t("New User"))
        setDialog({
            component: <UserEditor onClose={handleDialogClose} onSubmit={(values) => handleKidCreate(values)}/>,
            title: t("New User"),
            open: true,
        })
        //  setDialogOpen(true)
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
            <Fab color={"primary"} sx={{position: "fixed", bottom: "2rem", right: "2rem"}} onClick={handleKidAdd}>
                <PersonAddIcon/>
            </Fab>
            {dialog && <ResponsiveDialog open={dialog.open} title={dialog.title} onClose={handleDialogClose}>
                {dialog.component}
            </ResponsiveDialog>}
        </>
    );
};

export default KidsPane
