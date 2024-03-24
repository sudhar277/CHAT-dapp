import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import images from "../../assets";

const NavBar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "alluser",
    },
    {
      menu: "CHAT",
      link: "/",
    },
    {
      menu: "CONTACT",
      link: "/",
    },
    {
      menu: "SETTING",
      link: "/",
    },
    {
      menu: "FAQ",
      link: "alluser",
    },
    {
      menu: "TERMS OF USE",
      link: "alluser",
    },
  ];
  //USESTATE
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet,createAccount,error } = useContext(ChatAppContect);
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={Style.NavBar_box_right}>
          {/* //Desktop */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={1 + 1}
                className={`${Style.NavBar_box_right_menu_items} ${
                  active === i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link 
                  className={Style.NavBar_box_right_menu_items_link} 
                  href={el.link}
                >
                  {el.menu}
            
                </Link>


              </div>
            ))}
          </div>

          {/* //MOBILE */}
          {open &&(
            <div className={Style.mobile_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${Style.mobile_menu_items} ${
                  active === i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link 
                  className={Style.mobile_menu_items_link} 
                  href={el.link}
                >
                  {el.menu}
            
                </Link>


              </div>
            ))}

            <p className={Style.mobile_menu_btn}>
              <Image 
                src={images.close} 
                alt="close" 
                width={50} 
                height={50} 
                onClick={()=>setOpen(false)} 
              />
            </p>
          </div>
          )}

          {/*CONNECT WALLET*/}
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={()=>connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button on onClick={()=>setOpenModel(true)}>
                {""}
                <Image 
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}  
                />
                {''}
                <small>{userName || "Create Account"}</small>
              </button>

            )}
          </div>

          <div 
            className={Style.NavBar_box_right_open}
            onClick={()=>setOpen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>

        </div>
      </div>

      {/*MODEL COMPONENT*/}
      {openModel &&(
        <div className={Style.modelBox}>
          <Model openModel={setOpenModel}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                  sunt in culpa qui officia deserunt mollit anim id est laborum.'
            smallinfo="Kindly select your name..."
            images={images.hero}
            functionName={createAccount}

          />

        </div>
      )}
      {error == "" ? "" : <Error error={error}/>}


    </div>
  );
};

export default NavBar;
