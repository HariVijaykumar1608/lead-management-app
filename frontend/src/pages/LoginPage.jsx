import { useState } from 'react';
import { login } from '../../routes/index';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastContext.jsx';
import './styles/login.css';

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const userLoginStatus = await login({ userName, password });
      if (userLoginStatus.success) {
        showToast('Login successful', 'success');
        setTimeout(() => navigate('/dashboard'), 700);
      } else {
        showToast(userLoginStatus?.message || 'Invalid username or password', 'error');
        setIsSubmitting(false);
      }
    } catch (error) {
      showToast('Something went wrong. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-backdrop" aria-hidden="true">
        <div className="login-backdrop-shape shape-a" />
        <div className="login-backdrop-shape shape-b" />
      </div>

      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-mark">LM</div>
          <span>Lead Management</span>
        </div>

        <h2>Welcome back</h2>
        <br></br>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="userName">Username</label>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M2.5 13.5c1-2.5 3.2-4 5.5-4s4.5 1.5 5.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              <input
                id="userName"
                type="text"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="7" width="10" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M5.2 7V5a2.8 2.8 0 1 1 5.6 0v2" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={0}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 9s2.7-5 7-5 7 5 7 5-2.7 5-7 5-7-5-7-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                    <circle cx="9" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 9s2.7-5 7-5c1.6 0 3 .6 4.1 1.4M16 9s-.8 1.5-2.3 2.8M9 4c4.3 0 7 5 7 5a12 12 0 0 1-1.6 2.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M2 2l14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M7 9a2.2 2.2 0 0 0 3.1 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;