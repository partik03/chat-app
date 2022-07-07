import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useRef, useState } from 'react'
import "../componentStyles/AddPost.css"
import { useData } from '../context/context'
import { db, storage } from '../firebaseConfig/firebaseConfig'
const AddPost = () => {
    const {uid,navigate,user,setPosts,setPostBool,postBool,posts} = useData()
    const [img, setImg] = useState()
    const descRef = useRef()
    function handleImg(e) {
        const setImage = e.target.files[0]
        console.log(setImage);
        setImg(setImage);
    }
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() +1 ;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let hours = dateObj.getHours();
    let mins = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    let newDate = `${year}${month}${day}${hours}${mins}${seconds}`;
    function handleSubmit(e) {
       e.preventDefault();
        const storageRef = ref(storage,`post-images/${Date.now()}`)
        uploadBytes(storageRef,img).then(()=>{
            getDownloadURL(storageRef).then((url)=>{
                addDoc(collection(db,'posts'),{
                    desc:descRef.current.value,
                    postImage:url,
                    uid:uid,
                    profImg:user[0].profimage,
                    email:user[0].email,
                    username:user[0].username,
                    date: newDate,
                }
                // setPosts({...pos})
                ).then(()=>{
                    console.log("Post added successfully");
                    alert("Post added successfully");
                    setPostBool(!postBool)
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                })
                .catch((err)=>{
                    console.log(err.message);
                })
            })
            .catch((err)=>{
                console.log(err.message);
            })
           
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
  return (
    <div className='inputForm'>
        <form className='formOri' onSubmit={handleSubmit}>
            <input type="file" accept='image/jpeg,image/jpg,image/png' placeholder='Add a picture' onChange={handleImg}/>
            <input type="text" placeholder='Add A Description' ref={descRef} />
        <button id='btn'>Add Post</button>
        </form>
    </div>
  )
}

export default AddPost