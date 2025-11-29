import api from './api'

export const employeeService = {
  getAll: async () => {
    return await api.get('/employees')
  },

  getById: async (id) => {
    return await api.get(`/employees/${id}`)
  },

  getByRole: async (role) => {
    return await api.get(`/employees/role/${role}`)
  },

  create: async (data) => {
    return await api.post('/employees', data)
  },

  update: async (id, data) => {
    return await api.put(`/employees/${id}`, data)
  },

  delete: async (id) => {
    return await api.delete(`/employees/${id}`)
  }
}

