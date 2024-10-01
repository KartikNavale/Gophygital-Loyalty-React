import React from 'react'
import "../components/style.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const NewCampaign = () => {
  return (
     <>
     <Header/>
     <Sidebar/>
     <div className="website-content">
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Campaign</span> &gt; New Campaign
          </p>
          <h5 class="mb-3 title">New Campaign</h5>
          <div className='go-shadow me-3 pt-3'>
          <div className="border-bottom pb-2">
            <div className="row">
            <div className="col-md-11">
            <input class="border w-100 p-2 py-2" placeholder="Enter Campaign Name" />
            </div>
            </div>
            <div className="row ms-1 mt-4">
            <fieldset className="border col-lg-3 col-md-5 col-sm-11">
          <legend className="float-none">Target Audience<span>*</span></legend>
          <select required="">
            <option value="" disabled="" selected="" hidden="">
            Select Target Audience
            </option>
            <option value="0">Building1</option>
            <option value="1">Building2</option>
          </select>
        </fieldset>

        <fieldset className="border col-lg-3 col-md-5 col-sm-11">
          <legend className="float-none">Campaign type<span>*</span></legend>
          <select required="">
            <option value="" disabled="" selected="" hidden="">
            select campaign type
            </option>
            <option value="0">Building1</option>
            <option value="1">Building2</option>
          </select>
        </fieldset>

        <fieldset className="border col-lg-3 col-md-5 col-sm-11">
          <legend className="float-none">Tier level<span>*</span></legend>
          <select required="">
            <option value="" disabled="" selected="" hidden="">
            Tier level
            </option>
            <option value="0">Building1</option>
            <option value="1">Building2</option>
          </select>
        </fieldset>
            </div>
          </div>
          <div className='mt-2'>
            <p className='fw-bold'>Points Criteria <span>*</span></p>
          <p className="">
                    <input class="align-middle mx-2" type="checkbox" />
                    <span class="align-middle">Send points to existing members.</span>
                  </p>
          </div>
          <div className='mt-5'>
            <p className='fw-bold'>Campaign Rewards <span>*</span></p>
          </div>
          </div>
        </div>
        <Footer />
      </div>
     </>
  )
}

export default NewCampaign