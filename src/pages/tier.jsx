import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/style.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import SubHeader from "../components/SubHeader";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Tiers = () => {
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    exit_points: 0,
    multipliers: 0,
    welcome_bonus: 0,
    point_type: ""
  });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const response = await axios.get(
          "https://staging.lockated.com/loyalty/tiers.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        );
        setTiers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tiers data.");
        setLoading(false);
      }
    };

    fetchTiers();
  }, []);

  const handleEditClick = (tier) => {
    setSelectedTier(tier);
    setFormData({
      name: tier?.name,
      exit_points: Number(tier?.exit_points),
      multipliers: Number(tier?.multipliers),
      welcome_bonus: Number(tier?.welcome_bonus),
      point_type: tier?.point_type
    });
    console.log("form data only" , formData);
    
    setShowModal(true); // Open modal
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
    if (selectedTier) {
      console.log("Submitting form data:", formData); // Check the data here
      try {
        await axios.put(
          `https://staging.lockated.com/loyalty/tiers/${selectedTier.id}.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`,
          formData
        ).then(response => {
          console.log("succ",response);
          if(response){
            setTiers((prevTiers) =>
              prevTiers.map((tier) =>
                tier.id === selectedTier.id ? { ...tier, ...formData } : tier
              )
            );
          }
        })
        handleCloseModal(); // Close the modal after successful update
      } catch (error) {
        console.error("Error updating the tier", error);
        if (error.response) {
          console.log(error.response.data);
          
          alert(`Error: ${error.response.data.message || "Unknown error"}`);
        } else {
          alert(`Error: ${error.message}`);
        }
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
    setSelectedTier(null); // Clear selected tier
    setFormData({
      // Reset form data
      name: "",
      exit_points: 0,
      multipliers: 0,
      welcome_bonus: 0,
    });
  };

  return (
    <>
      <Header />
      <div className="website-content d-flex">
        <Sidebar />
        <div className="w-100">
          <SubHeader />
          <div className="module-data-section mt-2">
            <p className="pointer">
              <span className="text-secondary">Tiers</span> &gt; Tier List
            </p>
            <h5 className="mb-3">Tiers</h5>
            <div className="loyalty-header">
              <div>
                <Link to="/new-tier">
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
                    <span>New Tier</span>
                  </button>
                </Link>
              </div>

              {/* Render table */}
              {loading && <p>Loading tiers...</p>}
              {error && <p className="text-danger">{error}</p>}
              {!loading && !error && (
                <div className="tbl-container mx-3 mt-4">
                  <table className="w-100">
                    <thead>
                      <tr>
                        <th>Tier Name</th>
                        <th>Exit Points</th>
                        <th>Multipliers</th>
                        <th>Welcome Bonus</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tiers.map((tier) => (
                        <tr key={tier.id}>
                          <td>{tier.name}</td>
                          <td>{tier.exit_points}</td>
                          <td>{tier.multipliers}x</td>
                          <td>{tier.welcome_bonus} Points</td>
                          <td>
                            <button
                              className="btn btn-link"
                              onClick={() => handleEditClick(tier)}
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
                </div>
              )}

              {/* React Bootstrap Modal for Editing */}
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Tier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                      <label htmlFor="tierName" className="form-label">
                        Tier Name
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
                      <label htmlFor="exitPoints" className="form-label">
                        Exit Points
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="exitPoints"
                        name="exit_points"
                        value={formData.exit_points}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="multipliers" className="form-label">
                        Multipliers
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="multipliers"
                        name="multipliers"
                        value={formData.multipliers}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="welcomeBonus" className="form-label">
                        Welcome Bonus
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="welcomeBonus"
                        name="welcome_bonus"
                        value={formData.welcome_bonus}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <Button type="submit" variant="primary" className="me-2">
                        Submit
                      </Button>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Tiers;
