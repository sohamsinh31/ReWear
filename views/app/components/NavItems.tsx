"use client";
import { Home, ShoppingBasketIcon, PlusCircle, User } from "lucide-react";

const handleNavClick = (label) => {
  window.location.href = label;
};

export const navItems = [
  {
    icon: <Home size={24} />,
    label: "Home",
    onClick: () => handleNavClick("/"),
  },
  {
    icon: <ShoppingBasketIcon size={24} />,
    label: "Cart",
    onClick: () => handleNavClick("/cart"),
  },
  {
    icon: <PlusCircle size={24} />,
    label: "Add",
    onClick: () => handleNavClick("/AddItem"),
  },
  {
    icon: <User size={24} />,
    label: "Profile",
    onClick: () => handleNavClick("/Profile"),
  },
];