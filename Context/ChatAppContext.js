import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";

import {
    CheckIfWalletconnected,
    connectWallet,
    connectingWithContract
} from "../Utils/apiFeature";

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
    
    //chat user data
    const [currectUserName,setCurrectUserName] = useState("");
    const [currentUserAddress, setCurrectUserAddress] = useState("");

    const router = useRouter();

    //FETCH DATA TIME OF PAGE LOAD
    const fetchData = async () => {
        try {
            //get contract
            const contract = await connectingWithContract();
            //get account
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            //get user name
            // const userName = await contract.getUsername(connectAccount);
            // setUserName(userName);

            //get my freind list
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);
            //get all app user list
            const userList = await contract.getAllAppUser();
            setUserLists(userList);
        } catch (error) {
            setError("Please Install And Connect Your Wallet");
            console.log(error)
        }
    };
    useEffect(()=>{
        fetchData();
    },[]);

    //read message
    const readMessage = async(friendAddress)=>{
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);


        } catch (error) {
            setError("currently You Have no Message")
        }
    }

    //create account
    const createAccount = async ({name , accountAddress}) =>{
        try {
            //if(name || accountAddress) return setError("Name And Account must be there");
            const contract = await connectingWithContract();
            const getCreateduser = await contract.createAccont(name);
            setLoading(true);
            await getCreateduser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error while creating your account please reload browser")
        }
    }


    //ADD your friends
    const addFriends = async({name,accountAddress})=>{
        try {
            if(name || accountAddress) return setError("Please Provide name and address");
            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress,name);
            setLoading(true);
            await addMyFriend.Wait()
            setLoading(false);
            router.push('/');
            window.location.reload();
        } catch (error) {
            setError("Something went wron gwhile adding friends, try again");
        }
    }

    //send message to your freinds
    const sendMessage = async({msg,address})=>{
        try {
            if(msg || address ) return setError("Please Type your Message");
            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();

        } catch (error) {
            setError("please reload and try again")
        }
    }


    //read info
    const readuser = async (userAddress)=>{
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrectUserName(userName);
        setCurrectUserAddress(userAddress);
    };




    return (

        <ChatAppContect.Provider value={{
            readMessage,
            createAccount,
            addFriends,
            sendMessage,
            readuser,
            account,
            userName,
            friendLists,
            friendMsg,
            userLists,
            loading,
            error,
            currectUserName,
            currentUserAddress
            }}>
            {children}
        </ChatAppContect.Provider>
    )
};