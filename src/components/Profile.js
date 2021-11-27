import React, { useEffect, useState } from 'react'
import '../style/Profile.css'
import {  doc, updateDoc , getDoc  } from "firebase/firestore"; 
import {db,storage} from '../firebase'
import { ref, uploadBytes,getDownloadURL} from "firebase/storage";
import loader from '../assets/loader.gif'

function Profile({setprofileUser,setroute,profileUser}) {
    const [editScreen, seteditScreen] = useState(false)
    const [editName, seteditName] = useState('')
    const [editStatus, seteditStatus] = useState('')
    const [dp, setdp] = useState(null)
    const [meta, setmeta] = useState({})
    const [loading, setloading] = useState(false)
    const [currentUser, setcurrentUser] = useState(null)

    const videoInput = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        // console.log(file);
        setmeta({
            contentType:file.type
        })
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
          setdp(reader.result)
        };
    };
    
    const updateName = async () => {
        if(editName===''){
            return
        }
        const nameUpdate = await updateDoc  (doc(db, "users",currentUser.uid), {
            name: editName
        })
        // console.log(nameUpdate);
    }

    const updateStatus = async () => {
        if(editStatus===''){
            return
        }
        const statusUpdate = await updateDoc  (doc(db, "users",currentUser.uid), {
            status: editStatus
        })
        // console.log(statusUpdate);
    }

    const updateDp = async () => {
        if(dp===null){
            return;
        }
        const storageRef = ref(storage, '/users/'+currentUser.uid+'/'+'dp');
        uploadBytes(storageRef, dp,meta).then((snapshot) => {
            // console.log('Uploaded a blob or file!',snapshot.ref.fullPath);
            getDownloadURL(storageRef).then(res=>{
                updateDoc  (doc(db, "users",currentUser.uid), {
                    dp: res
                }).then((d)=>{
                    // console.log(d);
                })
            })
        });
    }

    const submitDetails = async () => {
        setloading(true)
        await updateName()
        await updateStatus()
        await updateDp()
        const updateduser = await getDoc(doc(db,'users',currentUser.uid));
        var u = updateduser.data();
        u.uid = currentUser.uid;
        window.localStorage.setItem('telegraphuser',JSON.stringify(u))
        setcurrentUser(JSON.parse(window.localStorage.getItem('telegraphuser')));
        setprofileUser(JSON.parse(window.localStorage.getItem('telegraphuser')));
        seteditName('')
        seteditStatus('')
        seteditScreen(false)
        setloading(false)
        setdp(null)
    }

    useEffect(() => {
        setcurrentUser(JSON.parse(window.localStorage.getItem('telegraphuser')));
    }, [])

    return (
        <div className='profile'>
            <i onClick={()=>setroute('/')} className="profile_back fas fa-arrow-left"></i>
            <div className='profile_div'>
                <img src={profileUser.dp?profileUser.dp:`https://avatars.dicebear.com/api/identicon/${profileUser.uid}.svg`} alt="" />
                <div><span>Name</span> : {profileUser.name}</div>
                {profileUser.status&&<div><span>Status</span> : {profileUser.status}</div>}
            </div>
            {currentUser?.uid===profileUser.uid&&<button onClick={()=>seteditScreen(true)} className='profileEditBtn'>Edit</button>}
            {editScreen&&<div className='editScreen'>
                <div className='profilEditDiv'>
                    <div>
                        <label htmlFor="name">Name : </label>
                        <input onInput={(event)=>seteditName(event.target.value)} type="text" name='name' />
                    </div>
                    <div>
                        <label htmlFor="status">Status : </label>
                        <input onInput={(event)=>seteditStatus(event.target.value)} type="text" name='status' />
                    </div>
                    <div>
                        <label htmlFor="dp">Display Picture : </label>
                        <input onInput={(event)=>videoInput(event)} style={{display:'none'}} id='inputFile' type="file" name='dp'/>
                        <button onClick={()=>document.getElementById('inputFile').click()} className='inputFile'>File</button>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-around'}}>
                        <button onClick={()=>seteditScreen(false)} className='submitedit'>Cancel</button>
                        <button onClick={()=>submitDetails()} className='submitedit'>Submit</button>
                    </div>
                </div>
            </div>}
            {loading&&<div className='profileLoader'><img src={loader} alt=""/></div>}
        </div>
    )
}

export default Profile
