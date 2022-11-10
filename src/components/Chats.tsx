import React, {useContext, useEffect, useState} from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../firebase";
import {AuthContext} from "../context/AuthContext";
const Chats = () => {

  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
   const getChats = () => {
     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
       // @ts-ignore
       return setChats(doc.data());
     });

     return () => {
       unsub();
     };
   };
   currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log(Object.entries(chats));

  return (
    <div className='chats'>
      {
        Object.entries(chats)?.map(chat => (
          <div className="userChat" key={chat[0]}>
            {/* @ts-ignore*/}
            <img src={chat[1].userInfo.photoURL} alt="Аватар пользователя"/>
            <div className="userChatInfo">
              {/* @ts-ignore*/}
              <span>{chat[1].userInfo.displayName}</span>
              {/* @ts-ignore*/}
              <p>{chat[1].userInfo.text}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Chats;