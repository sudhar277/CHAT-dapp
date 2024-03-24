import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";

import {CheckIfWalletconnected,connectWallet,connectingWithContract} from "../Utils/apiFeature";

export const ChatAppContect = React.createContext();

export const ChatAppProvider = ({children}) => {
    //usestate
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists,setUserLists] = useState([]);
    const [error, setError] = useState("");
    
    
    return (

        <ChatAppContect.Provider value={{}}>{children}</ChatAppContect.Provider>
    )
};