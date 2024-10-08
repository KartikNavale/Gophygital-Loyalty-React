import React from 'react'
import '../components/style.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const NewSegment = () => {
  return (
     <>
     <Header/>
    <Sidebar/>
        <div className='website-content'>
        <div className='module-data-section mt-2'>
        <p className="pointer">
            <span className="text-secondary">Segment</span> &gt; New Segment
          </p>
          <h5 class="mb-3 title">New Segment</h5>
          <div className="go-shadow me-3 pb-4">
          <div className="row ms-1 mt-4">
            <fieldset className="border  col-md-3 m-2 col-sm-11">
          <legend className="float-none">Target Audience<span>*</span></legend>
          <select required="">
            <option value="" disabled="" selected="" hidden="">
            Select Target Audience
            </option>
            <option value="0">Building1</option>
            <option value="1">Building2</option>
          </select>
        </fieldset>

        <fieldset className="border   col-md-3 m-2 col-sm-11">
          <legend className="float-none">Campaign type<span>*</span></legend>
          <select required="">
            <option value="" disabled="" selected="" hidden="">
            select campaign type
            </option>
            <option value="0">Building1</option>
            <option value="1">Building2</option>
          </select>
        </fieldset>

        <fieldset className="border   col-md-3 m-2 col-sm-11">
          <legend className="float-none">Tier level<span>*</span></legend>
          <select required="">
            <option value="" disabled="" selected="" hidden="">
            Tier level
            </option>
            <option value="0">Building1</option>
            <option value="1">Building2</option>
          </select>
        </fieldset>
        <fieldset className="border   col-md-3 m-2 col-sm-11">
          <legend className="float-none">Tier level<span>*</span></legend>
          <select required="">
            <option value="" disabled="" selected="" hidden="">
            Tier level
            </option>
            <option value="0">Building1</option>
            <option value="1">Building2</option>
          </select>
        </fieldset>
        <fieldset className="border   col-md-3 m-2 col-sm-11">
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
            <div className="row mt-2 justify-content-center">
                        <div className="col-md-2">
                            <button class="purple-btn1 w-100" fdprocessedid="u33pye">Submit</button>
                        </div>
                        <div className="col-md-2">
                            <button className="purple-btn2 w-100" fdprocessedid="af5l5g">Cancel</button>
                        </div>
                    </div>
        </div>
        </div>
     </>
  )
}

export default NewSegment