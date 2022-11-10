import React, {useState} from 'react';
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import {auth, db, storage} from "../firebase";

import addAvatar from '../img/addAvatar.png';
const Register: React.FC = () => {


  const [isErr, setIsErr] = useState(false)
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        // @ts-ignore
        (error) => {
         setIsErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })

          });
        }
      );

    } catch (e) {
      setIsErr(true);
    }


  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Lama Chat</span>
        <span className='title'>Регистрация</span>
        <form onSubmit={handleFormSubmit}>
          <input type='text' placeholder='display name'/>
          <input type='email' placeholder='email'/>
          <input type='password' placeholder='password'/>
          <input style={{display: 'none'}} type='file' id='file'/>
          <label htmlFor='file'>
            <img src={addAvatar} alt='Добавить аватар'/>
            <span>Добавить аватар</span>
          </label>
          <button>Зарегестрироваться</button>
          {isErr && <span style={{color: 'red', fontSize: '14px', margin: '0 auto'}}>Что-то пошло не так</span>}
        </form>
        <p>У тебя уже есть аккаунт? Войти</p>
      </div>
    </div>
  );
};

export default Register;