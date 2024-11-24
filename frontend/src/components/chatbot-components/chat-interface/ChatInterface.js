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

  const {messages, setMessages, displaycreateConversationBox} = useContext(ChatbotContext);

  return (
    <>
        <div className='chatinterface'>
          <div className='chatbotName'>Codley</div>

          { displaycreateConversationBox ? <NewConversationBox/> : null}     
               
          { 
          (messages.length===0)?<WelcomePrompt/>:<Messages messages = {messages}/>
          }
          
          <ChatInput setMessages = {setMessages} messages = {messages}/>
        </div>
    </>
  )
}
