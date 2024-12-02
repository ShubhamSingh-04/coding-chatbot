import React, { useState, useContext } from 'react'
import './chatbot-side-panel.css';
import ChatbotContext from '../../../context/chatbotContext/ChatbotContext';

export default function ChatBotSidePanel() {
  const {setDisplayAttachment, displaycreateConversationBox, setDisplayCreateConversationBox, conversations, currentConversation, setCurrentConversation} = useContext(ChatbotContext);

  const handelCurrentConversation = (index)=>{
    setDisplayAttachment(0);
    setCurrentConversation(index);
  }

  const handleCreateConversation = () =>{
      if(displaycreateConversationBox)
         setDisplayCreateConversationBox(0);
      else setDisplayCreateConversationBox(1);

      setDisplayAttachment(0);
  }

  return (
    <div className='side-panel'>
      <div className="side-panel-action-buttons">
        <p className='history-header-title'>Conversation History</p>

        <button className='delete-button side-bar-action-btn'>
          <img className='delete-button-icon' src="/delete.png" alt="" />
        </button>

        <button className='new-chat-button side-bar-action-btn' onClick={handleCreateConversation}>
          +
        </button>
      </div>

      <div className='history-list'>
        {conversations.map((ele, index)=>(
          <div key={index} className={`history-list-item ${index === currentConversation? "current_conversation":""}`} onClick={()=> handelCurrentConversation(index)}>
            {ele}
          </div>
        ))}
      </div>
    </div>
  )
}
