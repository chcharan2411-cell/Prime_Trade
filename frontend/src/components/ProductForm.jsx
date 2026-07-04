import { useState } from 'react'

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    quantity: initialData.quantity || '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      quantity: formData.quantity,
    }

    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem', maxWidth: '320px' }}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Product name" required />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required />
      <button type="submit">Save</button>
    </form>
  )
}

export default ProductForm
