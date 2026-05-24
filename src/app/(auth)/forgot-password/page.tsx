import ForgotPassword from '@/src/components/auth/ForgotPassword'
import LeftComponent from '@/src/components/auth/LeftComponent'
import React from 'react'

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex">
      <LeftComponent />
      <ForgotPassword/>
    </div>
  )
}

export default ForgotPasswordPage
