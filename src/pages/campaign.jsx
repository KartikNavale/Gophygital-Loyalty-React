import React from "react";
import "../styles/style.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Campaign = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className='website-content'>
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Campaign</span> &gt; Campaign List
          </p>
          <h5 className="mb-3">Campaign</h5>
          <div className="d-flex justify-content-between loyalty-header"> 
            <div>
              <Link to="/new-campaign">
                <button
                  className="purple-btn1 rounded-3 px-3"
                //   fdprocessedid="xn3e6n"
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
                  <span>New Campaign</span>
                </button>
              </Link>
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
                // fdprocessedid="xn3e6n"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Go!
              </button>
              <button
                className="purple-btn2 rounded-3 mt-2"
                // fdprocessedid="xn3e6n"
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
                        <th>Campaign Name</th>
                        <th>Campaign Tag</th>
                        <th>Target Audience</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Exclusive Member Perks</td>
                        <td>Member Exclusive</td>
                        <td>Loyalty members</td>
                    </tr>
                    <tr>
                        <td>Shop & Earn Mega Points</td>
                        <td>Shop To Earn</td>
                        <td>Seasonal Shoppers</td>
                    </tr>
                    <tr>
                        <td>Spend More, Earn More</td>
                        <td>Earn Points</td>
                        <td>High-Spending Customers</td>
                    </tr>
                    <tr>
                        <td>Welcome Back Bonus</td>
                        <td>Loyalty Points</td>
                        <td>New Loyalty Members</td>
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

export default Campaign;
