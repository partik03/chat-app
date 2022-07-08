import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import '../componentStyles/Post.css'
const Post = ({el}) => {
  return (
    <div className='post' 
    >
    <div   style={{
        background:"rgb(61, 59, 59)",
    }}>
            <div className="top">
            <Link to={`/friendprofile/${el.uid}`} 
           
            ><Avatar src={el.profImg} /></Link>
            <div className="top-data" style={{
                margin:"1rem"
            }}>
                <Link to={`/friendprofile/${el.uid}`} 
                 style={{
                    textDecoration:'none',
                    color:'white'
                }}
                ><h4 style={{margin:"0rem"}}>{el.username}</h4></Link>
                <p style={{
                    margin:"0rem"
                }}>{el.email}</p>
            </div>
            </div>
            <div className="mid">
            <img src={el.postImage} alt="" />
            </div>
            <div className="bottom">
            <Link to={`/friendprofile/${el.uid}`} 
                 style={{
                    textDecoration:'none',
                    color:'white'
                }}
                ><span
                style={{
                    marginRight:'1rem',
                    fontWeight:'bolder'
                }}
                >{el.username}</span>
                </Link>
           {el.desc}
            </div>
        </div>
    </div>
  )
}

export default Post