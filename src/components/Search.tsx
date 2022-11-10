import React from 'react';

const Search: React.FC = () => {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Найти пользователя'/>
      </div>
      <div className="userChat">
        <img src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt=""/>
        <div className="userChatInfo">
          <span>Егор</span>
        </div>
      </div>
    </div>
  );
};

export default Search;