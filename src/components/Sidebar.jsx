import React from "react";
import "../styles/style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const collapseElement = document.getElementById("userRoleCollapse");

    // Listen for Bootstrap collapse events
    collapseElement.addEventListener("show.bs.collapse", () =>
      setIsCollapsed(true)
    );
    collapseElement.addEventListener("hide.bs.collapse", () =>
      setIsCollapsed(false)
    );

    // Cleanup listeners on unmount
    return () => {
      collapseElement.removeEventListener("show.bs.collapse", () =>
        setIsCollapsed(true)
      );
      collapseElement.removeEventListener("hide.bs.collapse", () =>
        setIsCollapsed(false)
      );
    };
  }, []);

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
          className="px-2 collapse left-1"
          style={{ display: "block" }}
          id="sidebarCollapse"
        >
          {/* button for closing sidebar*/}
          <li className="nav-item">
            <Link
              to=""
              className="nav-link d-flex justify-content-between"
              aria-current="page"
            >
              {/* <img alt="" src="" /> */}
              <span className="text">Dashboard</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </span>
            </Link>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              <img alt="" src="" />
              <span className="text">Members</span>
            </a>
          </li> */}
          <li className="nav-item">
            <Link
              to="/members"
              className="nav-link d-flex justify-content-between"
              aria-current="page"
            >
              {/* <img alt="" src="" /> */}
              <span className="text">Members</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </span>
            </Link>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              <img alt="" src="" />
              <span className="text">Tiers</span>
            </a>
          </li> */}
          <li className="nav-item">
            <Link
              to="/tiers"
              className="nav-link d-flex justify-content-between"
              aria-current="page"
            >
              {/* <img alt="" src="" /> */}
              <span className="text">Tiers</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/rule-engine"
              className="nav-link d-flex justify-content-between"
              aria-current="page"
            >
              {/* <img alt="" src="" /> */}
              <span className="text">Rule Engine</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="text nav-link d-flex justify-content-between"
              data-bs-toggle="collapse"
              data-bs-target="#userRoleCollapse"
            >
              <span className="text">Engage</span>
              {isCollapsed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              )}
            </a>
            <ul className="collapse p-0" id="userRoleCollapse">
              <li>
                <Link className="ps-4" to="/Segment">
                  Segment
                </Link>
              </li>
              <li>
                <Link className="ps-4" to="/Campaign">
                  Campaign
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              to="/test"
              className="nav-link d-flex justify-content-between"
              aria-current="page"
            >
              {/* <img alt="" src="" /> */}
              <span className="text">Reports</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
