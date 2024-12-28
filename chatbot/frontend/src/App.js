import './App.css';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


import {
  ChatBotSidePanel,
  ChatInterface
} from './components/chatbot-components.js';

import {
  EditorHeader
} from './components/magic-editor-components.js'

import SideNavbar from './components/side-navbar/SideNavbar';
import ChatbotState from './context/chatbotContext/chatbotState';
import LoginPage from './components/login-page/LoginPage.js';



function App() {

  const [loginPage, setLoginPage] = useState(true);

  return (
    <Router>
      <ChatbotState>

        <div className='layout'>
          <ChatbotState>
            { loginPage?
              null
              :
              <SideNavbar />}

            <Routes>

              <Route path='/' element={
                <>
                  {
                    loginPage ?
                    <div className='login'>
                      <LoginPage loginPage = {loginPage} setLoginPage = {setLoginPage}/>
                    </div>
                    :
                    <div className='chatbot-main-section'>
                      <ChatBotSidePanel />
                      <ChatInterface />
                    </div>
                  }
                </>
              }
              />

              <Route path="/magic-editor" element={
                <div className='magic-editor'>
                    <EditorHeader/>
                </div>
              }
              />
            </Routes>
          </ChatbotState>
        </div>

      </ChatbotState>
    </Router>
  );
}

export default App;
