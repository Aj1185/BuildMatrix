import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard')
          break
        case 'project_manager':
          navigate('/project-manager/dashboard')
          break
        case 'employee':
          navigate('/employee/dashboard')
          break
        default:
          navigate('/login')
      }
    }
  }, [user, loading, navigate])

  return <div>Redirecting...</div>
}

export default Dashboard

