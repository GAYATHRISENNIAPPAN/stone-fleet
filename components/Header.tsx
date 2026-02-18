'use client';

import { Search, Bell, Mail, User, ChevronDown, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    setIsLoggedIn(!!token);
    setUsername(user || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('companyName');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <header style={{
      height: '64px',
      backgroundColor: 'var(--background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      borderBottom: '1px solid var(--border-color)',
    }}>
      
      {/* LEFT */}
      <div></div>

      {/* CENTER SEARCH */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '350px' }}>
          <Search style={{
            width: '16px',
            height: '16px',
            position: 'absolute',
            left: '16px',
            top: '12px',
            color: 'var(--text-secondary)',
          }} />
          <input
            type="text"
            placeholder="Search here..."
            style={{
              width: '100%',
              paddingLeft: '40px',
              paddingRight: '16px',
              paddingTop: '10px',
              paddingBottom: '10px',
              borderRadius: '24px',
              backgroundColor: 'white',
              fontSize: '14px',
              outline: 'none',
              border: '1px solid var(--border-color)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Bell style={{ width: '20px', height: '20px', color: 'var(--text-secondary)', cursor: 'pointer' }} />
        <Mail style={{ width: '20px', height: '20px', color: 'var(--text-secondary)', cursor: 'pointer' }} />

        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderLeft: '1px solid var(--border-color)',
          paddingLeft: '16px',
          cursor: 'pointer',
          color: 'var(--text-primary)',
        }}
        onClick={() => isLoggedIn ? setShowDropdown(!showDropdown) : router.push('/login')}
        >
          <User style={{ width: '24px', height: '24px' }} />
          <span style={{ fontSize: '14px', fontWeight: '500' }}>
            {isLoggedIn ? username : 'Login'}
          </span>
          <ChevronDown style={{ width: '16px', height: '16px' }} />
          
          {isLoggedIn && showDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              backgroundColor: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              minWidth: '150px',
              zIndex: 1000,
            }}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: 'var(--danger)',
                  fontWeight: '500',
                }}
              >
                <LogOut style={{ width: '16px', height: '16px' }} />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
