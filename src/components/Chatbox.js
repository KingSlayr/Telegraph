import React, { useEffect, useState } from 'react'
import '../style/Chatbox.css'
import { ref, set ,push,onValue} from "firebase/database";
import {realdb} from '../firebase'

const uniqueString = (str1,str2) =>{
    if(str1>str2){
        return str1+str2;
    }else{
        return str2+str1;
    }
}

export default function Chatbox({closeChatbox,currentChat,currentUser}) {
    const [message, setmessage] = useState('')
    const [chats, setchats] = useState({})
    const [messages, setmessages] = useState([])

    const sendMessage = async (event) => {
        event.preventDefault();
        if(message===''){
            return
        }
        try {
            const messageListRef = ref(realdb, '/chats/' + uniqueString(currentChat.uid,currentUser.uid) + '/messages/');
            const newMessageRef = push(messageListRef);
            const result = await set(newMessageRef, {
                text : message,
                sender : currentUser.uid
            });
        } catch (error) {
            console.log(error);  
        }
        setmessage('')
    }

    useEffect(() => {
        const messagesRef = ref(realdb, '/chats/' + uniqueString(currentChat.uid,currentUser.uid) + '/messages/');
        onValue(messagesRef, (snapshot) => {
          const data = snapshot.val();
          setchats(data)
        });
    }, [])

    useEffect(() => {
        var msgArray = [];
        for (const msgId in chats) {
            console.log(`${msgId}: ${JSON.stringify(chats[msgId])}`);
            if(chats[msgId]['sender']===currentUser.uid){
                msgArray.push(
                <div key={msgId} className='chatOutgoing'>
                    <div>{chats[msgId]['text']}</div>
                </div>)
            }else{
                msgArray.push(
                <div key={msgId} className='chatIncoming'>
                    <div>{chats[msgId]['text']}</div>
                </div>)
            }
        }
        setmessages(msgArray)
    }, [chats])

    return (
        <div className='chatbox'>
            <div className='chatbox_head'>
                <img src={`https://avatars.dicebear.com/api/identicon/${currentChat.uid}.svg`} alt="" />
                <div>
                    <span>{currentChat.name}</span>
                    <span></span>
                    {/* <span>Last Seen 6:56 PM</span> */}
                </div>
                <i onClick={()=>closeChatbox()} class="fas fa-times"></i>
            </div>
            <div className='chatbox_middle'>
                {/* <div className='chatIncoming'>
                    <div>are ye name me konsi file add krni h</div>
                </div>
                <div className='chatOutgoing'>
                    <div>ab khola bhai</div>
                </div> */}
                {
                    messages
                }
            </div>
            <div className='chatbox_foot'>
                <input value={message} onInput={(event)=>setmessage(event.target.value)} type="text" />
                <i onClick={(event)=>sendMessage(event)} class="fas fa-caret-square-right"></i>
            </div>
        </div>
    )
}
