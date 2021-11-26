import React, { useState } from 'react'
import '../style/Login.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import {  doc, getDoc } from "firebase/firestore"; 
import {auth,db} from '../firebase'
import loader from '../assets/loader.gif'


function Login({setroute}) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const login = (event) => {
        document.querySelector('.loaderLogin').style.display = 'flex'
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user);
            getDoc(doc(db,'users',userCredential.user.uid)).then((d)=>{
                window.localStorage.setItem('telegraphuser',JSON.stringify({
                    name: d.data().name,
                    email: email,
                    uid:userCredential.user.uid
                }))
                document.querySelector('.loaderLogin').style.display = 'none'
                setroute('/')
            })
        })
        .catch((error) => {
          console.log(error);
          document.querySelector('.loaderLogin').style.display = 'none'
          alert(error.message)
        });
    }
    return (
        <>
            <div className='loaderLogin'><img src={loader} style={{height:'5vh'}} />    </div>
            <div className='login'>
                <div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input onInput={(event)=>setemail(event.target.value)} type="email" name='email' />
                    <label htmlFor="password">Password</label>
                    <input onInput={(event)=>setpassword(event.target.value)} type="password" name='password' />
                    <button onClick={(event)=>login(event)}>Login</button>
                    <button onClick={()=>setroute('/register')}>Register</button>
                </div>
            </div>
        </>
    )
}

export default Login
