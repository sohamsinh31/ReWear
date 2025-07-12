'use client'

import styles from './styles/Landing.module.css'
import Carousel from './components/Carousel'
import ProductCard from './components/ProductCard'
import { products } from './data/products'
import { useCart } from './context/CartContext'

export default function Home() {
  const { cart } = useCart()

  return (
    <main className={styles.container}>
      <div className={styles.cartHeader}>
        <span role="img" aria-label="cart">🛒</span> {cart.length} item(s)
      </div>

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
  )
}
