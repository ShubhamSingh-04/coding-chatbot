import React, { useContext, useEffect } from 'react'
import './chatbot-side-panel.css';
import ChatbotContext from '../../../context/chatbotContext/ChatbotContext';

import { fetchMessages, getConversationsForUser } from '../../../services/api/chatbot.api';

export default function ChatBotSidePanel() {
  const {setCurrentConversationID, userID, setDisplayAttachment, displaycreateConversationBox, setDisplayCreateConversationBox, conversationsInfo, setConversationsInfo, currentConversation, setCurrentConversation, setDisplayDeleteConversationBox, displayDeleteConversationBox, Messages, setMessages } = useContext(ChatbotContext);

  useEffect(() => {
    const fetchConversations = async () => {
      const fetchedConversationInfo = await getConversationsForUser(userID);
      fetchedConversationInfo ?
        setConversationsInfo(fetchedConversationInfo)
        :
        setConversationsInfo([]);
    };

    fetchConversations();
  });

  const handelCurrentConversation = async(index, conversationID) => {
    setDisplayAttachment(0);
    setDisplayCreateConversationBox(0);
    setDisplayDeleteConversationBox(0);
    setCurrentConversation(index);

    setCurrentConversationID(conversationID);

    const messages = await fetchMessages(userID, conversationID);
    setMessages(messages);
  }

  const handleCreateConversationBtn = () => {
    displaycreateConversationBox ?
      setDisplayCreateConversationBox(0)
      :
      setDisplayCreateConversationBox(1);

    setDisplayAttachment(0);
    setDisplayDeleteConversationBox(0);

  }

  const handleDeleteConversationBtn = () => {
    displayDeleteConversationBox ?
      setDisplayDeleteConversationBox(0)
      :
      setDisplayDeleteConversationBox(1);

    setDisplayAttachment(0);
    setDisplayCreateConversationBox(0);
  }

  return (
    <div className='side-panel'>
      <div className="side-panel-action-buttons">
        <p className='history-header-title'>Conversation History</p>

        <button className='delete-button side-bar-action-btn' onClick={handleDeleteConversationBtn}>
          <img className='delete-button-icon' src="/delete.png" alt="" />
        </button>

        <button className='new-chat-button side-bar-action-btn' onClick={handleCreateConversationBtn}>
          +
        </button>
      </div>

      <div className='history-list'>
        {conversationsInfo.length !== 0 &&
          conversationsInfo.map((ele, index) => (
            <div
              key={index}
              className={`history-list-item ${index === currentConversation ? "current_conversation" : ""}`}
              onClick={() => handelCurrentConversation(index, ele._id)}
            >
              {ele.conversationName ? ele.conversationName : ""}
            </div>
          ))
        }
      </div>
    </div>
  )
}
