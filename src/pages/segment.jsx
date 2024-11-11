import React, { useState, useEffect } from "react";
import "../styles/style.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import SubHeader from "../components/SubHeader";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Segment = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const navigate = useNavigate();

const handleEditClick = (segment) => {
  // Navigate to the edit page with the segment ID
  navigate(`/edit-segment/${segment.id}`);
};

  const [formData, setFormData] = useState({
    name: "",
    segment_tag: "",
    member_count: "",
  });

  
  const handleSearch = () => {
    const filtered = segments.filter(
      (rule) =>
        rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.segment_tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };
  const handleReset = () => {
    setSearchTerm("");
    setFilteredItems(segments);
    setCurrentPage(1);
  };

  const fetchSegments = async () => {
    const storedValue = sessionStorage.getItem("selectedId");
    try {
      const response = await axios.get(
        `https://staging.lockated.com/loyalty/segments.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&&q[loyalty_type_id_eq]=${storedValue}`
      );
      setSegments(response.data);
      setFilteredItems(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch segments. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSegments();
  }, []);

  // const handleEditClick = (segment) => {
  //   setSelectedSegment(segment);
  //   setFormData({
  //     name: segment.name,
  //     segment_tag: segment.segment_tag,
  //     // segment_filters: segment?.segment_filters,
  //     // segment_type: segment?.segment_type,
  //     // loyalty_tier_id: segment?.loyalty_tier_id,
  //   });
  //   setShowModal(true); // Assuming this controls a modal for editing
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  
  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   if (selectedSegment) {
  //     try {
  //       const response = await axios.put(
  //         `https://staging.lockated.com/loyalty/segments/${selectedSegment.id}.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`,
  //         { loyalty_segment: formData }
        
  //       );
  //       console.log(response)
  //       if (response) {
  //         // Update segments state
  //         const updatedSegments = segments.map((segment) =>
  //           segment.id === selectedSegment.id
  //             ? { ...segment, ...formData }
  //             : segment
  //         );

  //         // Update the segments state
  //         setSegments(updatedSegments);

  //         // Also update the filtered items state
  //         setFilteredItems(updatedSegments);

  //         // Set the current page to the first page to display updated results
  //         setCurrentPage(1);
  //       }
  //       handleCloseModal();
  //     } catch (error) {
  //       alert(`Error: ${error.message}`);
  //     }
  //   }
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setSelectedSegment(null);
  //   setFormData({
  //     name: "",
  //     segment_tag: "",
  //   });
  // };

  

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  

  const Pagination = ({ currentPage, totalPages, totalEntries }) => {
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
                border: "2px solid #5e2750",
                borderRadius: "3px",
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
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
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
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
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

  return (
    <>
      <div className="w-100">
        <SubHeader />
        <div className="module-data-section mt-2"
        >
          <p className="pointer">
            <span className="text-secondary">Segment</span> &gt; Segment List
          </p>
          <h5>Segment</h5>
          {loading && <p>Loading segments...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && (
            <>
              <div className="d-flex justify-content-between loyalty-header">
                <div>
                  <Link to="/new-segment">
                    <button className="purple-btn1 px-3 
                    rounded-1" style={{paddingRight:'50px'}}
                    // style={{borderRadius:'5px'}}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        fill="currentColor"
                        className="bi bi-plus mb-1 "
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                      </svg>
                      <span>New Segment</span>
                    </button>
                  </Link>
                </div>

                <div className="d-flex align-items-center">
                  <div className="position-relative me-3">
                    <input
                      className="form-control"
                      style={{
                        height: "35px",
                        paddingLeft: "30px",
                        textAlign: "left",
                      }}
                      type="search"
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
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="tbl-container mx-3 mt-4"
              //  style={{ maxHeight: "400px", overflowY: "scroll", overflowX: "auto" }}>
              >
                <table className="w-100"  style={{color: '#000', fontWeight:'400',fontSize:'13px'}}>
                  <thead style={{textAlign:'left'}}>
                    <tr >
                      <th style={{ width: "20%" }}>Segment Name</th>
                      <th style={{ width: "20%" }}>Segment Tag</th>
                      <th style={{ width: "20%" }}>Total Members</th>
                      <th style={{ width: "20%" }}>Edit</th>
                      <th style={{ width: "20%" }}>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((segment, index) => (
                        <tr key={segment.id || index}>
                          <td
                            style={{ align: "center", verticalAlign: "middle" }}
                          >
                            {segment.name}
                          </td>
                          <td
                            style={{
                              align: "center",
                              fontSize: "13px ",
                              fontWeight: "700",
                            }}
                            className=""
                          >
                            {segment.segment_tag}
                          </td>
                          <td style={{ align: "center" }}>
                            {segment.member_count}
                          </td>
                          <td>
                            <button
                              className="btn btn-link"
                              onClick={() => handleEditClick(segment)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#5e2750"
                                className="bi bi-pencil-square"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fillRule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5V6.207a.5.5 0 0 0-1 0V13.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h7.293a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                />
                              </svg>
                            </button>
                            
                        
                    
                          </td>
                        

                    <Link to={`/view-segment/${segment.id}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#000000"
                              className="bi bi-eye ms-4 mt-3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg>
                          </Link>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td style={{ textAlign: "center" }} colSpan="4">
                          No segments found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalEntries={filteredItems.length}

                // totalPages={totalPages}
                // onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
      {/* <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Segment Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="segment_tag">Segment Tag:</label>
              <select
                className="form-select"
                id="segmentTag"
                name="segment_tag"
                value={formData.segment_tag}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Segment Tag</option>
                <option value="Recently joined">Recently joined</option>
                <option value="Suspended">Suspended</option>
                <option value="1-purchase">1-purchase</option>
                <option value="No purchase">No purchase</option>
              </select>
            </div>
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal> */}
{/* 
<Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Segment</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Segment Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="segmentTag" className="form-label">Segment Tag</label>
        <select
          className="form-select"
          id="segmentTag"
          name="segment_tag"
          value={formData.segment_tag}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Segment Tag</option>
          <option value="Recently joined">Recently joined</option>
          <option value="Suspended">Suspended</option>
          <option value="1-purchase">1-purchase</option>
          <option value="No purchase">No purchase</option>
        </select>
      </div>
      <button type="submit" className="purple-btn1">Save Changes</button>
    </form>
  </Modal.Body>
</Modal> */}

    </>
  );
};

export default Segment;
