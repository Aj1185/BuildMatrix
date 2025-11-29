import api from './api'

export const inventoryService = {
  getAll: async () => {
    return await api.get('/inventory')
  },

  getById: async (id) => {
    return await api.get(`/inventory/${id}`)
  },

  create: async (data) => {
    return await api.post('/inventory', data)
  },

  update: async (id, data) => {
    return await api.put(`/inventory/${id}`, data)
  },

  delete: async (id) => {
    return await api.delete(`/inventory/${id}`)
  }
}

