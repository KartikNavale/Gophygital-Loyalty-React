import React from 'react'
import '../styles/style.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Segment = () => {
  return (
     <>
       <Header/>
    <Sidebar/>
    <div className="website-content">
        <div className="module-data-section mt-2">
        <p className="pointer">
            <span className="text-secondary">Segment</span> &gt; Segment List
          </p>
          <h5 className="mb-3">Segment</h5>
          <div className="d-flex justify-content-between loyalty-header">
            <div>
                <Link to="/new-segment">
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
                <span>New Segment</span>
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
                    <th>Segment Name</th>
                    <th>Segment Tag</th>
                    <th>Total Members</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Members who joined in last 30 days </td>
                    <td className='fw-bold'>Recently Joined</td>
                    <td>4550 (100%)</td>
                    <td>
                        <Link to="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
                        </Link>
                    </td>
                </tr>
            </tbody>
            </table>
            </div>
        </div>
        <Footer />
         </div>
     </>
  )
}

export default Segment