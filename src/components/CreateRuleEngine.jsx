import React from 'react'
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const CreateRuleEngine = () => {
  return (
     <>
      <Header />
      <Sidebar />
      <div className="website-content">
      <div className="module-data-section mt-2">
      <p className="pointer">
            <span className="text-secondary">Rule Engine</span> &gt; New Rule
          </p>
          <h5 class="mb-3">
            <span className="title">New Rule</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              fill="currentColor"
              className="bi bi-pencil-square mb-2 ms-3 text-body-secondary"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </h5>
          <div className="go-shadow me-3">
            <div className="row ms-1">
              <fieldset className="border col-md-11 m-2 col-sm-11">
                <legend className="float-none">
                  New Rule<span>*</span>
                </legend>
                <input type="text" placeholder="Enter Name" />
              </fieldset>
            </div>
          </div>
          <div className="SetRuleCard">
            <div>
              <h5 className="title mt-3">Set Rule Conditions</h5>
              <h6 class=" mt-3">
                <span className="">Condition 1</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square mb-1 ms-3 text-body-secondary"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </h6>
            </div>
            <div className="border-btm pb-2">
              <div>
                <h4>
                  <span className="badge setRuleCard">IF</span>
                </h4>
                <div className="row ms-1 mt-2">
                  <fieldset className="border  col-md-3 m-2 col-sm-11">
                    <legend className="float-none">
                      Master Attribute<span>*</span>
                    </legend>
                    <select required="">
                      <option value="" disabled="" selected="" hidden="">
                        Tier-based
                      </option>
                      <option value="0">Building1</option>
                      <option value="1">Building2</option>
                    </select>
                  </fieldset>
                  <div className="col-md-1 d-flex justify-content-center align-items-center">
                    <h4>&</h4>
                  </div>
                  <fieldset className="border  col-md-3 m-2 col-sm-11">
                    <legend className="float-none">
                      Sub Attribute<span>*</span>
                    </legend>
                    <select required="">
                      <option value="" disabled="" selected="" hidden="">
                        Points required for upgrading tier
                      </option>
                      <option value="0">Building1</option>
                      <option value="1">Building2</option>
                    </select>
                  </fieldset>
                </div>
              </div>

              <div className="mt-3">
                <h4>
                  <span className="badge setRuleCard">AND</span>
                </h4>
                <div className="row ms-1 mt-2">
                  <fieldset className="border  col-md-3 m-2 col-sm-11">
                    <legend className="float-none">
                      Master Operator<span>*</span>
                    </legend>
                    <select required="">
                      <option value="" disabled="" selected="" hidden="">
                        Tier Operatives
                      </option>
                      <option value="0">Building1</option>
                      <option value="1">Building2</option>
                    </select>
                  </fieldset>
                  <div className="col-md-1 d-flex justify-content-center align-items-center">
                    <h4>&</h4>
                  </div>
                  <fieldset className="border  col-md-3 m-2 col-sm-11">
                    <legend className="float-none">
                      Sub Operator<span>*</span>
                    </legend>
                    <select required="">
                      <option value="" disabled="" selected="" hidden="">
                        After
                      </option>
                      <option value="0">Building1</option>
                      <option value="1">Building2</option>
                    </select>
                  </fieldset>
                </div>
              </div>

              <div className="mt-3">
                <h4>
                  <span className="badge setRuleCard">THEN</span>
                </h4>
                <div className="row ms-1 mt-2">
                  <fieldset className="border  col-md-3 m-2 col-sm-11">
                    <legend className="float-none">
                      Master Reward Outcome<span>*</span>
                    </legend>
                    <select required="">
                      <option value="" disabled="" selected="" hidden="">
                        Tier Promotion
                      </option>
                      <option value="0">Building1</option>
                      <option value="1">Building2</option>
                    </select>
                  </fieldset>
                  <div className="col-md-1 d-flex justify-content-center align-items-center">
                    <h4>&</h4>
                  </div>
                  <fieldset className="border  col-md-3 m-2 col-sm-11">
                    <legend className="float-none">
                      Sub Reward Outcome<span>*</span>
                    </legend>
                    <select required="">
                      <option value="" disabled="" selected="" hidden="">
                        Tier Upgrade
                      </option>
                      <option value="0">Building1</option>
                      <option value="1">Building2</option>
                    </select>
                  </fieldset>
                  <div className="col-md-1 d-flex justify-content-center align-items-center">
                    <h4>=</h4>
                  </div>
                  <fieldset className="border col-md-3 m-2 col-sm-11">
                    <legend className="float-none">
                      Point Value<span>*</span>
                    </legend>
                    <input type="text" placeholder="10 Points" />
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2 justify-content-center">
            <div className="col-md-2">
              <button className="purple-btn1 w-100" fdprocessedid="u33pye">
                Save for Approval
              </button>
            </div>
            <div className="col-md-2">
              <button className="purple-btn2 w-100" fdprocessedid="af5l5g">
                Cancel
              </button>
            </div>
          </div>
     </div>
     <Footer />
      </div>
    
     </>
  )
}

export default CreateRuleEngine