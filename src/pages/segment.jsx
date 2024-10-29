

import React, { useState, useEffect } from "react";
import "../styles/style.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import SubHeader from "../components/SubHeader";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

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

  const [formData, setFormData] = useState({
    name: "",
    segment_tag: "",
    member_count: ""
  });

  const handleSearch = () => {
    const filtered = segments.filter((rule) =>
      rule.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredItems(segments);
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

  const handleEditClick = (segment) => {
    setSelectedSegment(segment);
    setFormData({
      name: segment?.name,
      segment_tag: segment?.segment_tag
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedSegment) {
      try {
        const response = await axios.put(
          `https://staging.lockated.com/loyalty/segments/${selectedSegment.id}.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`,
          { loyalty_segment: formData }
        );
        if (response) {
          setSegments((prevSegments) =>
            prevSegments.map((segment) =>
              segment.id === selectedSegment.id
                ? { ...segment, ...formData }
                : segment
            )
          );
        }
        handleCloseModal();
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSegment(null);
    setFormData({
      name: "",
      segment_tag: ""
    });
  };

  // const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  // const currentItems = filteredItems.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

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


 
  //   const handlePageChange = (page) => {
  //     if (page > 0 && page <= totalPages) {
  //       onPageChange(page);
  //     }
  //   };

  //   return (
  //     <nav>
  //       <ul className="pagination justify-content-center">
  //         <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
  //           <button
  //             className="page-link"
  //             onClick={() => handlePageChange(currentPage - 1)}
  //           >
  //             Previous
  //           </button>
  //         </li>
  //         <li className="page-item active">
  //           <button className="page-link">{currentPage}</button>
  //         </li>
  //         <li
  //           className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
  //         >
  //           <button
  //             className="page-link"
  //             onClick={() => handlePageChange(currentPage + 1)}
  //           >
  //             Next
  //           </button>
  //         </li>
  //       </ul>
  //     </nav>
  //   );
  // };


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
                border:'2px solid #5e2750',
                borderRadius:'3px'
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
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Segment</span> &gt; Segment List
          </p>
          <h5 className="mb-3">Segment</h5>
          {loading && <p>Loading segments...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && (
            <>
              <div className="d-flex justify-content-between loyalty-header">
                <div>
                  <Link to="/new-segment">
                    <button className="purple-btn1 rounded-3 px-3">
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
                    <span className="material-symbols-outlined">search</span>
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                    {currentItems.length > 0 ? (
                      currentItems.map((segment, index) => (
                        <tr key={segment.id || index}>
                          <td>{segment.name}</td>
                          <td className="fw-bold">{segment.segment_tag}</td>
                          <td>{segment.member_count}</td>
                          <td>
                            <button
                              className="btn btn-link"
                              onClick={() => handleEditClick(segment)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
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
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No segments found</td>
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
      <Modal show={showModal} onHide={handleCloseModal}>
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
              <input
                type="text"
                id="segment_tag"
                name="segment_tag"
                className="form-control"
                value={formData.segment_tag}
                onChange={handleInputChange}
              />
            </div>
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Segment;
