import React from "react";
import "../styles/style.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import SubHeader from "../components/SubHeader";

const NewSegment = () => {
  return (
    <>
      <Header />
      <div className="website-content d-flex">
        <Sidebar />
        <div className="w-100">
          <SubHeader />
          <div className="module-data-section mt-2">
            <p className="pointer">
              <span className="text-secondary">Segment</span> &gt; New Segment
            </p>
            <h5 class="mb-3 title">New Segment</h5>
            <div className="go-shadow me-3 pb-4">
              <div className="row ms-1 mt-4">
                <fieldset className="border  col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Segment Name<span>*</span>
                  </legend>
                  <select required="">
                    <option value="" disabled="" selected="" hidden="">
                      Enter segment name
                    </option>
                    <option value="0">Building1</option>
                    <option value="1">Building2</option>
                  </select>
                </fieldset>

                <fieldset className="border   col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Segment tag<span>*</span>
                  </legend>
                  <select required="">
                    <option value="" disabled="" selected="" hidden="">
                      select Segment tag
                    </option>
                    <option value="0">Recently joined</option>
                    <option value="1">Suspended </option>
                    <option value="1">1-purchase</option>
                    <option value="1">No purchase</option>
                  </select>
                </fieldset>
                <fieldset className="border   col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Segment type<span>*</span>
                  </legend>
                  <select required="">
                    <option value="" disabled="" selected="" hidden="">
                      select segment type
                    </option>
                    <option value="0">Point based</option>
                    <option value="1">Discount based </option>
                    <option value="1">Referral Campaign</option>
                    <option value="1">Tier - Up Campaign</option>
                    <option value="1">Custom Campaign</option>
                  </select>
                </fieldset>
                <fieldset className="border col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Enrollment Date<span>*</span>
                  </legend>
                  <input
                    type="date"
                    id="enrollmentDate"
                    name="enrollmentDate"
                    className="form-control border-0"
                    required
                  />
                </fieldset>
                <fieldset className="border   col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Tier level<span>*</span>
                  </legend>
                  <select required="">
                    <option value="" disabled="" selected="" hidden="">
                      Tier level
                    </option>
                    <option value="0">Bronze</option>
                    <option value="1">Silver</option>
                    <option value="1">Gold</option>
                  </select>
                </fieldset>
                <fieldset className="border   col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Status<span>*</span>
                  </legend>
                  <select required="">
                    <option value="" disabled="" selected="" hidden="">
                      Select status
                    </option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </fieldset>
                <fieldset className="border   col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Age<span>*</span>
                  </legend>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    className="form-control border-0"
                    required
                  />
                </fieldset>
                <fieldset className="border   col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Gender<span>*</span>
                  </legend>
                  <select required="">
                    <option value="" disabled="" selected="" hidden="">
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </fieldset>
                <fieldset className="border   col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Activated Date<span>*</span>
                  </legend>
                  <input
                    type="date"
                    id="activatedDate"
                    name="activatedDate"
                    className="form-control border-0"
                    required
                  />
                </fieldset>
              </div>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-md-2">
                <button class="purple-btn1 w-100" fdprocessedid="u33pye">
                  Submit
                </button>
              </div>
              <div className="col-md-2">
                <button className="purple-btn2 w-100" fdprocessedid="af5l5g">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default NewSegment;
