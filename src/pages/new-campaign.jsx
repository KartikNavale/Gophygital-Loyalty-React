import React, { useState } from 'react';
import "../styles/style.css";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import axios from 'axios'; 

const NewCampaign = () => {
  // State to manage input values and error/success messages
  const [campaignName, setCampaignName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [tierLevel, setTierLevel] = useState("");
  const [sendPoints, setSendPoints] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate input
    if (!campaignName || !targetAudience || !campaignType || !tierLevel) {
      setError("All fields are required.");
      return;
    }

    const data = {
      campaignName,
      targetAudience,
      campaignType,
      tierLevel,
      sendPoints,
    };
    
    console.log(data)
    try {
      const response = await axios.post('', data); // Replace with your actual API URL

      if (response.status === 200) {
        setSuccessMessage("Campaign created successfully!");
        clearForm();
      }
    } catch (error) {
      setError("Failed to create campaign. Please try again.");
    }
  };

  const clearForm = () => {
    setCampaignName("");
    setTargetAudience("");
    setCampaignType("");
    setTierLevel("");
    setSendPoints(false);
    setError("");
    setSuccessMessage("");
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="website-content">
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Campaign</span> &gt; New Campaign
          </p>
          <h5 className="mb-3 title">New Campaign</h5>
          <form onSubmit={handleSubmit} className='go-shadow me-3 pt-3'>
            <div className="border-bottom pb-2">
              <div className="row">
                <div className="col-md-11">
                  <input
                    className="border w-100 p-2 py-2"
                    placeholder="Enter Campaign Name"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row ms-1 mt-4">
                <fieldset className="border col-lg-3 col-md-5 col-sm-11 me-2">
                  <legend className="float-none">Target Audience<span>*</span></legend>
                  <select required value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}>
                    <option value="" disabled hidden>Select Target Audience</option>
                    <option value="Building1">Building1</option>
                    <option value="Building2">Building2</option>
                  </select>
                </fieldset>

                <fieldset className="border col-lg-3 col-md-5 col-sm-11 me-2">
                  <legend className="float-none">Campaign type<span>*</span></legend>
                  <select required value={campaignType} onChange={(e) => setCampaignType(e.target.value)}>
                    <option value="" disabled hidden>Select Campaign Type</option>
                    <option value="Type1">Type1</option>
                    <option value="Type2">Type2</option>
                  </select>
                </fieldset>

                <fieldset className="border col-lg-3 col-md-5 col-sm-11">
                  <legend className="float-none">Tier level<span>*</span></legend>
                  <select required value={tierLevel} onChange={(e) => setTierLevel(e.target.value)}>
                    <option value="" disabled hidden>Tier Level</option>
                    <option value="Level1">Level1</option>
                    <option value="Level2">Level2</option>
                  </select>
                </fieldset>
              </div>
            </div>
            <div className='mt-2'>
              <p className='fw-bold'>Points Criteria <span>*</span></p>
              <p>
                <input
                  className="align-middle mx-2"
                  type="checkbox"
                  checked={sendPoints}
                  onChange={() => setSendPoints(!sendPoints)}
                />
                <span className="align-middle">Send points to existing members.</span>
              </p>
            </div>
            <div className='mt-5'>
              <p className='fw-bold'>Campaign Rewards <span>*</span></p>
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-md-2">
                <button type="submit" className="purple-btn1 w-100">Create Campaign</button>
              </div>
              <div className="col-md-2">
                <button type="button" className="purple-btn2 w-100" onClick={clearForm}>Cancel</button>
              </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default NewCampaign;
