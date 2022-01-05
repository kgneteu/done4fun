import {useToken} from "../../../hooks/useToken";
import * as React from "react";
import {useEffect, useState} from "react";
import {apiDeletePrize, apiGetSubUserList} from "../../../utils/api";
import {ERROR_MSG, showToast, SUCCESS_MSG} from "../../../utils/toasts";
import {Loader} from "../../UI/Loader";
import Grid from "@mui/material/Grid";
import KidCard from "./KidCard";
import {Pager} from "../../UI/Pager";
import {useTranslation} from "next-i18next";
import {useConfirm} from "material-ui-confirm";


const KidsPane = () => {
    const [token, status] = useToken()
    const [pageNo, setPageNo] = useState(1)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const {t} = useTranslation();
    const confirm = useConfirm();

    useEffect(() => {
        setLoading(true)
        if (token)
            apiGetSubUserList(pageNo, 16, token)
                .then(data => {
                    setData(data)
                    setLoading(false)
                })
                .catch(err => showToast(ERROR_MSG, err.message))

    }, [pageNo, token])


    if (!token) return <Loader/>

    const handlePageChange = (event, value) => {
        setPageNo(value)
    };


    const handleKidDelete = id => {
        confirm({description: t('This action is permanent and unrecoverable!')})
            .then(() => {
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

    function handleKidEdit(id) {

    }

    return (
        <>
            {data?.users &&
            <Grid container spacing={2} justifyContent={"center"}>
                {data.users.map(user =>
                    <Grid item key={user.id}>
                        <KidCard user={user} onKidDelete={()=>handleKidDelete(user.id)} onKidEdit={()=>handleKidEdit(user.id)}/>
                    </Grid>)
                }
                <Pager page={pageNo} total={data.total} limit={16} onChange={handlePageChange}/>
            </Grid>}
        </>
    );
};

export default KidsPane
