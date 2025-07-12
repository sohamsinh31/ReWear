'use client'

import Image from 'next/image'
import styles from '../styles/Landing.module.css'
import { products } from '../data/products'

export default function ProfilePage() {
  const user = {
    name: 'Sujal Sharma',
    email: 'sujal@example.com',
    joined: 'July 2024',
    avatar: '/images/avatar-placeholder.png',
  }

  const userProducts = products.slice(0, 2)

  return (
    <div style={{ padding: '2rem', background: '#f9f9f9', minHeight: '100vh' }}>
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '2rem',
        }}
      >
        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Image
            src={user.avatar}
            alt="Profile"
            width={80}
            height={80}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <h1 style={{
                fontSize: '1.5rem',
                marginBottom: '0.25rem',
                fontWeight: 600,
                color: '#222'
            }}>
            {user.name}
            </h1>
            <p style={{ margin: 0, color: '#555' }}>{user.email}</p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>Joined: {user.joined}</p>
          </div>
        </div>

        {/* Listed Items */}
        <h2 style={{
            marginTop: '2rem',
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#333' // darker for better contrast
            }}>
            Your Listings
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          {userProducts.map((product) => (
            <div key={product.id} className={styles.card} onClick={() => window.location.href = `/product/${product.id}`}>
              <img src={product.images[0]} alt={product.name} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardCategory}>{product.category}</p>
                <p className={styles.cardDescription}>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
