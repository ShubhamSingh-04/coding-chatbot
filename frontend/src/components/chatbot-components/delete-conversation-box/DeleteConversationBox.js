import React, { useContext} from 'react';
import './DeleteConversationBox.css'
import ChatbotContext from '../../../context/chatbotContext/ChatbotContext';

import { deleteConversationAndUpdate } from '../../../services/api/chatbot.api';

export default function DeleteConversationBox() {
    const {userID, setDisplayCreateConversationBox, conversationsInfo, currentConversation, setConversationsInfo, setCurrentConversation, setDisplayDeleteConversationBox} = useContext(ChatbotContext);

    const handleCancle = ()=>{
        setDisplayDeleteConversationBox(0);
    }

    const handleDelete = async ()=>{
        setDisplayCreateConversationBox(0);
        setCurrentConversation(0);

        const currentConversationID = conversationsInfo[currentConversation]._id;
        const updatedConversationsInfo = await deleteConversationAndUpdate(userID, currentConversationID);

        setDisplayDeleteConversationBox(0);

        updatedConversationsInfo?
            setConversationsInfo(updatedConversationsInfo)
            :
            setConversationsInfo([]);
    }

  return (
    <div className='delete-coversation-dialog-box'>
        <div className='delete-conversation-header-container'>
            {`Delete Conversation?`} 
        </div>
        <div>
        {`'${conversationsInfo[currentConversation].conversationName?
                conversationsInfo[currentConversation].conversationName
                :
                ''}' will be deleted`} 
        </div>
        <div className="action-buttons-container">
            <button className='delete-conversation-cancel-btn delete-conversation-action-button' onClick={handleCancle}>
                Cancle
            </button>
            <button className="delete-btn delete-conversation-action-button" onClick={handleDelete}>
                Delete
            </button>
        </div>
    </div>
  )
}
