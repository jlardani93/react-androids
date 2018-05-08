import React from 'react'

export default function Footer(){

  return(
    <div>
      <style jsx>{`
        h3 {
          text-align: center;
        }

        footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: gray; 
        }
      `}
      </style>
      <div className="footer">
        <h3>Epicodus (c)    Dillon | Eric | Justin   {Date.now()}</h3>
      </div>
    </div>
  )
}
