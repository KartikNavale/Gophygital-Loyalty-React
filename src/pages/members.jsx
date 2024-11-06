import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubHeader from "../components/SubHeader";
import axios from "axios";

import LoginModal from "../components/LoginModal";

const Members = () => {
  const [showModal, setShowModal] = useState(false);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(date.getFullYear()); // Get last two digits of the year
    return `${day}-${month}-${year}`;
  };

  const getMembers = async () => {
    const storedValue = sessionStorage.getItem("selectedId");
    try {
      const response = await axios.get(
        `https://staging.lockated.com/loyalty/members.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&&q[loyalty_type_id_eq]=${storedValue}`
      );

      ; // Initialize filteredItems


      // Format the created_at date for each member
      const formattedMembers = response.data.map((member) => ({
        ...member,
        tier_validity: formatDate(member.tier_validity), // Use the correct date property
        last_sign_in: formatDate(member.last_sign_in)
      }));

      setMembers(formattedMembers); // Set formatted members
      setFilteredItems(formattedMembers); // Also set filtered items
    } catch (error) {
      console.error("Error fetching member details:", error);
      setError("Failed to fetch members. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    const hasRun = sessionStorage.getItem('hasRun');
    const timer = setTimeout(() => {
      getMembers(); // Fetch members after 2 seconds
    }, 1000);
    if (!hasRun) {
      setShowModal(true); // Open modal

      

      sessionStorage.setItem('hasRun', 'true'); // Mark as run

      return () => clearTimeout(timer); // Cleanup on unmount
    } else {
      setLoading(false); // Avoid showing loader if already run
    }
  }, []); // Run only once on component mount

  const handleSearch = () => {
    const filtered = members.filter(member =>
      `${member.firstname} ${member.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredItems(members);
    setCurrentPage(1);
  };

  // Pagination logic


  // const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  // const currentItems = filteredItems.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  //   return (
  //     <nav>
  //       <ul className="pagination justify-content-center">
  //         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
  //           <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
  //             Previous
  //           </button>
  //         </li>
  //         <li className={`page-item active`}>
  //           <button className="page-link">{currentPage}</button>
  //         </li>
  //         <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
  //           <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
  //             Next
  //           </button>
  //         </li>
  //       </ul>
  //     </nav>
  //   );
  // };

  // const Pagination = ({
  //   currentPage,
  //   totalPages,
  //   totalEntries,
  // }) => {
  //   const startEntry = (currentPage - 1) * itemsPerPage + 1;
  //   const endEntry = Math.min(currentPage * itemsPerPage, totalEntries);

  //   const renderPageNumbers = () => {
  //     const pages = [];
  //     for (let i = 1; i <= totalPages; i++) {
  //       pages.push(
  //         <li
  //           key={i}
  //           className={`page-item ${i === currentPage ? "active" : ""}`}
  //           style={{ border: "1px solid #ddd", margin: "2px" }}
  //         >
  //           <button
  //             className="page-link"
  //             onClick={() => handlePageChange(i)}
  //             style={{
  //               padding: "8px 12px",
  //               color: i === currentPage ? "#fff" : "#5e2750",
  //               backgroundColor: i === currentPage ? "#5e2750" : "#fff",
  //               fontWeight: i === currentPage ? "bold" : "normal",
  //               border:'2px solid #5e2750',
  //               borderRadius:'3px'
  //             }}
  //           >
  //             {i}
  //           </button>
  //         </li>
  //       );
  //     }
  //     return pages;
  //   };

  //   return (
  //     <nav className="d-flex justify-content-between align-items-center">
  //       <ul
  //         className="pagination justify-content-center align-items-center"
  //         style={{
  //           listStyleType: "none",
  //           padding: "0",
  //           display: "flex",
  //           alignItems: "center",
  //         }}
  //       >
  //         <li
  //           className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
  //           style={{ margin: "2px" }}
  //         >
  //           <button
  //             className="page-link"
  //             onClick={() => handlePageChange(1)}
  //             disabled={currentPage === 1}
  //             style={{
  //               padding: "8px 12px",
  //               color: "#5e2750",
  //               backgroundColor: currentPage === 1 ? "#f0f0f0" : "#fff",
  //             }}
  //           >
  //             «
  //           </button>
  //         </li>
  //         <li
  //           className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
  //           style={{ margin: "2px" }}
  //         >
  //           <button
  //             className="page-link"
  //             onClick={() => handlePageChange(currentPage - 1)}
  //             disabled={currentPage === 1}
  //             style={{
  //               padding: "8px 12px",
  //               color: "#5e2750",
  //               backgroundColor: currentPage === 1 ? "#f0f0f0" : "#fff",
  //             }}
  //           >
  //             ‹
  //           </button>
  //         </li>
  //         {renderPageNumbers()}
  //         <li
  //           className={`page-item ${
  //             currentPage === totalPages ? "disabled" : ""
  //           }`}
  //           style={{ margin: "2px" }}
  //         >
  //           <button
  //             className="page-link"
  //             onClick={() => handlePageChange(currentPage + 1)}
  //             disabled={currentPage === totalPages}
  //             style={{
  //               padding: "8px 12px",
  //               color: "#5e2750",
  //               backgroundColor:
  //                 currentPage === totalPages ? "#f0f0f0" : "#fff",
  //             }}
  //           >
  //             ›
  //           </button>
  //         </li>
  //         <li
  //           className={`page-item ${
  //             currentPage === totalPages ? "disabled" : ""
  //           }`}
  //           style={{ margin: "2px" }}
  //         >
  //           <button
  //             className="page-link"
  //             onClick={() => handlePageChange(totalPages)}
  //             disabled={currentPage === totalPages}
  //             style={{
  //               padding: "8px 12px",
  //               color: "#5e2750",
  //               backgroundColor:
  //                 currentPage === totalPages ? "#f0f0f0" : "#fff",
  //             }}
  //           >
  //             »
  //           </button>
  //         </li>
  //       </ul>
  //       <p className="text-center" style={{ marginTop: "10px", color: "#555" }}>
  //         Showing {startEntry} to {endEntry} of {totalEntries} entries
  //       </p>
  //     </nav>
  //   );
  // };

  
  const Pagination = ({
    currentPage,
    totalPages,
    totalEntries,
    onPageChange, // Pass the onPageChange function as a prop
  }) => {
    const startEntry = (currentPage - 1) * itemsPerPage + 1;
    const endEntry = Math.min(currentPage * itemsPerPage, totalEntries);

    // Function to get the range of page numbers to display
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5; // Set the maximum number of visible pages
      const halfVisible = Math.floor(maxVisiblePages / 2);

      let startPage, endPage;

      if (totalPages <= maxVisiblePages) {
        // If total pages are less than or equal to maxVisiblePages, show all
        startPage = 1;
        endPage = totalPages;
      } else {
        // Otherwise, calculate the start and end pages
        if (currentPage <= halfVisible) {
          startPage = 1;
          endPage = maxVisiblePages;
        } else if (currentPage + halfVisible >= totalPages) {
          startPage = totalPages - maxVisiblePages + 1;
          endPage = totalPages;
        } else {
          startPage = currentPage - halfVisible;
          endPage = currentPage + halfVisible;
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    };

    const pageNumbers = getPageNumbers();

    const handleJumpForward = () => {
      if (currentPage + 5 <= totalPages) {
        onPageChange(currentPage + 5);
      } else {
        onPageChange(totalPages); // Go to last page if jump exceeds total pages
      }
    };

    const handleJumpBackward = () => {
      if (currentPage - 5 >= 1) {
        onPageChange(currentPage - 5);
      } else {
        onPageChange(1); // Go to first page if jump goes below 1
      }
    };

    return (
      <nav className="d-flex justify-content-between align-items-center">
        <ul
          className="pagination justify-content-center align-items-center"
          style={{ listStyleType: "none", padding: "0" }}
        >
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(1)} // Jump to first page
              disabled={currentPage === 1}
              style={{ padding: "8px 12px", color: "#5e2750" }}
            >
              «« {/* Double left arrow for jumping to the first page */}
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ padding: "8px 12px", color: "#5e2750" }}
            >
              ‹
            </button>
          </li>

          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(page)}
                style={{
                  padding: "8px 12px",
                  color: page === currentPage ? "#fff" : "#5e2750",
                  backgroundColor: page === currentPage ? "#5e2750" : "#fff",
                  border: "2px solid #5e2750",
                  borderRadius: "3px",
                }}
              >
                {page}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ padding: "8px 12px", color: "#5e2750" }}
            >
              ›
            </button>
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={handleJumpForward} // Jump forward by 7 pages
              disabled={currentPage === totalPages}
              style={{ padding: "8px 12px", color: "#5e2750" }}
            >
              »» {/* Double right arrow for jumping to the last page */}
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
            <span className="text-secondary">Members</span> &gt; Manage Members
          </p>
          <h5>Manage Members</h5>
          {/* <div className="d-flex justify-content-between loyalty-header">
            <div>
              <Link to="">
                <button className="purple-btn1 rounded-3 px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-plus mb-1" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                  </svg>
                  <span>New Member</span>
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
          </div> */}

          <div className="d-flex justify-content-between align-items-center">
            <Link to="">
              <button className="purple-btn1" style={{borderRadius:'5px'}}>
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
                <span>New Member</span>
              </button>
            </Link>
            <div className="d-flex align-items-center">
              <div className="position-relative me-3">
                <input
                  className="form-control"
                  style={{
                    height: "35px",
                    paddingLeft: "30px",
                    textAlign: "left",
                  }}
                  // autoComplete
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div
                  className="position-absolute"
                  style={{ top: "7px", left: "10px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </div>
              </div>
              <button
                className="purple-btn1 rounded-3 px-3"
                onClick={handleSearch}
              >
                Go!
              </button>
              <button
                className="purple-btn2 rounded-3 mt-2"
                onClick={handleReset} // Reset search
              >
                Reset
              </button>
            </div>
          </div>


          <div className="tbl-container mx-3 mt-4" 
          // style={{
          //   height: "100%", overflowY: "hidden", margin: "0 100px",
          //   // textAlign: "center"
          // }}
          style={{
            height: "100%",
            overflowY: "hidden",
            // textAlign: "center",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
          }}
          >
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <>
                <table className="w-100"  style={{color: '#000', fontWeight:'400',fontSize:'13px'}}>
                  <thead>
                    <tr>
                      <th>Member ID</th>
                      <th>Member Name</th>
                      <th>Tier Level</th>
                      <th>Current Balance</th>
                      <th>Last Activity Date</th>
                      <th>Tier Validity</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody style={{color: '#000', fontWeight:'400',fontSize:'13px'}}>
                    {currentItems.map((member) => (
                      <tr key={member.id}>
                        <td style={{ width: '14.2%' }}>{member.id}</td>
                        <td style={{ width: '14.2%' }}>
                          {member.firstname} {member.lastname} {/* Corrected 'lasttname' to 'lastname' */}
                        </td>
                        <td style={{ width: '14.2%' }}>{member.member_status.tier_level}</td>
                        <td style={{ width: '14.2%' }}>{member.current_loyalty_points}</td>
                        <td style={{ width: '14.2%' }}>{member.last_sign_in}</td>
                        <td style={{ width: '14.2%' }}>{member.tier_validity}</td>
                        <td style={{ width: '14.2%' }}>
                          <Link to={`/member-details/${member.id}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#000000"
                              className="bi bi-eye"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg>
                          </Link>
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
          </div>
        </div>
        <LoginModal showModal={showModal} handleClose={() => setShowModal(false)} />

      </div>
    </>
  );
};

export default Members;

