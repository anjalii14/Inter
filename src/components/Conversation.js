import React, { useState, useEffect, useContext } from 'react'
import profile from "../assets/Rectangle 47.png";
import axios from 'axios';
export default function Conversation({conversation,currentUser, currentText}) {
    const [user, setUser] = useState({
		user: {
			_id: "",
			name: "",
			email: "@gmail.com",
			password: "",
			picture: "",
			collegeName: "",
			year: 2,
			branch: "",
			interests: [],
			following: [],
			followers: [],
			posts: [],
			createdAt: "",
			__v: 2,
		},
		url: "",});
  const token = localStorage.getItem('token');
  
//   console.log("hello");
  useEffect(()=>{
   
      const friendId = conversation.members.find((m) => m !== currentUser);
      
    const getUser= async () =>{
      try{
        if (token) {
            const userId = localStorage.getItem('userId');
  
            axios({
                          method: "get",
              url: `https://inter-api-8q0x.onrender.com/user/${friendId}`,
                          
                          headers: {
                              Authorization: `Bearer ${token}`,
                          },
                      }).then((response) => {
                          setUser(response.data);
             
                      });
  
          }    }
      catch(err){
        console.log(err);
      }
    
    }
    getUser();
  },[conversation, currentUser, currentText]);


  return (
    <div className="message cursor-pointer">
          <div className="items-center pt-3 space-x-6 flex pb-3">
            <div>
              <img src={user.url}   className="rounded-full h-12 w-12 ml-8"></img>
            </div>
            <div className="block ">
              <div className="flex flex-row justify-between items-center mr-4">
                      <h1 className="text-sm font-medium ">{user.user.name }</h1>
                <p className="text-xs font-medium text-slate-500  mr-4">
                  16 Jan
                </p>
              </div>
              <p className="text-xs text-slate-400 mr-4">
                {currentText}
              </p>
            </div>
          </div>
          {/* <hr></hr> */}
        </div>
  )
}