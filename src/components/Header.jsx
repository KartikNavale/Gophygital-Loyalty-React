import React from 'react';
import '../components/style.css';
import GophygitalLogo1 from '/GophygitalLogo1.svg'
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  const signout = () => {
    console.log('Signing out...');
  
    // Remove the spree_api_key from sessionStorage
    sessionStorage.removeItem('spree_api_key');
  
   
  
    // Navigate to the login page
    navigate('/login');
  };
  return (
     <>
     <nav className="navbar navbar-expand-lg navbar-light p-0">
  <div className="container-fluid">
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      onclick="openNav()"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <img
      alt="logo"
      className="go-logo mx-3 my-2"
      src={GophygitalLogo1}
    />
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
          <a className="nav-link" aria-current="page" href="./1CF_Main.html">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./31Dashboard_Daily.html">
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="./31Dashboard_Daily.html">
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
        <div className="btn-group">
          <button
            className="btn btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            1201/D Jyoti Tower
          </button>
          <ul className="dropdown-menu">
            <li>1346/F Hayat Tower</li>
            <li>9876/A JP Morgan Tower</li>
            <li>Busan Rcidency</li>
          </ul>
        </div>
        <span className="material-symbols-outlined align-middle"> apps </span>
        <div
          className="avatar"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#userInfo"
        >
          <div className="avatar__letters">A</div>
        </div>
      </div>
    </div>
  </div>
</nav>

<div
  className="modal "
  id="userInfo"
  aria-labelledby="userInfoLabel"
  aria-hidden="true"
  style={{ display: "none" }}
>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header border-0">
        <button
          type="button"
          className="btn-close "
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div className=" text-center pb-5">
        <div className="avatar2">
          <div className="avatar__letters2">A</div>{" "}
        </div>{" "}
        <br />
        <h5>{sessionStorage.getItem('firstname')}</h5> {/* Dynamic Name */}
              <p>{sessionStorage.getItem('email')}</p>  {/* Dynamic Email */}
              <p>{sessionStorage.getItem('mobile')}</p>  {/* Dynamic Phone Number */}
          <button className="purple-btn my-3 " data-bs-dismiss="modal"
          aria-label="Close" onClick={signout}>
            <span className="material-symbols-outlined"> logout </span>
            <span className="my-2"> LogOut </span>
          </button>{" "}
      </div>
    </div>
  </div>
</div>


     </>
  )
}

export default Header