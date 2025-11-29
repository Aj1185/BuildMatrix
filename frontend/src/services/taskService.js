import api from './api'

export const taskService = {
  getAll: async () => {
    return await api.get('/tasks')
  },

  getById: async (id) => {
    return await api.get(`/tasks/${id}`)
  },

  getByEmployee: async (employeeId) => {
    return await api.get(`/tasks/employee/${employeeId}`)
  },

  create: async (data) => {
    return await api.post('/tasks', data)
  },

  update: async (id, data) => {
    return await api.put(`/tasks/${id}`, data)
  },

  updateStatus: async (id, status) => {
    return await api.patch(`/tasks/${id}/status`, { status })
  },

  delete: async (id) => {
    return await api.delete(`/tasks/${id}`)
  }
}

