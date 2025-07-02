import { products } from '@/services/mockData/products.json'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getProducts = async () => {
  await delay(300)
  return [...products]
}

export const getProductById = async (id) => {
  await delay(200)
  const product = products.find(p => p.Id === id)
  if (!product) {
    throw new Error('Product not found')
  }
  return { ...product }
}

export const getProductsByCategory = async (category) => {
  await delay(250)
  return products.filter(p => p.category === category).map(p => ({ ...p }))
}

export const searchProducts = async (query) => {
  await delay(300)
  const searchTerm = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    p.category.toLowerCase().includes(searchTerm)
  ).map(p => ({ ...p }))
}

export const getFeaturedProducts = async () => {
  await delay(250)
  return products.filter(p => p.featured).map(p => ({ ...p }))
}

export const getOnSaleProducts = async () => {
  await delay(250)
  return products.filter(p => p.salePrice).map(p => ({ ...p }))
}