import React from 'react';
import { House } from 'lucide-react';
import { NavBar } from './tubelight-navbar';

export function Navbar() {
  const navItems = [
    { name: 'Home', url: '/', icon: House },
  ];

  return <NavBar items={navItems} />;
}

export default Navbar;
