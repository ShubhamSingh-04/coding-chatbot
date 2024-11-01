import React, { useState } from 'react';
import './ChatInterface.css';
import ChatInput from './ChatInput';
import Messages from './Messages';
import WelcomePrompt from './WelcomePrompt';

export default function ChatInterface() {



  const [messages, setMessages] = useState(null);

  return (
    <>
        <div className='chatinterface'>
          <div className='chatbotName'>Codley</div>
          {!messages?<WelcomePrompt/>:<Messages/>}
          <ChatInput/>
        </div>
    </>
  )
}
