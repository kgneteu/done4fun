import {useToken} from "../../hooks/useToken";
import * as React from "react";
import {useEffect, useState} from "react";
import {apiGetSubUserList} from "../../utils/api";
import {ERROR_MSG, showToast} from "../../utils/toasts";
import {Loader} from "../UI/Loader";
import {Pager} from "../UI/Pager";
import KidsList from "./KidsList";

const KidsPane = () => {
    const [token, status] = useToken()
    const [pageNo, setPageNo] = useState(1)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (token)
            apiGetSubUserList(pageNo, 16, token)
                .then(data =>
                    setData(data))
                .catch(err => showToast(ERROR_MSG, err.message))

    }, [pageNo, token])

    let kidList = null;
    if ((status == "loading") || (!data)) return <Loader/>

    function handlePageChange(event, value) {
        setPageNo(value)
    }


    if (data && data.users) {
        const pager = <Pager page={pageNo} total={data.total} limit={16} onChange={handlePageChange}/>
        kidList = <KidsList users={data.users} pager={pager}/>
    }
    return (
        <>
            {kidList}
        </>
    );
};

export default KidsPane
