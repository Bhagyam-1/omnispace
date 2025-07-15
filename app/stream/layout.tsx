import Header from '@/components/layout/header'
import React from 'react'

const StreamLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
    </>
  )
}

export default StreamLayout;