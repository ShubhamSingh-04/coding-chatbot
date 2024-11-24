import React, { useState } from 'react'
import './chatbot-side-panel.css';

export default function ChatBotSidePanel() {

  const [current_conversation, setCurrentConversation] = useState(0);

  const historyList = [
       "React Queries",
        "Code Review",
        "Algorithm Discussion",
        "Error Fixing",
        "Code Completion",
        "Syntax Help",
        "Code Refactoring",
        "Logic Walkthrough",
        "Snippet Optimization",
        "Feature Implementation"
  ];

  const handelCurrentConversation = (index)=>{
    setCurrentConversation(index);
  }

  return (
    <div className='side-panel'>
      <div className="side-panel-action-buttons">
        <p className='history-header-title'>Conversation History</p>

        <button className='new-chat-button'>
          +
        </button>
      </div>

      <div className='history-list'>
        {historyList.map((ele, index)=>(
          <div key={index} className={`history-list-item ${index === current_conversation? "current_conversation":""}`} onClick={()=> handelCurrentConversation(index)}>
            {ele}
          </div>
        ))}
      </div>
    </div>
  )
}
