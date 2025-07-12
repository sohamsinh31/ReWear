"use client";
import { use } from 'react'
import TopNavbar from '@/app/components/TopBar'
import BottomNav from '@/app/components/BottomBar'
import { navItems } from '@/app/components/NavItems'
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from '../components/ProductCard'
import Cart from '../components/ProductCart'
import { products } from '../data/products';

export default function ProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params)
  const product = products.find((p) => p.id === String(id))

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

  return (<div style={{ backgroundColor: 'white' }}>
    <TopNavbar />
    <Cart />
    <BottomNav items={navItems} />
  </div>
  )
}
