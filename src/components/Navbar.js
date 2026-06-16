import React from 'react';
import { House, GraduationCap } from 'lucide-react';
import { NavBar } from './tubelight-navbar';

export function Navbar() {
  const navItems = [
    { name: 'Home', url: '/', icon: House },
    { name: 'SHPE Hat', url: '/shpe-hat', icon: GraduationCap },
  ];

  return <NavBar items={navItems} />;
}

export default Navbar;
