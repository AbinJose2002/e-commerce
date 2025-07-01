import Checkout from '@/components/Checkout'
import AuthGuard from '@/core_components/authguard/AuthGuard'
import React from 'react'

const page = () => {
  return (
    <AuthGuard>
        <Checkout />
    </AuthGuard>
  )
}

export default page
