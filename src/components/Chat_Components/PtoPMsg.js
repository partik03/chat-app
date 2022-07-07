import { Avatar } from '@mui/material'
import { addDoc, collection, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../../componentStyles/PtoPMsg.css"
import { useData } from '../../context/context'
import { db } from '../../firebaseConfig/firebaseConfig'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import EmojiPicker from 'emoji-picker-react'
import { async } from '@firebase/util'
const PtoPMsg = () => {
    const {user,navigate} = useData()
    const {fuseruid} = useParams()
    const [showEmoji, setShowEmoji] = useState(false)
    const [messages, setMessages] = useState([])
    const [friendData, setFriendData] = useState('')
    const getUser = async() =>{
        const q1 = query(collection(db,'users'),where('uid','==',fuseruid))
        const data  = await getDocs(q1)
        setFriendData(data.docs.map((e)=>({...e.data(),id:e.id})));
        // const q2 = query(collection(db,'posts'),where('uid','==',fuseruid))
        // const data2  = await getDocs(q2)
        // setFriendPosts(data2.docs.map((e)=>({...e.data(),id:e.id})));
      }
    useEffect(() => {
      getUser()
    }, [])
    let currentUser = friendData[0];
    let msgData;
    useEffect(() => {
      if (user) {
        if (user[0].uid > fuseruid) {
            msgData = `${user[0].uid}_${fuseruid}`
        }
        else{
            msgData = `${fuseruid}_${user[0].uid}`
    
        }
      }
    })
    const [typedMsg, setTypedMsg] = useState('')
    const onEmojiClick =(event, emojiObject)=>{
      setTypedMsg(typedMsg+emojiObject.emoji);
    
    }
   const emoji= useCallback(
     () => {
       setShowEmoji(!showEmoji)
       console.log('p')
      
      },
      [showEmoji],
    )
   let dateObj = new Date();
   let month = dateObj.getUTCMonth() +1 ;
   let day = dateObj.getUTCDate();
   let year = dateObj.getUTCFullYear();
   let hours = dateObj.getHours();
   let mins = dateObj.getMinutes();
   let seconds = dateObj.getSeconds();
   const getMsgs =async()=>{
    const postsref = collection(db , `chats-${msgData}`)
    const q = query(postsref , orderBy('date','asc'));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    setMessages(querySnapshot.docs.map((e)=>({...e.data(),id:e.id})));
  }
      useEffect(() => {
          getMsgs()
        if(messages)
           console.log(messages);
      },[])
      
   const sendMsg = (e)=>{
    e.preventDefault();
    let newDate = `${year}${month}${day}${hours}${mins}${seconds}`;
    addDoc(collection(db,`chats-${msgData}`),{
      typedMsg,from:user[0].uid,date:newDate
    })
    .then((data)=>{
      console.log(data);
      getMsgs();
      console.log("Msg saved to db successfully");
      setTypedMsg('')
    })
    .catch((err)=>{
      console.log(err);
    })
   }
  return (
    <>
    { friendData ?
        <div className='msg-main'>
          <div className="msg-inner">
    <div className="msg-nav">
      <Avatar src={friendData[0].profimage} style={{marginRight:'1rem'}}/>  
         {friendData[0].username} 
    </div>
    <div className="msg-section">
      {
      messages ?
       <div>
      {messages &&  messages.map((e)=>{
        return(
        <div>
          {
            e.from == user[0].uid ?
            <div className='right-msg msg'>
              <p>{e.typedMsg}</p>
            </div>
            :
            <div className='left-msg msg'>
              <p>{e.typedMsg}</p>
            </div>
          }
         </div>
        )
      }
      )}
    </div>  
   
    :
    <div>
      NO Messages
    </div>
    }
      {showEmoji && 
      <div style={{position:'absolute',bottom:'0%'}}>
      <EmojiPicker pickerStyle={{
      width:'20rem',
      position:'sticky',
      top:'44%',
      
      
      }} onEmojiClick={onEmojiClick}/>
      </div>
}


    </div>
    <div className="msg-input">
      <MdOutlineEmojiEmotions 
      style={{
        fontSize:'2.3rem',
        marginLeft:'1rem',
        color:'rgb(69, 69, 80)',
        cursor:'pointer'
      }}
      onClick={emoji}
      />
      <input type="text" placeholder='Type a message' value={typedMsg} onChange={(e)=>{setTypedMsg(e.target.value)}}/>
      <AiOutlineSend style={{color:'rgb(69, 69, 80)',fontSize:'2.3rem',marginRight:'1rem',cursor:'pointer'}}
      onClick={sendMsg}
      />
    
    </div>
    </div>
    </div>
    :
    <div>iewu</div>
    }  
    </>
  )
}

export default PtoPMsg