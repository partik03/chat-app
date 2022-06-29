import './App.css';
import {Routes,Route} from "react-router-dom"
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { useData } from './context/context';
import { useEffect } from 'react';
import UserProfile from './components/UserProfile';
import UserChats from './components/UserChats';
import { db } from "./firebaseConfig/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import NavBar from './components/NavBar';
import AddPost from './components/AddPost';
import { ref } from 'firebase/storage';
function App() {
  const auth =getAuth()
  const {setUser,navigate,uid,setUserPosts,setPosts} = useData()
  async function getData(id) {
    const q = query(collection(db,'posts'),where('uid','==',id))
    const querySnapshot = await getDocs(collection(db, "posts"));
    const data = await getDocs(q)
    setUserPosts(data.docs.map((e)=>({...e.data(),id:e.id})));
    setPosts(querySnapshot.docs.map((e)=>({...e.data(),id:e.id})));
  }
  const getUserData =()=>{
    auth.onAuthStateChanged(userLogged=>{
      if(userLogged){
        async function getUser() {
          const uidVal = userLogged.uid
          const q = query(collection(db,'users'),where('uid','==',uidVal))
          const data = await getDocs(q)
          setUser(data.docs.map((e)=>({...e.data(),id:e.id})))
          getData(uidVal)
        }
        getUser()
      }
      else{
        setUser(null)
      }
    })
  }
  useEffect(() => {
   if(!uid){
    navigate('/login')
   }
   else{
      getUserData()
   }
  },[uid])
  return ( 
    <>
    <NavBar/>
  { uid ?
  <div>
  <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path ="/signup" element={<SignUp/>}/>
      <Route path='*' element={<Home/>}/>
      <Route path='/userprofile' element={<UserProfile/>}/>
      <Route path='/userchats' element={<UserChats/>}/>
      <Route path='/addpost' element={<AddPost/>}/>
      
   </Routes>
   </div>
   :
   <div>
    <Routes>
      <Route exact path="*" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path ="/signup" element={<SignUp/>}/>
    </Routes>
   </div>
   }
   </>
  );
}

export default App;
