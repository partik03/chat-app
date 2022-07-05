import React, { useState } from 'react'
import { useData } from '../context/context'

const UserChats = () => {
  const {user} = useData();
  const [chats, setChats] = useState([])
  return (
    <div
    style={{
      color:'white'
    }}
    >

    </div>
  )
}

export default UserChats