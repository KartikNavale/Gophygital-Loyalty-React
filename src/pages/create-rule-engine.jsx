import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import SubHeader from "../components/SubHeader";
import {
  fetchMasterAttributes,
  fetchSubAttributes,
  fetchMasterRewardOutcomes,
  fetchSubRewardOutcomes,
} from "../Confi/ruleEngineApi";

const CreateRuleEngine = () => {
  const [conditions, setConditions] = useState([
    {
      id: 1,
      masterAttribute: "",
      subAttribute: "",
      masterOperator: "",
      subOperator: "",
    },
  ]);

  const [ruleName, setRuleName] = useState("");
  const [masterAttributes, setMasterAttributes] = useState([]);
  const [selectedMasterAttribute, setSelectedMasterAttribute] = useState("");
  const [subAttributes, setSubAttributes] = useState([]);

  const [masterRewardOutcomes, setMasterRewardOutcomes] = useState([]);
  const [selectedMasterRewardOutcomes, setSelectedMasterRewardOutcomes] =
    useState("");
  const [subRewardOutcomes, setSubRewardOutcomes] = useState([]);

  const [selectedMasterOperator, setSelectedMasterOperator] = useState("");
  const [subOperators, setSubOperators] = useState([]);
  const [selectedSubOperator, setSelectedSubOperator] = useState("");

  //operator data static
  const masterOperators = [
    {
      id: "0",
      name: "Common Operatives",
      subOptions: [
        { id: "1", name: "Greater than (>)", value: "greater_than" },
        { id: "2", name: "Less than (<)", value: "less_than" },
        { id: "3", name: "Equals (=)", value: "equals" },
        { id: "4", name: "Not equals (!=)", value: "not_equals" },
        { id: "5", name: "Contains", value: "" },
        { id: "6", name: "Does not contain", value: "" },
      ],
    },
    {
      id: "1",
      name: "Logical Operatives",
      subOptions: [
        { id: "1", name: "AND" },
        { id: "2", name: "OR" },
        { id: "3", name: "NOT" },
      ],
    },
    {
      id: "2",
      name: "Date/Time Operatives",
      subOptions: [
        { id: "1", name: "Before" },
        { id: "2", name: "After" },
        { id: "3", name: "Between" },
        { id: "4", name: "Within" },
      ],
    },
    {
      id: "3",
      name: "Tier Operatives",
      subOptions: [
        { id: "1", name: "Is in tier" },
        { id: "2", name: "Upgrade" },
        { id: "3", name: "Downgrade" },
      ],
    },
  ];

  const handleMasterOperatorChange = (e) => {
    const selectedId = e.target.value; //handle master operator
    setSelectedMasterOperator(selectedId);

    const selectedMaster = masterOperators.find((op) => op.id === selectedId);
    setSubOperators(selectedMaster ? selectedMaster.subOptions : []);
    setSelectedSubOperator(""); // Reset sub operator selection
  };

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

        const rewardOutcomes = await fetchMasterRewardOutcomes(
          companyId,
          activeStatus
        );
        setMasterRewardOutcomes(rewardOutcomes.master_reward_outcome);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    getData();
  }, []);

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

  //selected master reward outcome
  const handleMasterSubRewardOutcomeChange = async (e) => {
    const selectedId = e.target.value;
    setSelectedMasterRewardOutcomes(selectedId);

    // Find the index of the selected master attribute
    const selectedIndex = masterRewardOutcomes.findIndex(
      (attr) => attr.id === parseInt(selectedId)
    );
    console.log(selectedIndex);

    if (selectedIndex !== -1) {
      // Check if the index is valid
      try {
        const subRewardOutcomes = await fetchSubRewardOutcomes(selectedId);
        console.log(
          subRewardOutcomes.master_reward_outcome[selectedIndex]
            .sub_reward_outcome
        );
        const selectedSubRewardOutcomes =
          subRewardOutcomes.master_reward_outcome[selectedIndex]
            .sub_reward_outcome;
        setSubRewardOutcomes(selectedSubRewardOutcomes);
      } catch (error) {
        console.error("Error fetching sub attributes:", error);
      }
    } else {
      console.error("Selected ID not found in master attributes");
    }
  };

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        id: conditions.length + 1,
        masterAttribute: "",
        subAttribute: "",
        masterOperator: "",
        subOperator: "",
      },
    ]);
  };

  const renderCondition = (condition, index) => (
    <div key={condition.id} className="SetRuleCard">
      <div>
        <h6 className="mt-3">
          <span>Condition {condition.id}</span>
        </h6>
      </div>
      {index > 0 && ( // Only render the AND/OR section if this is not the first condition
        <ul className="nav nav-tabs border-0 mt-3">
          <div className="d-flex gap-3 And-btn rounded">
            <li className="nav-item d-flex p-2 gap-2" role="presentation">
              <input
                type="radio"
                className="nav-link"
                id={`home-tab-${index}`}
                name={`tab-${index}`}
                data-bs-toggle="tab"
                data-bs-target={`#home-tab-pane-${index}`}
                role="tab"
                aria-controls={`home-tab-pane-${index}`}
                aria-selected="true"
                defaultChecked
              />
              <label htmlFor={`home-tab-${index}`} className="and-or-btn">
                AND
              </label>
            </li>
            <li className="nav-item d-flex p-2 gap-2" role="presentation">
              <input
                type="radio"
                className="nav-link"
                id={`profile-tab-${index}`}
                name={`tab-${index}`}
                data-bs-toggle="tab"
                data-bs-target={`#profile-tab-pane-${index}`}
                role="tab"
                aria-controls={`profile-tab-pane-${index}`}
                aria-selected="false"
              />
              <label htmlFor={`profile-tab-${index}`} className="and-or-btn">
                OR
              </label>
            </li>
          </div>
        </ul>
      )}

      <div className="border-btm pb-2 mt-2">
        {/* ......if ..... */}
        <div>
          <h4>
            <span className="badge setRuleCard">IF</span>
          </h4>
          <div className="row ms-1 mt-2">
            {/* Attribute section */}
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend className="float-none">
                Master Attribute<span>*</span>
              </legend>
              <select
                required=""
                className="p-1"
                onChange={(e) => {
                  const updatedConditions = conditions.map((cond, idx) =>
                    idx === index
                      ? { ...cond, masterAttribute: e.target.value }
                      : cond
                  );
                  setConditions(updatedConditions);
                  handleMasterAttributeChange(e); // If needed to fetch sub attributes
                }}
                value={condition.masterAttribute}
              >
                <option value="">Select Master Attribute </option>
                {masterAttributes.map((attr) => (
                  <option key={attr.id} value={attr.id}>
                    {attr.display_name}
                  </option>
                ))}
              </select>
            </fieldset>
            <div className="col-md-1 d-flex justify-content-center align-items-center">
              <h4>&</h4>
            </div>
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend className="float-none">
                Sub Attribute<span>*</span>
              </legend>
              <select
                required
                className="p-1"
                disabled={!condition.masterAttribute}
                onChange={(e) => {
                  const updatedConditions = conditions.map((cond, idx) =>
                    idx === index
                      ? { ...cond, subAttribute: e.target.value }
                      : cond
                  );
                  setConditions(updatedConditions);
                }}
                value={condition.subAttribute}
              >
                <option value="">Select Sub Attribute</option>
                {subAttributes.map((subAttr) => (
                  <option key={subAttr.id} value={subAttr.id}>
                    {subAttr.display_name}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
        </div>

        {/* Operator section */}
        <div className="mt-3">
          <h4>
            <span className="badge setRuleCard">Operator</span>
          </h4>
          <div className="row ms-1 mt-2">
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend className="float-none">
                Master Operator<span>*</span>
              </legend>
              <select
                required=""
                className="p-1"
                value={condition.masterOperator}
                onChange={(e) => {
                  const updatedConditions = conditions.map((cond, idx) =>
                    idx === index
                      ? { ...cond, masterOperator: e.target.value }
                      : cond
                  );
                  setConditions(updatedConditions);
                  handleMasterOperatorChange(e); // If needed to update sub operators
                }}
              >
                <option value="">Select Master Operator </option>
                {masterOperators.map((op) => (
                  <option key={op.id} value={op.id}>
                    {op.name}
                  </option>
                ))}
              </select>
            </fieldset>
            <div className="col-md-1 d-flex justify-content-center align-items-center">
              <h4>&</h4>
            </div>
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend className="float-none">
                Sub Operator<span>*</span>
              </legend>
              <select
                required
                className="p-1"
                disabled={!condition.masterOperator}
                value={condition.subOperator}
                onChange={(e) => {
                  const updatedConditions = conditions.map((cond, idx) =>
                    idx === index
                      ? { ...cond, subOperator: e.target.value }
                      : cond
                  );
                  setConditions(updatedConditions);
                }}
              >
                <option value="">Select Sub Operator </option>
                {subOperators.map((subOp) => (
                  <option key={subOp.id} value={subOp.id}>
                    {subOp.name}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
        </div>

        {/* Value section */}
        <div className="mt-3">
          <h4>
            <span className="badge setRuleCard">Value</span>
          </h4>
          <div className="row ms-1 mt-2">
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend className="float-none">
                Value<span>*</span>
              </legend>
              <input
                type="text"
                className="p-1"
                placeholder="Enter Point Value"
              />
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-100">
        <SubHeader />
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Rule Engine</span> &gt; New Rule
          </p>
          <h5 className="mb-3">
            <span className="title">New Rule</span>
          </h5>
          <div className="go-shadow me-3">
            <div className="row ms-1">
              <fieldset className="border col-md-11 m-2 col-sm-11">
                <legend className="float-none">
                  New Rule<span>*</span>
                </legend>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                />
              </fieldset>
            </div>
          </div>

          <div className="main-rule">
            {conditions.map(renderCondition)}

            <button
              className="setRuleCard2 mt-2"
              onClick={addCondition}
              style={{ color: "black" }}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </span>
              Add Additional Condition
            </button>

            {/* THEN section */}
            <div className="mt-3">
              <h4>
                <span className="badge setRuleCard">THEN</span>
              </h4>
              <div className="row ms-1 mt-2">
                <fieldset className="border  col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Master Reward Outcome<span>*</span>
                  </legend>
                  <select
                    required=""
                    className="p-1"
                    onChange={handleMasterSubRewardOutcomeChange}
                    value={selectedMasterRewardOutcomes}
                  >
                    <option value="" selected="">
                      Select Master Reward Outcome
                    </option>
                    {masterRewardOutcomes.map((reward) => (
                      <option key={reward.id} value={reward.lock_model_name}>
                        {reward.display_name}
                      </option>
                    ))}
                  </select>
                </fieldset>
                <div className="col-md-1 d-flex justify-content-center align-items-center">
                  <h4>&</h4>
                </div>
                <fieldset className="border  col-md-3 m-2 col-sm-11">
                  <legend className="float-none">
                    Sub Reward Outcome<span>*</span>
                  </legend>
                  <select
                    required=""
                    className="p-1"
                    disabled={!selectedMasterRewardOutcomes}
                  >
                    <option value="">Select Sub Reward Outcome</option>

                    {subRewardOutcomes.map((reward) => (
                      <option
                        key={reward.id}
                        value={reward.rule_engine_available_model_id}
                      >
                        {reward.display_name}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {/* <div className="col-md-1 d-flex justify-content-center align-items-center">
                    <h4>=</h4>
                  </div> */}
                <fieldset className="border col-md-3 m-2 col-sm-11 ">
                  <legend className="float-none">
                    Parameter {/* <span>*</span> */}
                  </legend>
                  <input type="text" placeholder="Enter Point Value" />
                </fieldset>
              </div>
            </div>
          </div>

          {/* ..... */}
          <div className="row mt-2 justify-content-center">
            <div className="col-md-2">
              <button className="purple-btn1 w-100">Save for Approval</button>
            </div>
            <div className="col-md-2">
              <button className="purple-btn2 w-100">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRuleEngine;
