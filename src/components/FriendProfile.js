import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../componentStyles/Userprofile.css'
import { useData } from '../context/context'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebaseConfig';
import { Link, useParams } from 'react-router-dom';
const FriendProfile = () => {
    const {user,cookies} = useData()
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
      const addToUserChats =() =>{
        const addFriendtoLogged =()=>{
          const q = query(collection(db,`allchats-${user[0].uid}`),where('fuseruid','==',fuseruid));
          getDocs(q).then((data)=>{
            console.log(data.docs);
            if(data.docs){
              console.log('User already added to chat list');
            }
            else {
              addDoc(collection(db,`allchats-${user.uid}`),{
                fuseruid:friendData[0].uid,fprofilepic:friendData[0].profimage,fusername:friendData[0].username,
              })
             
            }
          })
          .then(()=>{
            console.log('User added to chatlist');
          })
          .catch(()=>{
            console.log("User not added to chatlist");
          })
        }
        const addLoggedtoFriend =()=>{
          const q = query(collection(db,`allchats-${fuseruid}`),where('fuseruid','==',user[0].uid));
          getDocs(q).then((data)=>{
            console.log(data.docs);
            if(data.docs.length!=0){
              console.log('User already added to chat list');
            }
            else {
              addDoc(collection(db,`allchats-${fuseruid}`),{
                fuseruid:user[0].uid,
                fprofilepic:user[0].profimage,fusername:user[0].username,
              })
             
            }
          })
          .then(()=>{
            console.log('User added to chatlist');
          })
          .catch(()=>{
            console.log("User not added to chatlist");
          })
        }
        addFriendtoLogged();
        addLoggedtoFriend();
      }
      useEffect(() => {
        getUser()
      }, [])
      if(friendPosts){
        friendPosts.sort((a,b)=>{
          return b.date -a.date;
        })
      }
      
  return (
    <div>
      {friendData &&
        <div className='user-section'>
          <Avatar src={friendData[0].profimage} style={{
            width:"30vw",
            height:"30vw"
          }}/>

          <div className='user-details'>
          <h1>{friendData[0].username} <Link to={`/p2pmsg/${fuseruid}`}>{user[0].uid != friendData[0].uid && <button className='msg-btn' onClick={addToUserChats}>Message</button>}</Link></h1>
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