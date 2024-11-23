import {React, useEffect, useRef} from 'react';
import DOMPurify from "dompurify";
import './Messages.css'

export default function Messages({messages}) {

  const endOfMessagesRef = useRef(null);

  useEffect(()=>{
    if(endOfMessagesRef.current){
      endOfMessagesRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);

  

  return (
    <div className="messages">
    {messages.map((message, index) => (
      <div key={index} className={`message-item ${message.role === 'assistant'?"assistant":"user"}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }}>
      </div>
    ))}
    
    <div ref={endOfMessagesRef}></div>    
  </div>

  
  )
}
