import axios from 'axios';

const fetchResponse = async (message) => {

    const checkOnline = () => {
        console.log(navigator.onLine);
        return navigator.onLine; // Return true or false based on online status
    }

    const online = await checkOnline();

    if (!online) {
        return "<div class='error-message'>Error Occurred! Check your internet connection & try again</div>";
    }
    else{
        const data = {sentMessage : message}

        return axios.post("http://localhost:5000/api/ai/chatbot", data)
        .then((response) => {
            return response.data.message;
        })
        .catch((error) => {
            return "<div class = 'error-message'>Error Occoured at the backend while generating the response.-</div>";
        });
    }
};


const createConversation = async(userID, conversationName)=>{
    const data = {userID, conversationName};

    return axios.post("http://localhost:5000/api/db/chatbot/createConversation", data)
    .then((response)=>{
        return response.data
    })
    .catch((error)=>{
        console.error("Error Occoured at chatbot.api.js:", error);
    })
}


const getConversationsForUser = async(userID)=>{
    const params = {userID};

    return axios.get("http://localhost:5000/api/db/chatbot/getconversation", {params})
    .then((response)=>{
        console.log("chatbot.api.js fr: ", response)
        return response.data.conversationsInfo;
    })
    .catch((error)=>{
        console.error("Error occoured at chatbot.api.js:", error);
    })
}

export {fetchResponse, createConversation, getConversationsForUser};