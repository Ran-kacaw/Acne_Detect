const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const getToken = () => localStorage.getItem('token')

const jsonHeaders = () => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
})

const authHeaders = () => ({
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
})

export const loginUser = async (credentials) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Login failed' }))
    throw new Error(error.message || 'Login failed')
  }
  const data = await res.json()
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))
  return data
}

export const registerUser = async (payload) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Registration failed' }))
    throw new Error(error.message || 'Registration failed')
  }
  const data = await res.json()
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))
  return data
}

export const fetchHistory = async () => {
  const res = await fetch(`${BASE_URL}/api/history`, {
    method: 'GET',
    headers: jsonHeaders(),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to fetch history' }))
    throw new Error(error.message || 'Failed to fetch history')
  }
  return await res.json()
}

export const saveHistory = async (detectionResult) => {
  const res = await fetch(`${BASE_URL}/api/history`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(detectionResult),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to save history' }))
    throw new Error(error.message || 'Failed to save history')
  }
  return await res.json()
}

export const deleteHistoryById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/history/${id}`, {
    method: 'DELETE',
    headers: jsonHeaders(),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to delete history' }))
    throw new Error(error.message || 'Failed to delete history')
  }
  return await res.json()
}

export const detectAcne = async (file, jenis_kulit = 'Berminyak') => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('jenis_kulit', jenis_kulit)

  const res = await fetch(`${BASE_URL}/api/detect`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Detection failed' }))
    throw new Error(error.message || error.detail || 'Detection failed')
  }
  return await res.json()
}

export const sendContactMessage = async (payload) => {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to send message' }))
    throw new Error(error.message || 'Failed to send message')
  }

  return await res.json()
}
