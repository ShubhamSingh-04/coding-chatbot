import React, { useState } from 'react';
import './ChatInterface.css';
import ChatInput from '../chatinput/ChatInput';
import Messages from '../messages/Messages';
import WelcomePrompt from '../welcome-prompt/WelcomePrompt';

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
