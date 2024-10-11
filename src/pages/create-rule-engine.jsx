import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const CreateRuleEngine = () => {
  const [conditions, setConditions] = useState([{ id: 1 }]);

  const addCondition = () => {
    setConditions([...conditions, { id: conditions.length + 1 }]);
  };

  const renderCondition = (condition, index) => (
    <div key={condition.id} className="SetRuleCard">
      <div>
        <h6 className="mt-3">
          <span>Condition {condition.id}</span>
        </h6>
      </div>
  
      {index > 0 && ( // Only render the AND/OR section if this is not the first condition
        <ul className="nav nav-tabs border-0 mt-3">
          <div className="d-flex gap-3 And-btn rounded">
            <li className="nav-item d-flex p-2 gap-2" role="presentation">
              <input
                type="radio"
                className="nav-link"
                id={`home-tab-${index}`}
                name={`tab-${index}`}
                data-bs-toggle="tab"
                data-bs-target={`#home-tab-pane-${index}`}
                role="tab"
                aria-controls={`home-tab-pane-${index}`}
                aria-selected="true"
                defaultChecked
              />
              <label htmlFor={`home-tab-${index}`} className="and-or-btn">AND</label>
            </li>
            <li className="nav-item d-flex p-2 gap-2" role="presentation">
              <input
                type="radio"
                className="nav-link"
                id={`profile-tab-${index}`}
                name={`tab-${index}`}
                data-bs-toggle="tab"
                data-bs-target={`#profile-tab-pane-${index}`}
                role="tab"
                aria-controls={`profile-tab-pane-${index}`}
                aria-selected="false"
              />
              <label htmlFor={`profile-tab-${index}`} className="and-or-btn">OR</label>
            </li>
          </div>
        </ul>
      )}
  
      <div className="border-btm pb-2 mt-2">
        <div>
          <h4>
            <span className="badge setRuleCard">IF</span>
          </h4>
          <div className="row ms-1 mt-2">
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend className="float-none">Master Attribute<span>*</span></legend>
              <select required className="form-select border-0 shadow-none" style={{fontSize:'14px'}}>
                <option value="" disabled selected hidden>Tier-based</option>
                <option value="0">Building1</option>
                <option value="1">Building2</option>
              </select>
            </fieldset>
            <div className="col-md-1 d-flex justify-content-center align-items-center"><h4>&</h4></div>
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend className="float-none">Sub Attribute<span>*</span></legend>
              <select required className="form-select border-0 shadow-none" style={{fontSize:'14px'}}>
                <option value="" disabled selected hidden>Points required for upgrading tier</option>
                <option value="0">Building1</option>
                <option value="1">Building2</option>
              </select>
            </fieldset>
          </div>
        </div>
  
        <div className="mt-3">
          <h4><span className="badge setRuleCard">Operator</span></h4>
          <div className="row ms-1 mt-2">
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend className="float-none">Operator<span>*</span></legend>
              <select required className="form-select border-0 shadow-none" style={{fontSize:'14px'}}>
                <option value="" disabled selected hidden>Tier Operatives</option>
                <option value="0">Building1</option>
                <option value="1">Building2</option>
              </select>
            </fieldset>
          </div>
        </div>
  
        <div className="mt-3">
          <h4><span className="badge setRuleCard">Value</span></h4>
          <div className="row ms-1 mt-2">
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend className="float-none">Value<span>*</span></legend>
              <input type="text" placeholder="10 Points" />
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
  


  return (
    <>
      <Header />
      <Sidebar />
      <div className="website-content">
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Rule Engine</span> &gt; New Rule
          </p>
          <h5 className="mb-3">
            <span className="title">New Rule</span>
          </h5>
          <div className="go-shadow me-3">
            <div className="row ms-1">
              <fieldset className="border col-md-11 m-2 col-sm-11">
                <legend className="float-none">New Rule<span>*</span></legend>
                <input type="text" placeholder="Enter Name" />
              </fieldset>
            </div>
          </div>

          <div className="main-rule">
            {conditions.map(renderCondition)}

            <button className="setRuleCard2 mt-2" onClick={addCondition}style={{color:'black'}} >
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </span>
              Add Additional Condition
            </button>

            {/* THEN section */}
            <div className="mt-3">
                <h4>
                  <span className="badge setRuleCard">THEN</span>
                </h4>
                <div className="row ms-1 mt-2">
                  <fieldset className="border  col-md-3 m-2 col-sm-11">
                    <legend className="float-none">
                      Master Reward Outcome<span>*</span>
                    </legend>
                    <select required="" className="form-select border-0 shadow-none" style={{fontSize:'14px'}}>
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
                    <select required="" className="form-select border-0 shadow-none" style={{fontSize:'14px'}}>
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
                  <fieldset className="border col-md-3 m-2 col-sm-11 ">
                    <legend className="float-none">
                      Point Value<span>*</span>
                    </legend>
                    <input type="text" placeholder="10 Points" />
                  </fieldset>
                </div>
              </div>
          </div>
       {/* ..... */}
          <div className="row mt-2 justify-content-center">
            <div className="col-md-2">
              <button className="purple-btn1 w-100">Save for Approval</button>
            </div>
            <div className="col-md-2">
              <button className="purple-btn2 w-100">Cancel</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CreateRuleEngine;