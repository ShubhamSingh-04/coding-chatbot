import axios from 'axios';

const fetchResponse = (message) => {
    const data = {sentMessage : message}
    return axios.post("http://localhost:5000/api/ai/chatbot", data)
        .then((response) => {
            return response.data.message;
        })
        .catch((error) => {
            return "<div class = 'error-message'>Error Occoured while generating the response. Check your internet connection & try again</div>";
        });
};

export {fetchResponse};