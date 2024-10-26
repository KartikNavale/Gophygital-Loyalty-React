
import React, { useState, useEffect } from "react";
import "../styles/style.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import SubHeader from "../components/SubHeader";
import axios from "axios"; // Make sure to import axios

const RuleEngine = () => {
  const [RuleEngine, setRuleEngine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRuleEngine = async () => {
      try {
        const response = await axios.get(
          "https://staging.lockated.com/rule_engine/rules.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        );
        setRuleEngine(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchRuleEngine();
  }, []);

  return (
    <>
      <div className="w-100">
        <SubHeader />
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Rule Engine</span> &gt; Rule List
          </p>
          <h5 className="mb-3">Rule List</h5>
          <div className="d-flex justify-content-between loyalty-header">
            <div>
              <Link to="/create-rule-engine">
                <button className="purple-btn1 rounded-3 px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="currentColor"
                    className="bi bi-plus mb-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                  </svg>
                  <span>New Rule</span>
                </button>
              </Link>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="purple-btn2 rounded-3 mt-2 me-3"
                data-bs-toggle="modal"
                data-bs-target="#viewModal"
              >
                Filter
              </button>
              <div className="d-flex search-input w-50 p-1 ms-0 me-3">
                <span className="material-symbols-outlined"> search </span>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
              <button
                className="purple-btn1 rounded-3 px-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Go!
              </button>
              <button
                className="purple-btn2 rounded-3 mt-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Reset
              </button>
            </div>
          </div>
          {/* <div className="tbl-container mx-3 mt-4">
            <table className="w-100">
              <thead>
                <tr>
                  <th>Rule Name</th>
                  <th>Sub-Attribute</th>
                  <th>Sub Operatives</th>
                  <th>Toggle</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {RuleEngine.map((rule) => (
                  <tr key={rule.id}>
                    <td>{rule.name}</td>
                    {rule.conditions.map((condition)=>(
                      <>
                      <td>{condition.condition_attribute}</td>
                      <td>{condition.operator}</td>
                      </>
                        
                    ))}
                   
                    <td>
                      <span className="form-switch ps-5">
                        <input
                          className="on-off-toggler form-check-input my-2"
                          type="checkbox"
                        />
                      </span>
                    </td>
                    <td>
                      <Link to="/view-rule-engine">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

<div className="tbl-container mx-3 mt-4">
  <table className="w-100">
    <thead>
      <tr>
        <th>Rule Name</th>
        <th>Sub-Attribute</th>
        <th>Sub Operatives</th>
        <th>Toggle</th>
        <th>View</th>
      </tr>
    </thead>
    <tbody>
      {RuleEngine.map((rule) => {
        const { name, conditions } = rule;
        return conditions.map((condition, index) => (
          <tr key={condition.id || index}>
            {index === 0 && <td rowSpan={conditions.length}>{name}</td>}
            <td>{condition.condition_attribute}</td>
            <td>{condition.operator}</td>
            <td>
              <span className="form-switch ps-5">
                <input
                  className="on-off-toggler form-check-input my-2"
                  type="checkbox"
                />
              </span>
            </td>
            <td>
              <Link to="/view-rule-engine">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              </Link>
            </td>
          </tr>
        ));
      })}
    </tbody>
  </table>
</div>

        </div>
        {/* Filter Modal start */}
        <div
          className="modal fade"
          id="viewModal"
          tabIndex="-1"
          aria-labelledby="viewModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header py-1 mt-1">
                <h5 className="modal-title" id="viewModalLabel">
                  Filter By
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="title">Attributes</p>
                <div className="row ms-1 mt-2">
                  <fieldset className="border col-md-5 m-2 col-sm-11">
                    <legend className="float-none">
                      Master Attribute<span>*</span>
                    </legend>
                    <select required>
                      <option value="" disabled selected hidden>
                        select Master Attribute
                      </option>
                      <option value="0">User Actions</option>
                      <option value="1">Transaction Events</option>
                      <option value="2">Time-based Events</option>
                      <option value="3">User Demographics/Segments</option>
                      <option value="4">Engagement Behaviour</option>
                      <option value="5">Milestones</option>
                      <option value="6">Tier-based</option>
                    </select>
                  </fieldset>
                  <fieldset className="border col-md-5 m-2 col-sm-11">
                    <legend className="float-none">
                      Sub Attribute<span>*</span>
                    </legend>
                    <select required>
                      <option value="" disabled selected hidden>
                        select sub Attribute
                      </option>
                      <option value="0">Building1</option>
                      <option value="1">Building2</option>
                    </select>
                  </fieldset>
                </div>
                <p className="title">Operator</p>
                <div className="row ms-1 mt-2">
                  <fieldset className="border col-md-5 m-2 col-sm-11">
                    <legend className="float-none">
                      Master Operator<span>*</span>
                    </legend>
                    <select required>
                      <option value="" disabled selected hidden>
                        select Master Operator
                      </option>
                      <option value="0">Common Operatives</option>
                      <option value="1">Logical Operatives</option>
                      <option value="2">Date/Time Operatives</option>
                      <option value="3">Tier Operatives</option>
                    </select>
                  </fieldset>
                  <fieldset className="border col-md-5 m-2 col-sm-11">
                    <legend className="float-none">
                      Sub operator<span>*</span>
                    </legend>
                    <select required>
                      <option value="" disabled selected hidden>
                        select sub operator
                      </option>
                      <option value="0">Building1</option>
                      <option value="1">Building2</option>
                    </select>
                  </fieldset>
                </div>
                <div className="row mt-2 justify-content-center">
                  <div className="col-md-4">
                    <button className="purple-btn1 w-100">
                      Submit
                    </button>
                  </div>
                  <div className="col-md-4">
                    <button
                      className="purple-btn2 w-100"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Filter Modal end */}
      </div>
    </>
  );
};

export default RuleEngine;
