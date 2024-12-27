import {React, useContext} from 'react';
import './WelcomePrompt.css';
import ChatbotContext from '../../../context/chatbotContext/ChatbotContext';

export default function WelcomePrompt() {

  const {conversationsInfo, currentConversationID} = useContext(ChatbotContext);
  return (
    <div className='welcome-prompt'>
      {
        (conversationsInfo.length === 0)?
          "Create A New Conversation & Let's Get Coding!" 
          :
          (currentConversationID === null)?
            "Create Or Continue A Conversation & Let's Get Coding!"
            :
            ""
      }
    </div>
  )
}
