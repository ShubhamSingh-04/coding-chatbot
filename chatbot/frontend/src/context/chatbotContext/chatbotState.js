import { useState } from "react";
import ChatbotContext from "./ChatbotContext";

const ChatbotState = (props) => {

  const [userName, setUserName] = useState("User");

  const [userID, setUserID] = useState("675069150239fa9971f2a360");

  const [conversationsInfo, setConversationsInfo] = useState([]);

  const [displayAttachment, setDisplayAttachment] = useState(0);

  const [messages, setMessages] = useState([]);

  const [displaycreateConversationBox, setDisplayCreateConversationBox] = useState(0);

  const [displayDeleteConversationBox, setDisplayDeleteConversationBox] = useState(0);

  const [currentConversation, setCurrentConversation] = useState(null);

  const [typing, setTyping] = useState(0);

  const [currentConversationID, setCurrentConversationID] = useState(null);

  return (
    <ChatbotContext.Provider value={{userName, setUserName, userID, setUserID, conversationsInfo, setConversationsInfo, displayAttachment, setDisplayAttachment, messages, setMessages, displaycreateConversationBox, setDisplayCreateConversationBox, currentConversation, setCurrentConversation, typing, setTyping, displayDeleteConversationBox, setDisplayDeleteConversationBox, currentConversationID, setCurrentConversationID }}>
      {props.children}
    </ChatbotContext.Provider>
  )
}

export default ChatbotState;