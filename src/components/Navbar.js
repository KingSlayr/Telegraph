import React, { useEffect, useState } from 'react'
import '../style/Navbar.css'

export default function Navbar({route,logout}) {
    const [user, setuser] = useState(null)
    const dropdown = () =>{
        document.querySelector('#dropdown').classList.toggle("displayDrop");
    }
    useEffect(() => {
        setuser(JSON.parse(window.localStorage.getItem('telegraphuser')))
    }, [])
    return (
        <>
            <div className='navbar'>
                <div className='navbar_left'>Telegraph</div>
                {route==='/'&&<img onClick={()=>dropdown()} src={`https://avatars.dicebear.com/api/identicon/${user?.uid}.svg`} alt="user" />}
            </div>
            {route==='/'&&
            <div id='dropdown' className='dropdownNav'>
                <div>Profile <i class="far fa-user-circle"></i></div>
                <div>Logout <i onClick={()=>{logout()}} class="fas fa-sign-out-alt"></i></div>     
            </div>
            }
        </>
    )
}
