import { categories } from '@/services/mockData/categories.json'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getCategories = async () => {
  await delay(200)
  return [...categories]
}

export const getCategoryById = async (id) => {
  await delay(150)
  const category = categories.find(c => c.Id === id)
  if (!category) {
    throw new Error('Category not found')
  }
  return { ...category }
}