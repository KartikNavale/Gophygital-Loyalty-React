
// import React, { useState } from "react";
// import "../styles/style.css";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer";
// import SubHeader from "../components/SubHeader";
// import axios from "axios"; 
// // Import axios for making API calls
// import { useNavigate } from "react-router-dom";



// const NewSegment = () => {
  
//   const [name, setName] = useState(""); // Updated: Replaced segmentName
//   const [segment_tag, setSegmentTag] = useState("");

//   const [segment_type, setSegmentType] = useState("");

//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const navigate = useNavigate(); // For navigation after success

//   const [segment_members, setSelectedMemberIds] = useState([]);

//   const handleSubmit = async (values) => {
//     values.preventDefault();

//     // if (!name || !segment_tag || !segment_type) {
//     //   setError("All fields are required.");
//     //   return;
//     // }

//     if (
//       !name ||
//       !segment_tag ||
//       !segment_type ||
//       segment_members.length === 0 // Ensure at least one member is selected
//     ) {
//       setError(
//         "All fields are required, and at least one member must be selected."
//       );
//       return;
//     }

//     const data1 = {
//       name, // Updated key name
//       segment_tag,

//       segment_type,
//       // Updated key name
//     };
//     console.log(data1);

//     console.log(data1.name);
//     const data = {
//       loyalty_segment: {
//         name: data1.name,
//         segment_tag: data1.segment_tag,
//         // segment_filters: data1.segment_filters,
//         segment_type: data1.segment_type,
//         // loyalty_tier_id: Number(data1.loyalty_tier_id),
//         loyalty_members: { member_ids: segment_members  },
//         loyalty_tier_id:storedValue
//       },
//     };
//     console.log(data);

//     try {
//       const response = await axios.post(
//         "https://staging.lockated.com/loyalty/segments.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",

//         data
//       );
//       console.log("data posted");
//       if (response.statusText === "Created") {
//         setSuccessMessage("Segment created successfully!");
//         alert("Segment created successfully!");

//         clearForm();

//         console.log(data, "Navigating to /Segment");
//         navigate("/Segment");

//         console.log(response, data);
//       }
//     } catch (error) {
//       setError("Failed to create segment. Please try again.");
//     }
//   };

//   const clearForm = () => {
//     setName(""); // Updated: Clear name field
//     setSegmentTag("");
//     // setSegmentFilters("");
//     setSegmentType("");
//     // setLoyaltyTierId(""); // Updated: Clear loyalty_tier_id field
//     setError("");
//     setSuccessMessage("");
//     setSelectedMemberIds([]);
//   };



//   const [formValues, setFormValues] = useState({
//     enrollmentDate: "",
//     status: "",
//     age: "",
//     gender: "",
//     activatedDate: "",
//     tierLevel: "",
//   });

//   const [filteredData, setFilteredData] = useState([]); // State to store filtered data

//   // Handle input change in filter fields
//   const handleChange = (e) => {
//     setFormValues({
//       ...formValues,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle applying the filter and fetching data
//   const handleFilter = async (e) => {
//     e.preventDefault();

//     // Create query params dynamically based on the formValues
//     let query = [];

//     // Add conditions only if values are provided
//     if (formValues.enrollmentDate) {
//       query.push(`q[joining_date_gteq]=${formValues.enrollmentDate}`);
//     }
//     if (formValues.activatedDate) {
//       query.push(`q[created_at_lteq]=${formValues.activatedDate}`);
//     }
//     if (formValues.status) {
//       query.push(
//         `q[active_eq]=${formValues.status === "Active" ? "true" : "false"}`
//       );
//     }
//     if (formValues.gender) {
//       query.push(`q[gender_eq]=${formValues.gender}`);
//     }
//     if (formValues.tierLevel) {
//       query.push(`q[loyalty_tier_name_eq]=${formValues.tierLevel}`);
//     }

//     // Construct full query string
//     const queryString = query.length > 0 ? `?${query.join("&")}` : "";

//     try {
//       // Call API with query string
//       const response = await axios.get(
//         `https://staging.lockated.com/loyalty/members.json?q[joining_date_gteq]=&q[created_at_lteq]=&q[loyalty_tier_name_eq]=&q[birth_date_lteq]=&q[gender_eq]=&q[active_eq]=&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
//       );
//       setFilteredData(response.data); // Set the fetched data
//       setSelectedMemberIds(response.data.map((member) => member.id));
//     } catch (error) {
//       console.error("Error fetching filtered data", error);
//     }
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedMemberIds((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((memberId) => memberId !== id)
//         : [...prevSelected, id]
//     );
//   };


//   return (
//     <>
//       <div className="w-100">
//         <SubHeader />
//         <div className="module-data-section mt-2">
//           <p className="pointer">
//             <span className="text-secondary">Segment</span> &gt; New Segment
//           </p>
//           <h5 className="mb-3 title">New Segment</h5>
//           <div className="go-shadow me-3 pb-4">
//             <div className="row ms-1 mt-4">
//               <fieldset className="border col-md-3 m-2 col-sm-11">
//                 <legend className="float-none">
//                   Segment Name<span>*</span>
//                 </legend>
//                 <input
//                   type="text"
//                   placeholder="Enter Segment Name"
//                   required=""
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}

//                 />
//               </fieldset>

//               <fieldset className="border col-md-3 m-2 col-sm-11">
//                   <legend className="float-none">
//                     Segment tag<span>*</span>
//                   </legend>
//                   <select
//                     required=""
//                     value={segment_tag}
//                     onChange={(e) => setSegmentTag(e.target.value)}
//                   >
//                     <option value="" disabled selected hidden>
//                       Select Segment tag
//                     </option>

//                     <option value="Recently joined">Recently joined</option>
//                     <option value="Suspended">Suspended</option>
//                     <option value="1-purchase">1-purchase</option>
//                     <option value="No purchase">No purchase</option>
//                   </select>
//                 </fieldset>

//                 <fieldset className="border col-md-3 m-2 col-sm-11">
//                   <legend className="float-none">
//                     Segment type<span>*</span>
//                   </legend>
//                   <select
//                     required=""
//                     value={segment_type}
//                     onChange={(e) => setSegmentType(e.target.value)}
//                   >
//                     <option value="" disabled selected hidden>
//                       Select segment type
//                     </option>
//                     <option value="Point based">Point based</option>
//                     <option value="Discount based">Discount based</option>
//                     <option value="Referral Campaign">Referral Campaign</option>
//                     <option value="Tier - Up Campaign">
//                       Tier - Up Campaign
//                     </option>
//                     <option value="Custom Campaign">Custom Campaign</option>
//                   </select>
//                 </fieldset>


//               {/* Filter Element */}
//               <div className="filter-container mt-4">
//                 <h6 className="filter-label">Filter</h6>
//                 <div className="filter-fields d-flex flex-wrap border p-3">
//                   <div className="filter-field m-2">
//                     <label htmlFor="enrollmentDate">Enrollment Date</label>
//                     <input
//                       type="date"
//                       id="enrollmentDate"
//                       name="enrollmentDate"
//                       className="form-control"
//                       value={formValues.enrollmentDate}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="filter-field m-2">
//                     <label htmlFor="status">Status</label>
//                     <select
//                       id="status"
//                       name="status"
//                       className="form-control"
//                       value={formValues.status}
//                       onChange={handleChange}
//                     >
//                       <option value="" disabled hidden>
//                         Select status
//                       </option>
//                       <option value="Active">Active</option>
//                       <option value="Inactive">Inactive</option>
//                     </select>
//                   </div>

//                   <div className="filter-field m-2">
//                     <label htmlFor="gender">Gender</label>
//                     <select
//                       id="gender"
//                       name="gender"
//                       className="form-control"
//                       value={formValues.gender}
//                       onChange={handleChange}
//                     >
//                       <option value="" disabled hidden>
//                         Select gender
//                       </option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div className="filter-field m-2">
//                     <label htmlFor="activatedDate">Activated Date</label>
//                     <input
//                       type="date"
//                       id="activatedDate"
//                       name="activatedDate"
//                       className="form-control"
//                       value={formValues.activatedDate}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="filter-field m-2">
//                     <label htmlFor="tierLevel">Tier Level</label>
//                     <select
//                       id="tierLevel"
//                       name="tierLevel"
//                       className="form-control"
//                       value={formValues.tierLevel}
//                       onChange={handleChange}
//                     >
//                       <option value="" disabled hidden>
//                         Select Tier Level
//                       </option>
//                       <option value="Bronze">Bronze</option>
//                       <option value="Silver">Silver</option>
//                       <option value="Gold">Gold</option>
//                     </select>
//                   </div>
//                   {/* Apply Filter Button */}

//                   <div className=" d-flex align-items-center mt-4 ml-5">
//                     <button
//                       type="button"
//                       className="btn btn-outline-primary form-control ml-5"
//                       onClick={handleFilter}
//                       // style={{
//                       //   minWidth: "100px", // Same width as select fields
//                       //   height: "38px", // Same height as input/select fields
//                       // }}
//                     >
//                       Apply Filter
//                     </button>
//                   </div>
//                 </div>

//                 {/* Submit and Cancel Buttons */}
                
//               {/* End Filter Element */}
//             </div>
//           </div>

//           {/* Display Filtered Data */}
//           <div className="filtered-data-section mt-4">
//               <h5>Filtered Data:</h5>
//               {filteredData.length > 0 ? (
//                 <div className="tbl-container mx-3 mt-4">
//                   <table className="w-100 ">
//                     <thead>
//                       <tr>
//                         <th>Select</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Address</th>
//                         <th>Gender</th>
//                         <th>Status</th>
//                         <th>Loyalty Points</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredData.map((member) => (
//                         <tr key={member.id}>
//                           <td>
//                             <input
//                               type="checkbox"
//                               checked={segment_members.includes(member.id)}
//                               onChange={() => handleCheckboxChange(member.id)}
//                             />
//                           </td>

//                           <td>
//                             {member.firstname} {member.lastname}
//                           </td>
//                           <td>{member.email}</td>
//                           <td>
//                             {member.address.address1}, {member.address.address2}
//                           </td>
//                           <td>{member.gender || "N/A"}</td>
//                           <td>
//                             {member.active !== null
//                               ? member.active
//                                 ? "Active"
//                                 : "Inactive"
//                               : "N/A"}
//                           </td>
//                           <td>{member.current_loyalty_points || "N/A"}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <p className="text-secondary mx-4">
//                   No data found. Please adjust the filters and try again.
//                 </p>
//               )}
//             </div>
//             <div className="row mt-2 justify-content-center">
//               <div className="col-md-2">
//                 <button className="purple-btn1 w-100" onClick={handleSubmit}>
//                   Submit
//                 </button>
//               </div>
//               <div className="col-md-2">
//                 <button className="purple-btn2 w-100" onClick={clearForm}>
//                   Cancel
//                 </button>
//               </div>
//             </div>
//             {error && <div className="text-danger mt-2">{error}</div>}{" "}
//             {successMessage && (
//               <div className="text-success mt-2">{successMessage}</div>
//             )}
//           </div>
//         </div>
//       </div>

//     </>
//   );
// };

// export default NewSegment;
import React, { useState,useEffect } from "react";
import "../styles/style.css";

import SubHeader from "../components/SubHeader";
import axios from "axios";
// Import axios for making API calls
import { useNavigate } from "react-router-dom";

const NewSegment = () => {
  const [name, setName] = useState(""); // Updated: Replaced segmentName
  const [segment_tag, setSegmentTag] = useState("");

  const [segment_type, setSegmentType] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // For navigation after success
  const storedValue = sessionStorage.getItem("selectedId");
  console.log("Stored ID in session after selection:", storedValue); 


  const [segment_members, setSelectedMemberIds] = useState([]);

  const[tierLevels,setTierLevels]=useState([]);
  const [initialData, setInitialData] = useState([]);


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const tierResponse = await axios.get(
          "https://staging.lockated.com/loyalty/tiers.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        );
        setTierLevels(tierResponse.data);

        const memberResponse = await axios.get(
          "https://staging.lockated.com/loyalty/members.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        );
        setInitialData(memberResponse.data);
        setFilteredData(memberResponse.data);
          // Set initial data as default filtered data
          setSelectedMemberIds(memberResponse.data.map((member) => member.id));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchTierLevels = async () => {
      try {
        const response = await axios.get(
          "https://staging.lockated.com/loyalty/tiers.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        );
        setTierLevels(response.data);
         // Store API data in state
         console.log(response.data)
      } catch (error) {
        console.error("Error fetching tier levels:", error);
      }
    };

    fetchTierLevels();
  }, []);

  const handleSubmit = async (values) => {
    values.preventDefault();

    // if (!name || !segment_tag || !segment_type) {
    //   setError("All fields are required.");
    //   return;
    // }

    if (
      !name ||
      !segment_tag ||
      !segment_type ||
      segment_members.length === 0 // Ensure at least one member is selected
    ) {
      setError(
        "All fields are required, and at least one member must be selected."
      );
      return;
    }

    const data1 = {
      name, // Updated key name
      segment_tag,

      segment_type,

      loyalty_type_id:storedValue

      // Updated key name
    };
    console.log(data1);

    console.log(data1.name);
    const data = {
      loyalty_segment: {
        name: data1.name,
        segment_tag: data1.segment_tag,
        // segment_filters: data1.segment_filters,
        segment_type: data1.segment_type,
        // loyalty_tier_id: Number(data1.loyalty_tier_id)

        loyalty_type_id:storedValue,

        loyalty_members: { member_ids: segment_members },
      },
    };
    console.log(data);

    try {
      const response = await axios.post(
        "https://staging.lockated.com/loyalty/segments.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",

        data
      );
      console.log("data posted");
      if (response.statusText === "Created") {
        setSuccessMessage("Segment created successfully!");
        alert("Segment created successfully!");

        clearForm();

        console.log(data, "Navigating to /Segment");
        navigate("/Segment");

        console.log(response, data);
      }
    } catch (error) {
      setError("Failed to create segment. Please try again.");
    }
  };

  const clearForm = () => {
    setName(""); // Updated: Clear name field
    setSegmentTag("");
    // setSegmentFilters("");
    setSegmentType("");
    // setLoyaltyTierId(""); // Updated: Clear loyalty_tier_id field
    setError("");
    setSuccessMessage("");
    setSelectedMemberIds([]);
  };

  const [formValues, setFormValues] = useState({
    enrollmentDate: "",
    status: "",
    age: "",

    activatedDate: "",
    gender: "",
    tierLevel: "",
  });

  const [filteredData, setFilteredData] = useState([]); // State to store filtered data

  // Handle input change in filter fields
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatToCustomISO = (date) => {
    const d = new Date(date);

    // Format date parts to match desired format
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    const milliseconds = String(d.getMilliseconds()).padStart(3, "0");

    // Use the timezone offset expected by the API
    const timezoneOffset = "+05:30";
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffset}`;
  };

  // Handle applying the filter and fetching data
  const handleFilter = async (e) => {
    e.preventDefault();

    const isAnyFilterFilled = Object.values(formValues).some((value) => value);

    if (!isAnyFilterFilled) {
      setError("Please fill at least one filter field before applying.");
      return;
    }
  
    // Reset error if filter fields are filled
    setError("");

    // Create query params dynamically based on the formValues
    let query = [];

    // Add conditions only if values are provided
    if (formValues.enrollmentDate) {
      query.push(
        `q[joining_date_gteq]=${formatDate(formValues.enrollmentDate)}`
      );
    }
    if (formValues.activatedDate) {
      const activatedDateFormatted = formatToCustomISO(
        formValues.activatedDate
      );
      query.push(`q[created_at_lteq]=${activatedDateFormatted}`);
      console.log(
        `Formatted Activated Date for API: ${activatedDateFormatted}`
      ); // Log formatted date
    }

    if (formValues.status) {
      query.push(
        `q[active_eq]=${formValues.status === "Active" ? "true" : "false"}`
      );
    }
    if (formValues.gender) {
      query.push(`q[user_gender_eq]=${formValues.gender}`);
    }
    if (formValues.tierLevel) {
      query.push(`q[loyalty_tier_name_eq]=${formValues.tierLevel}`);
    }

    // Construct full query string
    const queryString = query.length > 0 ? `?${query.join("&")}` : "";

    try {
      // Call API with query string
      const response = await axios.get(
        `https://staging.lockated.com/loyalty/members.json${queryString}&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
      );

      setFilteredData(response.data); // Set the fetched data
      setSelectedMemberIds(response.data.map((member) => member.id));
    } catch (error) {
      console.error("Error fetching filtered data", error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedMemberIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((memberId) => memberId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <>
      <div className="w-100">
        <SubHeader />
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Segment</span> &gt; New Segment
          </p>
          <h5 className="mb-3 title">New Segment</h5>
          <div className="go-shadow me-3 pb-4">
            <div className="row ms-1 mt-4">
              <fieldset className="border col-md-3 m-2 col-sm-11">
                <legend className="float-none">
                  Segment Name<span>*</span>
                </legend>
                <input               
                  type="text"
                  placeholder="Enter Segment Name"
                  required="" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </fieldset>

              <fieldset className="border col-md-3 m-2 col-sm-11">
                <legend className="float-none">
                  Segment tag<span>*</span>
                </legend>
                <select
                  required=""
                  value={segment_tag}
                  onChange={(e) => setSegmentTag(e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Select Segment tag
                  </option>

                  <option value="Recently joined">Recently joined</option>
                  <option value="Suspended">Suspended</option>
                  <option value="1-purchase">1-purchase</option>
                  <option value="No purchase">No purchase</option>
                </select>
              </fieldset>

              <fieldset className="border col-md-3 m-2 col-sm-11">
                <legend className="float-none">
                  Segment type<span>*</span>
                </legend>
                <select
                  required=""
                  value={segment_type}
                  onChange={(e) => setSegmentType(e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Select segment type
                  </option>
                  <option value="Point based">Point based</option>
                  <option value="Discount based">Discount based</option>
                  <option value="Referral Campaign">Referral Campaign</option>
                  <option value="Tier - Up Campaign">Tier - Up Campaign</option>
                  <option value="Custom Campaign">Custom Campaign</option>
                </select>
              </fieldset>

              {/* Filter Element */}
              <div className="filter-container mt-4">
                <h6 className="filter-label">Filter</h6>
                <div className="filter-fields d-flex flex-wrap border p-3">
                  <div className="filter-field m-2">
                    <label htmlFor="enrollmentDate">Enrollment Date</label>
                    <input
                      type="date"
                      id="enrollmentDate"
                      name="enrollmentDate"
                      className="form-control"
                      value={formValues.enrollmentDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="filter-field m-2">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      className="form-control"
                      value={formValues.status}
                      onChange={handleChange}
                    >
                      <option value="" disabled hidden>
                        Select status
                      </option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="filter-field m-2">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"  
                      name="gender" 
                      className="form-control"
                      value={formValues.gender}
                      onChange={handleChange}
                    >
                      <option value="" disabled hidden>
                        Select gender
                      </option>
                      <option value="m">Male</option>
                      <option value="f">Female</option>
                    </select>
                  </div>

                  <div className="filter-field m-2">
                    <label htmlFor="activatedDate">Activated Date</label>
                    <input
                      type="date"
                      id="activatedDate"
                      name="activatedDate"
                      className="form-control"
                      value={formValues.activatedDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="filter-field m-2">
                    <label htmlFor="tierLevel">Tier Level</label>
                    <select
                      id="tierLevel"
                      name="tierLevel"
                      className="form-control"
                      value={formValues.tierLevel}
                      onChange={handleChange}
                    >
                      <option value="" disabled hidden>
                        Select Tier Level
                      </option>
                      {
                        tierLevels?.map((tier, index) => (
                          <option key={tier.name} value={tier.name}>{tier.display_name}</option>
                          
                        ))
                      }
                     
                    </select>
                  </div>
                  {/* Apply Filter Button */}

                  <div className=" d-flex align-items-center mt-4 ml-5">
                    <button
                      type="button"
                      className=" btn btn-success form-control ml-5"
                      onClick={handleFilter}
                      // style={{
                      //   minWidth: "100px", // Same width as select fields
                      //   height: "38px", // Same height as input/select fields
                      // }}
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>

                {/* Submit and Cancel Buttons */}

                {/* End Filter Element */}
              </div>
            </div>
            {/* Display Filtered Data */}
             <div className="filtered-data-section mt-4">
              <h5>Filtered Data:</h5>
              {filteredData.length > 0 ? (
                <div className="tbl-container mx-3 mt-4">
                  <table className="w-100 ">
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Loyalty Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((member) => (
                        <tr key={member.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={segment_members.includes(member.id)}
                              onChange={() => handleCheckboxChange(member.id)}
                            />
                          </td>

                          <td>
                            {member.firstname} {member.lastname}
                          </td>
                          <td>{member.email}</td>
                          <td>
                            {member.address.address1}, {member.address.address2}
                          </td>
                          <td>{member.gender || "N/A"}</td>
                          <td>
                            {member.active !== null
                              ? member.active
                                ? "Active"
                                : "Inactive"
                              : "N/A"}
                          </td>
                          <td>{member.current_loyalty_points || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-secondary mx-4">
                  No data found. Please adjust the filters and try again.
                </p>
              )}
            </div>
            <div className="row mt-2 justify-content-center">
              <div className="col-md-2">
                <button className="purple-btn1 w-100" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
              <div className="col-md-2">
                <button className="purple-btn2 w-100" onClick={clearForm}>
                  Cancel
                </button>
              </div>
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}{" "}
            {successMessage && (
              <div className="text-success mt-2">{successMessage}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSegment;
