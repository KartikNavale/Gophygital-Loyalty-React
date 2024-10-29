
import React, { useEffect, useState } from "react";
import "../styles/style.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import SubHeader from "../components/SubHeader";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    campaign_tag: "",
    target_audiance: "",
  });
  const [showModal, setShowModal] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`https://staging.lockated.com/loyalty/campaigns.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`);
        setCampaigns(response.data);
        setFilteredItems(response.data); // Initialize filteredItems with campaigns
      } catch (err) {
        setError("Failed to fetch campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []); 

  const handleEditClick = (campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      name: campaign.name,
      target_audiance: campaign.target_audiance,
      campaign_tag: campaign.campaign_tag,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedCampaign) {
      try {
        const response = await axios.put(
          `https://staging.lockated.com/loyalty/campaigns/${selectedCampaign.id}.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`,
          { loyalty_campaign: formData }
        );
        if (response) {
          setCampaigns((prevCampaigns) =>
            prevCampaigns.map((campaign) =>
              campaign.id === selectedCampaign.id
                ? { ...campaign, ...formData }
                : campaign
            )
          );
          setFilteredItems((prevFiltered) =>
            prevFiltered.map((campaign) =>
              campaign.id === selectedCampaign.id
                ? { ...campaign, ...formData }
                : campaign
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
    setSelectedCampaign(null);
    setFormData({
      name: "",
      campaign_tag: "",
      target_audiance: "",
    });
  };

  // Handle search
  const handleSearch = () => {
    const filtered = campaigns.filter(campaign =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleReset = () => {
    setSearchTerm(""); // Clear search term
    setFilteredItems(campaigns); // Reset filtered items to the original data
    setCurrentPage(1); // Reset to first page
  };

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
            <span className="text-secondary">Campaign</span> &gt; Campaign List
          </p>
          <h5 className="mb-3">Campaign</h5>
          <div className="d-flex justify-content-between loyalty-header">
            <div>
              <Link to="/new-campaign">
                <button className="purple-btn1 rounded-3 px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-plus mb-1" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                  </svg>
                  <span>New Campaign</span>
                </button>
              </Link>
            </div>
            <div className="d-flex flex-wrap justify-content-end">
              <div className="d-flex search-input w-50 p-1 ms-0 me-3">
                <span className="material-symbols-outlined"> search </span>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
              <button className="purple-btn1 rounded-3 px-3" onClick={handleSearch}>Go!</button>
              <button className="purple-btn2 rounded-3 mt-2" onClick={handleReset}>Reset</button>
            </div>
          </div>

          <div className="tbl-container mx-3 mt-4" style={{ height: "100%", overflowY: "hidden", margin: "0 100px"}}>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <>
                <table className="w-100">
                  <thead>
                    <tr>
                      <th>Campaign Name</th>
                      <th>Campaign Tag</th>
                      <th>Target Audience</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((campaign) => (
                      <tr key={campaign.id}>
                        <td style={{width:'25%'}}>{campaign.name}</td>
                        <td style={{width:'25%'}}>{campaign.campaign_tag}</td>
                        <td style={{width:'25%'}}>{campaign.target_audiance}</td>
                        <td style={{width:'25%'}}>
                          <button className="btn btn-link" onClick={() => handleEditClick(campaign)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
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
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Campaign</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="tierName" className="form-label">Campaign Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tierName"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="campaignTag" className="form-label">Campaign Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      id="campaignTag"
                      name="campaign_tag"
                      value={formData.campaign_tag}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="target_audience" className="form-label">Target Audience</label>
                    <select
                      className="form-select"
                      id="target_audiance"
                      name="target_audiance"
                      value={formData.target_audiance}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Target Audience</option>
                      <option value="Recently Joined">Recently Joined</option>
                      <option value="Suspended">Suspended</option>
                      <option value="1 - purchase">1 - purchase</option>
                      <option value="No purchase">No purchase</option>
                    </select>
                  </div>
                  <button type="submit" className="purple-btn1">Save Changes</button>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Campaign;


