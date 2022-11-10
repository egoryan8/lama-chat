import React, {useState} from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";

import {useNavigate, Link} from "react-router-dom";
import {auth} from "../firebase";

const Register: React.FC = () => {
  const [isErr, setIsErr] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
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
          <input type='email' placeholder='Введите email'/>
          <input type='password' placeholder='Введите пароль'/>
          <button>Зарегестрироваться</button>
          {isErr && <span style={{color: 'red', fontSize: '14px', margin: '0 auto'}}>Что-то пошло не так</span>}
        </form>
        <p>Нет аккаунта? <Link to='/register'>Зарегестрироваться</Link></p>
      </div>
    </div>
  );
};

export default Register;