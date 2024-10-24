import React from "react";
import "../styles/style.css";
import GophygitalLogo1 from "/GophygitalLogo1.svg";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  const signout = () => {
    console.log("Signing out...");

    sessionStorage.removeItem("spree_api_key");
    navigate("/login");
  };

  return (
    <>
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
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{
                backgroundColor: "transparent",
                color: "black",
                border: "none",
              }}
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as="div" className=" no-select">
                <Form.Check type="checkbox" label="Lockated " />
              </Dropdown.Item>
              <Dropdown.Item as="div" className=" no-select">
                <Form.Check type="checkbox" label="Godrej Eternity " />
              </Dropdown.Item>
              <Dropdown.Item as="div" className=" no-select">
                <Form.Check type="checkbox" label="Godrej Summit" />
              </Dropdown.Item>
              <Dropdown.Item as="div" className=" no-select">
                <Form.Check type="checkbox" label="Godrej Prime" />
              </Dropdown.Item>
              <Dropdown.Item as="div" className=" no-select">
                <Form.Check type="checkbox" label="Runwal Elegante" />
              </Dropdown.Item>
              <Dropdown.Item as="div" className=" no-select">
                <Form.Check type="checkbox" label="Runwal The Reserve" />
              </Dropdown.Item>
              <Dropdown.Item as="div" className=" no-select">
                <Form.Check type="checkbox" label="Runwal My City" />
              </Dropdown.Item>
              <Dropdown.Item as="div" className=" no-select">
                <Form.Check type="checkbox" label="Godrej Oasis" />
              </Dropdown.Item>
              <Dropdown.Item as="div" className=" no-select">
                <Form.Check type="checkbox" label="World Trade" />
              </Dropdown.Item>
              <Dropdown.Item as="div" className=" no-select">
                <Form.Check type="checkbox" label="Delhi" />
              </Dropdown.Item>
              <Dropdown.Item as="div" className=" no-select">
                <Form.Check type="checkbox" label="Suneel Test" />
              </Dropdown.Item>
              <Dropdown.Item as="div" className=" no-select">
                <Form.Check type="checkbox" label="Test DB" />
              </Dropdown.Item>
              <Dropdown.Item
                as="div"
                className="text-center no-hover no-select"
              >
                <Button className="submit-back">Submit</Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

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
      </nav>
    </>
  );
};

export default Header;
