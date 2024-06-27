import React from 'react'
import ReplayContextProvider from '../features/replay/context/ReplayContext'
import ReplayBoard from '../features/replay/components/ReplayBoard'
import ProtectedRoute from '../features/user/components/ProtectedRoute'

function ReplayPage() {
  return (
    <div className="hero-content text-center bg-pink-200 rounded-2xl p-8">
      <ProtectedRoute>
      <ReplayContextProvider>
        <ReplayBoard />
      </ReplayContextProvider>
      </ProtectedRoute>
    </div>
  )
}

export default ReplayPage
