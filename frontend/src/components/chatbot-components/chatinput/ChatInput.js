import React from 'react';
import { useState, useRef } from 'react';
import DOMPurify from "dompurify";

import './ChatInput.css';

export default function ChatInput({ setMessages }) {

 const inputBoxRef = useRef(null);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  }

  const handleSendMessage = () => {
    const formattedMessage = DOMPurify.sanitize(inputBoxRef.current.value.trim().split('\n').join('<br> '));

    if (formattedMessage.trim().length !== 0) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "user",
          content: formattedMessage
        }
      ])
    }
    setInputMessage('');
  }

  const handleKeyDown = (e)=>{
    if(e.key === 'Enter' && e.shiftKey){
      e.preventDefault();
      handleSendMessage();
    }
  }

  const [inputMessage, setInputMessage] = useState("");

  return (
    <div className='inputArea'>

      <button className='linkIcon-btn'>
        <img className="linkIcon inputIcon" src={`${process.env.PUBLIC_URL}/attach-file.png`} alt="" />
      </button>

      <textarea ref={inputBoxRef} className='inputBox' type="text" value={inputMessage} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='Ask Here' />

      <button className='sendBtn' onClick={handleSendMessage}>
        <img className="sendIcon inputIcon" src={`${process.env.PUBLIC_URL}/send.png`} alt="" />
      </button>

    </div>
  )
}
