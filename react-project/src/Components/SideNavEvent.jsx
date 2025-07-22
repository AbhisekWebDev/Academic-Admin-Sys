import React, { useState } from 'react'
import './SideNavEvent.css'
import { useEffect } from 'react'

import axios from 'axios'

function SideNavEvent() {

    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => setIsOpen(!isOpen)


    const [events, setEvents] = useState([])

    useEffect( () => {
      axios.get('http://localhost:5000/events/viewEvents')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Error fetching users:', err))
    }, [])


  return (
    <div className="sne-wrapper">
      <div className="sne-hamburger" onClick={toggleSidebar}>☰</div>

      {/* sidebar */}
      <aside className={`sne-sidebar ${isOpen ? 'sne-open' : ''}`}>
        <h2 className="sne-title">📅 Upcoming Events</h2>
        <table className="sne-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
              <td>📘 {event.eventName}</td>
              <td>{new Date(event.eventDate).toISOString().slice(0, 10)}</td>
            </tr>
            ))}
            
          </tbody>
        </table>
      </aside>
    </div>
  )
}

export default SideNavEvent