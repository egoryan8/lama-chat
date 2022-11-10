import React from 'react';
import addAvatar from '../img/addAvatar.png';

const Register: React.FC = () => {
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Lama Chat</span>
        <span className='title'>Регистрация</span>
        <form>
          <input type='text' placeholder='display name'/>
          <input type='email' placeholder='email'/>
          <input type='password' placeholder='password'/>
          <input style={{display: 'none'}} type='file' id='file'/>
          <label htmlFor='file'>
            <img src={addAvatar} alt='Добавить аватар'/>
            <span>Добавить аватар</span>
          </label>
          <button>Зарегестрироваться</button>
        </form>
        <p>У тебя уже есть аккаунт? Войти</p>
      </div>
    </div>
  );
};

export default Register;