import React, { useRef, useState } from 'react'
import "../componentStyles/SignUp.css"
import { Link, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import {createUserWithEmailAndPassword,getAuth} from 'firebase/auth'
import {storage,db} from '../firebaseConfig/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
const SignUp = () => {
    const emailRef =useRef();
    const usernameRef =useRef();
    const birthRef =useRef();
    const [img, setImg] = useState()
    const passwordRef =useRef();
    const auth =getAuth()
    const navigate =useNavigate()
    const handleImgChange=(e)=>{
      let selectedImg = e.target.files[0]
      console.log(selectedImg);
      setImg(selectedImg)
    }
  const handleSubmit =(e)=>{
e.preventDefault();
console.log(emailRef.current.value);
createUserWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value)
.then((e)=>{
  const user =e.user;
  
  const storageRef =ref(storage,`profile-images/${Date.now()}`);
  uploadBytes(storageRef,img).then(()=>{
    getDownloadURL(storageRef).then((url)=>{
      addDoc(collection(db,`users`),{
        email:emailRef.current.value,
        password:passwordRef.current.value,
        dob:birthRef.current.value,
        username:usernameRef.current.value,
        profimage:url,
        uid:user.uid
      }).then(()=>{
        console.log("User added successfully");
        setTimeout(()=>{
          navigate('/login')
        },2000)
      }).catch((err)=>{
        console.log(err);
      })
    })
  }).catch(err=>{
    console.log(err);
  })
}).catch(err=>{
  console.log(err);
})
  }
  return (
    <div>
        <div className="formOuter">
            <h1>Create a new Account <span style={{color:"#00b4d8",background:"transparent"}}>.</span></h1>
            <h4 style={{background:"transparent"}}>Already Have an account? <Link to="/login" style={{color:"#00b4d8"}}>Log In</Link></h4>
            <form className='form' onSubmit={handleSubmit}>
              <div className="input-container">

          <input ref={emailRef} type="email" placeholder='Enter Your email' />
          <EmailIcon className='icons' />
              </div>
              <div className="input-container">

          <input type="text" placeholder='Enter your username' ref={usernameRef} />
          <PersonIcon className='icons'/>
              </div>
              <div className="input-container special">
            <input type="date" placeholder='Enter Your Date of Birth' ref={birthRef} />
            <DateRangeIcon className='icons'/>
              </div>
              <div id="profileImg" className='input-container special'>
                <input type="file" accept='image/png,image/jpg,image/gif,image/jpeg' placeholder='Choose a profile pic' onChange={handleImgChange} />
                <AddAPhotoRoundedIcon className='icons'/>
              </div>
              <div className="input-container">

          <input type="password" placeholder='Enter Your Password' ref={passwordRef} />
          <KeyRoundedIcon className='icons'/>
              </div>
        <button>SignUp</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp