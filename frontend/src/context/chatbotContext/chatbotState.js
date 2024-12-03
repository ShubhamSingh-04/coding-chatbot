import { useState } from "react";
import ChatbotContext from "./ChatbotContext";

const ChatbotState = (props)=>{
    
    const [displayAttachment, setDisplayAttachment] = useState(0);

    const [messages, setMessages] = useState([
        {
          "role": "user",
          "content": "Can you explain what React is?"
        },
        {
          "role": "assistant",
          "content": "React is a JavaScript library for building user interfaces, developed by Facebook. It allows developers to create reusable UI components and manage the state of applications efficiently using a declarative approach."
        },
        {
          "role": "user",
          "content": "What do you mean by declarative approach?"
        },
        {
          "role": "assistant",
          "content": "In a declarative approach, you describe what the UI should look like for a given state, and React takes care of updating the DOM to match that description. For example, instead of manually updating the DOM, you define components and let React render them as per the state changes."
        },
        {
          "role": "user",
          "content": "How does React handle state?"
        },
        {
          "role": "assistant",
          "content": "React handles state using the `useState` hook in functional components or by defining a `state` "
        },
        {
          "role": "user",
          "content": "What are props in React?"
        },
        {
          "role": "assistant",
          "content": "Props (short for 'properties') in React are immutable inputs passed from a parent component to a child component. They allow data to flow from parent to child components, enabling dynamic rendering of components. For example, you can pass a title prop to a button component to display different text on different buttons."
        },
        {
          "role": "user",
          "content": "Can you give an example of a functional component with props and state?"
        },
        {
          "role": "assistant",
          "content": "Certainly! Here's an example:\n\n```javascript\nimport React, { useState } from 'react';\n\nfunction Counter({ initialCount }) {\n  // useState hook to manage state\n  const [count, setCount] = useState(initialCount);\n\n  return (\n    <div>\n      <h1>Count: {count}</h1>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n      <button onClick={() => setCount(count - 1)}>Decrement</button>\n    </div>\n  );\n}\n\nexport default Counter;\n```\n\nIn this example:\n- The `initialCount` is passed as a prop to the `Counter` component.\n- The `useState` hook is used to manage the `count` state.\n- Buttons are provided to increment and decrement the count dynamically."
        }
      ]
      );  

      const [displaycreateConversationBox, setDisplayCreateConversationBox] = useState(0);

      const [conversations, setConversations] = useState([
        "React Queries",
         "Code Review",
         "Algorithm Discussion",
         "Error Fixing",
         "Code Completion",
         "Syntax Help",
         "Code Refactoring",
         "Logic Walkthrough",
         "Snippet Optimization",
         "Feature Implementation",
         "Syntax Help",
         "Code Refactoring",
         "Logic Walkthrough",
         "Snippet Optimization",
         "Feature Implementation",
         "Syntax Help",
         "Code Refactoring",
         "Logic Walkthrough",
         "Snippet Optimization",
         "Feature Implementation",
         "Syntax Help",
         "Code Refactoring",
         "Logic Walkthrough",
         "Snippet Optimization",
         "Feature Implementation"
   ]);

   const [currentConversation, setCurrentConversation] = useState(0);

   const [typing, setTyping] = useState(0);
  
    return (
        <ChatbotContext.Provider value={{displayAttachment, setDisplayAttachment, messages, setMessages, displaycreateConversationBox, setDisplayCreateConversationBox, conversations, setConversations, currentConversation, setCurrentConversation, typing, setTyping}}>
            {props.children}
        </ChatbotContext.Provider>
    )
}

export default ChatbotState;