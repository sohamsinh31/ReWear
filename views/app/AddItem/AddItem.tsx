'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import styles from '../styles/Landing.module.css'

export default function AddItemPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    pointsRequired: 0,
    usedFrequency: 0,
    coverImage: null as File | null,
    otherImages: [] as File[],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, coverImage: e.target.files![0] }))
    }
  }

  const handleOtherImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, otherImages: Array.from(e.target.files!) }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Item submitted for approval!')
  }

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Add New Item</h1>
        <p className={styles.subtitle}>List your unused clothing and earn points or start swapping.</p>
      </section>

      <form
        onSubmit={handleSubmit}
        className={styles.card}
        style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}
      >
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={styles.input}
          required
        >
          <option value="" disabled hidden>Select Category</option>
          <option value="Shirts">Shirts</option>
          <option value="Dresses">Dresses</option>
          <option value="Pants">Pants</option>
        </select>

        <input
          name="size"
          placeholder="Size (e.g. M, L)"
          value={formData.size}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className={styles.input}
          required
        >
          <option value="" disabled hidden>Select Condition</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Used">Used</option>
        </select>

        <input
          name="pointsRequired"
          type="number"
          placeholder="Points Required"
          value={formData.pointsRequired}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <input
          name="usedFrequency"
          type="number"
          placeholder="Used Frequency"
          value={formData.usedFrequency}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Cover Image</label>
        <input type="file" accept="image/*" onChange={handleCoverImageChange} className={styles.input} required />

        <label className={styles.label}>Other Images</label>
        <input type="file" multiple accept="image/*" onChange={handleOtherImagesChange} className={styles.input} />

        <button type="submit" className={styles.primary}>Submit Item</button>
      </form>
    </main>
  )
}