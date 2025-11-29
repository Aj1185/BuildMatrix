import api from './api'

export const materialRequestService = {
  getAll: async () => {
    return await api.get('/material-requests')
  },

  getById: async (id) => {
    return await api.get(`/material-requests/${id}`)
  },

  getByManager: async (managerId) => {
    return await api.get(`/material-requests/manager/${managerId}`)
  },

  create: async (data) => {
    return await api.post('/material-requests', data)
  },

  update: async (id, data) => {
    return await api.put(`/material-requests/${id}`, data)
  },

  delete: async (id) => {
    return await api.delete(`/material-requests/${id}`)
  }
}

