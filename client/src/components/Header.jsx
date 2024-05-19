import React, { useState } from 'react'
import Logo from './logo'

function Header() {

  const logopath = '../../src/assets/PNG_WT_LOGO.png';

  return (
    <header className='bg-white sticky top-0 z-[20] mx-auto w-full flex items-center justify-between border-b border-blue-400 p-8'>
      <Logo imagePath={logopath} />

      <nav className="flex items-center w-auto justify-evenly">
        <NavLink text="Home"  href='/'/>
        <NavLink text="About" href='/about' />
        <DropdownNavLink text="Services" >
          <DropdownMenu />
        </DropdownNavLink>
        <NavLink text="Portfolio" href='/portfolio' />
        <NavLink text="Blog" href='/blog' />
        <NavLink text="Contact" href='/contact' style="bg-blue-500 rounded-full px-3 py-1 text-white" />
      </nav>
    </header>
  )
}

const DropdownNavLink = ({ text, children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <a href="#" className="mx-5 text-lg hover:text-blue-500" onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>{text}</a>
      {isDropdownOpen && (
        <div className="absolute w-100 top-4 left-2 bg-white shadow-lg p-2 mt-2" style={{ minWidth: '200px' }} onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          {children}
        </div>
      )}
    </div>
  );
}

const SubMenu = ({ items, onMouseEnterSubMenu, onMouseLeaveSubMenu, href }) => {
  console.log(items)
  console.log(href)
  return (
    <ul className="absolute left-full top-0 mt-0 bg-white shadow-lg p-2" 
    onMouseEnter={onMouseEnterSubMenu} onMouseLeave={onMouseLeaveSubMenu} style={{ minWidth: '200px' }}>
      {items.map((item, index) => (
        <li key={index} className='p-2 hover:bg-gray-200'>
          <a href={href[index]}>{item}</a>
        </li>
      ))}
    </ul>
  )
}

const DropdownMenu = () => {
  const dropdownItems = [
    { label: "Web Development", submenu: ["Wordpress", "E-COMMERCE", "Portfolio", "UI/UX Design"], href: ["/web_dev/wordpress", "/web_dev/e-commers", "/web_dev/Portfolio_web", "/web_dev/Ui_Ux_dexign"] },
    { label: "Digital Marketing", submenu: ["SEO", "SEM", "Social Media Marketing"], href: ["/seo", "/sem", "/social_media_marketing"] },
    { label: "Applications", submenu: ["Android", "Desktop", "IOS"], href:["/android", "/desktop", "/ios"] },
    { label: "Brandings", submenu: ["Personal Branding", "Business Branding"], href: ["/personal_branding", "/business_branding"] }
  ];

  const [activeMenu, setActiveMenu] = useState(null);
  const [subMenuStates, setSubMenuStates] = useState(Array(dropdownItems.length).fill(false));

  const handleMouseEnter = (index) => {
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const handleMouseEnterSubMenu = (index) => {
    const newSubMenuStates = [...subMenuStates];
    newSubMenuStates[index] = true;
    setSubMenuStates(newSubMenuStates);
  };

  const handleMouseLeaveSubMenu = (index) => {
    const newSubMenuStates = [...subMenuStates];
    newSubMenuStates[index] = false;
    setSubMenuStates(newSubMenuStates);
  };

  return (
    <ul className='relative'>
      {dropdownItems.map((item, index) => (
        <li
          key={index}
          className='p-2 hover:bg-gray-200'
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <a href="#">{item.label}</a>
          {(activeMenu === index || subMenuStates[index]) && (
            <SubMenu
              items={item.submenu}
              href={item.href}
              onMouseEnterSubMenu={() => handleMouseEnterSubMenu(index)}
              onMouseLeaveSubMenu={() => handleMouseLeaveSubMenu(index)}
            />
          )}
        </li>
      ))}</ul>
  );
}

const NavLink = ({ text, style, href }) => {
  return (
    <a href={href} className={`mx-5 text-lg ${text !== 'Contact' ? 'hover:text-blue-500' : ''} ${text === 'Contact' ? style : ''}`}>{text}</a>
  );
}

export default Header
