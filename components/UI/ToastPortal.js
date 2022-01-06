import {useEffect, useState} from "react";
import {createPortal} from "react-dom";


const ToastPortal= ({ children }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        return () => setMounted(false)
    }, [])

    return mounted
        ? createPortal(children,
            document.querySelector("#toaster"))
        : null
}

export default ToastPortal
