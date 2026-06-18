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
        { label: "Event Check In", href: "https://script.google.com/macros/s/AKfycbxpwWJla2HFB6Dh9TeZ4QULK0jSJd1nT6vCl31XDno6XT_LXtXA254fWELauB5U1VJY/exec", ariaLabel: "Event check in" },
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
