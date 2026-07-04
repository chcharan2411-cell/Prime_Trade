import { useEffect, useState } from 'react'
import Alert from '../components/Alert'
import ProductForm from '../components/ProductForm'
import ProductTable from '../components/ProductTable'
import { createProduct, deleteProduct, getProducts, searchProducts, updateProduct } from '../services/ProductService'

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const role = localStorage.getItem('role') || 'USER'
  const isAdmin = role === 'ADMIN'

  const loadProducts = async () => {
    try {
      const response = await getProducts({
        page: 0,
        size: 5,
        sortBy: 'id',
        direction: 'asc',
      })
      setProducts(response?.data?.content || [])
    } catch (error) {
      console.error(error)
      setMessage({ type: 'error', text: 'Unable to load products from the backend.' })
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleSearch = async (event) => {
    const value = event.target.value
    setSearchTerm(value)

    if (!value.trim()) {
      loadProducts()
      return
    }

    try {
      const response = await searchProducts(value)
      setProducts(response?.data || [])
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData)
        setMessage({ type: 'success', text: 'Product updated successfully.' })
      } else {
        await createProduct(productData)
        setMessage({ type: 'success', text: 'Product created successfully.' })
      }
      setEditingProduct(null)
      loadProducts()
    } catch (error) {
      console.error(error)
      setMessage({ type: 'error', text: 'Product operation failed.' })
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      setMessage({ type: 'success', text: 'Product deleted successfully.' })
      loadProducts()
    } catch (error) {
      console.error(error)
      setMessage({ type: 'error', text: 'Delete failed.' })
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      <p>Role: {role}</p>
      <Alert type={message.type} message={message.text} />
      <input
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search products"
        style={{ marginBottom: '1rem', width: '100%', maxWidth: '320px' }}
      />
      {isAdmin && <ProductForm onSubmit={handleSubmit} initialData={editingProduct || {}} />}
      <div style={{ marginTop: '2rem' }}>
        <ProductTable
          products={products}
          onEdit={isAdmin ? setEditingProduct : undefined}
          onDelete={isAdmin ? handleDelete : undefined}
        />
      </div>
    </div>
  )

}

export default Dashboard
