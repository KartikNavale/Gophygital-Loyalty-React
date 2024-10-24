// import React from "react";
// import "../styles/style.css";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer";
// import { Link } from "react-router-dom";
// import SubHeader from "../components/SubHeader";
// import { useState } from "react";

// const NewSegment = () => {

//   const [formValues, setFormValues] = useState({
//     enrollmentDate: "",
//     status: "",
//     age: "",
//     gender: "",
//     activatedDate: ""
//   });

//   const [filteredData, setFilteredData] = useState([]);

//   const handleChange = (e) => {
//     setFormValues({
//       ...formValues,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleFilter = async () => {
//     try {
//       const response = await axios.get("https://your-api-url/filter", {
//         params: formValues // Pass form values as query parameters
//       });
//       setFilteredData(response.data); // Set the filtered data
//     } catch (error) {
//       console.error("Error fetching filtered data", error);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="website-content d-flex">
//         <Sidebar />
//         <div className="w-100">
//           <SubHeader />
//           <div className="module-data-section mt-2">
//             <p className="pointer">
//               <span className="text-secondary">Segment</span> &gt; New Segment
//             </p>
//             <h5 class="mb-3 title">New Segment</h5>
//             <div className="go-shadow me-3 pb-4">
//               <div className="row ms-1 mt-4">
//                 <fieldset className="border  col-md-3 m-2 col-sm-11">
//                   <legend className="float-none">
//                     Segment Name<span>*</span>
//                   </legend>
//                   <select required="">
//                     <option value="" disabled="" selected="" hidden="">
//                       Enter segment name
//                     </option>
//                     <option value="0">Building1</option>
//                     <option value="1">Building2</option>
//                   </select>
//                 </fieldset>

//                 <fieldset className="border   col-md-3 m-2 col-sm-11">
//                   <legend className="float-none">
//                     Segment tag<span>*</span>
//                   </legend>
//                   <select required="">
//                     <option value="" disabled="" selected="" hidden="">
//                       select Segment tag
//                     </option>
//                     <option value="0">Recently joined</option>
//                     <option value="1">Suspended </option>
//                     <option value="1">1-purchase</option>
//                     <option value="1">No purchase</option>
//                   </select>
//                 </fieldset>
//                 <fieldset className="border   col-md-3 m-2 col-sm-11">
//                   <legend className="float-none">
//                     Segment type<span>*</span>
//                   </legend>
//                   <select required="">
//                     <option value="" disabled="" selected="" hidden="">
//                       select segment type
//                     </option>
//                     <option value="0">Point based</option>
//                     <option value="1">Discount based </option>
//                     <option value="1">Referral Campaign</option>
//                     <option value="1">Tier - Up Campaign</option>
//                     <option value="1">Custom Campaign</option>
//                   </select>
//                 </fieldset>

//                 <fieldset className="border   col-md-3 m-2 col-sm-11">
//                   <legend className="float-none">
//                     Tier level<span>*</span>
//                   </legend>
//                   <select required="">
//                     <option value="" disabled="" selected="" hidden="">
//                       Tier level
//                     </option>
//                     <option value="0">Bronze</option>
//                     <option value="1">Silver</option>
//                     <option value="1">Gold</option>
//                   </select>
//                 </fieldset>

//                <div className="filter-container d-flex align-items-start mt-4">
//                   <div className="filter-label me-3">
//                     <label htmlFor="filter">Filter</label>
//                   </div>

//                   <div className="filter-fields d-flex flex-wrap">
//                     <div className="filter-field m-2">
//                       <label htmlFor="enrollmentDate">Enrollment Date</label>
//                       <input
//                         type="date"
//                         id="enrollmentDate"
//                         name="enrollmentDate"
//                         className="form-control"
//                         value={formValues.enrollmentDate}
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <div className="filter-field m-2">
//                       <label htmlFor="status">Status</label>
//                       <select
//                         id="status"
//                         name="status"
//                         className="form-control"
//                         value={formValues.status}
//                         onChange={handleChange}
//                       >
//                         <option value="" disabled hidden>
//                           Select status
//                         </option>
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                       </select>
//                     </div>

//                     <div className="filter-field m-2">
//                       <label htmlFor="age">Age</label>
//                       <input
//                         type="number"
//                         id="age"
//                         name="age"
//                         className="form-control"
//                         value={formValues.age}
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <div className="filter-field m-2">
//                       <label htmlFor="gender">Gender</label>
//                       <select
//                         id="gender"
//                         name="gender"
//                         className="form-control"
//                         value={formValues.gender}
//                         onChange={handleChange}
//                       >
//                         <option value="" disabled hidden>
//                           Select gender
//                         </option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>

//                     <div className="filter-field m-2">
//                       <label htmlFor="activatedDate">Activated Date</label>
//                       <input
//                         type="date"
//                         id="activatedDate"
//                         name="activatedDate"
//                         className="form-control"
//                         value={formValues.activatedDate}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>

//                   <div className="apply-filter ms-3">
//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       onClick={handleFilter}
//                     >
//                       Apply Filter
//                     </button>
//                   </div>
//                 </div>
//                 {/* End Filter Element */}
//               </div>
//             </div>

//               </div>
//             </div>
//             <div className="row mt-2 justify-content-center">
//               <div className="col-md-2">
//                 <button class="purple-btn1 w-100" fdprocessedid="u33pye">
//                   Submit
//                 </button>
//               </div>
//               <div className="col-md-2">
//                 <button className="purple-btn2 w-100" fdprocessedid="af5l5g">
//                   Cancel
//                 </button>
//               </div>
//             </div>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default NewSegment;

import React, { useState } from "react";
import "../styles/style.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import SubHeader from "../components/SubHeader";
import axios from "axios"; // Import axios for making API calls

const NewSegment = () => {
  const [formValues, setFormValues] = useState({
    enrollmentDate: "",
    status: "",
    age: "",
    gender: "",
    activatedDate: "",
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

  // Handle applying the filter and fetching data
  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://staging.lockated.com/loyalty/members.json?q[joining_date_gteq]=&q[created_at_lteq]=&q[loyalty_tier_name_eq]=&q[birth_date_lteq]=&q[gender_eq]=&q[active_eq]=&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
        {
          params: formValues, // Pass form values as query parameters to filter the data
        }
      );
      setFilteredData(response.data); // Set the fetched data
    } catch (error) {
      console.error("Error fetching filtered data", error);
    }
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
                  value=""
                />
              </fieldset>

              <fieldset className="border col-md-3 m-2 col-sm-11">
                <legend className="float-none">
                  Segment tag<span>*</span>
                </legend>
                <select required>
                  <option value="" disabled selected hidden>
                    Select Segment tag
                  </option>
                  <option value="0">Recently joined</option>
                  <option value="1">Suspended</option>
                  <option value="1">1-purchase</option>
                  <option value="1">No purchase</option>
                </select>
              </fieldset>

              <fieldset className="border col-md-3 m-2 col-sm-11">
                <legend className="float-none">
                  Segment type<span>*</span>
                </legend>
                <select required>
                  <option value="" disabled selected hidden>
                    Select segment type
                  </option>
                  <option value="0">Point based</option>
                  <option value="1">Discount based</option>
                  <option value="1">Referral Campaign</option>
                  <option value="1">Tier - Up Campaign</option>
                  <option value="1">Custom Campaign</option>
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
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
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
                      <option value="Bronze">Bronze</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                    </select>
                  </div>
                  {/* Apply Filter Button */}

                  <div className=" d-flex align-items-center mt-4 ml-5">
                    <button
                      type="button"
                      className="btn btn-outline-primary form-control ml-5"
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
                <div className="row mt-2 justify-content-center">
                  <div className="col-md-2">
                    <button className="purple-btn1 w-100">Submit</button>
                  </div>
                  <div className="col-md-2">
                    <button className="purple-btn2 w-100">Cancel</button>
                  </div>
                </div>
              </div>
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
                          {/* Checkbox default checked */}
                          <input type="checkbox" defaultChecked />
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
        </div>
      </div>
    </>
  );
};

export default NewSegment;
