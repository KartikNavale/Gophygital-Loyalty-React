import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'


export default function RootLayout() {
  return (
    <main className="h-100 w-100">
       <Header />

    <div className="main-content">
 
        <div >
          <Sidebar />
        </div>

      <div className="website-content flex-grow-1">
        <Outlet /> {/* Dynamic content rendering */}
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </div>
  </main>
  )
}
