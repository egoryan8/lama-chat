import React, {useContext, useState} from 'react';
import {collection, query, where, getDoc, getDocs, setDoc, updateDoc, serverTimestamp, doc} from "firebase/firestore";
import {db} from "../firebase";
import {AuthContext} from "../context/AuthContext";

const Search: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState({
    displayName: '',
    photoURL: '',
    uid: '',
  });
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);

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
  };

  const handleKey = (e: React.KeyboardEvent) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), {messages: []});

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

      }
    } catch (err) {
      setErr(true);
    }

    setUser({
      displayName: '',
      photoURL: '',
      uid: '',
    });
    setUserName('');
  };

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Найти пользователя'
               onKeyDown={handleKey}
               onChange={e => setUserName(e.target.value)}
               value={userName}
        />
      </div>
      {err && <span>Пользователь не найден</span>}
      {user.displayName &&
        <div className="userChat" onClick={handleSelect}>
          <img
            src={user.photoURL}
            alt="Аватар пользователя"/>
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>}
    </div>
  );
};

export default Search;