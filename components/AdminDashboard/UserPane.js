import * as React from "react";
import {useEffect, useState} from "react";
import {apiGetUserList} from "../../utils/api";
import {ERROR_MSG, showToast} from "../../utils/toasts";
import {Loader} from "../UI/Loader";
import {Pager} from "../UI/Pager";
import {UserTable} from "./UserTable";
import {Paper} from "@mui/material";
import {useToken} from "../../hooks/useToken";

export function UserPane(props) {
    const [token, status] = useToken()
    const [pageNo, setPageNo] = useState(1)
    const [data, setData] = useState(null)
    useEffect(() => {
            if (token) apiGetUserList(pageNo, 20, token)
                .then(data =>
                    setData(data))
                .catch(err => showToast(ERROR_MSG, err.message))
        }
        , [pageNo, token])

    let userTable = null;
    if (status !== "authenticated") return <Loader/>

    function handlePageChange(event, value) {
        setPageNo(value)
    }


    if (data && data.users) {
        const pager = <Pager page={pageNo} total={data.total} limit={20} onChange={handlePageChange}/>
        userTable = <UserTable users={data.users} pager={pager}/>
    }
    return (
        <>
            <Paper>
                {userTable}
            </Paper>
        </>
    );
}
