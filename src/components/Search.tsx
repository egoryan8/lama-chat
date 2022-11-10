import React, {useState} from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../firebase";

const Search: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState({
    displayName: '',
    photoURL: '',
  });
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where("displayName", '==', userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // @ts-ignore
        return setUser(doc.data());
      });
    } catch (e) {
      setErr(true);
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    e.code === 'Enter' && handleSearch();
  }
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Найти пользователя'
               onKeyDown={handleKey}
               onChange={e => setUserName(e.target.value)}/>
      </div>
      { err && <span>Пользователь не найден</span>}
      { user.displayName &&
        <div className="userChat">
        <img
          src={user.photoURL}
          alt="Аватар пользователя"/>
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div> }
    </div>
  );
};

export default Search;