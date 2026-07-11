import { useState } from 'react'
import { login } from '../../routes/index';
import { useNavigate } from 'react-router-dom';
import './styles/login.css';

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLoginStatus = await login({ userName, password });
    if (userLoginStatus.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Lead Management</h2>
        <p className="subtitle">Sign in to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>UserName</label>
          <input type="text" placeholder="Enter your userName" value={userName} onChange={(e) => setUserName(e.target.value)} />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
