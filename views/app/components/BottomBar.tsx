"use client";
import React from "react";
import {
    Home,
    PlusCircle,
    User,
    Search,
    ShoppingBasketIcon,
} from "lucide-react";

// Type definition for each nav item
const BottomNav = ({ theme = "light", items = [] }) => {
    const isDark = theme === "dark";

    const containerStyle = {
        position: "fixed",
        bottom: 0,
        width: "100%",
        backdropFilter: "blur(10px)",
        backgroundColor: isDark ? "rgba(20,20,20,0.8)" : "rgba(255,255,255,0.5)",
        color: isDark ? "#e0e0e0" : "#4c6ef5",
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0",
        zIndex: 50,
    };

    return (
        <div style={containerStyle}>
            {items.map((item, idx) => (
                <NavItem
                    key={idx}
                    icon={item.icon}
                    label={item.label}
                    onClick={item.onClick}
                    color={containerStyle.color}
                />
            ))}
        </div>
    );
};

const NavItem = ({ icon, label, onClick, color }) => {
    return (
        <div
            onClick={onClick}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "12px",
                color: color,
                cursor: "pointer",
            }}
        >
            {icon}
            <span>{label}</span>
        </div>
    );
};

export default BottomNav;
