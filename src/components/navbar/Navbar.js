import React from 'react';
import CardNav from './CardNav';
import logo from '../../assets/logos/SHPE_austin_horiz_logo.png';

export function Navbar() {
  const navItems = [
    {
      label: "About",
      bgColor: "#001F5B",
      textColor: "#FFFFFF",
      links: [
        { label: "About", href: "/about", ariaLabel: "About page" },
        { label: "Executive Board", href: "/executive-board", ariaLabel: "Executive Board page" },
      ]
    },
    {
      label: "Programs",
      bgColor: "#0070C0",
      textColor: "#FFFFFF",
      links: [
        { label: "National Programs", href: "/national-programs", ariaLabel: "National Programs page" },
        { label: "Events", href: "/events", ariaLabel: "Events page" },
      ]
    },
    {
      label: "Get Involved",
      bgColor: "#D33A02",
      textColor: "#FFFFFF",
      links: [
        { label: "Membership", href: "/membership", ariaLabel: "Membership page" },
        { label: "Donations", href: "/donations", ariaLabel: "Donations page" },
        { label: "Our Sponsors", href: "/sponsors", ariaLabel: "Our Sponsors page" },
      ]
    },
  ];

  return (
    <CardNav
      logo={logo}
      logoAlt="SHPE Austin"
      logoHref="/"
      items={navItems}
      baseColor="#FFFFFF"
      menuColor="#001F5B"
      buttonBgColor="#D33A02"
      buttonTextColor="#FFFFFF"
      ease="power3.out"
    />
  );
}

export default Navbar;
