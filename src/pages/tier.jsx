import React from 'react'
import '../styles/style.css'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import SubHeader from '../components/SubHeader';

const Tiers = () => {
  return (
    <>
    <Header/>
   
    <div className="website-content d-flex">
    <Sidebar/>
      <div className="w-100">
      <SubHeader />
        <div className="module-data-section mt-2">
        <p className="pointer">
            <span className="text-secondary">Tiers</span> &gt; Tier List
          </p>
          <h5 className="mb-3">Tiers</h5>
          <div className="d-flex justify-content-between loyalty-header">
            <div>
                <Link to="/tier-setting">
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
                <span>New Tier</span>
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
                    <th>Tier Name</th>
                    <th>Member Count</th>
                    <th>Exit Points</th>
                    <th>Multipliers</th>
                    <th>Welcome Bonus</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Bronze</td>
                    <td>4449</td>
                    <td>10000</td>
                    <td>1x</td>
                    <td>100 Points</td>
                </tr>
            </tbody>
            </table>
            </div>
        </div>
      </div>
        <Footer />
         </div>
    </>
  )
}

export default Tiers