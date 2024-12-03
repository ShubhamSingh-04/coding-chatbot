import React, { useContext, useState} from 'react';
import './ChatInterface.css';

import {
  ChatInput,
  WelcomePrompt,
  Messages,
  NewConversationBox
} from '../../chatbot-components.js';

import ChatbotContext from '../../../context/chatbotContext/ChatbotContext.js';

export default function ChatInterface() {

  const {messages, setMessages, displaycreateConversationBox, typing} = useContext(ChatbotContext);

  return (
    <>
        <div className='chatinterface'>
          <div className='chatbotName'>Codley</div>

          { displaycreateConversationBox ? <NewConversationBox/> : null}     
               
          { 
          (messages.length===0)?<WelcomePrompt/>:<Messages messages = {messages}/>
          }
          
          {
            (typing)? <img src="typing.gif" alt="" className='typing-gif'/> : null
          }

          <ChatInput setMessages = {setMessages} messages = {messages}/>
        </div>
    </>
  )
}
