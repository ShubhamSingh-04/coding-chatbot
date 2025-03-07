const {
  GoogleGenerativeAI
} = require("@google/generative-ai");

require('dotenv').config();
console.log("Gen AI Script Running");


const API_key = process.env.GEMINI_API_KEY;
const { get_conversation_history } = require('./conversation-history.cjs')

if (!API_key)
  console.error("ALERT: API Key Not Found. Please add API_KEY in your .env file");

const genAI = new GoogleGenerativeAI(API_key);


function checkOnlineStatus() {
  const https = require('https');
  const options = {
    host: 'www.google.com',
    timeout: 2000, // Set timeout in milliseconds
  };

  const request = https.request(options, (response) => {
    return true
  });

  request.on('error', (err) => {
    return false
  });

  request.end();
}


const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",

  systemInstruction: "Your name is 'Codley' a fine-tuned gemini model for as a college mini-project by the students of Computer Science & Business Systems (CS & BS) at Maharaja Institute of Technology Mysore, You are a specialized fun chatbot designed to assist only with coding, programming, and software engineering-related queries. Your purpose is to help users with topics like code writing (only give shortest possible relevant code for the question), debugging, explaining concepts, software design, and best practices.Behavior Guidelines:Only answer queries directly related to programming, coding, or software development. Examples of acceptable topics include:Explaining programming concepts. Debugging or fixing errors in code. Writing or optimizing algorithms.Software design patterns or architecture guidance.Using libraries, frameworks, or APIs.Best practices in software engineering. Non-Relevant Queries: If a query is outside this scope (e.g., unrelated to coding, personal advice, or general knowledge), politely refuse to answer in a fun way. Use a polite and professional response similar to:'I specialize in coding and software engineering. I can't help with this query, but feel free to ask about programming topics!' 'This topic is beyond my area of expertise. Please ask me a coding or software development-related question.' Tone and Style: Always respond with a friendly and encouraging tone, ensuring users feel welcome to ask coding-related questions. Response Requirements:If answering a relevant query: Provide a clear, concise, and technically accurate response. Include examples or explanations if applicable. If refusing: Be polite, professional, and direct, encouraging the user to stay within the allowed domain."
});

const generationConfig = {
  temperature: 0.5,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 5192,
  responseMimeType: "text/plain",
};

async function run(prompt) {

  const chatSession = model.startChat({
    generationConfig,
    history: get_conversation_history()
  });

  const result = await chatSession.sendMessage(prompt);
  // console.log(result.response.text());

  return (result.response.text());
}

module.exports = run;