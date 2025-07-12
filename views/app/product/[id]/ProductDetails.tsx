'use client'

import Image from 'next/image'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetails({ product }: { product: any }) {
  const { addToCart } = useCart()

  const handleSwapRequest = () => {
    toast.success('Swap request sent!')
  }

  const handleRedeem = () => {
    addToCart(product)
    toast.success(`${product.name} redeemed via points`)
  }

  // Mock uploader & status
  const uploader = {
    name: 'Ananya Verma',
    avatar: '/images/avatar-placeholder.png',
    memberSince: 'Jan 2024',
  }

  const status = 'Available' // or 'Swapped'

  return (
    <div style={{ padding: '2rem', background: '#f9f9f9', minHeight: '100vh' }}>
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '960px',
          margin: '0 auto',
          padding: '2rem',
        }}
      >
        {/* Header */}
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'black' }}>{product.name}</h1>
        <p style={{ color: '#666', marginBottom: '1rem' }}>Category: {product.category}</p>

        {/* Image Gallery */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {product.images.map((img: string, index: number) => (
            <div key={index} style={{ borderRadius: '12px', overflow: 'hidden' }}>
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
        <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.6', marginBottom: '2rem' }}>
          {product.description}
        </p>

        <div
          style={{
            position: 'relative',               // ⬅️ lets us absolutely‑position the icon
            fontSize: '1.1rem',
            color: '#fff',
            lineHeight: '1.6',
            marginBottom: '2rem',
            padding: '1rem 3.5rem 1rem 1rem',   // extra right‑padding so text doesn’t collide with icon
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p style={{ margin: 0, color: 'black' }}>
            <strong>Condition:</strong> <br />
            <strong>Title:</strong> Levi’s Vintage Denim Jacket – Size M, Classic Blue <br />
            <strong>Description:</strong> Add a timeless staple to your wardrobe with this vintage Levi’s denim jacket. Lightly worn and in great shape, this jacket brings effortless style to any outfit. <br />
            <strong>Condition:</strong> Gently used, no stains or rips <br />
            <strong>Size:</strong> Medium <br />
            <strong>Material:</strong> 100 % Cotton <br />
            <strong>Color:</strong> Classic Blue <br />
            <strong>Details:</strong> Button‑up front, two chest pockets, slightly faded for a true vintage look <br />
            <strong>Defects:</strong> Minimal fraying on cuffs (see photo)
          </p>

          {/* ----- AI icon (bottom‑right) ----- */}
          <div
            onClick={() => console.log('Open AI helper')}
            title="Ask AI about this item"
            style={{
              position: 'absolute',
              bottom: '0.75rem',
              right: '0.75rem',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'orange',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
              cursor: 'pointer',
            }}
          >
            <Image
              src="/ai.png"   // 🔁 point to your actual icon
              alt="AI Assistant"
              width={18}
              height={18}
            />
          </div>
        </div>


        {/* Uploader Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            padding: '1rem',
            background: '#f1f1f1',
            borderRadius: '12px',
          }}
        >
          <Image
            src={uploader.avatar}
            alt="Uploader"
            width={50}
            height={50}
            style={{ borderRadius: '50%', color: '#555' }}
          />
          <div>
            <p style={{ margin: 0, fontWeight: 600, color: '#555' }}>{uploader.name}</p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}>
              Member since {uploader.memberSince}
            </p>
          </div>
        </div>

        {/* Availability */}
        <p
          style={{
            fontWeight: 'bold',
            color: status === 'Available' ? '#4caf50' : '#f44336',
            marginBottom: '1rem',
          }}
        >
          Status: {status}
        </p>

        <p
          style={{
            fontWeight: 'bold',

            marginBottom: '1rem',
          }}
        >
          Estimated Points(beta): 100
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleSwapRequest}
            style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Request Swap
          </button>
          <button
            onClick={handleRedeem}
            style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Redeem via Points
          </button>
        </div>
      </div>
    </div>
  )
}
