import { Avatar } from '@mui/material'
import React from 'react'
import '../componentStyles/Post.css'
const Post = ({el}) => {
  return (
    <div className='post' 
    >
    <div   style={{
        background:"rgb(61, 59, 59)",
    }}>
            <div className="top">
            <Avatar src={el.profImg} />
            <div className="top-data" style={{
                margin:"1rem"
            }}>
                <h4 style={{margin:"0rem"}}>{el.username}</h4>
                <p style={{
                    margin:"0rem"
                }}>{el.email}</p>
            </div>
            </div>
            <div className="mid">
            <img src={el.postImage} alt="" />
            </div>
            <div className="bottom">
                <span
                style={{
                    marginRight:'1rem',
                    fontWeight:'bolder'
                }}
                >{el.username}</span>
           {el.desc}
            </div>
        </div>
    </div>
  )
}

export default Post