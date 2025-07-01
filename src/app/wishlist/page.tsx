import Wishlist from '@/components/Wishlist'
import AuthGuard from '@/core_components/authguard/AuthGuard'
import React from 'react'

const page = () => {
  return (
    <AuthGuard>
        <Wishlist />
    </ AuthGuard>
  )
}

export default page
