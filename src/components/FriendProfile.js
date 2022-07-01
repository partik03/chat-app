import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../componentStyles/Userprofile.css'
import { useData } from '../context/context'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebaseConfig';
import { useParams } from 'react-router-dom';
const FriendProfile = () => {
    const {user} = useData()
    const { fuseruid } = useParams()
    const [friendData, setFriendData] = useState()
    const [friendPosts, setFriendPosts] = useState()
    const getUser = async() =>{
        const q1 = query(collection(db,'users'),where('uid','==',fuseruid))
        const data  = await getDocs(q1)
        setFriendData(data.docs.map((e)=>({...e.data(),id:e.id})));
        const q2 = query(collection(db,'posts'),where('uid','==',fuseruid))
        const data2  = await getDocs(q2)
        setFriendPosts(data2.docs.map((e)=>({...e.data(),id:e.id})));
      }
      useEffect(() => {
        getUser()
      }, [])
      
  return (
    <div>
      {friendData &&
        <div className='user-section'>
          <Avatar src={friendData[0].profimage} style={{
            width:"30vw",
            height:"30vw"
          }}/>

          <div className='user-details'>
          <h1>{friendData[0].username} {user[0].uid != friendData[0].uid && <button className='msg-btn'>Message</button>}</h1>
          <h1>{friendData[0].email}</h1>
          </div>
        </div>
          }
         {
              friendPosts &&
          <div className="user-posts">
            <button
            style={{
                padding:'1rem',
                fontSize:'1.4rem',
                fontWeight:'bold'
            }}
            >{friendData[0].username}'s Posts</button>
            <div className="your-posts">
              {
              friendPosts.map((e)=>{
                return(
                  <>
            <div className="postOut">
            <img src={e.postImage} />
            </div>
            </>
                )
              })}
            </div>
            

          </div>
}
    </div>
  )
}

export default FriendProfile