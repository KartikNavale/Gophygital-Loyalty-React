import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'


export default function RootLayout() {
  return (
    <div>
        <div className="d-flex">
            <div style={{marginTop:'55px'}}>
            <Sidebar />
            </div>
            <div className="flex-grow-1">
                <Header />
                <div style={{marginLeft:'200px'}}>
                <Outlet />
                <Footer />
                </div>
            </div>
        </div>
    </div>
  )
}
