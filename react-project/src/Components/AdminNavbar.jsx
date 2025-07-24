import React from 'react'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { useState } from 'react'

import './AdminNavbar.css'


function AdminNavbar() {

    // const styles = {
    //     customNavbar: {
    //         backgroundColor: '#f8f9fa',
    //         padding: '10px 24px',
    //         // boxShadow: '0 2px 4px rgba(117, 236, 150, 0.05)',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'space-between',
    //         borderRadius: '12px',
    //         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    //     },
    //     navbarContainer: {
    //         width: '100%',
    //         display: 'flex',
    //         justifyContent: 'flex-end'
    //     },
    //     rightButtons: {
    //         display: 'flex',
    //         gap: '16px'
    //     },
    //     btnStudent: {
    //         // backgroundColor: 'transparent',
    //         // border: '2px solid #0dc5fdff',
    //         // color: '#0dc9fdff',
    //         // padding: '6px 16px',
    //         // borderRadius: '4px',
    //         // fontWeight: 500,
    //         // cursor: 'pointer',
    //         // transition: 'all 0.2s ease'
    //         padding: '10px 20px',
    //         fontsize: '16px',
    //         border: 'none',
    //         borderRadius: '25px',
    //         backgroundColor: '#3498db',
    //         color: 'white',
    //         cursor: 'pointer',
    //         transition: 'background - color 0.3s ease'
    //     },
    //     btnFaculty: {
    //         // backgroundColor: 'transparent',
    //         // border: '2px solid #198754',
    //         // color: '#198754',
    //         // padding: '6px 16px',
    //         // borderRadius: '4px',
    //         // fontWeight: 500,
    //         // cursor: 'pointer',
    //         // transition: 'all 0.2s ease'
    //         padding: '10px 20px',
    //         fontsize: '16px',
    //         border: 'none',
    //         borderRadius: '25px',
    //         backgroundColor: '#3498db',
    //         color: 'white',
    //         cursor: 'pointer',
    //         transition: 'background - color 0.3s ease'
    //     }
    // }

    const [menuOpen, setMenuOpen] = useState(false)

    
  return (
    //   <div>
    //       <div style={styles.customNavbar}>
    //           {/* brand/logo on left */}
    //           <div style={{ fontWeight: 'bold' }}>Admin Panel</div>

    //           <div style={styles.rightButtons}>
    //               <Link to="/createStudent">
    //                   <button style={styles.btnStudent}>Create Student</button>
    //               </Link>

    //               <Link to="/createFaculty">
    //                 <button style={styles.btnFaculty}>Create Faculty</button>
    //               </Link>

    //               <Link to="/createEvent">
    //                 <button style={styles.btnFaculty}>Create Event</button>
    //               </Link>
    //           </div>
    //       </div>
    //   </div>

     <div className="admin-navbar">
      <div style={{ fontWeight: 'bold' }} className='navbar-left'>Admin Panel</div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

      <div className={`nav-buttons ${menuOpen ? 'show' : ''}`}>
        <Link to="/createStudent">
          <button>Create Student</button>
        </Link>

        <Link to="/createFaculty">
          <button>Create Faculty</button>
        </Link>

        <Link to="/createEvent">
          <button>Create Event</button>
        </Link>
      </div>
    </div>
  )
}

export default AdminNavbar
