import {createContext, useState} from "react";

//const sessionInfo =
//todo context on logout
export const TokenContext = createContext({
    token: null,
    status: "loading",
    user: null,
    setData: function (newToken, newStatus, newUser) {
    },
    setStatus: function (newStatus) {
    },
    logOut: function () {
    },
})


export default function TokenProvider({children}) {
    const [{token, status, user}, setContext] = useState({token: null, status:"loading", user: null});

    const setData = (newToken, newStatus, newUser) => {
        setContext({token: newToken, status: newStatus, user: newUser})
    };
    const setStatus = (newStatus) => {
        setContext({token, status: newStatus, user})
    };
    const logOut = () => {
        setContext({token:null, status:"unauthorized", user: null})
    };

    const context = {
        token, status, user
    }
    context.logOut = logOut;
    context.setData = setData;
    context.setStatus = setStatus;
    return (
        <TokenContext.Provider value={context}>
            {children}
        </TokenContext.Provider>
    )
}
