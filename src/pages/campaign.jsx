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

  // const token = sessionStorage.getItem("spree_api_key");
  // console.log("token ID in session after:", token); 

  useEffect(() => {
    const storedValue = sessionStorage.getItem("selectedId");
    console.log("Stored ID in session after selection:", storedValue); 
  
    const fetchCampaigns = async (storedValue) => {
      try {
        const response = await axios.get(
          `https://staging.lockated.com/loyalty/campaigns.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&&q[loyalty_type_id_eq]=${storedValue}`
        );
        setCampaigns(response.data);
      } catch (err) {
        setError("Failed to fetch campaigns.");
      } finally {
        setLoading(false);
      }
    };
  
    // Only call fetchCampaigns if storedValue is not null
    if (storedValue) {
      fetchCampaigns(storedValue);
    }
  }, []); // Empty dependency array to run only on component mount
  

  const handleEditClick = (campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      name: campaign?.name,
      target_audiance: campaign?.target_audiance,
      campaign_tag: campaign?.campaign_tag,
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
                />
              </div>
              <button className="purple-btn1 rounded-3 px-3">Go!</button>
              <button className="purple-btn2 rounded-3 mt-2">Reset</button>
            </div>
          </div>

          <div className="tbl-container mx-3 mt-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
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
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td>{campaign.name}</td>
                      <td>{campaign.campaign_tag}</td>
                      <td>{campaign.target_audiance}</td>
                      <td>
                        <button
                          className="btn btn-link"
                          onClick={() => handleEditClick(campaign)}
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
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Campaign</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="tierName" className="form-label">
                      Campaign Name
                    </label>
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
                    <label htmlFor="campaignTag" className="form-label">
                      Campaign Tag
                    </label>
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
                    <label htmlFor="target_audience" className="form-label">
                      Target Audience
                    </label>
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
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
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
