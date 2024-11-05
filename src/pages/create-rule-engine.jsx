import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import SubHeader from "../components/SubHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchMasterAttributes,
  fetchSubAttributes,
  fetchMasterRewardOutcomes,
  fetchSubRewardOutcomes,
} from "../Confi/ruleEngineApi";

const CreateRuleEngine = () => {

  const navigate = useNavigate()
  const [conditions, setConditions] = useState([
    {
      id: 1,
      masterAttribute: "",
      subAttribute: "",
      masterOperator: "",
      subOperator: "",
      condition_type: "",
      value: ''
    },
  ]);



  const [ruleName, setRuleName] = useState("");
  const [masterAttributes, setMasterAttributes] = useState([]);
  const [selectedMasterAttribute, setSelectedMasterAttribute] = useState("");
  const [subAttributes, setSubAttributes] = useState([]);

  const [masterRewardOutcomes, setMasterRewardOutcomes] = useState([]);
  const [selectedMasterRewardOutcomes, setSelectedMasterRewardOutcomes] = useState({ id: '', name: '' });
  const [subRewardOutcomes, setSubRewardOutcomes] = useState([]);
  const [subRewardOutcomesnew, setsubRewardOutcomesnew] = useState([]);


  const [selectedMasterOperator, setSelectedMasterOperator] = useState("");
  const [subOperators, setSubOperators] = useState([]);
  const [selectedSubOperator, setSelectedSubOperator] = useState("");

  const [error, setError] = useState("")
  const [parameter, setParameter] = useState('')
  const [previousValue, setPreviousValue] = useState('');

  //operator data static
  const masterOperators = [
    {
      id: "0",
      name: "Common Operatives",
      subOptions: [
        { id: "1", name: "greater_than", value: "greater_than" },
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
        { id: "1", name: "AND", value: "" },
        { id: "2", name: "OR", value: "" },
        { id: "3", name: "NOT", value: "" },
      ],
    },
    {
      id: "2",
      name: "Date/Time Operatives",
      subOptions: [
        { id: "1", name: "Before", value: "" },
        { id: "2", name: "After", value: "" },
        { id: "3", name: "Between", value: "" },
        { id: "4", name: "Within", value: "" },
      ],
    },
    {
      id: "3",
      name: "Tier Operatives",
      subOptions: [
        { id: "1", name: "Is in tier", value: "" },
        { id: "2", name: "Upgrade", value: "" },
        { id: "3", name: "Downgrade", value: "" },
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

    const selectedOption = e.target.selectedOptions[0]; // Get the selected <option> element
    const selectedName = selectedOption.getAttribute('data-name'); // Get the data-name attribute    setSelectedMasterRewardOutcomes(selectedName);
    setSelectedMasterRewardOutcomes({
      id: selectedId,
      name: selectedName,
    });

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
        condition_type: "",
        value: ''
      },
    ]);
  };



  // ------------------------------
  // const data = {
  //   rule_engine_rule: {
  //     name: ruleName, // Use ruleName directly from state
  //     description: "This is a description of the sample rule.",
  //     rule_engine_conditions_attributes: conditions.map((condition) => ({
  //       condition_attribute: condition.subAttribute,
  //       operator: condition.subOperator,
  //       compare_value: condition.value,
  //       condition_selected_model: Number(condition.masterAttribute),
  //       condition_type: condition.condition_type,
  //     })),
  //     rule_engine_actions_attributes: [
  //       {
  //         parameters: [Number(parameter)], // Assuming parameter is from state
  //         action_selected_model: Number(selectedMasterRewardOutcomes), // Use state variable directly
  //       },
  //     ],
  //   },
  // };


  const handleSubmit = async () => {
    // Validate required fields
    if (!ruleName || conditions.some(cond =>
      !cond.subAttribute ||
      !cond.subOperator ||
      !cond.value ||
      !cond.masterAttribute ||
      cond.value === previousValue // Check against previous value
    )) {
      // setError("All fields are required.");
      toast.error("All Mandatory field are required", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }



    // Check for duplicate condition values and ensure they are numbers
    const values = conditions.map(cond => cond.value);
    const uniqueValues = new Set();
    for (const value of values) {
      if (value.trim() === "") {
        setError(" Please enter value.");
        return;
      }
      uniqueValues.add(value);
    }

    if (isNaN(parameter) || parameter.trim() === "") {
      setError("Parameter value must be a valid number.");
      return;
    }

    if (uniqueValues.size !== values.length) {
      setError("Each condition value must be unique.");
      return;
    }

    // Update previousValue to the current value before proceeding
    const newValue = conditions.map(cond => cond.value);
    setPreviousValue(newValue); // Store the latest value(s) as the previous value]

    // const storedValue = sessionStorage.getItem("selectedId")

    const data = {
      rule_engine_rule: {
        name: ruleName, // Ensure ruleName is defined elsewhere in your code
        description: "This is a description of the sample rule.",
        loyalty_type_id: sessionStorage.getItem("selectedId"),//type id
        // Mapping conditions dynamically
        rule_engine_conditions_attributes: conditions.map((condition) => ({
          condition_attribute: condition.subAttribute || "", // Handle blank cases if needed
          operator: condition.subOperator || "",
          compare_value: condition.value || "",
          condition_selected_model: Number(condition.masterAttribute) || 1,
          condition_type: condition.condition_type || "",
        })),

        rule_engine_actions_attributes: [{
          lock_model_name: selectedMasterRewardOutcomes.name || "",
          parameters: [Number(parameter) || ""],
          rule_engine_available_function_id: subRewardOutcomesnew || "",
          action_selected_model: Number(selectedMasterRewardOutcomes.id) || "",
        }
        ]
      }
    }


    console.log("Request Payload:", JSON.stringify(data, null, 2)); // Log the JSON payload for debugging

    try {
      if (ruleName !== "" && parameter !== "" && selectedMasterRewardOutcomes !== "" && conditions !== null) {
        const response = await fetch(
          "https://staging.lockated.com/rule_engine/rules/loyalty_re?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
          {
            method: "POST", // Specify the request method
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
            },
            body: JSON.stringify(data), // Convert the data to JSON
          }
        );

        if (response.ok) {
          const responseData = await response.json(); // Parse the JSON response
          // alert("Rule Engine created successfully!");
          navigate("/rule-engine")
          console.log("Data created successfully:", responseData);
          // clearInputs(); // Clear form inputs if needed
        } else {
          const errorData = await response.json(); // Parse error response
          setError(`Failed to create Rule Engine: ${errorData.message}`);
          console.error("Submission error:", errorData);
        }
      }
    } catch (error) {
      setError("Failed to create Rule Engine. Please try again.");
      console.error("Submission error:", error);
    }
  };

  //cross button
  const removeCondition = (id) => {
    const updatedConditions = conditions.filter(condition => condition.id !== id);
    setConditions(updatedConditions);
  };



  const renderCondition = (condition, index) => (
    <div key={condition.id} className="SetRuleCard">
      <div>
        <h6 className="mt-3">
          <span>Condition {condition.id}
            <button
              onClick={() => removeCondition(condition.id)}
              className="ms-3"
              // title="Remove Condition"
              style={{ border: 'none', backgroundColor: 'white' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 1 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 1 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </span>
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
                onChange={(e) => {
                  const updatedConditions = conditions.map((cond, idx) =>
                    idx === index
                      ? { ...cond, condition_type: "AND" }
                      : cond
                  );
                  setConditions(updatedConditions);

                }}
                checked={condition.condition_type === "AND"}
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
                onChange={(e) => {
                  const updatedConditions = conditions.map((cond, idx) =>
                    idx === index
                      ? { ...cond, condition_type: "OR" }
                      : cond
                  );
                  setConditions(updatedConditions);

                }}
                checked={condition.condition_type === "OR"}
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
                className="p-1  mt-1 mb-1"

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
                required=""
                className="p-1  mt-1 mb-1"
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
                  <option key={subAttr.id} value={subAttr.attribute_name}>
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
                className="p-1 mt-1 mb-1"
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
                required=""
                className="p-1  mt-1 mb-1"
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
                  <option key={subOp.id} value={subOp.value}>
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
                className="p-1 mt-1 mb-1"
                placeholder="Enter Point Value"
                value={condition.value}
                onChange={(e) => {
                  const updatedConditions = conditions.map((cond, idx) =>
                    idx === index
                      ? { ...cond, value: e.target.value }
                      : cond
                  );
                  setConditions(updatedConditions);
                }}
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
                  className="mt-1 mb-1"
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
                    className="p-1 mt-1 mb-1"
                    onChange={handleMasterSubRewardOutcomeChange}
                    value={selectedMasterRewardOutcomes.id || ""} // Use the id directly from state
                  >
                    <option value="" disabled>Select Master Reward Outcome</option>
                    {masterRewardOutcomes.map((reward) => (
                      <option key={reward.id} value={reward.id} data-name={reward.lock_model_name}>
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
                    className="p-1 mt-1 mb-1"
                    disabled={!selectedMasterRewardOutcomes}
                    onChange={(e) => {
                      const selectedId = e.target.value; // Get the selected sub-reward outcome ID
                      console.log(selectedId)
                      // Handle the selection as needed, e.g., update the state or construct the data object
                      setsubRewardOutcomesnew(selectedId);
                    }}
                    value={subRewardOutcomesnew} // Ensure this reflects the selected sub-reward outcome
                  >
                    <option value="">Select Sub Reward Outcome</option>

                    {subRewardOutcomes.map((reward) => (
                      <option
                        key={reward.id}
                        // value={reward.rule_engine_available_model_id}
                        value={reward.id}
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
                  <input type="text" placeholder="Enter Point Value" value={parameter} onChange={(e) => setParameter(e.target.value)} className="mt-1 mb-1" />
                </fieldset>
              </div>
            </div>
          </div>

          {error && <div className="error" style={{ color: 'red' }}>{error}</div>}

          {/* ..... */}
          <div className="row mt-2 justify-content-center">
            <div className="col-md-2">
              <button className="purple-btn1 w-100" onClick={handleSubmit}>Submit</button>
            </div>
            <div className="col-md-2">
              <button className="purple-btn2 w-100">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateRuleEngine;