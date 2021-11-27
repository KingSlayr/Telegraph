import React from 'react'
import '../style/Usercard.css'

export default function Usercard({openChatbox,user,setcurrentChat}) {
    console.log(user);
    return (
        <div onClick={()=>{openChatbox();setcurrentChat(user);}} className='usercard'>
            {/* <img className='background' src={`https://avatars.dicebear.com/api/identicon/${user.uid}.svg`} alt="" /> */}
            <img src={user.dp?user.dp:`https://avatars.dicebear.com/api/identicon/${user.uid}.svg`} alt="" />
            <div style={{padding:'0 0.5rem'}}>
                <div style={{fontWeight:'bold',fontSize:'large',textAlign:'center'}}>{user.name}</div>
                {/* <div>hi</div>
                <div className='timeUsercard'>6:56 PM</div> */}
            </div>
        </div>
    )
}
