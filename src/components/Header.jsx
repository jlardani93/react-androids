import React from 'react'

export default function Header(){

  return(
    <div>
      <style jsx>{`
        h2 {
          text-align: center; 
        }

        .header {
          background-color: gray;
        }
      `}
      </style>
      <div className='header'>
        <h2>React Androids</h2>
      </div>
    </div>
  )
}
