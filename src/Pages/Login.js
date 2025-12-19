import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Style/login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = isLogin 
      ? 'https://chatting-website-backend-vgy3.onrender.com/api/v1/auth/login' 
      : 'https://chatting-website-backend-vgy3.onrender.com/api/v1/auth/signup';
    
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password, confirmPassword: formData.password };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.data.user));
        navigate(data.data.user.role === 'admin' ? '/admin' : '/chatting');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Connection error');
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        
        {!isLogin && (
          <>
            <label>Name</label>
            <input 
              type="text" 
              placeholder="Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />
          </>
        )}
        
        <label>Email</label>
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required 
        />
        
        <label>Password</label>
        <input 
          type="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required 
        />
        
        <button className="loginButton" type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        
        <p onClick={() => setIsLogin(!isLogin)} className="toggle">
          {isLogin ? 'Need an account? Sign up' : 'Have an account? Login'}
        </p>
        
        {message && <p className="message">{message}</p>}
        
        <p style={{fontSize: '12px', textAlign: 'center', marginTop: '10px', color: '#666'}}>
          Demo Admin: admin@chat.com / admin123
        </p>
      </form>
    </div>
  );
};

export default Login;