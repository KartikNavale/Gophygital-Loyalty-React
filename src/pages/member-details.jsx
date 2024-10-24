import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/style.css";
import SubHeader from "../components/SubHeader";
import { useParams } from "react-router-dom";
import axios from "axios";

const MemberDetails = () => {
  const { id } = useParams(); // Get the member ID from the URL
  const [member, setMember] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMemberDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://staging.lockated.com/loyalty/members/${id}.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
      );
      console.log(response.data);
      return response.data;
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

  const getTransactionData = async () => {
    try {
      const response = await axios.get(
        `https://staging.lockated.com/loyalty/member_transactions.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
      );
      const transactions = response.data.map((transaction) => {
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(transaction.created_at));

        return {
          ...transaction,
          created_at: formattedDate,
        };
      });

      console.log("transaction data", transactions);
      setTransactionData(transactions);
    } catch (error) {
      console.error("Error fetching member details:", error);
      throw error;
    }
  };

  useEffect(() => {
    getTransactionData();
  }, []);

  return (
    <>
      <div className="w-100">
        <SubHeader />
        <div className="module-data-section mt-2 mb-2">
          <p className="pointer">
            <span className="text-secondary">Members</span> &gt; Member Details
          </p>

          {/* personal details */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <>
              <div class="go-shadow mx-3 no-top-left-shadow ">
                <h5 class="d-flex">
                  <span class="title mt-3">PERSONAL DETAILS</span>
                </h5>
                <div class="row px-3">
                  <div class="col-lg-8 col-md-12 col-sm-12 row px-3">
                    <div class="col-6 p-1 text-muted member-detail-color">
                      Full name
                    </div>
                    <div class="col-6 p-1 member-detail-color">
                      : {member.firstname} {member.lasttname}{" "}
                    </div>
                  </div>
                  <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div class="col-6 p-1 text-muted member-detail-color">
                      Email Address
                    </div>
                    <div class="col-6 p-1 member-detail-color">
                      : {member.email}
                    </div>
                  </div>
                  <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div class="col-6 p-1 text-muted member-detail-color">
                      Phone No.
                    </div>
                    <div class="col-6 p-1 member-detail-color">
                      : {member.phone}
                    </div>
                  </div>
                  <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div class="col-6 p-1 text-muted member-detail-color">
                      Home Address
                    </div>
                    <div class="col-6 p-1 member-detail-color">
                      : {member.address.address1} {member.address.address2}{" "}
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership Status */}
              <div class="go-shadow mx-3 no-top-left-shadow ">
                <h5 class="d-flex">
                  <span class="title mt-3">MEMBERSHIP STATUS</span>
                </h5>
                <div class="row px-3">
                  <div class="col-lg-8 col-md-12 col-sm-12 row px-3">
                    <div class="col-6 p-1 text-muted member-detail-color">
                      Current Loyalty Points
                    </div>
                    <div class="col-6 p-1 member-detail-color">
                      : {member.current_loyalty_points}
                    </div>
                  </div>
                  <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div class="col-6 p-1 text-muted member-detail-color">
                      Tier Progress
                    </div>
                    <div class="col-6 p-1 member-detail-color">
                      : {member.member_status.tier_progression}
                    </div>
                  </div>
                  <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div class="col-6 p-1 text-muted member-detail-color">
                      Membership Duration{" "}
                    </div>
                    <div class="col-6 p-1 member-detail-color">: Name</div>{" "}
                    {/* this attribute is not there in  json*/}
                  </div>
                  <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div class="col-6 p-1 text-muted member-detail-color">
                      Account Status
                    </div>
                    <div class="col-6 p-1 member-detail-color">: Active</div>
                  </div>
                  <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div class="col-6 p-1 text-muted member-detail-color">
                      Enrolled Date
                    </div>
                    <div class="col-6 p-1 member-detail-color">
                      : {member.created_at}
                    </div>
                  </div>
                  <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div class="col-6 p-1 text-muted member-detail-color">
                      Tier Level
                    </div>
                    <div class="col-6 p-1 member-detail-color">
                      : {member.member_status.tier_level}
                    </div>
                  </div>
                  <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                    <div class="col-6 p-1 text-muted member-detail-color">
                      Expiry Points
                    </div>
                    <div class="col-6 p-1 member-detail-color">
                      : 20/02/2024{" "}
                    </div>{" "}
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
                        <p className="content-box-sub fw-light">14.28%</p>
                        <h6
                          className="content-box-title"
                          style={{ heigth: "20px", width: "221px" }}
                        >
                          ALL THE POINTS EARNED
                        </h6>
                        <h6 className="content-box-title">1400</h6>
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
                        <p className="content-box-sub fw-light">12.50%</p>
                        <h6
                          className="content-box-title"
                          style={{ heigth: "20px", width: "221px" }}
                        >
                          ALL THE POINTS REDEEMED
                        </h6>
                        <h6 className="content-box-title">7000</h6>
                      </div>
                    </div>

                    <div className="col-md-2 col-sm-11 d-flex justify-content-center align-item-center">
                      <div
                        className="content-box text-center tab-button border pt-5"
                        style={{
                          height: "135px",
                          width: "246px",
                          borderRadius: "20px",
                        }}
                      >
                        <h6
                          className="content-box-title"
                          style={{ heigth: "20px", width: "221px" }}
                        >
                          BALANCED POINTS
                        </h6>
                        <h6 className="content-box-title">7000</h6>
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
                        <td className="text-center"> Balanced Points</td>
                        <td className="text-center">Earned Points</td>
                        <td className="text-center">Redeem Points</td>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionData &&
                        transactionData.map((item, id) => (
                          <tr key={id}>
                            <td className="text-center">{item.created_at}</td>
                            <td className="text-center">
                              {item.transaction_type}
                            </td>
                            <td className="text-center">...</td>
                            <td className="text-center">...</td>
                            <td className="text-center">...</td>
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
