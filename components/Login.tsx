'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postApi } from '@/components/lib/api';
import { useToast } from '@/components/Toaster';

export default function Login() {
  const router = useRouter();
  const { showToast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = { username: '', password: '' };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    console.log('Attempting login with:', { username, password });
    
    try {
      console.log('Calling API...');
      const result = await postApi('auth/login', {
        username,
        password,
      });
      console.log('API Response:', result);

      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', username);
        showToast('Login successful!', 'success');
        router.push('/');
      } else {
        showToast('No token received', 'error');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      showToast(error.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--primary)',
        padding: '60px',
        color: 'white',
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
          StoneFleet
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, textAlign: 'center', maxWidth: '400px' }}>
          Comprehensive Fleet Management Solution for Modern Transportation
        </p>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Please login to your account
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ width: '100%' }}>
              <label className="label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="input-field"
              />
              {errors.username && (
                <p style={{ fontSize: '14px', color: 'var(--danger)', marginTop: '4px' }}>
                  {errors.username}
                </p>
              )}
            </div>

            <div style={{ width: '100%' }}>
              <label className="label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="input-field"
              />
              {errors.password && (
                <p style={{ fontSize: '14px', color: 'var(--danger)', marginTop: '4px' }}>
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ marginTop: '8px', width: '100%' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
