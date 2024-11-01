import './App.css';
import ChatInterface from './components/ChatInterface';
import HistorySection from './components/HistorySection';
import SideNavbar from './components/SideNavbar';
import ChatbotState from './context/chatbotContext/chatbotState'

function App() {
  return (
    <div className='layout'>
      <ChatbotState>
        <SideNavbar />
          <div className='main-section'>
            <HistorySection />
            <ChatInterface />
          </div>
      </ChatbotState>
    </div>
  );
}

export default App;
