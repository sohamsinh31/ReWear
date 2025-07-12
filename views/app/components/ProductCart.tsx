'use client'

import { useCart } from '../context/CartContext'
import styles from '../styles/Landing.module.css'
import Image from 'next/image'
import toast from 'react-hot-toast'

export default function Cart() {
    const { cart, removeFromCart } = useCart()

    if (cart.length === 0) {
        return <div className={styles.card}>Your cart is empty.</div>
    }

    return (
        <div className={styles.card} style={{ padding: '1rem', maxWidth: '360px' }}>
            <h3 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Your Cart</h3>

            {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <Image
                        src={item.image[0]}
                        alt={item.name}
                        width={64}
                        height={64}
                        style={{ borderRadius: '8px', objectFit: 'cover', marginRight: '0.75rem' }}
                    />
                    <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>{item.name}</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>{item.pointsRequired} pts</p>
                    </div>
                    <button
                        onClick={() => {
                            removeFromCart(item.id)
                            toast.success('Removed from cart')
                        }}
                        style={{
                            background: '#f44336',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                        }}
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    )
}