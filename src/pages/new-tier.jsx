import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SubHeader from "../components/SubHeader";
import RoundedRadioButtonCard from "../components/RoundedRadioButtonCard";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  tierName: Yup.string().required("Tier name is required"),
  exitPoints: Yup.number().required("Exit points are required").positive(),
  setMultipliers: Yup.number()
    .required("Set multipliers are required")
    .positive(),
  welcomeBonus: Yup.number().required("Welcome bonus is required").positive(),
});

const NewTier = () => {
  const [step, setStep] = useState(1);
  const [timeframe, setTimeframe] = useState("");
  const [timeframeError, setTimeframeError] = useState("");
  const [tiers, setTiers] = useState([
    {
      tierName: "",
      exitPoints: "",
      setMultipliers: "",
      welcomeBonus: "",
    },
  ]);

  const navigate = useNavigate();

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus }
  ) => {
    const data = {
      loyalty_tier: {
        name: values.tierName,
        exit_points: values.exitPoints,
        multipliers: values.setMultipliers,
        welcome_bonus: values.welcomeBonus,
        point_type: timeframe,
      },
    };

    try {
      const response = await axios.post(
        "https://staging.lockated.com/loyalty/tiers.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
        data
      );

      if (response.statusText === "Created") {
        setStatus({ success: "Campaign created successfully!" });
        resetForm();
        setStep(1);

        navigate("/tiers");
      }
    } catch (error) {
      setStatus({ error: "Failed to create campaign. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTimeframeChange = (value) => {
    setTimeframe(value);
    setTimeframeError("");
  };

  const nextStep = () => {
    if (step === 1) {
      if (!timeframe) {
        setTimeframeError("Please select a timeframe.");
      } else {
        setStep(2);
      }
    }
  };

  const cancelStep = () => {
    setStep(1);
    setTimeframe("");
    setTimeframeError("");
  };

  const addNewTierRow = () => {
    setTiers([
      ...tiers,
      {
        tierName: "",
        exitPoints: "",
        setMultipliers: "",
        welcomeBonus: "",
      },
    ]);
  };

  const removeTierRow = (index) => {
    setTiers(tiers.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="w-100">
        <SubHeader />

        {step === 1 && (
          <div className="module-data-section mt-2 flex-grow-1">
            <p className="pointer">
              <span className="text-secondary">Tiers</span> &gt; Tier Setting
            </p>
            <div className="mx-3 border-bottom">
              <h5 className="d-flex">
                <span className="title mt-3">TIER SETTING</span>
              </h5>
              <p className="mt-5 ms-4 fw-semibold">
                Point Accumulation Timeframe
              </p>
              <p className="ms-4 text-muted">
                Establish how members enter into higher tiers on points earning
                and time frame.
              </p>
            </div>
            <RoundedRadioButtonCard onChange={handleTimeframeChange} />
            {timeframeError && (
              <div className="text-danger ms-4">{timeframeError}</div>
            )}{" "}
            <div className="row mt-2 justify-content-center">
              <div className="col-md-2">
                <button className="purple-btn1 w-100" onClick={nextStep}>
                  Next
                </button>
              </div>

              <div className="col-md-2">
                <button className="purple-btn2 w-100" onClick={cancelStep}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <Formik
            initialValues={{
              tierName: "",
              exitPoints: "",
              setMultipliers: "",
              welcomeBonus: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form className="go-shadow mx-3 h-100">
                <div
                  className="position-relative"
                  style={{ height: "calc(100% - 5%)" }}
                >
                  <div className="row ms-3">
                      <div className="col-md-3 col-sm-11">
                        <fieldset className="border">
                          <legend className="float-none">
                            Tier Name<span>*</span>
                          </legend>
                          <Field
                            type="text"
                          name="tierName"
                            placeholder="Enter Tier Name"
                            className="form-control border-0"
                          />
                        </fieldset>
                        <ErrorMessage
                        name="tierName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="col-md-3 col-sm-11">
                        <fieldset className="border">
                          <legend className="float-none">
                            Exit Points<span>*</span>
                          </legend>
                          <Field
                            type="text"
                          name="exitPoints"
                            placeholder="Enter Exit Points"
                            className="form-control border-0"
                          />
                        </fieldset>

                        <ErrorMessage
                        name="exitPoints"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="col-md-3 col-sm-11">
                        <fieldset className="border">
                          <legend className="float-none">
                            Set Multipliers<span>*</span>
                          </legend>
                          <Field
                            type="text"
                          name="setMultipliers"
                            placeholder="Enter Set Multipliers"
                            className="form-control border-0"
                          />
                        </fieldset>

                        <ErrorMessage
                        name="setMultipliers"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="col-md-3 col-sm-11">
                        <fieldset className="border">
                          <legend className="float-none">
                            Welcome Bonus<span>*</span>
                          </legend>
                          <Field
                            type="text"
                          name="welcomeBonus"
                            placeholder="Enter Welcome Bonus"
                            className="form-control border-0"
                          />
                        </fieldset>

                        <ErrorMessage
                        name="welcomeBonus"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  <button
                    className="purple-btn1"
                    style={{ margin: "42px 28px", width: "150px" }}
                    onClick={addNewTierRow}
                    type="button"
                  >
                    Add New Tier
                  </button>

                  <div
                    className="row justify-content-center align-items-center"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                    }}
                  >
                    <div className="col-md-2">
                      <button
                        type="submit"
                        className="purple-btn1 w-100"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                    <div className="col-md-2">
                      <button
                        type="reset"
                        className="purple-btn2 w-100"
                        onClick={cancelStep}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  {status && status.success && (
                    <div className="text-success">{status.success}</div>
                  )}
                  {status && status.error && (
                    <div className="text-danger">{status.error}</div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};

export default NewTier;
