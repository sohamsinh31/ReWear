'use client'

import { products } from '../../data/products'
import Image from 'next/image'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'
import { use } from 'react'

export default function ProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params)
  const product = products.find((p) => p.id === id)
  const { addToCart } = useCart()

  if (!product || !product.images) {
    return <div style={{ padding: '2rem' }}>Product not found or missing images.</div>
  }

  const handleAddToCart = () => {
    addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '960px', margin: '0 auto' }}>
      <h1>{product.name}</h1>
      <p>Category: {product.category}</p>

      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        margin: '1rem 0'
      }}>
        {product.image.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`product image ${index}`}
            width={300}
            height={200}
            style={{ borderRadius: '10px' }}
          />
        ))}
      </div>

      <p>{product.description}</p>

      <button
        onClick={handleAddToCart}
        style={{
          marginTop: '1rem',
          padding: '0.8rem 1.5rem',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}
