import { useState } from "react";
import ChatbotContext from "./ChatbotContext";

const ChatbotState = (props)=>{
    
    const [displayAttachment, setDisplayAttachment] = useState(0);
  
    return (
        <ChatbotContext.Provider value={{displayAttachment, setDisplayAttachment}}>
            {props.children}
        </ChatbotContext.Provider>
    )
}

export default ChatbotState;