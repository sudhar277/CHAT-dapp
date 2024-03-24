//SPDX-License-Identifier:MIT

pragma solidity >=0.7.0 <0.9.0;

contract ChatApp{


    //USER STRUCT
    struct user{
        string name;
        friend[] friendList;

    }

    struct friend {
        address pubkey;
        string name;
        
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }
    
    struct AllUserStruck{
        string name;
        address accountAddres;
    }

    AllUserStruck[] getAllUsers;
    mapping(address => user) userList; //this stores all the user
    mapping(bytes32 => message[]) allMessages; //all messages between two convo

    //CHECK USER EXIST

    function checkUserExists(address pubkey)  public view returns (bool) {  //checks if user is present
        return bytes(userList[pubkey].name).length>0;
        
    }

    //CREATE ACCOUNT
    //calldata is used to know the gas fee
    function createAccont(string calldata name ) external { 
        require(checkUserExists(msg.sender)==false,"User already exists");
        require(bytes(name).length>0,"username cannot be empty");

        userList[msg.sender].name = name;
        getAllUsers.push(AllUserStruck(name,msg.sender));
        
    }

    //GET USERNAME
    function getUsername(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey),"User is not registered");
        return userList[pubkey].name;

    }

    //ADD FRIENDS
    function addFriend(address friend_key,string calldata name) external {
        require(checkUserExists(msg.sender),"Creat an account first");
        require(checkUserExists(friend_key),"User is not registered!");
        require(msg.sender !=friend_key,"users cannot add themselves as friend");

        require(checkAlreadyFriends(msg.sender,friend_key)==false,"These users are already friends");

        _addFriend(msg.sender, friend_key,name);
        _addFriend(friend_key,msg.sender,userList[msg.sender].name);  
    }

    
    //checkAlreadyFriends
    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns(bool){
        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
            address tmp= pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;

        }
        for(uint256 i=0; i <userList[pubkey1].friendList.length; i++){
            if(userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    } 

    function _addFriend(address me, address friend_key, string memory name ) internal {
        friend memory newFriend = friend(friend_key,name);
        userList[me].friendList.push(newFriend);
    }

    //GETMY FRIEND
    function getMyFriendList() external view returns(friend[] memory) {
        return userList[msg.sender].friendList;
        
    }
    //GET chat code is to find the particular user when we do the communication(when  we send the message)
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32) {
        if(pubkey1 < pubkey2){
            return keccak256(abi.encodePacked(pubkey1,pubkey2)); //keccack has fucntion and abi.encodePacked is used for tighly packing without padding(smae input give same output);
        }else return keccak256(abi.encodePacked(pubkey2,pubkey1));
              
    }

    //send message
    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender),"Create an account first");
        require(checkUserExists(friend_key),"User is not registered");
        require(checkAlreadyFriends(msg.sender, friend_key),"you are not friend with the given user");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);        
        message memory newMsg = message(msg.sender, block.timestamp,_msg);
        allMessages[chatCode].push(newMsg);
    }
    

    //READ MESSAGE
    function readMessage(address friend_key) external view returns(message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
        
    }

    function getAllAppUser() public view returns(AllUserStruck[] memory){
        return getAllUsers;
    }
}
