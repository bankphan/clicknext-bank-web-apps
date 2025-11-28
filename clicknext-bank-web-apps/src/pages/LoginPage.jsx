import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../stores/userSlice.js'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/deposit');
    }
  }, [isLoggedIn, navigate]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (!validateEmail(email)) {
      setError('รูปแบบอีเมลไม่ถูกต้อง');
      return;
    }

    dispatch(login(email));
    navigate('/deposit');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4 mx-2" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">ClickNext</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email *</label>
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your_email@example.com"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password *</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="your password"/>
          </div>
          <button type="submit" className="btn btn-dark w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;