import React from 'react'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'


function AdminNavbar() {

    const styles = {
        customNavbar: {
            backgroundColor: '#f8f9fa',
            padding: '10px 24px',
            boxShadow: '0 2px 4px rgba(117, 236, 150, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        navbarContainer: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
        },
        rightButtons: {
            display: 'flex',
            gap: '16px'
        },
        btnStudent: {
            backgroundColor: 'transparent',
            border: '2px solid #0dc5fdff',
            color: '#0dc9fdff',
            padding: '6px 16px',
            borderRadius: '4px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
        btnFaculty: {
            backgroundColor: 'transparent',
            border: '2px solid #198754',
            color: '#198754',
            padding: '6px 16px',
            borderRadius: '4px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        }
    }

    
  return (
      <div>
          <div style={styles.customNavbar}>
              {/* Optional brand/logo on the left */}
              <div style={{ fontWeight: 'bold' }}>Admin Panel</div>

              <div style={styles.rightButtons}>
                  <Link to="/createStudent">
                      <button style={styles.btnStudent}>Create Student</button>
                  </Link>
                  <Link to="/createFaculty">
                    <button style={styles.btnFaculty}>Create Faculty</button>
                  </Link>
              </div>
          </div>
      </div>
  )
}

export default AdminNavbar
