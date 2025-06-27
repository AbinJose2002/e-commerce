'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

const Loading = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/') 
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
    }}>
      <ClipLoader color="blue" size={50} />
      <p style={{ marginTop: '1rem' }}>Redirecting to home...</p>
    </div>
  )
}

export default Loading
