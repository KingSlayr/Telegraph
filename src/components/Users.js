import React, { useEffect, useState } from 'react'
import '../style/Users.css'
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../firebase'

import Usercard from './Usercard'
import Chatbox from './Chatbox'

export default function Users() {
    const [chatbox, setchatbox] = useState(false)
    const [users, setusers] = useState([])
    const [currentUser, setcurrentUser] = useState(null)
    const [currentChat, setcurrentChat] = useState(null)

    const openChatbox = () =>{
        document.querySelector('.users').scroll(0,0)
        document.querySelector('.users').style.overflow = 'hidden'
        setchatbox(true);
    }
    const closeChatbox = () =>{
        document.querySelector('.users').style.overflow = 'auto'
        setchatbox(false);
    }

    useEffect(() => {
        setcurrentUser(JSON.parse(window.localStorage.getItem('telegraphuser')))
    }, [])

    useEffect(async () => {
        if(currentUser){
            const q = query(collection(db, "users"), where("email", "!=", currentUser?.email));
            const querySnapshot = await getDocs(q);
            var tempusers=[]
            querySnapshot.forEach((doc) => {
                var obj = doc.data();
                obj.uid = doc.id;
                tempusers.push(obj)
            });
            setusers(tempusers)
        }
    }, [currentUser])

    return (
        <div className='users'>
            {
                users&&users.map(each=>{
                    return(<Usercard openChatbox={openChatbox} user={each} setcurrentChat={setcurrentChat}/>)
                })
            }
            {
                chatbox && 
                <div className='chatboxBackground'>
                    <div className='chatboxContainer'>
                        <Chatbox currentChat={currentChat} currentUser={currentUser} closeChatbox={closeChatbox}/>
                    </div>
                </div> 
            }
        </div>
    )
}
