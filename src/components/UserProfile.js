import { Avatar } from '@mui/material'
import React from 'react'
import { useData } from '../context/context'
import '../componentStyles/Userprofile.css'
const UserProfile = () => {
  const {user} = useData()
  return (
    <div>
      {user &&
        <div className='user-section'>
          <Avatar src={user[0].profimage} style={{
            width:"30vw",
            height:"30vw"
          }}/>

          <div className='user-details'>
          <h1>{user[0].username}</h1>
          <h1>{user[0].email}</h1>
          </div>
        </div>
          }
          <div className="user-posts">
            <button>Your Posts</button>
          </div>
    </div>
  )
}

export default UserProfile