import React from 'react'
import {Link} from "react-router-dom"
import "../componentStyles/NavBar.css"
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import { useData } from '../context/context';
import { Avatar } from '@mui/material';
import {IoAddCircleOutline} from 'react-icons/io5'
import { BsChatDotsFill } from "react-icons/bs";
const NavBar = () => {
  const {user,logout} = useData()
  return (
    <div>
<nav>
    <div className="left">
  <Link to='/'>
      <ChatBubbleRoundedIcon style={{fontSize:"2rem",paddingLeft:"2rem",color:"orange"}}/>
      <SendRoundedIcon style={{fontSize:"2rem",color:"blue"}}/>
    </Link>
    </div>
{
  !user?
<div className="btns">
    <Link to='/login'><button>Login</button></Link>
    <Link to='/signup'><button>SignUp</button></Link>
</div>
:
<div className='right btns'>
  <Link to='/addpost'>
  <IoAddCircleOutline style={{
    color:"white",
    fontSize:"2rem",
    
  }}/>
  </Link>
  <button onClick={logout}>Logout</button>
  <Link to='/userchats'>
  <BsChatDotsFill style={{
    fontSize:"2rem",
    color:"white"
  }}/>
  </Link>
<Link to='/userprofile'><Avatar src={user[0].profimage} style={{
  fontSize:"2rem",
  width:"2rem",
  height:'2rem',
  margin:"0 0 0 1rem"
}}/></Link>
</div>

}
</nav>

    </div>
  )
}

export default NavBar