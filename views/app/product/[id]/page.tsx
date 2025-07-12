import { use } from 'react'
import { products } from '../../data/products'
import ProductDetails from './ProductDetails'

export default function ProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params)
  const product = products.find((p) => p.id === String(id))

  if (!product || !product.images) {
    return <div style={{ padding: '2rem' }}>Product not found or missing images.</div>
  }

  return <ProductDetails product={product} />
}
