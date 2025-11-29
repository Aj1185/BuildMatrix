import api from './api'

export const authService = {
  login: async (email, password) => {
    return await api.post('/auth/login', { email, password })
  },

  verifyToken: async (token) => {
    return await api.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}

