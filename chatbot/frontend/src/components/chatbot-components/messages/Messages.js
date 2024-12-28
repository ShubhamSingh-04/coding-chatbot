import { React, useEffect, useRef } from 'react';
import DOMPurify from "dompurify";
import './Messages.css'

export default function Messages({ messages }) {

  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  function cleanAndFormatText(inputText) {
    // Regular expression to match text enclosed in triple backticks (```)
    const codeBlockRegex = /```([\s\S]*?)```/g;

    // Replace code blocks with escaped HTML and <code> tags
    const formattedCode = inputText.replace(codeBlockRegex, (match, code) => {
        // Escape < and > for HTML safety
        const escapedCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `<code>${escapedCode}</code>`;
    });

    // Regular expression to match text enclosed in ** (for bold formatting)
    const boldTextRegex = /\*\*(.*?)\*\*/g;

    // Replace bold markers with <b> tags
    const formattedText = formattedCode.replace(boldTextRegex, (match, boldText) => {
        return `<b>${boldText}</b>`;
    });

    return formattedText;
  }

  const getMessageContent = (message) => {
    if (message.role !== 'attachment') return cleanAndFormatText(message.content);

    else if (message.role === 'attachment' && message.attachment.attachmentType === 'github') {
      return `<strong>GitHub Attachment:</strong> ${message.attachment.attachmentName}`
    }
  }

  return (
    <div className="messages">
      {messages.map((message, index) => (
        <div key={index} className={`message-item ${message.role === 'bot' ? "assistant" : (message.role === "user") ? "user" : "attachment"}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize('<pre class = "message-item-pre">' + getMessageContent(message) + '</pre>') }}>
        </div>
      ))}

      <div ref={endOfMessagesRef}></div>
    </div>


  )
}
