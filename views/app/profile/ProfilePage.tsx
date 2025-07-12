"use client"

import Image from 'next/image'
import styles from '../styles/Landing.module.css'
import { products } from '../data/products'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const user = {
    name: 'Sujal Sharma',
    email: 'sujal@example.com',
    joined: 'July 2024',
    avatar: '/images/avatar-placeholder.png',
  }

  const userProducts = products.slice(0, 2)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', address: '', image: null as File | null })

  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowForm(false)
    toast.success('Profile updated successfully!')
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setShowPasswordForm(false)
    toast.success('Password updated successfully!')
  }

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
            <h1
              style={{
                fontSize: '1.5rem',
                marginBottom: '0.25rem',
                fontWeight: 600,
                color: '#222',
              }}
            >
              {user.name}
            </h1>
            <p style={{ margin: 0, color: '#555' }}>{user.email}</p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>Joined: {user.joined}</p>
          </div>
        </div>

        {/* Listed Items */}
        <h2
          style={{
            marginTop: '2rem',
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#333',
          }}
        >
          Your Listings
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginTop: '1rem',
          }}
        >
          {userProducts.map((product) => (
            <div
              key={product.id}
              className={styles.card}
              onClick={() => (window.location.href = `/product/${product.id}`)}
            >
              <img src={product.images[0]} alt={product.name} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardCategory}>{product.category}</p>
                <p className={styles.cardDescription}>{product.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
          <button className={styles.secondary} onClick={() => setShowForm(true)}>
            Update Info
          </button>
          <button className={styles.primary} onClick={() => setShowPasswordForm(true)}>
            Update Password
          </button>
        </div>
      </div>

      {/* Update Info Modal */}
      {showForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              width: '100%',
              maxWidth: '500px',
            }}
          >
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>Update Info</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleFormChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleFormChange}
              className={styles.input}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.input}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button type="button" className={styles.secondary} onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className={styles.primary}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Update Password Modal */}
      {showPasswordForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <form
            onSubmit={handlePasswordSubmit}
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              width: '100%',
              maxWidth: '500px',
            }}
          >
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>Update Password</h2>

            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              placeholder="Old Password"
              className={styles.input}
              required
            />

            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className={styles.input}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Re-enter New Password"
              className={styles.input}
              required
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button
                type="button"
                className={styles.secondary}
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className={styles.primary}>
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}