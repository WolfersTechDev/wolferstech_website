import React, {useState} from 'react'
import Logo from './logo'

function Header() {

  const logopath = '../../src/assets/PNG_WT_LOGO.png';

  return (
    <header className='bg-white sticky top-0 z-[20] mx-auto w-full flex items-center justify-between border-b border-blue-400 p-8'>
      <Logo imagePath={logopath} />

      <nav className="flex items-center w-auto justify-evenly">
        <NavLink text="Home" />
        <NavLink text="About" />
        <DropdownNavLink text="Services" >
          <DropdownMenu />
        </DropdownNavLink>
        <NavLink text="Portfolio" />
        <NavLink text="Blog" />
        <NavLink text="Contact" style="bg-blue-500 rounded-full px-3 py-1 text-white"/>
      </nav>
    </header>
  )
}

const DropdownNavLink = ({ text, children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropDown = () =>{
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="relative">
      <a href="#" className="mx-5 text-lg" onClick={toggleDropDown}>{text}</a>
      {isDropdownOpen && (
        <div className="absolute w-100 top-7 left-2 bg-white shadow-lg p-2 mt-2" style={{ minWidth: '200px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

const DropdownMenu = () => {
  return (
    <ul>
      <li className='p-2 hover:bg-gray-200'><a href="#">Web Development</a></li>
      <li className='p-2 hover:bg-gray-200'><a href="#">Digital Marketing</a></li>
      <li className='p-2 hover:bg-gray-200'><a href="#">Applications</a></li>
      <li className='p-2 hover:bg-gray-200'><a href="#">Brandings</a></li>
    </ul>
  );
}

const NavLink = ({ text, style }) => {
  return (
    <a href="#" className={`mx-5 text-lg ${text == 'Contact' ? style : ""}`}>{text}</a>
  );
}

export default Header
