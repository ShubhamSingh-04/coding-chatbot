import React, { useContext, useRef} from 'react';
import './NewConversationBox.css'
import ChatbotContext from '../../../context/chatbotContext/ChatbotContext';

import {createConversation} from '../../../services/api/chatbot.api'

export default function NewConversationBox() {
    const nameInput = useRef();

    const {userID, setDisplayCreateConversationBox, setConversationsInfo, setCurrentConversation} = useContext(ChatbotContext);

    const handleCancle = ()=>{
        setDisplayCreateConversationBox(0);
    }

    const handleCreate = async ()=>{
        if( nameInput.current.value!==''){
            const capitalizeFirstLetter =  nameInput.current.value.charAt(0).toUpperCase() + nameInput.current.value.slice(1);

            const newConversationInfo = await createConversation(userID, capitalizeFirstLetter);

            setConversationsInfo((prevConversationsInfo)=>[
                newConversationInfo,
                ...prevConversationsInfo                
            ]
            );
    }
        
        setDisplayCreateConversationBox(0);
        setCurrentConversation(0);
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
            <input ref={nameInput} className='chat-name-input-box' type="text" placeholder='Eg. Python Doubts' onKeyDown={handleKeyDown}/>
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
