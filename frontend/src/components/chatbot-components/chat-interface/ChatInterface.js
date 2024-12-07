import React, { useContext} from 'react';
import './ChatInterface.css';

import {
  ChatInput,
  WelcomePrompt,
  Messages,
  NewConversationBox,
  DeleteConversationBox
} from '../../chatbot-components.js';

import ChatbotContext from '../../../context/chatbotContext/ChatbotContext.js';

export default function ChatInterface() {

  const {messages, setMessages, displaycreateConversationBox, typing, displayDeleteConversationBox, conversationsInfo, currentConversation} = useContext(ChatbotContext);

  return (
    <>
        <div className='chatinterface'>
          <div className='chatbotName'>Codley</div>

          { displaycreateConversationBox ? <NewConversationBox/> : null} 
          { displayDeleteConversationBox ? <DeleteConversationBox/> : null} 
              
               
          { 
          (messages.length===0 || conversationsInfo.length===0)?<WelcomePrompt/>:<Messages messages = {messages}/>
          }
          
          {
            (typing)? <img src="typing.gif" alt="" className='typing-gif'/> : null
          }

          {(null)? 
            null:
            <ChatInput setMessages = {setMessages} messages = {messages}/> 
          }
        </div>
    </>
  )
}
