import React from 'react'
import '../components/style.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const TierSetting = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
    <div className="website-content">
    <div className="module-data-section mt-2">
    <p className="pointer">
            <span className="text-secondary">Tiers</span> &gt; Tier Setting
          </p>
          <h5 className="mb-3">Tier Setting</h5>
        </div>
        <Footer />
        </div>
    </>
  )
}

export default TierSetting