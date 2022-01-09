import * as React from "react";
import {useEffect, useState} from "react";
import {apiDeleteUser, apiGetUser, apiGetUserList, apiUpdateUser} from "../../utils/api";
import {ERROR_MSG, showToast, SUCCESS_MSG} from "../../utils/toasts";
import {Loader} from "../UI/Loader";
import {Pager} from "../UI/Pager";
import {UserTable} from "./UserTable";
import {useToken} from "../../hooks/useToken";
import {useTranslation} from "next-i18next";
import {useDeleteConfirm} from "../../hooks/useDeleteConfirm";
import UserEditor from "../Shared/UserEditor";
import ResponsiveDialog from "../UI/ResponsiveDialog";
import {Fab} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export function UserPane() {
    const [token, status, user] = useToken()
    const [pageNo, setPageNo] = useState(1)
    const [data, setData] = useState(null)
    const {t} = useTranslation()
    const confirm = useDeleteConfirm()
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialog, setDialog] = useState(null);
    const [dialogTitle, setDialogTitle] = useState(null);

    const reload = () => {
        setLoading(true)
        if (token) apiGetUserList(pageNo, 20, token)
            .then(data => {
                setLoading(false)
                setData(data)
            })
            .catch(err => showToast(ERROR_MSG, err.message))
    };

    useEffect(() => {
        reload()
    }, [pageNo, token])

    const handleUserDelete = id => {
        confirm()
            .then(() => {
                if (token) apiDeleteUser(token, id)
                    .then(() => {
                        showToast(SUCCESS_MSG, t("User has been deleted!"))
                        reload();
                    })
                    .catch(err => showToast(ERROR_MSG, err.message))
            })

    };

    const handleUserUpdate = (id, values) => {
        delete values.role;
        apiUpdateUser(token, id, {...values})
            .then(() => {
                    showToast(SUCCESS_MSG, t("User has been saved!"))
                    reload();
                    handleDialogClose()
                }
            )
            .catch(err => showToast(ERROR_MSG, err.message))
    };

    const handleUserEdit = id => {
        apiGetUser(token, id)
            .then((data) => {
                if (data?.user && data.user.id === id) {
                    setDialogTitle(t("Edit User"))
                    setDialog(<UserEditor user={data.user}
                                          onClose={handleDialogClose}
                                          onSubmit={(values) => handleUserUpdate(id, values)}/>)
                    setDialogOpen(true)
                }
            })
            .catch(err => showToast(ERROR_MSG, err.message))
    };

    const handleUserAdd = () => {
        setDialogTitle(t("New User"))
        setDialog(<UserEditor onClose={handleDialogClose} onSubmit={(values) => handleUserAdd(values)}/>)
        setDialogOpen(true)
    };

    const handleDialogClose = () => {
        setDialogOpen(false)
        setDialog(null)
        setDialogTitle(null)
    }

    let userTable = null;
    if (!data) return <Loader/>

    function handlePageChange(event, value) {
        setPageNo(value)
    }


    if (data && data.users) {
        const pager = <Pager page={pageNo} total={data.total} limit={20} onChange={handlePageChange}/>
        userTable =
            <UserTable users={data.users} pager={pager} onUserDelete={handleUserDelete} onUserEdit={handleUserEdit} adminId={user.id}/>
    }
    return (
        <>
            <h1>{t("Users")}</h1>
            {userTable}
            <Fab color={"primary"} sx={{position: "fixed",bottom:"2rem", right:"2rem"}} onClick={handleUserAdd}>
                <PersonAddIcon/>
            </Fab>
            <ResponsiveDialog open={dialogOpen} title={dialogTitle} onClose={handleDialogClose}>
                {dialog}
            </ResponsiveDialog>
        </>
    );
}
