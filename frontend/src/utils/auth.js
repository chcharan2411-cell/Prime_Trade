export const isAuthenticated = () => Boolean(localStorage.getItem('token'))

export const saveToken = (token) => localStorage.setItem('token', token)

export const clearToken = () => localStorage.removeItem('token')
