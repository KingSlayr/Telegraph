import React, { useState } from 'react'
import '../style/Register.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import {auth,db} from '../firebase'
import loader from '../assets/loader.gif'

function Register({setroute}) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setname] = useState('')

    const register = (event) => {
        document.querySelector('.loaderRegistration').style.display = 'flex'
        var newuser;
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            newuser = userCredential.user;
        })
        .then(()=>{
            setDoc (doc(db, "users",newuser.uid), {
                name: name,
                email: email
            }).then(result=>{
                document.querySelector('.loaderRegistration').style.display = 'none';
                window.localStorage.setItem('telegraphuser',JSON.stringify({
                    name: name,
                    email: email,
                    uid:newuser.uid,
                    type:'user'
                }))
                setroute('/')
            })
        })
        .catch((error) => {
            console.log(error);
            document.querySelector('.loaderRegistration').style.display = 'none';
            alert(error.message)
        });
    }
    return (
        <>
            <div className='loaderRegistration'><img src={loader} style={{height:'5vh'}} />    </div>
            <div className='register'>
                <div>
                    <h1>Register</h1>
                    <label htmlFor="name">Name</label>
                    <input value={name} onInput={(event)=>setname(event.target.value)} type="text" name='name' />
                    <label htmlFor="email">Email</label>
                    <input value={email} onInput={(event)=>setemail(event.target.value)} type="email" name='email' />
                    <label htmlFor="password">Password</label>
                    <input value={password} onInput={(event)=>setpassword(event.target.value)} type="password" name='password' />
                    <button onClick={(event)=>register(event)}>Register</button>
                    <button onClick={()=>setroute('/login')}>Login</button>
                </div>
            </div>
        </>
    )
}

export default Register
