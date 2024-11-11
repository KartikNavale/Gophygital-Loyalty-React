
import React, { useState, useEffect } from "react";
import "../styles/style.css";
import { Link } from "react-router-dom";
import SubHeader from "../components/SubHeader";
import axios from "axios";
import {
  fetchMasterAttributes,
  fetchSubAttributes,

} from "../Confi/ruleEngineApi";


const RuleEngine = () => {
  const [RuleEngine, setRuleEngine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filteredItems, setFilteredItems] = useState([]);

  const [masterAttributes, setMasterAttributes] = useState([]);
  const [subAttributes, setSubAttributes] = useState([]);
  const [selectedMasterAttribute, setSelectedMasterAttribute] = useState('');
  const [selectedSubAttribute, setSelectedSubAttribute] = useState('');
  const [formValues, setFormValues] = useState({
    name: '',
    masterAttribute: '',
    subAttribute: ''
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]); //filter
  const [suggestions, setSuggestions] = useState([]); // To store the search suggestions

  useEffect(() => {
    const fetchRuleEngine = async () => {
      const storedValue = sessionStorage.getItem("selectedId");
      try {
        const response = await axios.get(
          `https://staging.lockated.com/rule_engine/rules.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&&q[loyalty_type_id_eq]=${storedValue}`
        );
        console.log(response.data)
        setRuleEngine(response.data);
        setFilteredItems(response.data); // Initialize with all items


        // const transformedData = response.data.map((item) => {
        //   const transformedItem = {};
        //   for (const key in item) {
        //     if (item.hasOwnProperty(key)) {
        //       transformedItem[key.replace(/_/g, ' ')] = item[key]; // Replace underscores with spaces in the key
        //     }
        //   }
        //   return transformedItem;
        // });

        // setRuleEngine(transformedData);
      } catch (err) {
        setError("Failed to fetch rule engine.");
      } finally {
        setLoading(false);
      }
    };

    fetchRuleEngine();
  }, []);

  //


  useEffect(() => {
    const getData = async () => {
      try {
        const companyId = 44; // Set this according to your needs
        const activeStatus = true; // Set this according to your needs
        const masterAttrs = await fetchMasterAttributes(
          companyId,
          activeStatus
        );
        setMasterAttributes(masterAttrs.master_attributes);

      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    getData();
  }, []);
  //
  //selected master attribute
  const handleMasterAttributeChange = async (e) => {
    const selectedId = e.target.value;
    setSelectedMasterAttribute(selectedId);

    // Find the index of the selected master attribute
    const selectedIndex = masterAttributes.findIndex(
      (attr) => attr.id === parseInt(selectedId)
    );
    console.log(selectedIndex);

    if (selectedIndex !== -1) {
      // Check if the index is valid
      try {
        const subAttrs = await fetchSubAttributes(selectedId);
        console.log(subAttrs.master_attributes[selectedIndex].sub_attributes);
        const selectedSubAttributes =
          subAttrs.master_attributes[selectedIndex].sub_attributes;
        setSubAttributes(selectedSubAttributes);
      } catch (error) {
        console.error("Error fetching sub attributes:", error);
      }
    } else {
      console.error("Selected ID not found in master attributes");
    }
  };

  // Handle sub attribute change
  const handleSubAttributeChange = (e) => {
    setSelectedSubAttribute(e.target.value);

    // Update conditions state for sub attribute
    const updatedConditions = conditions.map((cond) => ({
      ...cond,
      subAttribute: e.target.value,
    }));
    setConditions(updatedConditions);
  };

  // Modal form submission (just an example, you can customize)
  // const handleSubmit = () => {
  //   // Perform the necessary actions for submitting the selected filter values
  //   console.log('Selected Master Attribute:', selectedMasterAttribute);
  //   console.log('Selected Sub Attribute:', selectedSubAttribute);
  //   console.log('Conditions:', conditions);
  // };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  // Handle applying the filter and fetching data
  const handleFilter = async (e) => {
    e.preventDefault();
    const isAnyFilterFilled = Object.values(formValues).some((value) => value);

    if (!isAnyFilterFilled) {
      setError("Please fill at least one filter field before applying.");
      return;
    }

    setError("");

    let query = [];
    if (formValues.name) {
      query.push(`q[name_cont]=${formValues.name}`);
    }
    if (formValues.masterAttribute) {
      query.push(`q[rule_engine_conditions_rule_engine_applicable_model_rule_engine_available_model_display_name_cont]=${formValues.masterAttribute}`);
    }
    if (formValues.subAttribute) {
      query.push(`q[rule_engine_conditions_condition_attribute_cont]=${formValues.subAttribute}`);
    }

    const queryString = query.length > 0 ? `?${query.join("&")}` : "";
    const storedValue = sessionStorage.getItem("selectedId");
    try {
      const response = await axios.get(
        `https://staging.lockated.com/rule_engine/rules.json?${queryString}&token=bfa5004e7 b0175622be8f7e69b37d01290b737f82e078414&&q[loyalty_type_id_eq]=${storedValue}`
      );
      setFilteredItems(response.data); // Update filtered items with the response data
      setSelectedMasterAttribute(''); // Reset selected master attribute
      setSelectedSubAttribute(''); // Reset selected sub attribute
      setFormValues({ name: '', masterAttribute: '', subAttribute: '' }); // Reset form values
      // Close the modal after applying the filter
      const modal = document.getElementById('viewModal');
      if (modal) {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
      }
    } catch (error) {
      console.error("Error fetching filtered data", error);
    }
  };




  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // const handleSearch = () => {
  //   const filtered = RuleEngine.filter(rule =>
  //     rule.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredItems(filtered);
  //   setCurrentPage(1); // Reset to first page when searching
  // };

  // Handle search submission (e.g., when pressing 'Go!')
  const handleSearch = () => {
    const filtered = RuleEngine.filter((member) =>
      `${member.name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to the first page of results
    setSuggestions([]); // Clear suggestions after searching
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // If there's a search term, filter the members and show suggestions
    if (term) {
      const filteredSuggestions = RuleEngine.filter(
        (member) =>
          `${member.name}`
            .toLowerCase()
            .includes(term.toLowerCase())
      );
      setSuggestions(filteredSuggestions); // Update suggestions list
    } else {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  };

  const handleSuggestionClick = (member) => {
    setSearchTerm(`${member.name}`);
    setSuggestions([]); // Clear suggestions after selection
    setFilteredItems([member]); // Optionally, filter to show the selected member
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
    onPageChange, // Pass the onPageChange function as a prop
  }) => {
    const startEntry = (currentPage - 1) * itemsPerPage + 1;
    const endEntry = Math.min(currentPage * itemsPerPage, totalEntries);

    // Function to get the range of page numbers to display
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5; // Set the maximum number of visible pages
      const halfVisible = Math.floor(maxVisiblePages / 2);

      let startPage, endPage;

      if (totalPages <= maxVisiblePages) {
        // If total pages are less than or equal to maxVisiblePages, show all
        startPage = 1;
        endPage = totalPages;
      } else {
        // Otherwise, calculate the start and end pages
        if (currentPage <= halfVisible) {
          startPage = 1;
          endPage = maxVisiblePages;
        } else if (currentPage + halfVisible >= totalPages) {
          startPage = totalPages - maxVisiblePages + 1;
          endPage = totalPages;
        } else {
          startPage = currentPage - halfVisible;
          endPage = currentPage + halfVisible;
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    };

    const pageNumbers = getPageNumbers();

    const handleJumpForward = () => {
      if (currentPage + 5 <= totalPages) {
        onPageChange(currentPage + 5);
      } else {
        onPageChange(totalPages); // Go to last page if jump exceeds total pages
      }
    };

    const handleJumpBackward = () => {
      if (currentPage - 5 >= 1) {
        onPageChange(currentPage - 5);
      } else {
        onPageChange(1); // Go to first page if jump goes below 1
      }
    };

    return (
      <nav className="d-flex justify-content-between align-items-center">
        <ul
          className="pagination justify-content-center align-items-center"
          style={{ listStyleType: "none", padding: "0" }}
        >
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(1)} // Jump to first page
              disabled={currentPage === 1}
              style={{ padding: "8px 12px", color: "#5e2750" }}
            >
              «« {/* Double left arrow for jumping to the first page */}
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ padding: "8px 12px", color: "#5e2750" }}
            >
              ‹
            </button>
          </li>

          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(page)}
                style={{
                  padding: "8px 12px",
                  color: page === currentPage ? "#fff" : "#5e2750",
                  backgroundColor: page === currentPage ? "#5e2750" : "#fff",
                  border: "2px solid #5e2750",
                  borderRadius: "3px",
                }}
              >
                {page}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""
              }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ padding: "8px 12px", color: "#5e2750" }}
            >
              ›
            </button>
          </li>
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""
              }`}
          >
            <button
              className="page-link"
              onClick={handleJumpForward} // Jump forward by 7 pages
              disabled={currentPage === totalPages}
              style={{ padding: "8px 12px", color: "#5e2750" }}
            >
              »» {/* Double right arrow for jumping to the last page */}
            </button>
          </li>
        </ul>
        <p className="text-center" style={{ marginTop: "10px", color: "#555" }}>
          Showing {startEntry} to {endEntry} of {totalEntries} entries
        </p>
      </nav>
    );
  };


  const handleToggle = async (id, isActive) => {
    console.log(`Toggling rule ID: ${id} to active: ${isActive}`);
    try {
      // Make an API call to update the rule's active state
      const response = await axios.patch(`https://staging.lockated.com/rule_engine/rules/${id}.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`, { rule_engine_rule: { active: isActive } });
      console.log("API Response:", response.data);

      // Update local state to reflect the change
      setRuleEngine(prevRules =>
        prevRules.map(rule =>
          rule.id === id ? { ...rule, active: isActive } : rule
        )
      );

      // Optional: You can also update filteredItems if needed
      setFilteredItems((prevFilteredItems) =>
        prevFilteredItems.map((rule) =>
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
          <h5>Rule List</h5>

          <div className="d-flex justify-content-between align-items-center">
            <Link to="/create-rule-engine">
              <button className="purple-btn1" style={{ borderRadius: '5px' }}>
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
                {/* <input
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
                /> */}
                {/* <div
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
                </div> */}

                <div className="d-flex align-items-center position-relative">
                  <div className="position-relative me-3" style={{ width: "100%" }}>
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
                      onChange={handleSearchInputChange}
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
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                      </svg>
                    </div>
                    {suggestions.length > 0 && (
                      <ul
                        className="suggestions-list position-absolute"
                        style={{
                          listStyle: "none",
                          padding: "0",
                          marginTop: "5px",
                          border: "1px solid #ddd",
                          maxHeight: "200px",
                          overflowY: "auto",
                          width: "100%",        // Match width of input field
                          zIndex: 1,             // Ensure it appears on top of other elements
                          backgroundColor: "#fff", // Set solid background color
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for visibility
                        }}
                      >
                        {suggestions.map((member) => (
                          <li
                            key={member.id}
                            style={{
                              padding: "8px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleSuggestionClick(member)}
                          >
                            {member.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
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
            // style={{
            //   height: "100%",
            //   overflowY: "hidden",
            //   margin: "0 100px",

            // }}
            style={{
              height: "100%",
              overflowY: "hidden",
              // textAlign: "center",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
            }}
          >
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <>
                <table className="w-100" style={{ color: '#000', fontWeight: '400', fontSize: '13px' }}>
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
                  <tbody style={{ color: '#000', fontWeight: '400', fontSize: '13px' }}>
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
                            <Link to={`/view-rule-engine/${id}`}>
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
                  <h5 className="modal-title" id="viewModalLabel" style={{ fontSize: '16px', fontWeight: '600' }}>
                    Filter By
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body" >
                  {/* <p className="title" style={{fontSize:'14px',fontWeight:'400'}}>Attributes</p> */}
                  <div className="row" >
                    <p className="title" style={{ fontSize: '14px', fontWeight: '400' }}>Attributes</p>
                    <div className="row ms-2">
                      <fieldset className="border col-md-5 m-2 col-sm-11">
                        <legend className="float-none" style={{ fontSize: '14px', fontWeight: '400' }}>
                          Master Attribute<span>*</span>
                        </legend>
                        <select required="" className="mt-1 mb-1" style={{ fontSize: '12px', fontWeight: '400' }}
                          onChange={handleMasterAttributeChange}
                          value={selectedMasterAttribute}

                        >
                          <option value="" disabled selected hidden>
                            Select Master Attribute
                          </option>
                          {masterAttributes.map((attr) => (
                            <option key={attr.id} value={attr.id}>
                              {attr.display_name}
                            </option>
                          ))}

                        </select>
                      </fieldset>
                      <fieldset className="border col-md-5 m-2 col-sm-11">
                        <legend className="float-none" style={{ fontSize: '14px', fontWeight: '400' }}>
                          Sub Attribute<span>*</span>
                        </legend>
                        <select required="" className="mt-1 mb-1" style={{ fontSize: '12px', fontWeight: '400' }}
                          onChange={handleSubAttributeChange}
                          value={selectedSubAttribute}
                          disabled={!selectedMasterAttribute} // Disable if no master attribute is selected
                        >
                          <option value="" disabled selected hidden>
                            Select Sub Attribute
                          </option>

                          {subAttributes.map((subAttr) => (
                            <option key={subAttr.id} value={subAttr.attribute_name}>
                              {subAttr.display_name}
                            </option>
                          ))}
                        </select>
                      </fieldset>
                    </div>
                  </div>

                  <div className="row mt-2 justify-content-center mt-5">
                    <div className="col-md-4">
                      <button className="purple-btn1 w-100" onClick={handleFilter}>
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






// line 472
{/* <p className="title mt-2" style={{fontSize:'14px',fontWeight:'400'}}>Operator</p> */ }
{/* <div className="row mt-2" >
                  <p className="title mt-2" style={{fontSize:'14px',fontWeight:'400'}}>Operator</p>
                  <div className="row ms-2">
                  <fieldset className="border col-md-5 m-2 col-sm-11">
                      <legend className="float-none" style={{fontSize:'14px',fontWeight:'400'}}>
                        Master Operator<span>*</span>
                      </legend>
                      <select required=""  className="mt-1 mb-1" style={{fontSize:'12px',fontWeight:'400'}}>
                        <option value="" disabled selected hidden>
                          Select Master Operator
                        </option>
                        <option value="0">Common Operatives</option>
                        <option value="1">Logical Operatives</option>
                        <option value="2">Date/Time Operatives</option>
                        <option value="3">Tier Operatives</option>
                      </select>
                    </fieldset>
                    <fieldset className="border col-md-5 m-2 col-sm-11">
                      <legend className="float-none" style={{fontSize:'14px',fontWeight:'400'}}>
                        Sub Operator<span>*</span>
                      </legend>
                      <select required=""  className="mt-1 mb-1" style={{fontSize:'12px',fontWeight:'400'}}>
                        <option value="" disabled selected hidden>
                          Select Sub Operator
                        </option>
                        <option value="0">Building1</option>
                        <option value="1">Building2</option>
                      </select>
                    </fieldset>

                  </div>
                    {/* <fieldset className="border col-md-5 m-2 col-sm-11">
                      <legend className="float-none" style={{fontSize:'14px',fontWeight:'400'}}>
                        Master Operator<span>*</span>
                      </legend>
                      <select required=""  className="mt-1 mb-1" style={{fontSize:'12px',fontWeight:'400'}}>
                        <option value="" disabled selected hidden>
                          Select Master Operator
                        </option>
                        <option value="0">Common Operatives</option>
                        <option value="1">Logical Operatives</option>
                        <option value="2">Date/Time Operatives</option>
                        <option value="3">Tier Operatives</option>
                      </select>
                    </fieldset>
                    <fieldset className="border col-md-5 m-2 col-sm-11">
                      <legend className="float-none" style={{fontSize:'14px',fontWeight:'400'}}>
                        Sub Operator<span>*</span>
                      </legend>
                      <select required=""  className="mt-1 mb-1" style={{fontSize:'12px',fontWeight:'400'}}>
                        <option value="" disabled selected hidden>
                          Select Sub Operator
                        </option>
                        <option value="0">Building1</option>
                        <option value="1">Building2</option>
                      </select>
                    </fieldset> */}
{/* </div> */ }


