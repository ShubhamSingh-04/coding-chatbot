import ChatbotContext from "./ChatbotContext";

const ChatbotState = (props)=>{
    const state = {
        "name": "Shubham",
        "class":"5b"
    }
    return (
        <ChatbotContext.Provider value={state}>
            {props.children}
        </ChatbotContext.Provider>
    )
}

export default ChatbotState;