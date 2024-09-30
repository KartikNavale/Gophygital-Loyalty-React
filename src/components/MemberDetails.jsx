import React from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MemberDetails = () => {
  return (
   <>
     <Header/>
    <Sidebar/>
    <div className="website-content">
        <div className="module-data-section mt-2"></div>
        <Footer />
         </div>
   </>
  )
}

export default MemberDetails