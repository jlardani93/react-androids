import React from 'react'

export default function Navbar(){
  return(
    <div>
      <style>{`
        .navbar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          justify-items: center;
          background-color: black;
        }

        .navbar h3 {
          color: white;
        }
      `}
      </style>
      <div className="navbar">
        <div>
          <h3>Home</h3>
        </div>
        <div>
          <h3>Game</h3>
        </div>
        <div>
          <h3>Instructions</h3>
        </div>
        <div>
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  )
}
