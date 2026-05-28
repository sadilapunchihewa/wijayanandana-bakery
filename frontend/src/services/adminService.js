import { apiClient } from './apiClient'

export const productCategories = [
  'Cakes',
  'Bakery',
  'Bread',
  'Sri Lankan Foods',
  'Hotel Foods',
  'Drinks',
]

export const mealCategories = ['Breakfast', 'Lunch', 'Dinner']

export const bakeryCategories = ['Breads', 'Buns', 'Cakes', 'Pastries', 'Snacks', 'Beverages']

export async function getProducts(params = {}) {
  const { data } = await apiClient.get('/products', { params })
  if (!data?.success) throw new Error(data?.message || 'Unable to load products')
  return data.products
}

export async function createProduct(payload) {
  const { data } = await apiClient.post('/products', payload)
  if (!data?.success) throw new Error(data?.message || 'Unable to create product')
  return data.product
}

export async function updateProduct(id, payload) {
  const { data } = await apiClient.put(`/products/${id}`, payload)
  if (!data?.success) throw new Error(data?.message || 'Unable to update product')
  return data.product
}

export async function deleteProduct(id) {
  const { data } = await apiClient.delete(`/products/${id}`)
  if (!data?.success) throw new Error(data?.message || 'Unable to delete product')
  return data
}

export async function getMeals(params = {}) {
  const { data } = await apiClient.get('/meals', { params })
  if (!data?.success) throw new Error(data?.message || 'Unable to load meals')
  return data.meals
}

export async function createMeal(payload) {
  const { data } = await apiClient.post('/meals', payload)
  if (!data?.success) throw new Error(data?.message || 'Unable to create meal')
  return data.meal
}

export async function updateMeal(id, payload) {
  const { data } = await apiClient.put(`/meals/${id}`, payload)
  if (!data?.success) throw new Error(data?.message || 'Unable to update meal')
  return data.meal
}

export async function deleteMeal(id) {
  const { data } = await apiClient.delete(`/meals/${id}`)
  if (!data?.success) throw new Error(data?.message || 'Unable to delete meal')
  return data
}

export async function getBakeryProducts(params = {}) {
  const { data } = await apiClient.get('/bakery-products', { params })
  if (!data?.success) throw new Error(data?.message || 'Unable to load bakery products')
  return data.products
}

export async function createBakeryProduct(payload) {
  const { data } = await apiClient.post('/bakery-products', payload)
  if (!data?.success) throw new Error(data?.message || 'Unable to create bakery product')
  return data.product
}

export async function updateBakeryProduct(id, payload) {
  const { data } = await apiClient.put(`/bakery-products/${id}`, payload)
  if (!data?.success) throw new Error(data?.message || 'Unable to update bakery product')
  return data.product
}

export async function deleteBakeryProduct(id) {
  const { data } = await apiClient.delete(`/bakery-products/${id}`)
  if (!data?.success) throw new Error(data?.message || 'Unable to delete bakery product')
  return data
}

export async function getOrders(params = {}) {
  const { data } = await apiClient.get('/orders', { params })
  if (!data?.success) throw new Error(data?.message || 'Unable to load orders')
  return data.orders
}

export async function updateOrder(id, payload) {
  const { data } = await apiClient.put(`/orders/${id}`, payload)
  if (!data?.success) throw new Error(data?.message || 'Unable to update order')
  return data.order
}
