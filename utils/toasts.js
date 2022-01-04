import {toast} from "react-toastify";
export const ERROR_MSG = 'ERROR'
export const SUCCESS_MSG = 'SUCCESS'

export const showToast = (type,msg) => {
    switch(type){
        case SUCCESS_MSG:
            toast.success(msg,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break;
        case ERROR_MSG:
            toast.error(msg,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break;
        default:
            return false
    }
}
