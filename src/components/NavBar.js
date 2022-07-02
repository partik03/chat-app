import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import "../componentStyles/NavBar.css"
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import { useData } from '../context/context';
import { Avatar } from '@mui/material';
import {IoAddCircleOutline, IoSearchOutline,IoSearchCircleOutline} from 'react-icons/io5'
import { AiOutlineMenuFold } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebaseConfig';
const NavBar = () => {
  const {user,logout,navigate} = useData()
  const [search, setSearch] = useState('')
  // const [users, setUsers] = useState()
  const [userSearchData, setUserSearchData] = useState('')
  const [active, setActive] = useState(false)
 const handleSearch=async() => {
    console.log("singh");
    const getUser = async() =>{
      const q = query(collection(db,'users'),where('email','==',search))
      const data  = await getDocs(q)
      setUserSearchData(data.docs.map((e)=>({...e.data(),id:e.id})))
      console.log(userSearchData);
    
    }
       getUser();
       if (userSearchData.length!=0 ) {
        navigate(`/friendprofile/${userSearchData[0].uid}`)
       }
      console.log(userSearchData);
      
      // setSearch('')
    }
  // const getUsers =async()=>{
  //   const data =await getDocs(collection(db,'users'));
  //   setUsers(data.docs.map((e)=>({...e.data(),id:e.id})))
  //   console.log(users);

  // }
  return (
    <div>
<nav>
    <div className="left">
  <Link to='/'>
      <ChatBubbleRoundedIcon style={{fontSize:"2rem",paddingLeft:"2rem",color:"orange"}}/>
      <SendRoundedIcon style={{fontSize:"2rem",color:"blue"}}/>
    </Link>
    </div>
   {user &&  
  <div className='searchMain'>
    <div className="searchInner">
   <div className='input-container1'>
      <input 
      type="text"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />
      <IoSearchOutline
       className='icons1'
      />
    </div>
      <div 
      className="button"
      onClick={handleSearch}
      >
        Search
      </div>
    </div>
    </div>
}
{
  !user?
  <>
        <div className="btns">
            <Link to='/login'><button>Login</button></Link>
            <Link to='/signup'><button>SignUp</button></Link>
        </div>
        <AiOutlineMenuFold
        style={{
          fontSize:'2rem',
          color:'white'
        }}
        className="menuIcon"
        />
  </>
        :
        <>
        <div className='right btns'>
          <IoSearchCircleOutline id='searchIcon'
          style={{
            color:"white",
            fontSize:"2.4rem",
            
          }}
          />
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
      <AiOutlineMenuFold
      style={{
        fontSize:'2rem',
        color:'white'
      }}
      className="menuIcon"
      onClick={()=>{setActive(!active)}}
      />
      </>
}
{user && <div className={`nav-menu ${active?'active':''}`}>

        <div className='searchMain' id='nav-menu-search'>
          <div className="searchInner" id='nav-menu-searchInner'>
         <div className='input-container1'>
            <input 
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
            <IoSearchOutline
             className='icons1'
            />
          </div>
            <div 
            className="button"
            onClick={()=>{handleSearch();setActive(!active)}}
            id='btn'
            >
              Search
            </div>
          </div>
          </div>
      <button onClick={()=>{logout();setActive(!active);}}>Logout</button>
          <Link to='/userchats'>
          <button onClick={()=>setActive(!active)}>Chats</button>
          </Link>
          <Link to='/addpost'>
          <button onClick={()=>setActive(!active)}>Add Post</button>
          </Link>
      <Link  to='/userprofile'><Avatar onClick={()=>setActive(!active)} src={user[0].profimage} style={{
        width:"3rem",
        height:'3rem',
        margin:"0 0 10rem 1rem",
        position: "absolute",
        top: "2%",
        right: "2%",
      }}
      className='profileAvatar'
      /></Link>

  </div>}
  </nav>

    </div>
  )
}

export default NavBar