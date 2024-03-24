import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ChatAppAddress, ChatAppABI } from '../Context/constants';

export const CheckIfWalletConnected = async () => {
    try {
        if (!window.ethereum) throw new Error("Install MateMask");
        
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        throw error;
    }
};

export const connectWallet = async () => {
    try {
        if (!window.ethereum) throw new Error("Install MateMask");

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        throw error;
    }
}

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ChatAppABI,ChatAppAddress,signerOrProvider);

export const connectingWithContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const contract = fetchContract(provider); // Pass provider instead of signer
        return contract;
    } catch (error) {
        throw error;
    }
}

export const convertTime = (time) => {
    // Assuming time is a JavaScript Date object
    const realTime =
        time.getHours() +
        "/" +
        time.getMinutes() +
        "/" +
        time.getSeconds() +
        " Date:" +
        time.getDate() +
        "/" +
        (time.getMonth() + 1) +
        "/" +
        time.getFullYear();

    return realTime;
}
