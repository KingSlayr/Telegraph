import React, { useEffect, useState } from 'react'
import '../style/Navbar.css'

export default function Navbar({currentUser,setprofileUser,setroute,route,logout}) {

    const dropdown = () =>{
        document.querySelector('#dropdown').classList.toggle("displayDrop");
    }
    return (
        <>
            <div className='navbar'>
                <div className='navbar_left'>Telegraph</div>
                {route==='/'&&<img onClick={()=>dropdown()} src={currentUser.dp?currentUser.dp:`https://avatars.dicebear.com/api/identicon/${currentUser?.uid}.svg`} alt="user" />}
            </div>
            {route==='/'&&
            <div id='dropdown' className='dropdownNav'>
                <div onClick={()=>{setroute('/profile');setprofileUser(currentUser)}}>Profile <i className="far fa-user-circle"></i></div>
                <div onClick={()=>{logout()}}>Logout <i className="fas fa-sign-out-alt"></i></div>     
            </div>
            }
        </>
    )
}
