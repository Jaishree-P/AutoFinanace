import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import FieldDashboard from './pages/FieldDashboard'
import RecoveryDashboard from './pages/RecoveryDashboard'
import OwnerDashboard from './pages/OwnerDashboard'
import AddCustomer from './pages/AddCustomer'
import Records from './pages/Records'

import ProtectedRoute from './components/ProtectedRoute'

function App(){

  return(
    <Routes>

      <Route path='/' element={<Home />} />

      <Route path='/login/:role' element={<Login />} />

      <Route
        path='/field-dashboard'
        element={
          <ProtectedRoute allowedRoles={['field-agent']}>
            <FieldDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path='/recovery-dashboard'
        element={
          <ProtectedRoute allowedRoles={['recovery']}>
            <RecoveryDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path='/owner-dashboard'
        element={
          <ProtectedRoute allowedRoles={['owner']}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path='/add-customer'
        element={
          <ProtectedRoute allowedRoles={['field-agent', 'owner']}>
            <AddCustomer />
          </ProtectedRoute>
        }
      />

      <Route
        path='/records'
        element={
          <ProtectedRoute allowedRoles={['field-agent', 'owner']}>
            <Records />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App