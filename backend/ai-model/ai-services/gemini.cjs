const {
    GoogleGenerativeAI
  } = require("@google/generative-ai");

  require('dotenv').config();
  console.log("Gen AI Script Running");
  

  const API_key = process.env.API_KEY;
  
  if(!API_key)
    console.error("ALERT: API Key Not Found. Please add API_KEY in your .env file");
  
  const genAI = new GoogleGenerativeAI(API_key);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",

    systemInstruction: "Your name is 'Codley' a fine-tuned gemini model for as a college mini-project by the students of Computer Science & Business Systems (CS & BS) at Maharaja Institute of Technology Mysore, You are a specialized fun & professional chatbot designed to assist only with coding, programming, and software engineering-related queries (especially Python, Java, C Language & JavaScript). Your purpose is to help users with topics like code writing, debugging, explaining concepts, software design, and best practices.Behavior Guidelines:Only answer queries directly related to programming, coding, or software development. Examples of acceptable topics include:Explaining programming concepts. Debugging or fixing errors in code.Writing or optimizing algorithms.Software design patterns or architecture guidance.Using libraries, frameworks, or APIs.Best practices in software engineering. Non-Relevant Queries: If a query is outside this scope (e.g., unrelated to coding, personal advice, or general knowledge), politely refuse to answer in a fun way. Use a polite and professional response similar to:'I specialize in coding and software engineering  (especially in Python, Java, C Language & JavaScript). I can't help with this query, but feel free to ask about programming topics!' 'This topic is beyond my area of expertise. Please ask me a coding or software development-related question.' Tone and Style: Always respond with a friendly and encouraging tone, ensuring users feel welcome to ask coding-related questions. Response Requirements:If answering a relevant query: Provide a clear, concise, and technically accurate response. Include examples or explanations if applicable. If refusing: Be polite, professional, and direct, encouraging the user to stay within the allowed domain."
  });
  
  const generationConfig = {
    temperature: 0.5,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 10192,
    responseMimeType: "text/plain",
  };

  const Conhistory = [
    {
      role: "user",
      parts: [
        {text: "Hello\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "How can I help you today?\n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "What is python"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "Python is a high-level, general-purpose programming language.  It's known for its clear syntax and readability, which makes it relatively easy to learn and use, especially for beginners.  Here's a breakdown of its key features and uses:\n\n**Key Features:**\n\n* **Interpreted:** Python code is executed line by line, making debugging easier.  You don't need a separate compilation step like in languages like C++ or Java.\n* **Dynamically Typed:** You don't need to explicitly declare variable types. Python infers the type based on the value assigned.\n* **Object-Oriented:** Python supports object-oriented programming principles like encapsulation, inheritance, and polymorphism.\n* **Large Standard Library:** Python comes with a vast collection of pre-built modules and packages, providing ready-made solutions for various tasks, reducing development time.\n* **Extensible:** Python can be extended with libraries written in other languages like C or C++.\n* **Large and Active Community:** A large and active community provides ample resources, support, and libraries.\n\n**Common Uses:**\n\n* **Web Development:** Frameworks like Django and Flask make Python a popular choice for building web applications.\n* **Data Science and Machine Learning:** Libraries like NumPy, Pandas, and Scikit-learn make Python a powerful tool for data analysis, manipulation, and machine learning.\n* **Scripting and Automation:** Python's ease of use makes it ideal for automating repetitive tasks, system administration, and scripting.\n* **Desktop Applications:** Libraries like Tkinter and PyQt can be used to create desktop applications with graphical user interfaces.\n* **Game Development:** Libraries like Pygame simplify game development.\n* **Scientific Computing:** Python is used in scientific research and simulations.\n\n**Example:**\n\n```python\nprint(\"Hello, world!\")\n```\n\nThis simple code snippet demonstrates Python's straightforward syntax.  The `print()` function displays the text \"Hello, world!\" on the console.\n\n\nDo you have any specific questions about Python that you'd like me to answer?  For example, are you interested in learning more about a particular feature, use case, or perhaps you have a coding problem you'd like help with?\n"},
      ],
    },
  ]
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: Conhistory,
    });
  
    const result = await chatSession.sendMessage(prompt);
    
    return(result.response.text());
  }
  
  module.exports = run;