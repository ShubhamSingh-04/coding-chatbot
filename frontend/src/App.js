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

import SideNavbar from './components/side-navbar/SideNavbar';
import ChatbotState from './context/chatbotContext/chatbotState';



function App() {
  return (
    <>
      <Router>

        <div className='layout'>
          <ChatbotState>
            <SideNavbar />

            <Routes>

              <Route path='/' element={
                <div className='main-section'>
                  <ChatBotSidePanel />
                  <ChatInterface />
                </div>
              }
              />

              <Route path="/magic-editor" element={
                <p>Magic Editor</p>
              }
              />
            </Routes>
          </ChatbotState>
        </div>

      </Router>
    </>
  );
}

export default App;
