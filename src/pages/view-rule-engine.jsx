import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import SubHeader from '../components/SubHeader';
import { fetchMasterAttributes, fetchSubAttributes, fetchMasterRewardOutcomes, fetchSubRewardOutcomes } from "../Confi/ruleEngineApi"
const ViewRuleEngine = () => {

  const [ruleName, setRuleName] = useState('');
  const [masterAttributes, setMasterAttributes] = useState([]);
  const [selectedMasterAttribute, setSelectedMasterAttribute] = useState('');
  const [subAttributes, setSubAttributes] = useState([]);

  const [masterRewardOutcomes, setMasterRewardOutcomes] = useState([]);
  const [selectedMasterRewardOutcomes, setSelectedMasterRewardOutcomes] = useState('');
  const [subRewardOutcomes, setSubRewardOutcomes] = useState([]);



  useEffect(() => {
    const getData = async () => {
      try {
        const companyId = 44; // Set this according to your needs
        const activeStatus = true; // Set this according to your needs
        const masterAttrs = await fetchMasterAttributes(companyId, activeStatus);
        setMasterAttributes(masterAttrs.master_attributes);

        const rewardOutcomes = await fetchMasterRewardOutcomes(companyId, activeStatus);
        setMasterRewardOutcomes(rewardOutcomes.master_reward_outcome);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    getData();
  }, []);


  //selected master attribute
  const handleMasterAttributeChange = async (e) => {
    const selectedId = e.target.value;
    setSelectedMasterAttribute(selectedId);

    // Find the index of the selected master attribute
    const selectedIndex = masterAttributes.findIndex(attr => attr.id === parseInt(selectedId));
    console.log(selectedIndex)

    if (selectedIndex !== -1) { // Check if the index is valid
      try {
        const subAttrs = await fetchSubAttributes(selectedId);
        console.log(subAttrs.master_attributes[selectedIndex].sub_attributes);
        const selectedSubAttributes = subAttrs.master_attributes[selectedIndex].sub_attributes
        setSubAttributes(selectedSubAttributes);
      } catch (error) {
        console.error('Error fetching sub attributes:', error);
      }
    } else {
      console.error('Selected ID not found in master attributes');
    }
  };


  //selected master reward outcome
  const handleMasterSubRewardOutcomeChange = async (e) => {
    const selectedId = e.target.value;
    setSelectedMasterRewardOutcomes(selectedId);

    // Find the index of the selected master attribute
    const selectedIndex = masterRewardOutcomes.findIndex(attr => attr.id === parseInt(selectedId));
    console.log(selectedIndex)

    if (selectedIndex !== -1) { // Check if the index is valid
      try {
        const subRewardOutcomes = await fetchSubRewardOutcomes(selectedId);
        console.log(subRewardOutcomes.master_reward_outcome[selectedIndex].sub_reward_outcome);
        const selectedSubRewardOutcomes = subRewardOutcomes.master_reward_outcome[selectedIndex].sub_reward_outcome
        setSubRewardOutcomes(selectedSubRewardOutcomes);
      } catch (error) {
        console.error('Error fetching sub attributes:', error);
      }
    } else {
      console.error('Selected ID not found in master attributes');
    }
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
              <span className="text-secondary">Rule Engine</span> &gt; New Rule
            </p>
            <h5 class="mb-3">
              <span className="title">New Rule</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="currentColor"
                className="bi bi-pencil-square mb-2 ms-3 text-body-secondary"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </h5>
            <div className="go-shadow me-3">
              <div className="row ms-1">
                <fieldset className="border col-md-11 m-2 col-sm-11">
                  <legend className="float-none">
                    New Rule<span>*</span>
                  </legend>
                  <input type="text" placeholder="Enter Name" />
                </fieldset>
              </div>
            </div>
            <div className="SetRuleCard">
              <div>
                <h5 className="title mt-3">Set Rule Conditions</h5>
                <h6 class=" mt-3">
                  <span className="">Condition 1</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square mb-1 ms-3 text-body-secondary"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </h6>
              </div>
              <div className="border-btm pb-2">
                <div>
                  <h4>
                    <span className="badge setRuleCard">IF</span>
                  </h4>
                  <div className="row ms-1 mt-2">
                    <fieldset className="border  col-md-3 m-2 col-sm-11">
                      <legend className="float-none">
                        Master Attribute<span>*</span>
                      </legend>
                      <select required="" onChange={handleMasterAttributeChange} value={selectedMasterAttribute} >
                        <option value="" disabled="" selected="" hidden="">
                          Select Master Attribute
                        </option>
                        {masterAttributes.map(attr => (
                          <option key={attr.id} value={attr.id}>
                            {attr.display_name}
                          </option>
                        ))}

                        {/* <option value="0">User Actions</option>
                        <option value="1">Transaction Events</option>
                        <option value="1">Time-based Events</option>
                        <option value="1">User Demographics/Segments</option>
                        <option value="1">Engagement Behaviour</option>
                        <option value="1">Milestones</option>
                        <option value="1">Tier-based</option> */}
                      </select>
                    </fieldset>
                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                      <h4>&</h4>
                    </div>
                    <fieldset className="border  col-md-3 m-2 col-sm-11">
                      <legend className="float-none">
                        Sub Attribute<span>*</span>
                      </legend>
                      <select required="">
                        <option value="" disabled="" selected="" hidden="">
                          Select Sub Attribute
                        </option>
                        {subAttributes.map(subAttr => (
                          <option key={subAttr.id} value={subAttr.id}>
                            {subAttr.display_name}
                          </option>
                        ))}

                      </select>
                    </fieldset>
                  </div>
                </div>

                <div className="mt-3">
                  <h4>
                    <span className="badge setRuleCard">Operator</span>
                  </h4>
                  <div className="row ms-1 mt-2">
                    <fieldset className="border  col-md-3 m-2 col-sm-11">
                      <legend className="float-none">
                        Master Operator<span>*</span>
                      </legend>
                      <select required="">
                        <option value="" disabled="" selected="" hidden="">
                          Select Master Operator
                        </option>
                        <option value="0">Common Operatives</option>
                        <option value="1">Logical Operatives</option>
                        <option value="1">Date/Time Operatives</option>
                        <option value="1">Tier Operatives</option>

                      </select>
                    </fieldset>
                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                      <h4>&</h4>
                    </div>
                    <fieldset className="border  col-md-3 m-2 col-sm-11">
                      <legend className="float-none">
                        Sub Operator<span>*</span>
                      </legend>
                      <select required="">
                        <option value="" disabled="" selected="" hidden="">
                          Select Sub Operator
                        </option>
                        <option value="0">Building1</option>
                        <option value="1">Building2</option>
                      </select>
                    </fieldset>
                  </div>
                </div>

                <div className="mt-3">
                  <h4>
                    <span className="badge setRuleCard">Value</span>
                  </h4>
                  <div className="row ms-1 mt-2">
                    <fieldset className="border col-md-3 m-2 col-sm-11">
                      <legend className="float-none">
                        Value<span>*</span>
                      </legend>
                      <input type="text" placeholder="Enter Point Value" />
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>

            <button className="setRuleCard2 mt-2" style={{ color: 'black' }} >
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </span>
              Add Additional Condition
            </button>

            {/* then */}
            <div className="mt-3">
              <h4>
                <span className="badge setRuleCard">THEN</span>
              </h4>
              <div className="row ms-1 mt-2">
                <fieldset className="border  col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Master Reward Outcome<span>*</span>
                  </legend>
                  <select required="" onChange={handleMasterSubRewardOutcomeChange} value={selectedMasterRewardOutcomes}>
                    <option value="" disabled="" selected="" hidden="">
                      Select Master Reward Outcome
                    </option>

                    {masterRewardOutcomes.map(reward =>
                      <option key={reward.id} value={reward.id}>{reward.display_name}</option>
                    )}

                    {/* <option value="1">Discounts/Coupons</option>
                    <option value="1">Tier Promotion</option>
                    <option value="1">Product/Service Offers</option>
                    <option value="1">Milestone-Based Rewards</option>
                    <option value="1">Cashback</option> */}

                  </select>
                </fieldset>
                <div className="col-md-1 d-flex justify-content-center align-items-center">
                  <h4>&</h4>
                </div>
                <fieldset className="border  col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Sub Reward Outcome<span>*</span>
                  </legend>
                  <select required="">
                    <option value="" disabled="" selected="" hidden="">
                      Select  Sub Reward Outcome
                    </option>
                    {subRewardOutcomes.map(reward =>
                      <option key={reward.id} value={reward.id}>{reward.display_name}</option>
                    )}
                    {/* <option value="0">Building1</option>
                    <option value="1">Building2</option> */}
                  </select>
                </fieldset>
                <div className="col-md-1 d-flex justify-content-center align-items-center">
                  <h4>=</h4>
                </div>
                <fieldset className="border col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Point Value<span>*</span>
                  </legend>
                  <input type="text" placeholder="Enter Point Value" />
                </fieldset>
              </div>
            </div>
            {/* ... */}

            <div className="row mt-2 justify-content-center">
              <div className="col-md-2">
                <button className="purple-btn1 w-100" fdprocessedid="u33pye">
                  Save for Approval
                </button>
              </div>
              <div className="col-md-2">
                <button className="purple-btn2 w-100" fdprocessedid="af5l5g">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    </>
  )
}

export default ViewRuleEngine