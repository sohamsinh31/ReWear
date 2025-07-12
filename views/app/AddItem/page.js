"use client";
import React from 'react'
import TopNavbar from '../components/TopBar'
import BottomNav from '../components/BottomBar'
import { navItems } from '../components/NavItems'
import AddItemPage from './AddItem'
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
    return (
        <div style={{ backgroundColor: 'white' }}>
            <TopNavbar />
            <AddItemPage />
            <BottomNav items={navItems} />
        </div>
    )
}

export default page
