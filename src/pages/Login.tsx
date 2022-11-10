import React from 'react';
import addAvatar from '../img/addAvatar.png';

const Login: React.FC = () => {
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Lama Chat</span>
        <span className='title'>Вход</span>
        <form>
          <input type='email' placeholder='email'/>
          <input type='password' placeholder='password'/>
          <button>Войти</button>
        </form>
        <p>У тебя нет аккаунта? Зарегистрироваться</p>
      </div>
    </div>
  );
};

export default Login;