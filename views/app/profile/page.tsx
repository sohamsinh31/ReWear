"use client";
import React from 'react'
import TopNavbar from '../components/TopBar'
import BottomNav from '../components/BottomBar'
import { navItems } from '../components/NavItems'
import ProfilePage from './ProfilePage';
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        const storedTheme = Cookies.get("theme") || "light";

        if (!token) {
            router.replace("/auth/login");
        } else {
            setAuthenticated(true);
        }
    }, []);

    if (!authenticated) return null;
    return (
        <div style={{ backgroundColor: 'white' }}>
            <TopNavbar />
            <ProfilePage />
            <BottomNav items={navItems} />
        </div>
    )
}

export default page
