import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Style/login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate(user.isAdmin ? '/admin' : '/chatting');
      } else {
        setMessage('Invalid credentials');
      }
    } else {
      // Signup logic
      if (!formData.name || !formData.email || !formData.password) {
        setMessage('All fields required');
        return;
      }
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.find(u => u.email === formData.email)) {
        setMessage('Email already exists');
        return;
      }
      
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isAdmin: formData.email === 'admin@chat.com',
        age: '',
        place: '',
        about: ''
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      navigate(newUser.isAdmin ? '/admin' : '/chatting');
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