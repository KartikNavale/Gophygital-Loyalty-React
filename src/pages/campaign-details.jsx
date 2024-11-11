import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubHeader from "../components/SubHeader";
import axios from "axios";

export default function CampaignDetails() {
  const { id } = useParams();
  const storedValue = sessionStorage.getItem("selectedId");
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear());

//     return `${day}-${month}-${year}`;
//   };

  const getMemberDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://staging.lockated.com/loyalty/campaigns/${id}.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&&q[loyalty_type_id_eq]=${storedValue}`
      );
      // setCampaignDetails(response.data)
      return response.data

      // const formattedMember = {
      //   ...response.data,
      //   created_at: formatDate(response.data.created_at), // Format the created_at date
      // };

      // return formattedMember;
    } catch (error) {
      console.error("Error fetching member details:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await getMemberDetails(id);
        setCampaignDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  return (
    <div className="w-100">
      <SubHeader />
      <div className="module-data-section mt-2 mb-2">
        <p className="pointer">
          <span className="text-secondary">Campaign</span> &gt; Campaign Details
        </p>

        {/* personal details */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <>
            <div class="go-shadow mx-3 no-top-left-shadow " style={{ fontSize: '14px', fontWeight: '400', color: '#6C757D' }}>
              <h5 class="d-flex">
                <span class="title mt-3">CAMPAIGN DETAILS</span>
              </h5>
              <div class="row px-3">
                <div class="col-lg-8 col-md-12 col-sm-12 row px-3">
                  <div class="col-6 p-1 text-muted member-detail-color">
                  Campaign Name
                  </div>
                  <div class="col-6 p-1 member-detail-color">
                    : {" "}{campaignDetails?.name}
                  </div>
                </div>
                <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                  <div class="col-6 p-1 text-muted member-detail-color">
                  Campaign Tag 
                  </div>
                  <div class="col-6 p-1 member-detail-color">
                    : {" "}{campaignDetails?.campaign_tag}
                  </div>
                </div>
                <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                  <div class="col-6 p-1 text-muted member-detail-color">
                  Target Audience
                  </div>
                  <div class="col-6 p-1 member-detail-color">
                    : {" "}{campaignDetails?.target_audiance}
                  </div>
                </div>
                {/* <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                  <div class="col-6 p-1 text-muted member-detail-color">
                    Welcome Bonus
                  </div>
                  <div class="col-6 p-1 member-detail-color">
                    : {" "}{tierDetails?.welcome_bonus}
                  </div>
                </div> */}
                {/* <div class="col-lg-8 col-md-6 col-sm-12 row px-3">
                  <div class="col-6 p-1 text-muted member-detail-color">
                    Point Type
                  </div>
                  <div class="col-6 p-1 member-detail-color">
                    : {" "}{tierDetails?.point_type}
                  </div>
                </div> */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
