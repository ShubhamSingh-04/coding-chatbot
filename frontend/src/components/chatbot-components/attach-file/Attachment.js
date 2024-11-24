import React, { useState } from 'react';
import './Attachment.css'

export default function Attachment({displayAttachment, setDisplayAttachment}) {
  const [activeInput, setActiveInput] = useState("file");
  const [gitLink, setGitLink] = useState(null);
  const [file, setFile] = useState(null);
 
  const handleFileChange = (e)=> {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  const handleFileInputHeader = ()=>{
    setActiveInput("file")
  }

  const handleGitInputHeader = ()=>{
    setActiveInput("gitHub")
  }

  const handleSubmit = ()=>{
    setDisplayAttachment(displayAttachment?0:1);
  }

  return (
      <div className='attachment'>
        <div className='attachment-header'>  
          <p className={`attachment-header-title ${activeInput === "file"? "active":""}`} onClick={handleFileInputHeader}>
            File
          </p>
          <p className={`attachment-header-title ${!(activeInput === "file")? "active":""}`} onClick={handleGitInputHeader}>
            GitHub
          </p>
        </div>
        <div className='attachment-body'>
        
          {activeInput === "file"?
            <div className='file-input'>
              <input type="file" onChange={handleFileChange}/>
            </div>
            :
            <div className='git-hub-input'>
              <input type="text" placeholder='https//:github.com/user'/>
            </div>
          }
          <button className='submit-button' onClick={handleSubmit} > {`${activeInput ==="file"? "Upload File":"Fetch Code"}`}</button>

        </div>
      </div>
  )
}
