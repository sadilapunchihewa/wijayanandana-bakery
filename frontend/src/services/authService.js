import { apiClient } from './apiClient'

export async function registerRequest({ name, email, password }) {
  const { data } = await apiClient.post('/auth/register', {
    name,
    email,
    password,
  })

  if (!data?.success) {
    throw new Error(data?.message || 'Registration failed')
  }

  return {
    token: data.token,
    user: data.user,
  }
}

export async function loginRequest({ email, password }) {
  const { data } = await apiClient.post('/auth/login', {
    email,
    password,
  })

  if (!data?.success) {
    throw new Error(data?.message || 'Login failed')
  }

  return {
    token: data.token,
    user: data.user,
  }
}

export async function getProfileRequest() {
  const { data } = await apiClient.get('/user/profile')
  if (!data?.success) {
    throw new Error(data?.message || 'Unable to load profile')
  }
  return data.user
}

export async function updateProfileRequest(payload) {
  const { data } = await apiClient.put('/user/profile', payload)
  if (!data?.success) {
    throw new Error(data?.message || 'Unable to update profile')
  }
  return data.user
}

