import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from './Footer';

const NewTier=()=>{
  return(
    <>

<Header />
      <Sidebar />
      
          {/* ... */}
          <div className="website-content d-flex flex-column " >
          
  <div className=" go-shadow  module-data-section mt-2"  style={{height:'673px'}}>
    
    <p className="pointer">
      <span className="text-secondary">Tiers</span> &gt; New Tier 
    </p>
    <form action="/pms/services_list" acceptCharset="UTF-8" method="get">
      <input name="utf8" type="hidden" value="✓" />
      <input type="hidden" name="authenticity_token" value="RS9yOgYd9yWUpzY1YCBhg6ZMyV9kWNf2UYA8OxAzNI6bFrkApKlp0FMobET3d5xoFHmS9b1zfxRetPKHnZhOuA==" />
      <div className="modal-body">
        <h5 class="d-flex ms-3">
            <span class="title mt-3">NEW TIER</span>
          </h5>
        <div className="row ms-2">
          <div className="col-sm-3">
            <fieldset className="border">
              <legend className="float-none">Tier Name
              <span x="20" y="20" font-family="Arial" font-size="15" text-anchor="middle" style={{ color:"#e95420"}}>*</span>
                </legend>
              <input type="text" name="q[service_name_cont]" className="form_control mt-2" placeholder="Enter Tier Name" />
            </fieldset>
          </div>

          <div className="col-sm-3">
            <fieldset className="border">
              <legend className="float-none">Exit Points
              <span x="20" y="20" font-family="Arial" font-size="15" text-anchor="middle" style={{ color:"#e95420"}}>*</span>
              </legend>
              <input type="text" name="q[service_name_cont]" className="form_control mt-2" placeholder="Enter Exit Points" />
            </fieldset>
          </div>

          <div className="col-sm-3">
            <fieldset className="border">
              <legend className="float-none">Set Multipliers
             
              <span x="20" y="20" font-family="Arial" font-size="15" text-anchor="middle" style={{ color:"#e95420"}}>*</span>
              </legend>
              <input type="text" name="q[service_name_cont]" className="form_control mt-2" placeholder=" Enter Multipliers" />
            </fieldset>
          </div>

          <div className="col-sm-3">
            <fieldset className="border">
              <legend className="float-none">Welcome Bonus
              
              <span x="20" y="20" font-family="Arial" font-size="15" text-anchor="middle" style={{ color:"#e95420"}}>*</span>
              </legend>
              <input type="text" name="q[service_name_cont]" className="form_control mt-2" placeholder="Enter welcome bonus" />
            </fieldset>
          </div>
        </div>
      </div>
    </form>

    <div className="  justify-content-center align-item-center m-4">
             <button type="submit" className="btn purple-btn1">
             Add New Tier
             </button>
             
         </div>

         
  
  </div>


  <div className="d-flex justify-content-center align-item-center  mt-1">

  <div className="  justify-content-center align-item-center">
            
            <button type="submit" className="btn purple-btn1 px-4 ">
              Submit
             </button>
             <button type="button" className="btn purple-btn2 px-2">
               Cancel
             </button>
             
         </div>
             
         </div>

          </div>
    </>
  )
}

export default NewTier