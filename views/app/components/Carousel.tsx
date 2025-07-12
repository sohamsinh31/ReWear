// components/Carousel.tsx
'use client'

import styles from '../styles/Landing.module.css'
import { useEffect, useState } from 'react'

const images = [
  '/images/clothes-laptop-bed-arrangement-high-angle.jpg',
  '/images/high-angle-clothes-bed-fast-fashion.jpg',
  '/images/medium-shot-smiley-woman-with-clothes.jpg'
]

export default function Carousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.carouselWrapper}>
      <img
        src={images[index]}
        alt="Featured Clothing"
        className={styles.fullWidthCarouselImage}
      />
    </div>
  )
}
