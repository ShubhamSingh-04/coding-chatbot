import React from 'react'
import './Messages.css'

export default function Messages({content}) {
  return (
    <div className="messages">
    {content.map((message, index) => (
      <div key={index} className={`messageItem ${message.role == 'assistant'?"assistant":"user"}`}>
        {message.content}
      </div>
    ))}
  </div>
  )
}
