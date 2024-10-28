import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const NewCampaign = () => {
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Campaign name is required."),
    target_audiance: Yup.string().required("Target audience is required."),
    campaign_type: Yup.string().required("Campaign type is required."),
    loyalty_tier_id: Yup.string().required("Tier level is required."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      target_audiance: "",
      campaign_type: "",
      loyalty_tier_id: "",
      campaign_reward: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        loyalty_campaign: {
          name: values.name,
          target_audiance: values.target_audiance,
          campaign_type: values.campaign_type,
          loyalty_tier_id: Number(values.loyalty_tier_id), // Convert to number
          campaign_reward: values.campaign_reward ? "true" : "false", // Convert to string
        },
      };

      // console.log("Data to be sent:", data);

      try {
        const response = await axios.post(
          "https://staging.lockated.com/loyalty/campaigns.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
          data
        );

        if (response.status === 201) {
          alert("Campaign created successfully!");
          formik.resetForm();
          navigate("/campaign");
        }
      } catch (error) {
        console.error(
          "Error posting data:",
          error.response ? error.response.data : error.message
        );
        alert("Failed to create campaign. Please try again.");
      }
    },
  });

  return (
    <>
      <div className="module-data-section mt-2">
        <p className="pointer">
          <span className="text-secondary">Campaign</span> &gt; New Campaign
        </p>
        <h5 className="mb-3 title">New Campaign</h5>
        <form onSubmit={formik.handleSubmit} className="go-shadow me-3 pt-3">
          <div className="border-bottom pb-2">
            <div className="row">
              <div className="col-md-11">
                <input
                  className="border w-100 p-2 py-2"
                  placeholder="Enter Campaign Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-danger">{formik.errors.name}</p>
                ) : null}
              </div>
            </div>
            <div className="row ms-1 mt-4">
              <fieldset className="border col-lg-3 col-md-5 col-sm-11 me-2">
                <legend className="float-none">
                  Target Audience<span>*</span>
                </legend>
                <select
                  name="target_audiance"
                  value={formik.values.target_audiance}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required=""
                >
                  <option value="">Select Target Audience</option>
                  <option value="Recently Joined">Recently Joined</option>
                  <option value="Suspended">Suspended</option>
                  <option value="1 - purchase">1 - purchase</option>
                  <option value="No purchase">No purchase</option>
                </select>
                {formik.touched.target_audiance &&
                formik.errors.target_audiance ? (
                  <p className="text-danger">{formik.errors.target_audiance}</p>
                ) : null}
              </fieldset>

              <fieldset className="border col-lg-3 col-md-5 col-sm-11 me-2">
                <legend className="float-none">
                  Campaign Type<span>*</span>
                </legend>
                <select
                  name="campaign_type"
                  value={formik.values.campaign_type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required=""
                >
                  <option value="">Select Campaign Type</option>
                  <option value="Point based">Point based</option>
                  <option value="Discount based">Discount based</option>
                  <option value="Referral Campaign">Referral Campaign</option>
                  <option value="Tier - Up Campaign">Tier - Up Campaign</option>
                  <option value="Custom Campaign">Custom Campaign</option>
                </select>
                {formik.touched.campaign_type && formik.errors.campaign_type ? (
                  <p className="text-danger">{formik.errors.campaign_type}</p>
                ) : null}
              </fieldset>

              <fieldset className="border col-lg-3 col-md-5 col-sm-11">
                <legend className="float-none">
                  Tier Level<span>*</span>
                </legend>
                <select
                  name="loyalty_tier_id"
                  value={formik.values.loyalty_tier_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required=""
                >
                  <option value="">Select Tier Level</option>
                  <option value="1">Bronze</option>
                  <option value="2">Silver</option>
                  <option value="3">Gold</option>
                </select>
                {formik.touched.loyalty_tier_id &&
                formik.errors.loyalty_tier_id ? (
                  <p className="text-danger">{formik.errors.loyalty_tier_id}</p>
                ) : null}
              </fieldset>
            </div>
          </div>
          <div className="mt-2">
            <p className="fw-bold">
              Points Criteria <span>*</span>
            </p>
            <p>
              <input
                className="align-middle mx-2"
                type="checkbox"
                name="campaign_reward"
                checked={formik.values.campaign_reward}
                onChange={formik.handleChange}
              />
              <span className="align-middle">
                Send points to existing members.
              </span>
            </p>
          </div>
          <div className="mt-5">
            <p className="fw-bold">
              Campaign Rewards <span>*</span>
            </p>
          </div>
          <div className="row mt-2 justify-content-center">
            <div className="col-md-2">
              <button type="submit" className="purple-btn1 w-100">
                Submit
              </button>
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="purple-btn2 w-100"
                onClick={formik.handleReset}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewCampaign;
