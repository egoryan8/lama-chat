import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats: React.FC = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        // @ts-ignore
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u: any) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {/*@ts-ignore*/}
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          /*@ts-ignore*/
          onClick={() => handleSelect(chat[1].userInfo)}
          >
          {/*@ts-ignore*/}
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            {/*@ts-ignore*/}
            <span>{chat[1].userInfo.displayName}</span>
            {/*@ts-ignore*/}
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;