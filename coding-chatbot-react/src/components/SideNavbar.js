import React from 'react';
import './SideNavbar.css';

import { Link } from 'react-router-dom';

export default function SideNavbar() {
  return (
    <div className='side-bar'>
        <Link className='chatbot-icon-btn sidebar-btn' to="/">
          <img className='chatbot-icon-img sidebar-btn-img' src={`${process.env.PUBLIC_URL}/chatbot-icon-sidebar.png`} alt="" />
        </Link>

        <Link className='code-editor-icon-btn sidebar-btn' to="/magic-editor">
          <img className='code-editor-icon-img sidebar-btn-img' src={`${process.env.PUBLIC_URL}/code-editor-icon-sidebar.png`} alt="" />
        </Link>
      </div>
  )
}
