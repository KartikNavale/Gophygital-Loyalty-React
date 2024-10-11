import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const CreateRuleEngine = () => {
  const [conditions, setConditions] = useState([{ id: 1 }]); // Initial condition

  const addCondition = () => {
    setConditions([...conditions, { id: conditions.length + 1 }]);
  };
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

          <div className="main-rule">
            <div className="mt-2"></div>
            <div>
              {conditions.map((condition, index) => (
                <div key={condition.id} className="child rule">
                  <ul
                    className="nav nav-tabs border-0 mt-3"
                    id="myTab"
                    role="tablist"
                  >
                    <div className="d-flex gap-3 And-btn rounded">
                      <div>
                        <li
                          className="nav-item d-flex p-2 gap-2"
                          role="presentation"
                        >
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
                          <label
                            htmlFor={`home-tab-${index}`}
                            className="and-or-btn"
                          >
                            AND
                          </label>
                        </li>
                      </div>
                      <div className="me-3">
                        <li
                          className="nav-item d-flex p-2 gap-2"
                          role="presentation"
                        >
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
                          <label
                            htmlFor={`profile-tab-${index}`}
                            className="and-or-btn"
                          >
                            OR
                          </label>
                        </li>
                      </div>
                    </div>
                  </ul>

                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id={`home-tab-pane-${index}`}
                      role="tabpanel"
                      aria-labelledby={`home-tab-${index}`}
                      tabIndex={0}
                    >
                      <div className="SetRuleCard">
                        <div>
                          <h6 className="mt-3">
                            <span className="">Condition {condition.id}</span>
                            
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
                                  <option value="" disabled selected hidden>
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
                                  <option value="" disabled selected hidden>
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
                                  <option value="" disabled selected hidden>
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
                                  <option value="" disabled selected hidden>
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
                                  <option value="" disabled selected hidden>
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
                                  <option value="" disabled selected hidden>
                                    Tier Upgrade
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
                                  Set Points<span>*</span>
                                </legend>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Set the points"
                                />
                              </fieldset>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id={`profile-tab-pane-${index}`}
                      role="tabpanel"
                      aria-labelledby={`profile-tab-${index}`}
                      tabIndex={0}
                    >
                      ...
                    </div>
                  </div>
                </div>
              ))}
              <button className="setRuleCard2 mt-2" onClick={addCondition}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </span>
                Add Additional Condition
              </button>
            </div>
            {/*  */}

            {/* <div className="child rule">
            <ul
              className="nav nav-tabs border-0 mt-3"
              id="myTab"
              role="tablist"
            >
              <div className=" d-flex gap-3 And-btn rounded">
                <div className="">
                  <li className="nav-item d-flex p-2 gap-2" role="presentation">
                    <input
                      type="radio"
                      className="nav-link"
                      id="home-tab"
                      name="tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home-tab-pane"
                      role="tab"
                      aria-controls="home-tab-pane"
                      aria-selected="true"
                      defaultChecked
                    />
                    <label htmlFor="home-tab" className="and-or-btn">
                      AND
                    </label>
                  </li>
                </div>
                <div className="me-3">
                  <li className="nav-item d-flex p-2 gap-2" role="presentation">
                    <input
                      type="radio"
                      className="nav-link"
                      id="profile-tab"
                      name="tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-tab-pane"
                      role="tab"
                      aria-controls="profile-tab-pane"
                      aria-selected="false"
                    />
                    <label htmlFor="profile-tab" className="and-or-btn">
                      OR
                    </label>
                  </li>
                </div>
              </div>
            </ul>

            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabIndex={0}
              >
                <div className="SetRuleCard">
                  <div>
                   
                    <h6 class=" mt-3">
                      <span className="">Condition 2</span>
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
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabIndex={0}
              >
                <div className="SetRuleCard">
                  <div>
                   
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
              </div>
            </div>
          </div> */}
            {/* <p className="mt-2 " style={{ cursor: 'pointer' }}>
              <span className="badge setRuleCard2 p-2 px-2">
                {" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </span>
                Add Additional condition
              </span>
            </p> */}
            {/* <button className="setRuleCard2 mt-2"> <span> <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg></span> Add Additional condition</button> */}
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
  );
};

export default CreateRuleEngine;
