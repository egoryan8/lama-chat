import React, {useContext, useEffect, useState} from 'react';
import Message from "./Message";
import {ChatContext} from "../context/ChatContext";
import {onSnapshot, doc} from "firebase/firestore";
import {db} from "../firebase";

const Messages: React.FC = () => {
  const [messages, setMessages] = useState([]);
  const {data} = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      //@ts-ignore
      doc.exists() && setMessages(doc.data().messages);
    })

    return () => {
      unSub();
    }
  },[data.chatId])

  return (
    <div className='messages'>
      {messages.map((m) => (
        // @ts-ignore
        <Message message={m} key={m.id}/>
      ))}
    </div>
  );
};

export default Messages;