import React from "react";
import "../components/style.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const RuleEngine = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="website-content">
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Rule Engine</span> &gt; Rule List
          </p>
          <h5 class="mb-3">Rule List</h5>
          <div className="d-flex justify-content-between loyalty-header">
            <div>
              <button
                className="purple-btn1 rounded-3 px-3"
                fdprocessedid="xn3e6n"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
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
            </div>
            <div className="d-flex flex-wrap justify-content-end">
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
                fdprocessedid="xn3e6n"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Go!
              </button>
              <button
                className="purple-btn2 rounded-3 mt-2"
                fdprocessedid="xn3e6n"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="tbl-container mx-3 mt-4">
            <table className="w-100">
              <thead>
                <tr>
                  <th>Rule Name</th>
                  <th>Attribute</th>
                  <th>Sub-Attribute</th>
                  <th>Operatives</th>
                  <th>Sub Operatives</th>
                  <th>Reward Outcome</th>
                  <th>Sub Reward Outcomes</th>
                  <th>Toggle</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <td>Rule name 3</td>
                  <td>User Actions</td>
                  <td>Rule name 1 Referral</td>
                  <td>Common Operatives</td>
                  <td>Greater than</td>
                  <td>Points-Based Rewards</td>
                  <td>Fixed points</td>
                  <td>
                    <span className="form-switch ps-5">
                      <input
                        className="on-off-toggler form-check-input my-2"
                        type="checkbox"
                      />
                    </span>
                  </td>
                  <td>
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
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>Transaction Events</td>
                  <td>Rule name 2 App downloads</td>
                  <td>Logical Operatives</td>
                  <td>Less than</td>
                  <td>Less than</td>
                  <td>Discounts/Coupons</td>
                  <td>
                    <span className="form-switch ps-5">
                      <input
                        className="on-off-toggler form-check-input my-2"
                        type="checkbox"
                      />
                    </span>
                  </td>
                  <td>
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RuleEngine;
