import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../Confi/api'; 
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('user[email]', email);
    formData.append('user[password]', password);

    try {
      const response = await API_BASE_URL.post('/users/sign_in', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { spree_api_key, mobile, email, firstname } = response.data;

      // Store all relevant data in session storage
      sessionStorage.setItem('spree_api_key', spree_api_key);
      sessionStorage.setItem('mobile', mobile);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('firstname', firstname);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;
