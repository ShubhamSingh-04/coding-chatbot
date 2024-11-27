import React from 'react';
import { useState, useRef, useContext } from 'react';
import DOMPurify from "dompurify";
import { Attachment } from "../../chatbot-components";
import './ChatInput.css';
import ChatbotContext from '../../../context/chatbotContext/ChatbotContext';

import axios from 'axios';



export default function ChatInput({ setMessages }) {

  const { displayAttachment, setDisplayAttachment, setDisplayCreateConversationBox } = useContext(ChatbotContext);
  const inputBoxRef = useRef(null);
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (event) => {
    setDisplayCreateConversationBox(0);
    setInputMessage(event.target.value);
    setDisplayAttachment(0);
  }

  const fetchResponse = () => {
    return axios.get("http://localhost:5000")
        .then((response) => {
            return response.data.message; // Access response.data.message
        })
        .catch((error) => {
            console.log("Error at fetchResponse:", error);
            return null;
        });
};



const handleSendMessage = async () => {
  setDisplayCreateConversationBox(0);
  setDisplayAttachment(0);

  const formattedMessage = DOMPurify.sanitize(inputMessage.trim().split('\n').join('<br> '));
  if (formattedMessage.length === 0) return;

  // Add user's message to the conversation
  setMessages((prevMessages) => [
    ...prevMessages,
    { role: "user", content: formattedMessage },
  ]);

  // Fetch the assistant's response
  const response = await fetchResponse();

  // Add assistant's response to the conversation
  setMessages((prevMessages) => [
    ...prevMessages,
    { role: "assistant", content: response },
  ]);

  // Clear the input field
  setInputMessage("");
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
