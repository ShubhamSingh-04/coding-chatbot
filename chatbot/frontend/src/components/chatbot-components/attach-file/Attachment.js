import React, { useContext, useRef, useState } from 'react';
import './Attachment.css'
import ChatbotContext from '../../../context/chatbotContext/ChatbotContext';
import { handleAttachmentUpload } from '../../../services/api/chatbot.api';

export default function Attachment() {
  const gitLinkInput = useRef();
  const { setDisplayAttachment, currentConversationID, setMessages, setTyping } = useContext(ChatbotContext);

  const [activeInput, setActiveInput] = useState("github");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  // const handleFileInputHeader = () => {
  //   setActiveInput("file")
  // }

  const handleGitInputHeader = () => {
    setActiveInput("github");
  }

  const handleGitHubAttachmentUpload = async () => {
    try {
      setDisplayAttachment(0);
      setTyping(1);

      const attachmentContent = await handleAttachmentUpload(currentConversationID, 'github', gitLinkInput.current.value.trim());


      const attachmentName = attachmentContent.attachmentInfo.attachmentName;

      setTyping(0);
      setMessages((prevMessages) => [
        ...prevMessages,

        { role: "attachment", 
          attachment:{
            attachmentType:'github',
            attachmentName
        } },

        { role: "bot", content: attachmentContent.response}
      ])
    } catch (error) {
      setTyping(0);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "attachment", 
          attachment:{
            attachmentType:'github',
            attachmentName:`<div class='error-message'>Error Occoured! Check the link and access permissions and try again!</div>`
        } }
      ])
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (activeInput === "github" && gitLinkInput.current.value.trim() !== '') {
      await handleGitHubAttachmentUpload();
    }

  }

  return (
    <div className='attachment-container'>
      <div className='attachment-header'>
        {/* <p className={`attachment-header-title ${activeInput === "file" ? "active" : ""}`} onClick={handleFileInputHeader}>
          File
        </p> */}
        <p className={`attachment-header-title ${!(activeInput === "file") ? "active" : ""}`} onClick={handleGitInputHeader}>
          GitHub
        </p>
      </div>
      <div className='attachment-body'>

        <form className='attachment-form'>
          {activeInput === "file" ?
            <div className='file-input'>
              <input type="file" onChange={handleFileChange} />
            </div>
            :
            <div className='git-hub-input'>
              <input ref={gitLinkInput} type="text" placeholder='https://github.com/username/repository/' />
            </div>
          }
          <button type='submit' className='submit-button' onClick={handleSubmit} > {`${activeInput === "file" ? "Upload File" : "Fetch Code"}`}</button>
        </form>
      </div>
    </div>
  )
}
