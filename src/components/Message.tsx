import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";

// @ts-ignore
const Message: React.FC = ({message}: {message: any}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  console.log(message);
  return (
    <div className='message owner'>
      <div className="messageInfo">
        <img
          src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
          alt=""/>
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img
          src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
          alt=""/>
      </div>
    </div>
  );
};

export default Message;