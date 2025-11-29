import api from './api'

export const projectService = {
  getAll: async () => {
    return await api.get('/projects')
  },

  getById: async (id) => {
    return await api.get(`/projects/${id}`)
  },

  getByManager: async (managerId) => {
    return await api.get(`/projects/manager/${managerId}`)
  },

  create: async (data) => {
    return await api.post('/projects', data)
  },

  update: async (id, data) => {
    return await api.put(`/projects/${id}`, data)
  },

  delete: async (id) => {
    return await api.delete(`/projects/${id}`)
  }
}

