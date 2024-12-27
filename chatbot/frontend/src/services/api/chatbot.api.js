import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const checkOnline = () => {
    return navigator.onLine; // Return true or false based on online status
}

const fetchResponse = async (conversationID, sentMessage) => {
    const online = checkOnline();

    if (!online) {
        return "<div class='error-message'>Error Occurred! Check your internet connection & try again</div>";
    }
    else{
        const data = {conversationID, sentMessage}

        return axios.post(`${baseURL}/api/ai/chatbot`, data)
        .then((response) => {
            return response.data.message;
        })
        .catch((error) => {
            console.error(error);
            return "<div class = 'error-message'>Error Occoured at the backend while generating the response.-</div>";
        });
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