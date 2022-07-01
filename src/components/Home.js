import React from 'react'
import { useData } from '../context/context'
import NavBar from './NavBar'
import Post from './Post'

const Home = () => {
  const {posts} = useData()
  return (
    <>
    <div className="postMain">
      {
        posts && 
        <div className="posts">
      {  
      posts.map((e)=>{
        return <Post el={e} />
        
      })}
      </div>
      }
    </div>
        
    </>
  )
}

export default Home