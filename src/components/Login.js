import React from 'react'
import "../componentStyles/SignUp.css"
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRef } from 'react';
import { useData } from '../context/context';
const Login = () => {
  const {setUidCookie,setUid} = useData()
  const auth = getAuth()
  const navigate = useNavigate()
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log("hi");
    signInWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value)
    .then((e)=>{
      const user = e.user
      setUidCookie(user.uid)
      setUid(user.uid)
      console.log(user);
      setTimeout(() => {
        navigate('/')
      }, 2000);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <div>
    <div className="formOuter">
        <h1>Login To your Account <span style={{color:"#00b4d8",background:"transparent"}}>.</span></h1>
        <h4 style={{background:"transparent"}}>New User?  <Link to="/signup" style={{color:"#00b4d8"}}>Create Account</Link></h4>
        <form className='form' onSubmit={handleSubmit}>
          <div className="input-container">

          <input type="text" placeholder='Enter your email' ref={emailRef}/>
          <PersonIcon className='icons'/>
                    </div>
                    <div className="input-container">

          <input type="password" placeholder='Enter Your Password' ref={passwordRef}/>
          <KeyRoundedIcon className='icons'/>
                    </div>
          <button>Login</button>
        </form>
    </div>
</div>
  )
}
export default Login