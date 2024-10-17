import React from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../styles/style.css'
import SubHeader from '../components/SubHeader';

const MemberDetails = () => {
  return (
   <>
     <Header/>
    <div className="website-content d-flex">
    <Sidebar/>
      <div className="w-100">
      <SubHeader />
        <div className="module-data-section mt-2 mb-2">
        <p className="pointer">
            <span className="text-secondary">Members</span> &gt; Member Details
          </p>

          {/* personal details */}
          <div class="go-shadow mx-3 no-top-left-shadow ">
          <h5 class="d-flex">
            <span class="title mt-3">PERSONAL DETAILS</span>
          </h5>
          <div class="row px-3">
            <div class="col-lg-8 col-md-12 col-sm-12 row px-3">
              <div class="col-6 p-1 text-muted member-detail-color">Full name</div>
              <div class="col-6 p-1 member-detail-color">: Melissa Gracia</div>
            </div>
            <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
              <div class="col-6 p-1 text-muted member-detail-color">Email Address</div>
              <div class="col-6 p-1 member-detail-color">: melissagracia@gmail.com</div>
            </div>
            <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
              <div class="col-6 p-1 text-muted member-detail-color">Phone No.</div>
              <div class="col-6 p-1 member-detail-color">: 1234567890</div>
            </div>
            <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
              <div class="col-6 p-1 text-muted member-detail-color">Home Address</div>
              <div class="col-6 p-1 member-detail-color">: Home Address</div>
            </div>

          </div>
        </div>
          
          {/* Membership Status */}
          <div class="go-shadow mx-3 no-top-left-shadow ">
          <h5 class="d-flex">
            <span class="title mt-3">MEMBERSHIP STATUS</span>
          </h5>
          <div class="row px-3">
            <div class="col-lg-8 col-md-12 col-sm-12 row px-3">
              <div class="col-6 p-1 text-muted member-detail-color">Current Loyalty Points</div>
              <div class="col-6 p-1 member-detail-color">: 1000</div>
            </div>
            <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
              <div class="col-6 p-1 text-muted member-detail-color">Tier Progress</div>
              <div class="col-6 p-1 member-detail-color">: 25%</div>
            </div>
            <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
              <div class="col-6 p-1 text-muted member-detail-color">Membership Duration </div>
              <div class="col-6 p-1 member-detail-color">: Name</div>
            </div>
            <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
              <div class="col-6 p-1 text-muted member-detail-color">Account Status</div>
              <div class="col-6 p-1 member-detail-color">: Active</div>
            </div>
            <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
              <div class="col-6 p-1 text-muted member-detail-color">Enrolled Date</div>
              <div class="col-6 p-1 member-detail-color">: 12/02/2024</div>
            </div>
            <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
              <div class="col-6 p-1 text-muted member-detail-color">Tier Level</div>
              <div class="col-6 p-1 member-detail-color">: Bronze</div>
            </div>
            <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
              <div class="col-6 p-1 text-muted member-detail-color">Expiry Points</div>
              <div class="col-6 p-1 member-detail-color">: 20/02/2024 </div>
            </div>

          </div>
        </div>
        
          {/* Middle Boxex */}

<div className="material-boxes m-5">
  <div className="container-fluid d-flex align-item-center justify-content-center " style={{height:'135px',width:'1000px'}}>
    <div className="row d-flex justify-content-between align-item-center">
      <div className="col-md-2 col-sm-11 d-flex justify-content-center align-item-center">
        <div className="content-box text-center tab-button border pt-4" style={{ height: '135px', width: '246px',borderRadius:'20px'}}>
          <p className="content-box-sub fw-light">14.28%</p>
          <h6 className="content-box-title" style={{heigth:'20px',width:'221px'}}>ALL THE POINTS EARNED</h6>
          <h6 className="content-box-title">1400</h6>
        </div>
      </div>

      <div className="col-md-2 col-sm-11 d-flex justify-content-center align-item-center">
        <div className="content-box text-center tab-button border pt-4" style={{ height: '135px', width: '246px' ,borderRadius:'20px'}}>
          <p className="content-box-sub fw-light">12.50%</p>
          <h6 className="content-box-title" style={{heigth:'20px',width:'221px'}}>ALL THE POINTS REDEEMED</h6>
          <h6 className="content-box-title">7000</h6>
        </div>
      </div>

      <div className="col-md-2 col-sm-11 d-flex justify-content-center align-item-center">
        <div className="content-box text-center tab-button border pt-5" style={{ height: '135px', width: '246px' ,borderRadius:'20px'}}>
          <h6 className="content-box-title" style={{heigth:'20px',width:'221px'}}>BALANCED POINTS</h6>
          <h6 className="content-box-title">7000</h6>
        </div>
      </div>
    </div>
  </div>
</div>




          {/* table */}
          
              <div>
              <h5 className="m-3 title ps-2 ">TRANSACTION STATUS</h5>
              <div className='tbl-container mx-5' >
              <table className="w-100"  >
            <thead >
              <tr> 
                <td className="text-center"> Date</td>
                <td className="text-center"> Transaction Type</td>
                <td  className="text-center"> Balanced Points</td>
                <td className="text-center">Earned Points</td>
                <td className="text-center">Redeem Points</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">12/02/2024</td>
                <td className="text-center">Credit</td>
                <td className="text-center">...</td>
                <td className="text-center">...</td>
                <td className="text-center"></td>
              </tr>
              <tr>
              <td className="text-center">12/02/2024</td>
              <td className="text-center">Debit</td>
                <td className="text-center">...</td>
                <td className="text-center">...</td>
                <td className="text-center"></td>
              </tr>
              <tr>
              <td className="text-center">12/02/2024</td>
              <td className="text-center">Debit</td>
                <td className="text-center">...</td>
                <td className="text-center">...</td>
                <td className="text-center"></td>
              </tr>
              <tr>
              <td className="text-center">12/02/2024</td>
              <td className="text-center">Credit</td>
                <td className="text-center">...</td>
                <td className="text-center">...</td>
                <td className="text-center"></td>
              </tr>
            </tbody>
          </table>
              </div>
          
        </div>
       
        </div>
      </div>
        <Footer />
         </div>
   </>
  )
}

export default MemberDetails