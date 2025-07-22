// ye abhi ko kam me nhi h,,,, isko baad me sochunga

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          headers: {
            'auth-token': token
          }
        });

        setMessage(res.data); // Or res.data.message
      } catch (err) {
        console.error('Access Denied:', err.response?.data || err.message);
        setMessage('Unauthorized. Please log in.');
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
