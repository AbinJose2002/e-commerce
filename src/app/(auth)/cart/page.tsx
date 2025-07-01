import Cart from '@/components/Cart'
import AuthGuard from '@/core_components/authguard/AuthGuard'
import React from 'react'

const page = () => {
  return (
    <div>
      <AuthGuard>
        <Cart />
      </AuthGuard>
    </div>
  )
}

export default page
