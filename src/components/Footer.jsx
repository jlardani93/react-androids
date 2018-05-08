import React from 'react'

export default function Footer(){

  return(
    <div>
      <style jsx>{`
        h3 {
          text-align: center;
        }

        .footer {
          position: absolute;
          bottom: 0px;
          left: 0px;
          width: 100%;
          background-color: gray;
        }
      `}
      </style>
      <div className="footer">
        <h3>Epicodus (c)    Dillon | Eric | Justin   {new Date().toLocaleDateString()}</h3>
      </div>
    </div>
  )
}
