import {React, useEffect, useRef} from 'react';
import DOMPurify from "dompurify";
import './Messages.css'

export default function Messages({messages}) {

  const endOfMessagesRef = useRef(null);

  useEffect(()=>{
    if(endOfMessagesRef.current){
      endOfMessagesRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);

  function cleanAndFormatText(input) {
    // Step 1: Replace double stars `**` used for emphasis with nothing
    let formattedText = input.replace(/\*\*/g, "");

    // Step 2: Replace triple backticks with opening and closing <code> tags
    formattedText = formattedText.replace(/```/g, "<code>");

    // Step 3: Add closing </code> tags where <code> is opened but not yet closed
    // For any instance of <code> followed by text without a closing </code>
    formattedText = formattedText.replace(/<code>([^<]*)/g, "<code>$1</code>");

    // Step 4: Preserve indentation and line breaks by not collapsing whitespace
    // Newlines are already retained in the input. Ensure the output doesn't collapse them.
    // (No specific handling needed here, as we retain the format)

    return formattedText;
}

  const getMessageContent = (message)=>{
    if(message.role !== 'attachment') return cleanAndFormatText(message.content);

    else if(message.role === 'attachment' && message.attachment.attachmentType === 'github'){
      return `<strong>GitHub Attachment:</strong> ${message.attachment.attachmentName}`
    }
  }

  return (
    <div className="messages">
    {messages.map((message, index) => (
      <div key={index} className={`message-item ${message.role === 'bot'?"assistant":(message.role==="user")?"user":"attachment"}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize('<pre class = "message-item-pre">'+ getMessageContent(message) +'</pre>') }}>
      </div>
    ))}
    
    <div ref={endOfMessagesRef}></div>    
  </div>

  
  )
}
