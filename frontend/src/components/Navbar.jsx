import React from 'react'
import Logo from '../assets/react.svg'

const Navbar = () => {
  return (
    <div className='nav__bar container flex  justify-between p-5'>
    <img src={Logo} alt="logo" />
      <ul className='flex'>
        <li className='mx-5'>Home</li>
        <li className='mx-5'>Contact us</li>
        <li className='mx-5'>About</li>
        <li className='mx-5'>Create Room</li>
        <li className='mx-5'>Change Room</li>
      </ul>
      <div className="buttons">
        <button className="login">Login</button>
        <button className="signup">Sign Up</button>
      </div>
    </div>
  )
}

export default Navbar
