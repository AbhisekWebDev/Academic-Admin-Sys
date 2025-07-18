import React from 'react'
import { Link } from 'react-router-dom'
import AAAlogo from './assets/AAAlogo.png'

function SelectionPanel() {
    return (
        <div>
            <div className="image">
                <img src={AAAlogo} alt="AAA Logo" className="logoImage" style={{
                    width: '120px',
                    height: 'auto',
                    background: 'transparent',
                    borderRadius: '12px'
                }} />
            </div>
            <h1>Academic and Administrative System</h1>
            <h2>Select Panels</h2>

            <div className="dashCard">
                <Link to="/student" className="cardLink">
                    <div className="student">
                        <h2>Student Panel</h2>
                        <h5>Click Here</h5>
                    </div>
                </Link>

                <Link to="/teacher" className="cardLink">
                    <div className="teacher">
                        <h2>Faculty Panel</h2>
                        <h5>Click Here</h5>
                    </div>
                </Link>

                <Link to="/admin" className="cardLink">
                    <div className="admin">
                        <h2>Admin Panel</h2>
                        <h5>Click Here</h5>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default SelectionPanel