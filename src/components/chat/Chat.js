import React from 'react'
import { StreamChat } from 'stream-chat'
import { useData } from '../../context/context';
const Chat = () => {
    const {user} = useData()
    const client = StreamChat.getInstance("f6aebjxm4zpd");
    const token = await client.createToken(user.uid)
    console.log(token);
await client.connectUser(
    {
       id:user.uid,
       username:user.username,
       prof:user.profimage,
    },
   token,
)

  return (
    <div>
    
    </div>
  )
}

export default Chat