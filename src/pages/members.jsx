import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import SubHeader from "../components/SubHeader";

const Members = () => {
  return (
    <>
      <Header />
      <div className="website-content d-flex">
      <Sidebar />
      <div className="w-100">
      <SubHeader /> 
      <div className="module-data-section mt-2 w-100">
    
    <p className="pointer">
      <span className="text-secondary">Members</span> &gt; Manage Members
    </p>
    <h5 className="mb-3">Manage Members</h5>
    <div className="d-flex justify-content-between loyalty-header">
      <div>
        <Link  to="">
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
          <span>New Member</span>
        </button>
        </Link>
      </div>
      <div className="d-flex flex-wrap justify-content-end me-5">
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
            <th>Member ID</th>
            <th>Member Name</th>
            <th>Tier Level</th>
            <th>Current Balance</th>
            <th>Last Activity Date</th>
            <th>Tier Validity</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>001</td>
            <td>Melissa Gracia</td>
            <td>Bronze</td>
            <td>100</td>
            <td>12/02/2024</td>
            <td>12/02/2024</td>
            <td>
            <Link to='/member-details'>
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
          <tr>
            <td>002</td>
            <td>Ashley Lewis</td>
            <td>Silver</td>
            <td>1000</td>
            <td>12/02/2024</td>
            <td>12/02/2024</td>
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
            <td>003</td>
            <td>Melissa Gracia</td>
            <td>Gold</td>
            <td>200</td>
            <td>12/02/2024</td>
            <td>12/02/2024</td>
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
            <td>004</td>
            <td>Alison Davis</td>
            <td>Bronze</td>
            <td>100</td>
            <td>12/02/2024</td>
            <td>12/02/2024</td>
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
            <td>005</td>
            <td>Mary Black</td>
            <td>Silver</td>
            <td>1000</td>
            <td>12/02/2024</td>
            <td>12/02/2024</td>
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
      </div>
        <Footer />
      </div>
    </>
  );
};

export default Members;
