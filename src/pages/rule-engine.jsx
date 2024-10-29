
import React, { useState, useEffect } from "react";
import "../styles/style.css";
import { Link } from "react-router-dom";
import SubHeader from "../components/SubHeader";
import axios from "axios";

const RuleEngine = () => {
  const [RuleEngine, setRuleEngine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchRuleEngine = async () => {
      try {
        const response = await axios.get(
          "https://staging.lockated.com/rule_engine/rules.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        );
        setRuleEngine(response.data);
        setFilteredItems(response.data); // Initialize with all items
      } catch (err) {
        setError("Failed to fetch rule engine.");
      } finally {
        setLoading(false);
      }
    };

    fetchRuleEngine();
  }, []);



  //operatives
  // const masterOperators = [
  //   {
  //     id: "0",
  //     name: "Common Operatives",
  //     subOptions: [
  //       { id: "1", name: "greater_than", value: "greater_than"  },
  //       { id: "2", name: "Less than (<)", value: "less_than" },
  //       { id: "3", name: "Equals (=)", value: "equals" },
  //       { id: "4", name: "Not equals (!=)", value: "not_equals" },
  //       { id: "5", name: "Contains", value: "" },
  //       { id: "6", name: "Does not contain", value: "" },
  //     ],
  //   },
  //   {
  //     id: "1",
  //     name: "Logical Operatives",
  //     subOptions: [
  //       { id: "1", name: "AND",value:"" },
  //       { id: "2", name: "OR" ,value:""},
  //       { id: "3", name: "NOT" ,value:"" },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     name: "Date/Time Operatives",
  //     subOptions: [
  //       { id: "1", name: "Before" ,value:""},
  //       { id: "2", name: "After" ,value:"" },
  //       { id: "3", name: "Between" ,value:"" },
  //       { id: "4", name: "Within",value:"" },
  //     ],
  //   },
  //   {
  //     id: "3",
  //     name: "Tier Operatives",
  //     subOptions: [
  //       { id: "1", name: "Is in tier" ,value:"" },
  //       { id: "2", name: "Upgrade" ,value:""},
  //       { id: "3", name: "Downgrade" ,value:"" },
  //     ],
  //   },
  // ];


  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    const filtered = RuleEngine.filter(rule =>
      rule.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleReset = () => {
    setSearchTerm(""); // Clear search term
    setFilteredItems(RuleEngine); // Reset filtered items to the original data
    setCurrentPage(1); // Reset to first page
  };


  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const Pagination = ({
    currentPage,
    totalPages,
    totalEntries,
  }) => {
    const startEntry = (currentPage - 1) * itemsPerPage + 1;
    const endEntry = Math.min(currentPage * itemsPerPage, totalEntries);

    const renderPageNumbers = () => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <li
            key={i}
            className={`page-item ${i === currentPage ? "active" : ""}`}
            style={{ border: "1px solid #ddd", margin: "2px" }}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(i)}
              style={{
                padding: "8px 12px",
                color: i === currentPage ? "#fff" : "#5e2750",
                backgroundColor: i === currentPage ? "#5e2750" : "#fff",
                fontWeight: i === currentPage ? "bold" : "normal",
                border: '2px solid #5e2750',
                borderRadius: '3px'
              }}
            >
              {i}
            </button>
          </li>
        );
      }
      return pages;
    };

    return (
      <nav className="d-flex justify-content-between align-items-center">
        <ul
          className="pagination justify-content-center align-items-center"
          style={{
            listStyleType: "none",
            padding: "0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            style={{ margin: "2px" }}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              style={{
                padding: "8px 12px",
                color: "#5e2750",
                backgroundColor: currentPage === 1 ? "#f0f0f0" : "#fff",
              }}
            >
              «
            </button>
          </li>
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            style={{ margin: "2px" }}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: "8px 12px",
                color: "#5e2750",
                backgroundColor: currentPage === 1 ? "#f0f0f0" : "#fff",
              }}
            >
              ‹
            </button>
          </li>
          {renderPageNumbers()}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""
              }`}
            style={{ margin: "2px" }}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: "8px 12px",
                color: "#5e2750",
                backgroundColor:
                  currentPage === totalPages ? "#f0f0f0" : "#fff",
              }}
            >
              ›
            </button>
          </li>
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""
              }`}
            style={{ margin: "2px" }}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              style={{
                padding: "8px 12px",
                color: "#5e2750",
                backgroundColor:
                  currentPage === totalPages ? "#f0f0f0" : "#fff",
              }}
            >
              »
            </button>
          </li>
        </ul>
        <p className="text-center" style={{ marginTop: "10px", color: "#555" }}>
          Showing {startEntry} to {endEntry} of {totalEntries} entries
        </p>
      </nav>
    );
  };



  // const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  //   const handlePageChange = (page) => {
  //     if (page > 0 && page <= totalPages) {
  //       onPageChange(page);
  //     }
  //   };

  //   return (
  //     <nav>
  //       <ul className="pagination justify-content-center">
  //         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
  //           <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
  //             Previous
  //           </button>
  //         </li>
  //         <li className={`page-item active`}>
  //           <button className="page-link">{currentPage}</button>
  //         </li>
  //         <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
  //           <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
  //             Next
  //           </button>
  //         </li>
  //       </ul>
  //     </nav>
  //   );
  // };

  //toggle

  const handleToggle = async (id, isActive) => {
    try {
      // Optionally, update the state and make an API call to update the rule's active state
      await axios.patch(`https://staging.lockated.com/rule_engine/rules.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414/${id}`, { active: isActive });

      // Update local state if necessary
      setRules(prevRules =>
        prevRules.map(rule =>
          rule.id === id ? { ...rule, active: isActive } : rule
        )
      );
    } catch (error) {
      console.error("Error updating rule:", error);
    }
  };


  return (
    <>
      <div className="w-100">
        <SubHeader />
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Rule Engine</span> &gt; Rule List
          </p>
          <h5 className="mb-3">Rule List</h5>
          {/* <div className="d-flex justify-content-between loyalty-header">
            <div>
              <Link to="/create-rule-engine">
                <button className="purple-btn1 rounded-3 px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-plus mb-1" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                  <span>New Rule</span>
                </button>
              </Link>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="purple-btn2 rounded-3 mt-2 me-3"
                data-bs-toggle="modal"
                data-bs-target="#viewModal"
              >
                Filter
              </button>
              <div className="d-flex search-input w-50 p-1 ms-0 me-3">
                <span className="material-symbols-outlined"> search </span>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
                />
              </div>
              <button
                className="purple-btn1 rounded-3 px-3"
                onClick={handleSearch} // Call search on button click
              >
                Go!
              </button>
              <button
                className="purple-btn2 rounded-3 mt-2"
                onClick={handleReset} // Reset search
              >
                Reset
              </button>
            </div>
          </div> */}

          <div className="d-flex justify-content-between align-items-center">
            <Link to="/create-rule-engine">
              <button className="purple-btn1 rounded-3">
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
            </Link>
            <div className="d-flex align-items-center">
            <button
                className="purple-btn2 rounded-3 mt-2 me-3"
                data-bs-toggle="modal"
                data-bs-target="#viewModal"
              >
               <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-plus mb-1" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
               Filter
              </button>
              <div className="position-relative me-3">
                <input
                  className="form-control"
                  style={{
                    height: "35px",
                    paddingLeft: "30px",
                    textAlign: "left",
                  }}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div
                  className="position-absolute"
                  style={{ top: "7px", left: "10px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </div>
              </div>
              <button
                className="purple-btn1 rounded-3 px-3"
                onClick={handleSearch}
              >
                Go!
              </button>
              <button
                className="purple-btn2 rounded-3 mt-2"
                onClick={handleReset} // Reset search
              >
                Reset
              </button>
            </div>
          </div>

          <div className="tbl-container mx-3 mt-4"
            style={{
              height: "100%",
              overflowY: "hidden",
              margin: "0 100px",

            }}>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <>
                <table className="w-100">
                  <thead>
                    <tr>
                      <th>Rule Name</th>
                      <th>Attribute</th>
                      <th>Sub-Attribute</th>
                      <th>Operatives</th>
                      <th>Sub Operatives</th>
                      <th>Reward Outcome</th>
                      <th>Sub Reward Outcome</th>
                      <th>Toggle</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((rule) => {
                      const { id, name, conditions, active, actions } = rule;
                      return conditions.map((condition, index) => (
                        <tr key={`${rule.id || name}-${index}`}>
                          {index === 0 && <td rowSpan={conditions.length} style={{ width: "11.11%" }}>{rule.name}</td>} {/* Row span for the rule name */}
                          {console.log(rule.name)}
                          <td style={{ width: "11.11%" }}>{condition.model_name}</td>
                          <td style={{ width: "11.11%" }}>{condition.condition_attribute}</td>
                          <td style={{ width: "11.11%" }}>Common Operatives</td>
                          <td style={{ width: "11.11%" }}>{condition.operator}</td>

                          {actions.length > 0 ? (
                            actions.map((act, actIndex) => (
                              <React.Fragment key={act.id || actIndex}>
                                <td style={{ width: "11.11%" }}>{act.lock_model_name ? act.lock_model_name : ''}</td>
                                <td style={{ width: "11.11%" }}>{act.action_method ? act.action_method : ''}</td>
                              </React.Fragment>
                            ))
                          ) : (
                            <>
                              <td style={{ width: "11.11%" }}></td>
                              <td style={{ width: "11.11%" }}></td>
                            </>
                          )}
                          <td style={{ width: "11.11%" }}>
                            <span className="form-switch ps-5">
                              <input className="on-off-toggler form-check-input my-2" type="checkbox" checked={active}
                                onChange={(e) => handleToggle(id, e.target.checked)} // Handle toggle change
                              />
                            </span>
                          </td>
                          <td style={{ width: "11.11%" }}>
                            <Link to="/view-rule-engine">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      ));
                    })}


                  </tbody>
                </table>
                {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalEntries={filteredItems.length}
                />
              </>
            )}
          </div>

          {/* Filter Modal */}
          <div
            className="modal fade"
            id="viewModal"
            tabIndex="-1"
            aria-labelledby="viewModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header py-1 mt-1">
                  <h5 className="modal-title" id="viewModalLabel">
                    Filter By
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="title">Attributes</p>
                  <div className="row ms-1 mt-2">
                    <fieldset className="border col-md-5 m-2 col-sm-11">
                      <legend className="float-none">
                        Master Attribute<span>*</span>
                      </legend>
                      <select required>
                        <option value="" disabled selected hidden>
                          select Master Attribute
                        </option>
                        <option value="0">User Actions</option>
                        <option value="1">Transaction Events</option>
                        <option value="2">Time-based Events</option>
                        <option value="3">User Demographics/Segments</option>
                        <option value="4">Engagement Behaviour</option>
                        <option value="5">Milestones</option>
                        <option value="6">Tier-based</option>
                      </select>
                    </fieldset>
                    <fieldset className="border col-md-5 m-2 col-sm-11">
                      <legend className="float-none">
                        Sub Attribute<span>*</span>
                      </legend>
                      <select required>
                        <option value="" disabled selected hidden>
                          select sub Attribute
                        </option>
                        <option value="0">Building1</option>
                        <option value="1">Building2</option>
                      </select>
                    </fieldset>
                  </div>
                  <p className="title">Operator</p>
                  <div className="row ms-1 mt-2">
                    <fieldset className="border col-md-5 m-2 col-sm-11">
                      <legend className="float-none">
                        Master Operator<span>*</span>
                      </legend>
                      <select required>
                        <option value="" disabled selected hidden>
                          select Master Operator
                        </option>
                        <option value="0">Common Operatives</option>
                        <option value="1">Logical Operatives</option>
                        <option value="2">Date/Time Operatives</option>
                        <option value="3">Tier Operatives</option>
                      </select>
                    </fieldset>
                    <fieldset className="border col-md-5 m-2 col-sm-11">
                      <legend className="float-none">
                        Sub operator<span>*</span>
                      </legend>
                      <select required>
                        <option value="" disabled selected hidden>
                          select sub operator
                        </option>
                        <option value="0">Building1</option>
                        <option value="1">Building2</option>
                      </select>
                    </fieldset>
                  </div>
                  <div className="row mt-2 justify-content-center">
                    <div className="col-md-4">
                      <button className="purple-btn1 w-100">
                        Submit
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button
                        className="purple-btn2 w-100"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Filter modal end */}
        </div>
      </div>
    </>
  );
};

export default RuleEngine;

