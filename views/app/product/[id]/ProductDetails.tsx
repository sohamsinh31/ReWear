'use client'

import Image from 'next/image'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetails({ product }: { product: any }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem',
        background: '#f9f9f9',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '2rem',
          maxWidth: '960px',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>{product.name}</h1>
          <p style={{ fontSize: '1rem', color: '#555' }}>
            <strong>Category:</strong> {product.category}
          </p>

          {/* Images grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
            }}
          >
            {product.images.map((img: string, index: number) => (
              <div key={index} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                <Image
                  src={img}
                  alt={`Product image ${index}`}
                  width={500}
                  height={300}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
            {product.description}
          </p>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            style={{
              alignSelf: 'start',
              padding: '0.8rem 1.5rem',
              backgroundColor: '#4caf50',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 500,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4caf50')}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
