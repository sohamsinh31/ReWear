"use client";

import styles from "./styles/Landing.module.css";
import Carousel from "./components/Carousel";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import { useCart } from "./context/CartContext";
import BottomNav from "./components/BottomBar";
import TopNavbar from "./components/TopBar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { navItems } from "./components/NavItems";

export default function Home() {
  const { cart } = useCart();
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    const storedTheme = Cookies.get("theme") || "light";
    setTheme(storedTheme);

    if (!token) {
      router.replace("/auth/login");
    } else {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) return null;

  return (
    <div style={{backgroundColor: 'white'}}>
      <TopNavbar theme={theme} />
      <div
        className={`${styles.container} ${theme === "dark" ? styles.darkTheme : styles.lightTheme
          }`}
      >
        <main>
          <section className={styles.hero}>
            <h1 className={styles.title}>ReWear</h1>
            <p className={styles.subtitle}>
              Swap clothes. Save the planet. Join a community of sustainable swappers.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primary}>Start Swapping</button>
              <button className={styles.secondary}>Browse Items</button>
              <button className={styles.secondary}>List an Item</button>
            </div>
          </section>

          <section className={styles.carouselSection}>
            <h2 className={styles.carouselTitle}>Featured Items</h2>
            <Carousel />
          </section>

          <section className={styles.products}>
            <h2 className={styles.carouselTitle}>Available Products</h2>
            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <BottomNav theme={theme} items={navItems} />
    </div>
  );
}
