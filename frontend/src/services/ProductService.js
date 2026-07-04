import api from '../api/axiosConfig'

export const getProducts = ({ page, size, sortBy, direction }) =>
  api.get('/products/page', {
    params: {
      page,
      size,
      sortBy,
      direction,
    },
  })

export const createProduct = (product) => api.post('/products', product)
export const updateProduct = (id, product) => api.put(`/products/${id}`, product)
export const deleteProduct = (id) => api.delete(`/products/${id}`)
export const searchProducts = (query) =>
  api.get('/products/search', {
    params: {
      keyword: query,
    },
  })