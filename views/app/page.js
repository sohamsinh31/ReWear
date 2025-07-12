'use client'

import styles from './styles/Landing.module.css'
import Carousel from './components/Carousel'
import ProductCard from './components/ProductCard'
import { products } from './data/products'
import { useCart } from './context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { cart } = useCart()

  return (
    <main className={styles.container}>
      {/* 🔹 Header with cart and profile */}
      <header className={styles.header}>
  <Link href="/" className={styles.logo}>ReWear</Link>

  <nav className={styles.navLinks}>
    <Link href="/products">Browse</Link>
    <Link href="/list">List Item</Link>
    <Link href="/swaps">My Swaps</Link>
  </nav>

  <div className={styles.headerRight}>
    <span>🛒 {cart.length}</span>
    <Link href="/profile">
      <Image src="/images/avatar-placeholder.png" alt="Profile" width={36} height={36} style={{ borderRadius: '50%' }} />
    </Link>
  </div>
</header>


      {/* 🔻 Hero section */}
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

      {/* 🔻 Carousel section */}
      <section className={styles.carouselSection}>
        <h2 className={styles.carouselTitle}>Featured Items</h2>
        <Carousel />
      </section>

      {/* 🔻 Product cards */}
      <section className={styles.products}>
        <h2 className={styles.carouselTitle}>Available Products</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  )
}
