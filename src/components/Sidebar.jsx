import React from "react";
import "../components/style.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar sidebar_inner" id="mySidebar">
        <p className="closebtn">
          <span
            className="material-symbols-outlined cancel"
            onclick="closeNav()"
          >
            cancel
          </span>
        </p>
        <ul
          className="p-0 collapse"
          style={{ display: "block" }}
          id="sidebarCollapse"
        >
          {/* button for closing sidebar*/}
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              <img alt="" src="" />
              <span className="text">Dashboard</span>
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              <img alt="" src="" />
              <span className="text">Members</span>
            </a>
          </li> */}
          <li className="nav-item">
            <Link to="/Members" className="nav-link" aria-current="page">
              <img alt="" src="" />
              <span className="text">Members</span>
            </Link>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              <img alt="" src="" />
              <span className="text">Tiers</span>
            </a>
          </li> */}
          <li className="nav-item">
            <Link to="/Tiers" className="nav-link" aria-current="page">
              <img alt="" src="" />
              <span className="text">Tiers</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/RuleEngine" className="nav-link" aria-current="page">
              <img alt="" src="" />
              <span className="text">Rule Engine</span>
            </Link>
          </li>
          <li className="nav-item ">
            <a
              className="text nav-link d-flex justify-content-between"
              data-bs-toggle="collapse"
              href="#userRoleCollapse"
            >
              <img alt="" src="../images/user.svg" />
              <span className="text">Engage</span>
              <i className="bi bi-caret-right-fill collapse-logo" />
            </a>
            <ul className="collapse p-0" id="userRoleCollapse">
              <li>
                <Link className="ps-4" to="/Segment">
                  Segment
                </Link>
              </li>
              <li>
                <a className="ps-4" href="#">
                  Campaign
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a
              className="text nav-link d-flex justify-content-between"
              data-bs-toggle="collapse"
              href="#checklistCollapse "
            >
              <img alt="" src="../images/ca-checklist.svg" />
              <span className="text">Checklist</span>
              <i className="bi bi-caret-right-fill collapse-logo" />
            </a>
            <ul className="collapse p-0   drop-hover" id="checklistCollapse">
              <li>
                <a className="ps-4" href="#">
                  Checklist
                </a>
              </li>
              <li>
                <a className="ps-4" href="#">
                  Master Checklist
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a
              className="text nav-link d-flex justify-content-between"
              data-bs-toggle="collapse"
              href="#escalationCollapse"
            >
              <img alt="" src="../images/OSR.svg" />
              <span className="text">Escalation</span>
              <i className="bi bi-caret-right-fill collapse-logo" />
            </a>
            <ul className="collapse p-0" id="escalationCollapse">
              <li>
                <a className="ps-4" href="#">
                  Escalation
                </a>
              </li>
              <li>
                <a className="ps-4" href="#">
                  Task Schedule
                </a>
              </li>
              <li>
                <a className="ps-4" href="#">
                  Offer Unit
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              <img alt="" src="../images/setting.svg" />
              <span className="text">Update mapping</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              <img alt="" src="../images/contractor.svg" />
              <span className="text">Contractor</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              <img alt="" src="../images/import.svg" />
              <span className="text">Import</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              <img alt="" src="../images/export.svg" />
              <span className="text">Export</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              <img alt="" src="../images/unit.svg" />
              <span className="text">Export Unit</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
