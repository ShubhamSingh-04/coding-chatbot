import React from 'react';
import { useState } from 'react';
import './ChatInput.css';

export default function ChatInput() {

  const handelInputChange = (event)=>{
      setInputMessage(event.target.value);
  }

    const [inputMessage, setInputMessage] = useState("");

  return (
    <div className='inputArea'>
        <button className='linkIcon-btn'>
            <img className="linkIcon inputIcon" src={`${process.env.PUBLIC_URL}/attach-file.png`} alt="" />
        </button>
        <textarea className='inputBox' type="text" value = {inputMessage} onChange={handelInputChange} placeholder='Ask Here'/>
        <button className='sendBtn'> 
            <img className="sendIcon inputIcon" src={`${process.env.PUBLIC_URL}/send.png`} alt="" />
        </button>
    </div>
  )
}
