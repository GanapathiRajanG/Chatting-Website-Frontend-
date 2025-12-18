import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/chatting.css';

const Chatting = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!userData) {
      navigate('/login');
      return;
    }
    
    setUser(userData);
    
    // Load messages from localStorage
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    setMessages(savedMessages);
    
    // Simulate real-time updates by checking localStorage periodically
    const interval = setInterval(() => {
      const currentMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
      setMessages(currentMessages);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      const message = {
        id: Date.now(),
        sender: user.id,
        senderName: user.name,
        message: newMessage,
        timestamp: new Date().toISOString()
      };
      
      const currentMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
      const updatedMessages = [...currentMessages, message];
      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === user?.id ? 'own' : 'other'}`}>
            <div className="message-header">
              <span className="sender">{msg.senderName}</span>
              <span className="time">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="message-text">{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-btn">Send</button>
      </form>
    </div>
  );
};

export default Chatting;