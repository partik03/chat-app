import { Avatar } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useData } from '../context/context'
import { db } from '../firebaseConfig/firebaseConfig';
import '../componentStyles/UserChats.css'
const UserChats = () => {
  const {cookies} = useData();
  const [chats, setChats] = useState([])
  const getUserChats=async()=>{
    const q1 = query(collection(db,`allchats-${cookies.uid}`))
    const data  = await getDocs(q1)
    console.log(data);
    setChats(data.docs.map((e)=>({...e.data(),id:e.id})))
    // console.log(chats);
    
  }
  useEffect(() => {
    console.log(cookies.uid);
  getUserChats()
  console.log(chats);
  }, [])
  
  return (
    <div>
<div className="userchats">
{chats && chats.map((e)=>{
  return(
    
    <Link to={`/p2pmsg/${e.fuseruid}`}>
    <div className="chat-nav">
      <Link to={`/friendprofile/${e.fuseruid}`}>
      <Avatar src={e.fprofilepic} style={{
        marginRight:'1rem',
        height:'10vw',
        width:'10vw',
        maxHeight:'5rem',
        maxWidth:'5rem'
    
    }}/>  
      </Link>
         {e.fusername} 
    </div>
    </Link>
  )
})}
</div>
    </div>
  )
}

export default UserChats