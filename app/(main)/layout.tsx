import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import React, { ReactNode } from 'react'

const MainLayout = ({children}: Readonly<{children: ReactNode}>) => {
  return (
    <>
        <Header />

        <main className="min-h-screen pt-12">
            {children}
        </main>

        <Footer />
    </>
  )
}

export default MainLayout
