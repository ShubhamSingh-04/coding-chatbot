import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const checkOnline = async () => {
    try {
        await fetch("https://www.google.com/", { mode: "no-cors" });
        return true; // Online if fetch succeeds
    } catch (error) {
        console.error("Online check failed:", error);
        return false; // Offline if fetch fails
    }
};

const fetchResponse = async (conversationID, sentMessage) => {
    try {
        const online = await checkOnline();
        console.log("Online status:", online);

        if (!online) {
            return "<div class='error-message'>Error Occurred! Check your internet connection & try again</div>";
        }

        const data = { conversationID, sentMessage };

        // Sending POST request using axios
        const response = await axios.post(`${baseURL}/api/ai/chatbot`, data);
        return response.data.message; // Return the backend-generated response
    } catch (error) {
        console.error("Error in fetchResponse:", error);
        return "<div class='error-message'>Error occurred at the backend while generating the response.</div>";
    }
};

const handleAttachmentUpload = async(conversationID, attachmentType, attachmentContent)=>{
    const attachmentData = (attachmentType === 'github')?
                        {
                            conversationID,
                            attachment:{
                                type:attachmentType,
                                gitURL:attachmentContent
                            }
                        } 
                        :
                        {
                            conversationID,
                            attachment:{}
                        };

        return axios.post(`${baseURL}/api/ai/chatbot/attachment`, attachmentData)
        .then((response)=>{
            return response.data;
        })
        .catch((error)=>{
            throw new Error(error);
        });
}


const createConversation = async(userID, conversationName)=>{
    const data = {userID, conversationName};

    return axios.post(`${baseURL}/api/db/chatbot/createConversation`, data)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        console.error("Error Occoured at chatbot.api.js:", error);
    })
}


const getConversationsForUser = async(userID)=>{
    const params = {userID};

    return axios.get(`${baseURL}/api/db/chatbot/getconversation`, {params})
    .then((response)=>{
        return response.data.conversationsInfo;
    })
    .catch((error)=>{
        console.error("Error occoured at chatbot.api.js:", error);
    })
}

const deleteConversationAndUpdate = async(userID, conversationID)=>{
    const data = {userID, conversationID};

    return axios.post(`${baseURL}/api/db/chatbot/deleteConversationAndUpdate`, data)
    .then((response)=>{
        return response.data.conversationsInfo
    })
    .catch((error)=>{
        console.error("Error Occoured at deleteConversationAndUpdate chatbot.api.js:", error);
    })

}

const fetchMessages = async(userID, conversationID)=>{
    const params = {userID, conversationID};

    return axios.get(`${baseURL}/api/db/chatbot/fetchMessages`, {params})
    .then((response)=>{
        return response.data.messages;
    })
    .catch((error)=>{
        console.error("Error at fetchMessages() chatbot.api.js:", error);
        return [];
    })
}

export {fetchMessages, 
        fetchResponse, 
        createConversation, 
        getConversationsForUser, 
        deleteConversationAndUpdate,
        handleAttachmentUpload
};