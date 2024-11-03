import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import ChatInterface from './components/ChatInterface';
import HistorySection from './components/HistorySection';
import SideNavbar from './components/SideNavbar';
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
                  <HistorySection />
                  <ChatInterface />
                </div>
              }
              />

              <Route path="/magic-editor" element={
                <div> Magic Editor</div>
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
