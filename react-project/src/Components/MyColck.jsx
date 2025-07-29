import React, { useState, useEffect } from 'react'

function MyColck() {

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const intrvl = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(intrvl)
    }, [])

    const formattedTime = time.toLocaleTimeString()
    const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '20px',
      fontSize: '16px',
      fontWeight: 'bold',
    //   backgroundColor: '#f0f0f0',
      padding: '8px 14px',
      borderRadius: '8px',
    //   boxShadow: '0 0 6px rgba(0,0,0,0.1)',
      zIndex: 999,
      textAlign: 'right',
      lineHeight: '1.4'
    }}>
      <div>{formattedTime}</div>
      <div style={{ fontSize: '14px', fontWeight: 'normal' }}>{formattedDate}</div>
    </div>
  )
}

export default MyColck