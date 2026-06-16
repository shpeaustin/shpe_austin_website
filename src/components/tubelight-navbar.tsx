// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Link, useLocation } from "react-router-dom";
// import { LucideIcon } from "lucide-react";
// import { cn } from "../lib/utils";

// interface NavItem {
//   name: string;
//   url: string;
//   icon: LucideIcon;
// }

// interface NavBarProps {
//   items: NavItem[];
//   className?: string;
// }

// export function NavBar({ items, className }: NavBarProps) {
//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState(items[0].name);

//   useEffect(() => {
//     // Update active tab on route change
//     const currentItem = items.find((item) => item.url === location.pathname);
//     if (currentItem) setActiveTab(currentItem.name);
//   }, [location.pathname, items]);

//   return (
//     <div
//       className={cn(
//         "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 pointer-events-none",
//         className
//       )}
//     >
//         <div
//           className={cn(
//             "flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-2 rounded-full shadow-lg pointer-events-auto",
//             "overflow-x-auto sm:overflow-visible scrollbar-none max-w-[90vw] sm:max-w-none"
//           )}
//         >
//         {items.map((item) => {
//           const Icon = item.icon;
//           const isActive = location.pathname === item.url || activeTab === item.name;

//           const isExternal = /^https?:\/\//.test(item.url);

//           if (isExternal) {
//             // External link opens in new tab
//             return (
//               <a
//                 key={item.name}
//                 href={item.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={cn(
//                   "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
//                   "text-foreground/80 hover:text-primary"
//                 )}
//               >
//                 <span className="hidden md:inline">{item.name}</span>
//                 <span className="md:hidden">
//                   <Icon size={18} strokeWidth={2.5} />
//                 </span>
//               </a>
//             );
//           }

//           // Internal link with router Link
//           return (
//             <Link
//               key={item.name}
//               to={item.url}
//               onClick={() => setActiveTab(item.name)}
//               className={cn(
//                 "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
//                 "text-foreground/80 hover:text-primary",
//                 isActive && "text-primary"
//               )}
//             >
//               <span className="hidden md:inline">{item.name}</span>
//               <span className="md:hidden">
//                 <Icon size={18} strokeWidth={2.5} />
//               </span>

//               {isActive && (
//                 <motion.div
//                   layoutId="underline"
//                   className="absolute bottom-0 left-0 right-0 mx-auto w-8 h-0.5 bg-black rounded-full"
//                   initial={false}
//                   transition={{
//                     type: "spring",
//                     stiffness: 300,
//                     damping: 30,
//                   }}
//                 />
//               )}
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(items[0].name);

  useEffect(() => {
    const currentItem = items.find((item) => item.url === location.pathname);
    if (currentItem) setActiveTab(currentItem.name);
  }, [location.pathname, items]);

  return (
    <>
      <div
        className={cn(
          "hidden sm:flex fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6 pointer-events-none",
          className
        )}
      >
        <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-2 rounded-full shadow-lg pointer-events-auto">
          {items.map((item) => {
            const isActive =
              location.pathname === item.url || activeTab === item.name;
            const isExternal = /^https?:\/\//.test(item.url);

            if (isExternal) {
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                    "text-foreground/80 hover:text-primary",
                    isActive && "text-primary"
                  )}
                >
                  {item.name}
                </a>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                  "text-foreground/80 hover:text-primary",
                  isActive && "text-primary"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 mx-auto w-8 h-0.5 bg-black rounded-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 📱 Mobile Full-Width Bottom Nav */}
      <div className="flex sm:hidden fixed bottom-0 left-0 w-full justify-around bg-background/80 backdrop-blur-lg border-t border-border py-2 z-50">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.url || activeTab === item.name;
          const isExternal = /^https?:\/\//.test(item.url);

          const linkClass = cn(
            "flex flex-col items-center text-xs font-medium transition-colors",
            isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
          );

          if (isExternal) {
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <Icon size={20} strokeWidth={2.5} />
                <span>{item.name}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={linkClass}
            >
              <Icon size={20} strokeWidth={2.5} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
