import React, { useContext } from 'react';
import './NewConversationBox.css'
import ChatbotState from '../../../context/chatbotContext/chatbotState';
import ChatbotContext from '../../../context/chatbotContext/ChatbotContext';

export default function NewConversationBox() {

    const {setDisplayCreateConversationBox} = useContext(ChatbotContext);

    const handleCancle = ()=>{
        setDisplayCreateConversationBox(0);
    }

    const handleCreate = ()=>{
        setDisplayCreateConversationBox(0);
    }

    const handleKeyDown = (e)=>{
        if(e.key === "Enter")
            handleCreate();
    }

  return (
    <div className='new-coversation-dialog-box'>
        <div className='header-container'>
            Start A New Conversation
        </div>

        <div className='chat-name-input-container'>
            Enter the conversation name: 
            <input className='chat-name-input-box' type="text" placeholder='Eg. Python Doubts' onKeyDown={handleKeyDown} />
        </div>

        <div className="action-buttons-container">
            <button className='cancel-btn action-button' onClick={handleCancle}>
                Cancle
            </button>
            <button className="create-btn action-button" onClick={handleCreate}>
                Create
            </button>
        </div>
    </div>
  )
}
