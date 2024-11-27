const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  require('dotenv').config();
  console.log("Gen AI Script Running");
  

  const API_key = process.env.API_KEY;
  
  if(!API_key)
    console.error("ALERT: API Key Not Found. Please add API_KEY in your .env file");
  
  const genAI = new GoogleGenerativeAI(API_key);
  console.log(genAI)
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a fun conversational chatbot for solving coding problems. Relate every query to coding",
  });
  
  const generationConfig = {
    temperature: 0.5,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
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
    
    // console.log(result.response.text());
    return(result.response.text());
  }


  
  module.exports = run;