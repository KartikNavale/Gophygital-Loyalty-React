import React, { useState, useEffect } from "react";
// @ts-ignore
import Header from "../components/Header";
// @ts-ignore
import Sidebar from "../components/Sidebar";
// @ts-ignore
import Footer from "../components/Footer";
import "../styles/style.css";
import SubHeader from "../components/SubHeader";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
// @ts-ignore
import Members from "./members";

const MemberDetails = () => {
  const { id } = useParams(); // Get the member ID from the URL
  const [member, setMember] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = String(date.getFullYear()); // Get last two digits of the year
    return `${day}-${month}-${year}`;
  };

  const storedValue = sessionStorage.getItem("selectedId");
  const getMemberDetails = async (id) => {
    console.log("Stored ID in session after selection:", storedValue, id);
    try {
      const response = await axios.get(
        `https://staging.lockated.com/loyalty/members/${id}.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&&q[loyalty_type_id_eq]=${storedValue}`
      );

      const formattedMember = {
        ...response.data,
        created_at: formatDate(response.data.created_at), // Format the created_at date
      };

      return formattedMember;
    } catch (error) {
      console.error("Error fetching member details:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await getMemberDetails(id);
        setMember(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);
  console.log("id :", id, "storedValue :", storedValue);

  const getTransactionData = async (id) => {
    const storedValue = sessionStorage.getItem("selectedId");
    console.log("Stored ID in session after selection:", storedValue);
    try {
      const response = await axios.get(
        `https://staging.lockated.com/loyalty/members.json?q[id_eq]=${id}&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&q[loyalty_type_id_eq]=${storedValue}`
      );

      // Extract member_transactions from each member and map over them
      const transactions = response.data.flatMap((member) => {
        return member.member_transactions.map((transaction) => {
          const formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(new Date(member.created_at));

          return {
            ...transaction,
            created_at: formattedDate,
          };
        });
      });

      console.log("transaction data", transactions, response.data);
      setTransactionData(transactions);
    } catch (error) {
      console.error("Error fetching member details:", error);
      throw error;
    }
  };

  useEffect(() => {
    getTransactionData(id);
  }, [id]);

  return (
    <>
      <div className="w-100">
        <SubHeader />
        <div className="module-data-section mt-2 mb-2">
          <p className="pointer">
          <Link to='/members' >
            <span>Members</span>
            </Link>
             &gt; Member Details
          </p>

          {/* personal details */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <>
              <div 
// @ts-ignore
              class="go-shadow mx-3 no-top-left-shadow ">
                <h5 
// @ts-ignore
                class="d-flex">
                  <span 
// @ts-ignore
                  class="title mt-3" style={{ fontSize: '20px', fontWeight: '600' }}>PERSONAL DETAILS</span>
                </h5>
                <div 
// @ts-ignore
                class="row px-3" style={{ fontSize: '14px', fontWeight: '400', color: '#6C757D' }}>
                  <div 
// @ts-ignore
                  class="col-lg-8 col-md-12 col-sm-12 row px-3">
                    <div 
// @ts-ignore
                    class="col-6 p-1 text-muted member-detail-color">
                      Full name
                    </div>
                    <div 
// @ts-ignore
                    class="col-6 p-1 member-detail-color">
                      : {
// @ts-ignore
                      member.firstname} {member.lasttname}
                    </div>
                  </div>
                  <div 
// @ts-ignore
                  class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div 
// @ts-ignore
                    class="col-6 p-1 text-muted member-detail-color">
                      Email Address
                    </div>
                    <div 
// @ts-ignore
                    class="col-6 p-1 member-detail-color">
                      : {
// @ts-ignore
                      member.email}
                    </div>
                  </div>
                  <div 
// @ts-ignore
                  class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div 
// @ts-ignore
                    class="col-6 p-1 text-muted member-detail-color">
                      Phone No.
                    </div>
                    <div 
// @ts-ignore
                    class="col-6 p-1 member-detail-color">
                      : {
// @ts-ignore
                      member.mobile}
                    </div>
                  </div>
                  <div 
// @ts-ignore
                  class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div 
// @ts-ignore
                    class="col-6 p-1 text-muted member-detail-color">
                      Home Address
                    </div>
                    <div 
// @ts-ignore
                    class="col-6 p-1 member-detail-color">
                      : {
// @ts-ignore
                      member.address.address1} {member.address.address2}
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership Status */}
              <div 
// @ts-ignore
              class="go-shadow mx-3 no-top-left-shadow " style={{ fontSize: '14px', fontWeight: '400', color: '#6C757D' }}>
                <h5 
// @ts-ignore
                class="d-flex">
                  <span 
// @ts-ignore
                  class="title mt-3" style={{ fontSize: '20px', fontWeight: '600' }}>MEMBERSHIP STATUS</span>
                </h5>
                <div 
// @ts-ignore
                class="row px-3">
                  <div 
// @ts-ignore
                  class="col-lg-8 col-md-12 col-sm-12 row px-3">
                    <div 
// @ts-ignore
                    class="col-6 p-1 text-muted member-detail-color">
                      Current Loyalty Points
                    </div>
                    <div 
// @ts-ignore
                    class="col-6 p-1 member-detail-color">
                      : {
// @ts-ignore
                      member.current_loyalty_points}
                    </div>
                  </div>
                  <div 
// @ts-ignore
                  class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div 
// @ts-ignore
                    class="col-6 p-1 text-muted member-detail-color">
                      Tier Progress
                    </div>
                    <div 
// @ts-ignore
                    class="col-6 p-1 member-detail-color">
                      : {
// @ts-ignore
                      member.member_status.tier_progression}
                    </div>
                  </div>
                  <div 
// @ts-ignore
                  class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div 
// @ts-ignore
                    class="col-6 p-1 text-muted member-detail-color">
                      Membership Duration
                    </div>
                    <div 
// @ts-ignore
                    class="col-6 p-1 member-detail-color">
                      : {
// @ts-ignore
                      member.duration}
                    </div>
                    {/* this attribute is not there in  json*/}
                  </div>
                  <div 
// @ts-ignore
                  class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div 
// @ts-ignore
                    class="col-6 p-1 text-muted member-detail-color">
                      Account Status
                    </div>
                    <div 
// @ts-ignore
                    class="col-6 p-1 member-detail-color">: Active</div>
                  </div>
                  <div 
// @ts-ignore
                  class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div 
// @ts-ignore
                    class="col-6 p-1 text-muted member-detail-color">
                      Enrolled Date
                    </div>
                    <div 
// @ts-ignore
                    class="col-6 p-1 member-detail-color">
                      : {
// @ts-ignore
                      member.created_at}
                    </div>
                  </div>
                  <div 
// @ts-ignore
                  class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div 
// @ts-ignore
                    class="col-6 p-1 text-muted member-detail-color">
                      Tier Level
                    </div>
                    <div 
// @ts-ignore
                    class="col-6 p-1 member-detail-color">
                      : {
// @ts-ignore
                      member.member_status.tier_level}
                    </div>
                  </div>
                  <div 
// @ts-ignore
                  class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div 
// @ts-ignore
                    class="col-6 p-1 text-muted member-detail-color">
                      Expiry Points
                    </div>
                    <div 
// @ts-ignore
                    class="col-6 p-1 member-detail-color">:</div>
                    {/* this attribute is not there in  json*/}
                  </div>
                </div>
              </div>

              {/* Middle Boxex */}

              <div className="material-boxes m-5">
                <div
                  className="container-fluid d-flex align-item-center justify-content-center "
                  style={{ height: "135px", width: "1000px" }}
                >
                  <div className="row d-flex justify-content-between align-item-center">
                    <div className="col-md-2 col-sm-11 d-flex justify-content-center align-item-center">
                      <div
                        className="content-box text-center tab-button border pt-4"
                        style={{
                          height: "135px",
                          width: "246px",
                          borderRadius: "20px",
                        }}
                      >
                        <p className="content-box-sub fw-light">
                          {
// @ts-ignore
                          member.earned_percentage}%{" "}
                        </p>
                        <h6
                          className="content-box-title"
                          // @ts-ignore
                          style={{ heigth: "20px", width: "221px" }}
                        >
                          ALL THE POINTS EARNED
                        </h6>
                        <h6 className="content-box-title">
                          {
// @ts-ignore
                          member.earned_points}
                        </h6>
                      </div>
                    </div>

                    <div className="col-md-2 col-sm-11 d-flex justify-content-center align-item-center">
                      <div
                        className="content-box text-center tab-button border pt-4"
                        style={{
                          height: "135px",
                          width: "246px",
                          borderRadius: "20px",
                        }}
                      >
                        <p className="content-box-sub fw-light">
                          {
// @ts-ignore
                          member.reedem_percentage}%{" "}
                        </p>
                        <h6
                          className="content-box-title"
                          // @ts-ignore
                          style={{ heigth: "20px", width: "221px" }}
                        >
                          ALL THE POINTS REDEEMED
                        </h6>
                        <h6 className="content-box-title">
                          {
// @ts-ignore
                          member.reedem_points}
                        </h6>
                      </div>
                    </div>

                    <div className="col-md-2 col-sm-11 d-flex justify-content-center align-item-center">
                      <div
                        className="content-box text-center tab-button border pt-4"
                        style={{
                          height: "135px",
                          width: "246px",
                          borderRadius: "20px",
                        }}
                      >
                        <h6 className="content-box-title">
                          {
// @ts-ignore
                          member.current_loyalty_points}
                        </h6>
                        <h6
                          className="content-box-title"
                          // @ts-ignore
                          style={{ heigth: "20px", width: "221px" }}
                        >
                          BALANCED POINTS
                        </h6>
                        {/* <h6 className="content-box-title">
                          {member.current_loyalty_points}{" "}
                        </h6> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* table */}

              <div>
                <h5 className="m-3 title ps-2 ">TRANSACTION STATUS</h5>
                <div className="tbl-container mx-5">
                  <table className="w-100">
                    <thead>
                      <tr>
                        <td className="text-center"> Date</td>
                        <td className="text-center"> Transaction Type</td>
                        <td className="text-center"> Points</td>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionData &&
                        // @ts-ignore
                        transactionData.map((item, index) => (
                          <tr key={index}>
                            <td
                              className="text-center"
                              style={{ width: "33%" }}
                            >
                              {item.created_at}
                            </td>
                            <td
                              className="text-center"
                              style={{ width: "33%" }}
                            >
                              {item.transaction_type}
                            </td>
                            <td
                              className="text-center"
                              style={{ width: "33%" }}
                            >
                              {item.points}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MemberDetails;
