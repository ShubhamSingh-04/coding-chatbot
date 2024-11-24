import React from 'react';
import { useState, useRef } from 'react';
import DOMPurify from "dompurify";

import {Attachment} from "../../chatbot-components";

import './ChatInput.css';

export default function ChatInput({ setMessages }) {

 const inputBoxRef = useRef(null);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
    setDisplayAttachment(0);
  }

  const handleSendMessage = () => {
    setDisplayAttachment(0);
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

  const handelAttachmentDisplay = (e) =>{
    setDisplayAttachment(displayAttachment?0:1);
  }

  const [inputMessage, setInputMessage] = useState("");
  const [displayAttachment, setDisplayAttachment] = useState(0);

  return (
    <div className='inputArea'>
      {displayAttachment? <Attachment displayAttachment = {displayAttachment} setDisplayAttachment = {setDisplayAttachment}/>: null}

      <button className='attachIcon-btn' onClick={handelAttachmentDisplay}>
        <img className="linkIcon inputIcon" src={`${process.env.PUBLIC_URL}/attach-file.png`} alt=""/>
      </button>

      <textarea ref={inputBoxRef} className='inputBox' type="text" value={inputMessage} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='Ask Here' />

      <button className='sendBtn' onClick={handleSendMessage} disabled={inputMessage === ""}>
        <img className="sendIcon inputIcon" src={`${process.env.PUBLIC_URL}/send.png`} alt="" />
      </button>

    </div>
  )
}
