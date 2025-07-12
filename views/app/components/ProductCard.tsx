'use client'

import styles from '../styles/Landing.module.css'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  id: string
  name: string
  category: string
  description: string
  image: string
}

export default function ProductCard({ id, name, category, description, image }: ProductCardProps) {
  const router = useRouter()

  return (
    <div className={styles.card} onClick={() => router.push(`/product/${id}`)}>
      <img src={image} alt={name} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardCategory}>{category}</p>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  )
}
