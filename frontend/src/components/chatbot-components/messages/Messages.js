import {React, useEffect, useRef} from 'react';
import DOMPurify from "dompurify";
import './Messages.css'

export default function Messages({messages}) {

  const endOfMessagesRef = useRef(null);

  function addHtmlTags(apiResponse) {
    const parts = apiResponse.split("\n\n");

    // Initialize the HTML response
    // let htmlResponse = "<div class='html-tag-div'>\n";
    let htmlResponse = '';
    parts.forEach((part) => {
        if (part.startsWith("**")) {
            // Add bold headers for each option
            htmlResponse += `<h3>${part.replace(/\*\*/g, "").trim()}</h3>\n`;
        } else if (part.startsWith("```python") || part.startsWith("```java")) {
            // Handle code blocks (start)
            const codeBlock = part.replace("```python", "").trim();
            htmlResponse += `<pre><code class="language-python">${codeBlock}</code></pre>\n`;
        } else if (part.startsWith("```")) {
            // Ignore the end of code blocks
        } else {
            // Wrap plain text in paragraphs
            htmlResponse += `<p>${part}</p>\n`;
        }
    });

    // Close the wrapping div
    // htmlResponse += "</div>";

    return htmlResponse;
}




  useEffect(()=>{
    if(endOfMessagesRef.current){
      endOfMessagesRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);

  return (
    <div className="messages">
    {messages.map((message, index) => (
      <div key={index} className={`message-item ${message.role === 'assistant'?"assistant":"user"}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize('<pre class = "message-item-pre">'+ message.content +'</pre>') }}>
      </div>
    ))}
    
    <div ref={endOfMessagesRef}></div>    
  </div>

  
  )
}
