import React, { useState, useEffect } from "react";
import "../styles/style.css";

import SubHeader from "../components/SubHeader";
import axios from "axios";
// Import axios for making API calls
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewSegment = () => {
  const [name, setName] = useState(""); // Updated: Replaced segmentName
  const [segment_tag, setSegmentTag] = useState("");

  const [segment_type, setSegmentType] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // For navigation after success
  const storedValue = sessionStorage.getItem("selectedId");
  console.log("Stored ID in session after selection:", storedValue);

  const [segment_members, setSelectedMemberIds] = useState([]);

  const [tierLevels, setTierLevels] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const tierResponse = await axios.get(
          "https://staging.lockated.com/loyalty/tiers.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        );
        setTierLevels(tierResponse.data);

        const memberResponse = await axios.get(
          "https://staging.lockated.com/loyalty/members.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        );
        setInitialData(memberResponse.data);
        setFilteredData(memberResponse.data);
        // Set initial data as default filtered data
        setSelectedMemberIds(memberResponse.data.map((member) => member.id));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchTierLevels = async () => {
      try {
        const response = await axios.get(
          "https://staging.lockated.com/loyalty/tiers.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        );
        setTierLevels(response.data);
        // Store API data in state
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tier levels:", error);
      }
    };

    fetchTierLevels();
  }, []);

  // const handleSubmit = async (values) => {
  //   values.preventDefault();

   

  //   if (
  //     !name ||
  //     !segment_tag ||
  //     !segment_type ||
  //     segment_members.length === 0 // Ensure at least one member is selected
  //   ) {
  //     setError(
  //       "All fields are required, and at least one member must be selected."
  //     );
  //     return;
  //   }

  //   const data1 = {
  //     name, // Updated key name
  //     segment_tag,

  //     segment_type,

  //     loyalty_type_id: storedValue,

  //     // Updated key name
  //   };
  //   console.log(data1);

  //   console.log(data1.name);
  //   const data = {
  //     loyalty_segment: {
  //       name: data1.name,
  //       segment_tag: data1.segment_tag,
  //       // segment_filters: data1.segment_filters,
  //       segment_type: data1.segment_type,
  //       // loyalty_tier_id: Number(data1.loyalty_tier_id)

  //       loyalty_type_id: storedValue,

  //       loyalty_members: { member_ids: segment_members },
  //     },
  //   };
  //   console.log(data);

  //   try {
  //     const response = await axios.post(
  //       "https://staging.lockated.com/loyalty/segments.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",

  //       data
  //     );
  //     console.log("data posted");
  //     if (response.statusText === "Created") {
  //       setSuccessMessage("Segment created successfully!");
  //       alert("Segment created successfully!");

  //       clearForm();

  //       console.log(data, "Navigating to /Segment");
  //       navigate("/Segment");

  //       console.log(response, data);
  //     }
  //   } catch (error) {
  //     setError("Failed to create segment. Please try again.");
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !name ||
    !segment_tag ||
    !segment_type ||
    segment_members.length === 0 // Ensure at least one member is selected
  ) {
    toast.error("All Mandatory field are required, and at least one member must be selected.", {
      position: "top-center",
      autoClose: 3000,
    });
    return;
  }

  // Proceed with form submission if all fields are filled
  const data1 = {
    name,
    segment_tag,
    segment_type,
    loyalty_type_id: storedValue,
  };

  const data = {
    loyalty_segment: {
      name: data1.name,
      segment_tag: data1.segment_tag,
      segment_type: data1.segment_type,
      loyalty_type_id: storedValue,
      loyalty_members: { member_ids: segment_members },
    },
  };

  try {
    const response = await axios.post(
      "https://staging.lockated.com/loyalty/segments.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
      data
    );
    if (response.statusText === "Created") {
      toast.success("Segment created successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      clearForm();
      navigate("/Segment");
    }
  } catch (error) {
    toast.error("Failed to create segment. Please try again.", {
      position: "top-center",
      autoClose: 3000,
    });
  }
};

  const clearForm = () => {
    setName(""); // Updated: Clear name field
    setSegmentTag("");
    // setSegmentFilters("");
    setSegmentType("");
    // setLoyaltyTierId(""); // Updated: Clear loyalty_tier_id field
    setError("");
    setSuccessMessage("");
    setSelectedMemberIds([]);
  };

  const [formValues, setFormValues] = useState({
    enrollmentDate: "",
    status: "",
    age: "",

    activatedDate: "",
    gender: "",
    tierLevel: "",
  });

  const [filteredData, setFilteredData] = useState([]); // State to store filtered data

  // Handle input change in filter fields
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle applying the filter and fetching data
  const handleFilter = async (e) => {
    e.preventDefault();

    const isAnyFilterFilled = Object.values(formValues).some((value) => value);

    if (!isAnyFilterFilled) {
      setError("Please fill at least one filter field before applying.");
      return;
    }

    // Reset error if filter fields are filled
    setError("");

    // Create query params dynamically based on the formValues
    let query = [];

    // Add conditions only if values are provided
    if (formValues.enrollmentDate) {
      query.push(
        `q[joining_date_gteq]=${formatDate(formValues.enrollmentDate)}`
      );
    }
    if (formValues.activatedDate) {
      query.push(`q[created_at_gteq]=${formatDate(formValues.activatedDate)}`);
    }

    if (formValues.status) {
      query.push(
        `q[active_eq]=${formValues.status === "Active" ? "true" : "false"}`
      );
    }
    if (formValues.gender) {
      query.push(`q[user_gender_eq]=${formValues.gender}`);
    }
    if (formValues.tierLevel) {
      query.push(`q[loyalty_tier_name_eq]=${formValues.tierLevel}`);
    }

    // Construct full query string
    const queryString = query.length > 0 ? `?${query.join("&")}` : "";

    try {
      // Call API with query string
      const response = await axios.get(
        `https://staging.lockated.com/loyalty/members.json${queryString}&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
      );

      setFilteredData(response.data); // Set the fetched data
      setSelectedMemberIds(response.data.map((member) => member.id));

      if (response.data.length > 0) {
        setShowMembers(true); // Show members if data is returned
      } else {
        setShowMembers(false); // Hide members if no data
      }
    } catch (error) {
      console.error("Error fetching filtered data", error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedMemberIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((memberId) => memberId !== id)
        : [...prevSelected, id]
    );
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      const maxVisiblePages = 7; // Set the maximum number of visible pages
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
      if (currentPage + 7 <= totalPages) {
        onPageChange(currentPage + 7);
      } else {
        onPageChange(totalPages); // Go to last page if jump exceeds total pages
      }
    };

    const handleJumpBackward = () => {
      if (currentPage - 7 >= 1) {
        onPageChange(currentPage - 7);
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
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
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
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
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

  return (
    <>
      <div className="w-100">
        <SubHeader />
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Segment</span> &gt; New Segment
          </p>
          <h5 className="mb-3 title">New Segment</h5>
          <div className="go-shadow me-3 pb-4">
            <div className="row ms-1 mt-4">
              <fieldset className="border col-md-3 m-2 col-sm-11">
                <legend className="float-none">
                  Segment Name<span>*</span>
                </legend>
                <input
                  type="text"
                  placeholder="Enter Segment Name"
                  required=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </fieldset>

              <fieldset className="border col-md-3 m-2 col-sm-11">
                <legend className="float-none">
                  Segment tag<span>*</span>
                </legend>
                <select
                  required=""
                  value={segment_tag}
                  onChange={(e) => setSegmentTag(e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Select Segment tag
                  </option>

                  <option value="Recently joined">Recently joined</option>
                  <option value="Suspended">Suspended</option>
                  <option value="1-purchase">1-purchase</option>
                  <option value="No purchase">No purchase</option>
                </select>
              </fieldset>

              <fieldset className="border col-md-3 m-2 col-sm-11">
                <legend className="float-none">
                  Segment type<span>*</span>
                </legend>
                <select
                  required=""
                  value={segment_type}
                  onChange={(e) => setSegmentType(e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Select segment type
                  </option>
                  <option value="Point based">Point based</option>
                  <option value="Discount based">Discount based</option>
                  <option value="Referral Campaign">Referral Campaign</option>
                  <option value="Tier - Up Campaign">Tier - Up Campaign</option>
                  <option value="Custom Campaign">Custom Campaign</option>
                </select>
              </fieldset>

              {/* Filter Element */}
              <div className="filter-container mt-4">
                <h5 className="filter-label">Filter Members</h5>
                <div className="filter-fields d-flex flex-wrap border p-3">
                  <div className="filter-field m-2">
                    <label htmlFor="enrollmentDate">Enrollment Date</label>
                    <input
                      type="date"
                      id="enrollmentDate"
                      name="enrollmentDate"
                      className="form-control"
                      value={formValues.enrollmentDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="filter-field m-2">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      className="form-control"
                      value={formValues.status}
                      onChange={handleChange}
                    >
                      <option value="" disabled hidden>
                        Select status
                      </option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="filter-field m-2">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      className="form-control"
                      value={formValues.gender}
                      onChange={handleChange}
                    >
                      <option value="" disabled hidden>
                        Select gender
                      </option>
                      <option value="m">Male</option>
                      <option value="f">Female</option>
                    </select>
                  </div>

                  <div className="filter-field m-2">
                    <label htmlFor="activatedDate">Activated Date</label>
                    <input
                      type="date"
                      id="activatedDate"
                      name="activatedDate"
                      className="form-control"
                      value={formValues.activatedDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="filter-field m-2">
                    <label htmlFor="tierLevel">Tier Level</label>
                    <select
                      id="tierLevel"
                      name="tierLevel"
                      className="form-control"
                      value={formValues.tierLevel}
                      onChange={handleChange}
                    >
                      <option value="" disabled hidden>
                        Select Tier Level
                      </option>
                      {tierLevels?.map((tier, index) => (
                        <option key={tier.name} value={tier.name}>
                          {tier.display_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Apply Filter Button */}

                  <div className=" d-flex align-items-center mt-4 ml-5">
                    <button
                      type="button"
                      className=" ml-5 purple-btn1"
                      onClick={handleFilter}
                      // style={{
                      //   minWidth: "100px", // Same width as select fields
                      //   height: "38px", // Same height as input/select fields
                      // }}
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>

                {/* Submit and Cancel Buttons */}

                {/* End Filter Element */}
              </div>
            </div>
            {/* Display Filtered Data */}
            <div className="filtered-data-section mt-4">
              <h5>Members List</h5>
              { showMembers && filteredData.length > 0 ? (
                <div className="tbl-container mx-3 mt-4">
                  <table className="w-100 ">
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Loyalty Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((member) => (
                        <tr key={member.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={segment_members.includes(member.id)}
                              onChange={() => handleCheckboxChange(member.id)}
                            />
                          </td>

                          <td>
                            {member.firstname} {member.lastname}
                          </td>
                          <td>{member.email}</td>
                          <td>
                            {member.address.address1}, {member.address.address2}
                          </td>
                          <td>{member.gender || "N/A"}</td>
                          <td>
                            {member.active !== null
                              ? member.active
                                ? "Active"
                                : "Inactive"
                              : "N/A"}
                          </td>
                          <td>{member.current_loyalty_points || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalEntries={filteredData.length}
                  />
                </div>
              ) : (
                <p className="text-secondary mx-4">
                  No data found. Please adjust the filters and try again.
                </p>
              )}
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-md-2">
                <button className="purple-btn1 w-100" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
              <div className="col-md-2">
                <button className="purple-btn2 w-100" onClick={clearForm}>
                  Cancel
                </button>
              </div>
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}{" "}
            {successMessage && (
              <div className="text-success mt-2">{successMessage}</div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default NewSegment;
