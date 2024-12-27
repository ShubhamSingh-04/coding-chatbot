import './App.css';

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



function App() {
  return (
    <Router>
      <ChatbotState>

        <div className='layout'>
          <ChatbotState>
            <SideNavbar />

            <Routes>

              <Route path='/' element={
                <div className='chatbot-main-section'>
                  <ChatBotSidePanel />
                  <ChatInterface />
                </div>
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
