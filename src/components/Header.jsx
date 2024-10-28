import React, { useState, useEffect } from "react";
import "../styles/style.css";
import GophygitalLogo1 from "/GophygitalLogo1.svg";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import TypeHeader from "./TypeHeader";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  
  const navigate = useNavigate();







  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpen = () => {
    setShowModal(true);
  };


  const signout = () => {
    console.log("Signing out...");

    sessionStorage.clear(); // Example: clear session storage on sign out
    navigate("/login");
  };

  return (
    <>
          <div
        className="modal"
        id="userInfo"
        aria-labelledby="userInfoLabel"
        aria-hidden={!showModal}
        role="dialog"
        style={{ display: showModal ? "block" : "none" }} // React controlled visibility
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              />
            </div>
            <div className="text-center pb-5">
              <div className="avatar2">
                <div className="avatar__letters2">A</div>
              </div>
              <br />
              <h5>{sessionStorage.getItem("firstname") || "First Name"}</h5>
              {/* Fallback for dynamic Name */}
              <p>{sessionStorage.getItem("email") || "example@example.com"}</p>
              {/* Fallback for dynamic Email */}
            
              <button
                className="purple-btn1 my-3"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={signout}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light p-0">
        <div className="container-fluid py-1">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            onclick="openNav()"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <img alt="logo" className="go-logo mx-3 my-2" src={GophygitalLogo1} />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="./1CF_Main.html"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./31Dashboard_Daily.html">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active rounded-2"
                  href="./31Dashboard_Daily.html"
                >
                  Setup
                </a>
              </li>
            </ul>
            <div className="top-nav-right">
              <div className="d-flex search-input w-50 mx-auto">
                <span className="material-symbols-outlined"> search </span>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
          

          <TypeHeader /> {/* Dropdown inside the header */}

    <div
        className="avatar"
        role="button"
        tabIndex="0"
        onClick={handleOpen} // Open the modal on click
        onKeyPress={(e) => e.key === 'Enter' && handleOpen()} // Open on Enter key press
        data-bs-toggle="modal" // Optional if you want Bootstrap's behavior too
        data-bs-target="#userInfo"
      >
        <div className="avatar__letters">A</div>
      </div>



        </div>
      </nav>
    </>
  );
};

export default Header;
