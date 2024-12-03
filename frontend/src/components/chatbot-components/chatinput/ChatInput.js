import React from 'react';
import { useState, useRef, useContext } from 'react';
import DOMPurify from "dompurify";
import './ChatInput.css';

import { Attachment } from "../../chatbot-components";
import ChatbotContext from '../../../context/chatbotContext/ChatbotContext';
import { fetchResponse } from '../../../services/api/chatbot.api';


export default function ChatInput({ setMessages }) {

  const { displayAttachment, setDisplayAttachment, setDisplayCreateConversationBox, typing, setTyping } = useContext(ChatbotContext);
  const inputBoxRef = useRef(null);
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (event) => {
    setDisplayCreateConversationBox(0);
    setInputMessage(event.target.value);
    setDisplayAttachment(0);
  }

const handleSendMessage = async () => {
  setDisplayCreateConversationBox(0);
  setDisplayAttachment(0);

  const formattedMessage = DOMPurify.sanitize(inputMessage.trim().split('\n').join('<br> '));
  if (formattedMessage.length === 0) return;
    setInputMessage("");

  setMessages((prevMessages) => [
    ...prevMessages,
    { role: "user", content: formattedMessage },
  ]);

  setTyping(1);

  const response = await fetchResponse(formattedMessage);

  // Add assistant's response to the conversation
  setMessages((prevMessages) => [
    ...prevMessages,
    { role: "assistant", content: response },
  ]);

  setTyping(0);
};

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  const handelAttachmentDisplay = (e) => {
    setDisplayAttachment(displayAttachment ? 0 : 1);
  }
  return (
    <div className='inputArea'>
      {displayAttachment ? <Attachment /> : null}

      <button className='attachIcon-btn' onClick={handelAttachmentDisplay}>
        <img className="linkIcon inputIcon" src={`${process.env.PUBLIC_URL}/attach-file.png`} alt="" />
      </button>

      <textarea ref={inputBoxRef} className='inputBox' type="text" value={inputMessage} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='Ask Here' />

      <button className='sendBtn' onClick={handleSendMessage} disabled={inputMessage === ""}>
        <img className="sendIcon inputIcon" src={`${process.env.PUBLIC_URL}/send.png`} alt="" />
      </button>

    </div>
  )
}
