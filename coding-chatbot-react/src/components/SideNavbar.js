import React from 'react';
import './SideNavbar.css';

export default function SideNavbar() {
  return (
    <div className='SideBar'>
        <button className='chatbot-icon-btn'>
          <img className='chatbot-icon-img' src={`${process.env.PUBLIC_URL}/chatbot-icon-sidebar.png`} alt="" />
        </button>
      </div>
  )
}
