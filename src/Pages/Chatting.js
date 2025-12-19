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
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      navigate('/login');
      return;
    }
    
    setUser(userData);
    loadMessages();
    
    // Refresh messages every 2 seconds
    const interval = setInterval(loadMessages, 2000);
    
    return () => clearInterval(interval);
  }, [navigate]);

  const loadMessages = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.status === 'success') {
        setMessages(data.data.messages);
      }
    } catch (err) {
      console.log('Error loading messages:', err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/api/v1/auth/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ message: newMessage })
        });
        
        if (response.ok) {
          setNewMessage('');
          loadMessages();
        }
      } catch (err) {
        console.log('Error sending message:', err);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
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
          <div key={index} className={`message ${msg.sender === user?._id ? 'own' : 'other'}`}>
            <div className="message-header">
              <span className="sender">{msg.senderName}</span>
              <span className="time">{new Date(msg.createdAt).toLocaleTimeString()}</span>
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