import React from 'react';
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";

const Home: React.FC = () => {
  return (
    <div className='home'>
      <div className='container'>
        <SideBar/>
        <Chat/>
      </div>
    </div>
  );
};

export default Home;