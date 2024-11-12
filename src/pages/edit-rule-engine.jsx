import React, { useEffect, useState } from "react";
import SubHeader from "../components/SubHeader";
import { useParams } from "react-router-dom";
import axios from "axios";


const EditRuleEngine = () => {
  const { id } = useParams(); // Get the member ID from the URL
  // const [ruleName, setRuleName] = useState("");


  const [rule, setRule] = useState({
    name: '',
    conditions: [],
    actions: [],
  })
  console.log(id)

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

  const [actions, setactions] = useState([
    {

      fetchMasterRewardOutcome: "",
      fetchSubRewardOutcome: "",
      parameters: ''
    },
  ]);

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

  const removeCondition = (id) => {
    const updatedConditions = conditions.filter(condition => condition.id !== id);
    setConditions(updatedConditions);
  };


  // const renderCondition = (condition, index) => (
  //   <div key={condition.id} className="SetRuleCard">
  //     <div>
  //       <h6 className="mt-3">
  //         <span>Condition {condition.id}

  //         <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="16"
  //                 height="16"
  //                 fill="currentColor"
  //                 className="bi bi-pencil-square mb-1 ms-3 text-body-secondary"
  //                 viewBox="0 0 16 16"
  //               >
  //                 <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
  //                 <path
  //                   fill-rule="evenodd"
  //                   d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
  //                 />
  //               </svg>

  //               <button 
  //           onClick={() => removeCondition(condition.id)} 
  //           className="ms-3"
  //           // title="Remove Condition"
  //           style={{border:'none',backgroundColor:'white'}}
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="16"
  //             height="16"
  //             fill="currentColor"
  //             className="bi bi-x"
  //             viewBox="0 0 16 16"
  //           >
  //             <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 1 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 1 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
  //           </svg>
  //         </button>
  //         </span>
  //       </h6>
  //     </div>
  //     {index > 0 && ( // Only render the AND/OR section if this is not the first condition
  //       <ul className="nav nav-tabs border-0 mt-3">
  //         <div className="d-flex gap-3 And-btn rounded">
  //           <li className="nav-item d-flex p-2 gap-2" role="presentation">
  //             <input
  //               type="radio"
  //               className="nav-link"
  //               id={`home-tab-${index}`}
  //               name={`tab-${index}`}
  //               data-bs-toggle="tab"
  //               data-bs-target={`#home-tab-pane-${index}`}
  //               role="tab"
  //               aria-controls={`home-tab-pane-${index}`}
  //               aria-selected="true"
  //               defaultChecked

  //             />
  //             <label htmlFor={`home-tab-${index}`} className="and-or-btn">
  //               AND
  //             </label>
  //           </li>
  //           <li className="nav-item d-flex p-2 gap-2" role="presentation">
  //             <input
  //               type="radio"
  //               className="nav-link"
  //               id={`profile-tab-${index}`}
  //               name={`tab-${index}`}
  //               data-bs-toggle="tab"
  //               data-bs-target={`#profile-tab-pane-${index}`}
  //               role="tab"
  //               aria-controls={`profile-tab-pane-${index}`}
  //               aria-selected="false"

  //             />
  //             <label htmlFor={`profile-tab-${index}`} className="and-or-btn">
  //               OR
  //             </label>
  //           </li>
  //         </div>
  //       </ul>
  //     )}

  //     <div className="border-btm pb-2 mt-2">
  //       {/* ......if ..... */}
  //       <div>
  //         <h4>
  //           <span className="badge setRuleCard" style={{fontSize:'16px',fontWeight:'600',color:'#E95420',backgroundColor:'#E954202E'}}>IF</span>
  //         </h4>
  //         <div className="row ms-1 mt-2">
  //           {/* Attribute section */}
  //           <fieldset className="border col-md-3 m-2 col-sm-11">
  //             <legend className="float-none"  style={{fontSize:'14px',fontWeight:'400'}}>
  //               Master Attribute<span>*</span>
  //             </legend>
  //             <select
  //               required=""
  //               className="p-1 mt-1 mb-1"
  //               style={{fontSize:'12px',fontWeight:'400'}}

  //             >
  //                {conditions.map((master)=>(
  //                     <option value="">{master.model_name}</option>

  //                   ))}
  //               {/* <option value="">Select Master Attribute </option> */}

  //               {/* <option value=""></option> */}
  //             </select>
  //           </fieldset>
  //           <div className="col-md-1 d-flex justify-content-center align-items-center">
  //             <h4>&</h4>
  //           </div>
  //           <fieldset className="border col-md-3 m-2 col-sm-11">
  //             <legend className="float-none"  style={{fontSize:'14px',fontWeight:'400'}}>
  //               Sub Attribute<span>*</span>
  //             </legend>
  //             <select
  //               required=""
  //               className="p-1 mt-1 mb-1"
  //               style={{fontSize:'12px',fontWeight:'400'}}
  //             >
  //               {conditions.map((master)=>(
  //                     <option value="">{master.condition_attribute}</option>

  //                   ))}
  //               {/* <option value="">Select Sub Attribute</option> */}

  //             </select>
  //           </fieldset>
  //         </div>
  //       </div>

  //       {/* Operator section */}
  //       <div className="mt-3">
  //         <h4>
  //           <span className="badge setRuleCard" style={{fontSize:'16px',fontWeight:'600',color:'#E95420',backgroundColor:'#E954202E'}}>Operator</span>
  //         </h4>
  //         <div className="row ms-1 mt-2">
  //           <fieldset className="border col-md-3 m-2 col-sm-11">
  //             <legend className="float-none"  style={{fontSize:'14px',fontWeight:'400'}}>
  //               Master Operator<span>*</span>
  //             </legend>
  //             <select
  //               required=""
  //               className="p-1 mt-1 mb-1"
  //               style={{fontSize:'12px',fontWeight:'400'}}
  //             >
  //               <option value="">Select Master Operator </option>
  //               {/* {conditions.map((condition) => (
  //                 <option key={condition.id} value=""> {condition.masterOperator}</option>
  //               ))} */}

  //             </select>
  //           </fieldset>
  //           <div className="col-md-1 d-flex justify-content-center align-items-center">
  //             <h4>&</h4>
  //           </div>
  //           <fieldset className="border col-md-3 m-2 col-sm-11">
  //             <legend className="float-none"  style={{fontSize:'14px',fontWeight:'400'}}>
  //               Sub Operator<span>*</span>
  //             </legend>
  //             <select
  //               required=""
  //               className="p-1 mt-1 mb-1"
  //               style={{fontSize:'12px',fontWeight:'400'}}
  //             >
  //               {conditions.map((master)=>(
  //                     <option value="" >{master.operator}</option>


  //                   ))}
  //               {/* <option value="">Select Sub Operator </option> */}
  //               {/* {conditions.map((condition) => (
  //                 <option key={condition.id} value=""> {condition.subOperator}</option>
  //               ))} */}

  //             </select>
  //           </fieldset>
  //         </div>
  //       </div>

  //       {/* Value section */}
  //       <div className="mt-3">
  //         <h4>
  //           <span className="badge setRuleCard" style={{fontSize:'16px',fontWeight:'600',color:'#E95420',backgroundColor:'#E954202E'}}>Value</span>
  //         </h4>
  //         <div className="row ms-1 mt-2">
  //           <fieldset className="border col-md-3 m-2 col-sm-11">
  //             <legend className="float-none"  style={{fontSize:'14px',fontWeight:'400'}} >
  //               Value<span>*</span>
  //             </legend>
  //             {conditions.map((master)=>(
  //                     <input
  //                     type="text"
  //                     className="p-1 mt-1 mb-1"
  //                     // placeholder="Enter Point Value"
  //                      value={master.compare_value}
  //                      style={{fontSize:'12px',fontWeight:'400'}}
  //                   />
  //                   ))}

  //           </fieldset>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );


  const renderCondition = (condition, index) => (
    <div key={condition.id} className="SetRuleCard">
      <div>
        <h6 className="mt-3">
          <span>
            Condition {condition.id}
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
            <button
              onClick={() => removeCondition(condition.id)}
              className="ms-3"
              style={{ border: "none", backgroundColor: "white" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 1 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 1 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </span>
        </h6>
      </div>

      {index > 0 && (
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
        {/* If section */}
        <div>
          <h4>
            <span
              className="badge setRuleCard"
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#E95420",
                backgroundColor: "#E954202E",
              }}
            >
              IF
            </span>
          </h4>
          <div className="row ms-1 mt-2">
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend
                className="float-none"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Master Attribute<span>*</span>
              </legend>
              <select
                required=""
                className="p-1 mt-1 mb-1"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                <option value="">{condition.model_name}</option>
              </select>
            </fieldset>
            <div className="col-md-1 d-flex justify-content-center align-items-center">
              <h4>&</h4>
            </div>
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend
                className="float-none"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Sub Attribute<span>*</span>
              </legend>
              <select
                required=""
                className="p-1 mt-1 mb-1"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                <option value="">{condition.condition_attribute}</option>
              </select>
            </fieldset>
          </div>
        </div>


        {/* Operator Section */}
        <div className="mt-3">
          <h4>
            <span
              className="badge setRuleCard"
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#E95420",
                backgroundColor: "#E954202E",
              }}
            >
              Operator
            </span>
          </h4>
          <div className="row ms-1 mt-2">
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend
                className="float-none"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Master Operator<span>*</span>
              </legend>
              <select
                required=""
                className="p-1 mt-1 mb-1"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                <option value="">{condition.master_operator}</option>
              </select>
            </fieldset>
            <div className="col-md-1 d-flex justify-content-center align-items-center">
              <h4>&</h4>
            </div>
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend
                className="float-none"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Sub Operator<span>*</span>
              </legend>
              <select
                required=""
                className="p-1 mt-1 mb-1"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                <option value="">{condition.operator}</option>
              </select>
            </fieldset>
          </div>
        </div>


        {/* Value section */}
        <div className="mt-3">
          <h4>
            <span
              className="badge setRuleCard"
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#E95420",
                backgroundColor: "#E954202E",
              }}
            >
              Value
            </span>
          </h4>
          <div className="row ms-1 mt-2">
            <fieldset className="border col-md-3 m-2 col-sm-11">
              <legend
                className="float-none"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Value<span>*</span>
              </legend>
              <input
                type="text"
                className="p-1 mt-1 mb-1"
                value={condition.compare_value}
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  // height: "40px", // Set consistent height for the value box
                }}
                readOnly
              />
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );


  // const storedValue = sessionStorage.getItem("selectedId");
  const getRuleEngine = async (id) => {
    // console.log("Stored ID in session after selection:", storedValue, id);
    const storedValue = sessionStorage.getItem("selectedId");
    try {
      const response = await axios.get(
        `https://staging.lockated.com/rule_engine/rules/${id}.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&&q[loyalty_type_id_eq]=${storedValue}`
      );
      console.log("data for id", response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching Rule Engine:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchRule = async () => {
      try {
        const data = await getRuleEngine(id);
        console.log(data)
        setRule(data);
        if (data.conditions) {
          console.log(data.conditions)
          setConditions(data.conditions);
        }
        if (data.actions) {
          console.log(data.actions)
          setactions(data.actions)
        }
      } catch (err) {
        // setError(err.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchRule();
  }, [id]);


  return (
    <>
      <div className="w-100">
        <SubHeader />
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Rule Engine</span> &gt; New Rule
          </p>
          <h5 class="mb-3">
            <span className="title" style={{ fontSize: '20px', fontWeight: '600' }}>New Rule</span>
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
                <legend className="float-none" style={{ fontSize: '14px', fontWeight: '400' }}>
                  New Rule<span>*</span>
                </legend>
                <input type="text" placeholder="Enter Name" name={rule?.name} value={rule.name} style={{ fontSize: '12px', fontWeight: '400' }} className="mt-1 mb-1" />
              </fieldset>
            </div>
          </div>
          <div className="SetRuleCard">
            <div>
              <h5 className="title mt-3">Set Rule Conditions</h5>

            </div>

          </div>



          <div className="main-rule">
            {conditions.map(renderCondition)}

            <button
              className="setRuleCard2 mt-2"
              onClick={addCondition}
              style={{ color: "black", fontSize: '16px', fontWeight: "500" }}

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
                <span className="badge setRuleCard" style={{ fontSize: '16px', fontWeight: '600', color: '#E95420', backgroundColor: '#E954202E' }}>THEN</span>
              </h4>
              <div className="row ms-1 mt-2">
                <fieldset className="border  col-md-3 m-2 col-sm-11">
                  <legend className="float-none" style={{ fontSize: '14px', fontWeight: '400' }}>
                    Master Reward Outcome<span>*</span>
                  </legend>

                  <select
                    required=""
                    className="p-1 mt-1 mb-1"
                    style={{ fontSize: '12px', fontWeight: '400' }}
                  >
                    {actions.map((master) => (
                      <option value="" >{master.lock_model_name}</option>

                    ))}
                    {/* // <option value="">Select Master Reward Outcome</option> */}
                    {/* // <option value=""></option> */}
                  </select>

                </fieldset>
                <div className="col-md-1 d-flex justify-content-center align-items-center">
                  <h4>&</h4>
                </div>
                <fieldset className="border  col-md-3 m-2 col-sm-11">
                  <legend className="float-none" style={{ fontSize: '14px', fontWeight: '400' }}>
                    Sub Reward Outcome<span>*</span>
                  </legend>
                  <select
                    required=""
                    className="p-1 mt-1 mb-1"
                    style={{ fontSize: '12px', fontWeight: '400' }}
                  >
                    {actions.map((master) => (
                      <option value="" >{master.action_method}</option>

                    ))}
                    {/* <option value="">Select Sub Reward Outcome</option>

                    <option value=""></option> */}
                  </select>
                </fieldset>
                {/* <div className="col-md-1 d-flex justify-content-center align-items-center">
                    <h4>=</h4>
                  </div> */}
                <fieldset className="border col-md-3 m-2 col-sm-11 ">
                  <legend className="float-none" style={{ fontSize: '14px', fontWeight: '400' }}>
                    Parameter {/* <span>*</span> */}
                  </legend>
                  {actions.map((master) => (
                    <input type="text" placeholder="Enter Point Value" value={master.parameters} style={{ fontSize: '12px', fontWeight: '400' }} className="mt-1 mb-1" />

                  ))}
                  {/* <input type="text" placeholder="Enter Point Value" value={} /> */}
                </fieldset>
              </div>
            </div>
          </div>

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
    </>
  );
};

export default EditRuleEngine;

