"use client";
import React from "react";

const TopNavbar = ({ theme = "light" }) => {
    const isDark = theme === "dark";

    const navStyle = {
        position: "sticky",
        top: 0,
        width: "100%",
        backdropFilter: "blur(10px)",
        backgroundColor: isDark ? "rgba(20,20,20,0.8)" : "rgba(255, 255, 255, 0.6)",
        color: isDark ? "#f1f1f1" : "#1a1a1a",
        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        padding: "10px 20px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    };

    const inputStyle = {
        padding: "8px 12px",
        borderRadius: "20px",
        border: `1px solid ${isDark ? "#444" : "#ccc"}`,
        outline: "none",
        width: "60%",
        maxWidth: "400px",
        backgroundColor: isDark ? "#222" : "#fff",
        color: isDark ? "#fff" : "#000",
    };

    return (
        <nav style={navStyle}>
            <div style={{ fontWeight: "bold", fontSize: "1.9rem", color: "", marginLeft: '10%' }}>
                ReWear
            </div>
            <input type="text" placeholder="Search items... 🔎" style={inputStyle} />
        </nav>
    );
};

export default TopNavbar;
