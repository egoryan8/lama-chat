import React from 'react';
import { signOut } from 'firebase/auth';
import {auth} from "../firebase";

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>Lama Chat</span>
      <div className="user">
        <img src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt=""/>
        <span>Егор</span>
        <button onClick={() => signOut(auth)}>Выйти</button>
      </div>
    </div>
  );
};

export default Navbar;