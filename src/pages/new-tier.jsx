import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import SubHeader from "../components/SubHeader";
import RoundedRadioButtonCard from "../components/RoundedRadioButtonCard";
import PropTypes from "prop-types";

const storedValue = sessionStorage.getItem("selectedId");

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Tier name is required"),
  exit_points: Yup.number().required("Exit points are required").positive(),
  multipliers: Yup.number().required("Multipliers are required").positive(),
  welcome_bonus: Yup.number().required("Welcome bonus is required").positive(),
  point_type: Yup.string().required("Point type is required"),
});
const NewTier = () => {
  const [step, setStep] = useState(1);
  const [timeframe, setTimeframe] = useState("");
  const [timeframeError, setTimeframeError] = useState("");
  const [tiers, setTiers] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus }
  ) => {
    const formattedTiers = tiers?.map((tier) => ({
      loyalty_type_id: Number(tier.loyalty_type_id),
      name: tier.name,
      exit_points: Number(tier.exit_points),
      multipliers: Number(tier.multipliers),
      welcome_bonus: Number(tier.welcome_bonus),
      point_type: tier.point_type,
    }));

    const newTier = {
      loyalty_type_id: Number(storedValue),
      name: values.name,
      exit_points: Number(values.exit_points),
      multipliers: Number(values.multipliers),
      welcome_bonus: Number(values.welcome_bonus),
      point_type: timeframe,
    };

    const data = {
      loyalty_tier:
        formattedTiers?.length > 0 ? [...formattedTiers, newTier] : newTier,
    };

    try {
      const token = "bfa5004e7b0175622be8f7e69b37d01290b737f82e078414";
      const url =
        tiers.length > 0
          ? `https://staging.lockated.com/loyalty/tiers/bulk_create?token=${token}`
          : `https://staging.lockated.com/loyalty/tiers.json?token=${token}`;

      console.log("Final URL:", url);
      console.log("Data Sent:", JSON.stringify(data, null, 2));

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Log the response for debugging
      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (response.status === 201) {
        setStatus({ success: "Tier created successfully!" });
        resetForm();
        setTiers([]);
        navigate("/tiers");
      } else if (response.status === 200) {
        console.log(
          "Unexpected status code 200 received. Check the response for details."
        );
        setStatus({
          error: "Unexpected response: Status 200. Please check the data.",
        });
      } else if (response.status === 302) {
        console.log("Redirecting to:", response.headers.get("Location"));
        window.location.href = response.headers.get("Location"); // Handle the redirection
      } else {
        console.log("Unexpected status code:", response.status);
        setStatus({
          error: `Unexpected status code: ${response.status}. Expected 201 for creation.`,
        });
      }
    } catch (error) {
      setStatus({
        error:
          error.message ||
          `Failed to create tier. Please try again. ${JSON.stringify(
            data,
            null,
            2
          )}`,
      });
      console.log("Error details:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTimeframeChange = (value) => {
    setTimeframe(value);
    console.log("timeframe :----", timeframe);
  };

  const nextStep = () => {
    if (step === 1 && timeframe) {
      setStep(2);
    } else if (!timeframe) {
      setTimeframeError("Please select a timeframe.");
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
        loyalty_type_id: Number(storedValue),
        name: "",
        exit_points: "",
        multipliers: "",
        welcome_bonus: "",
        point_type: timeframe,
      },
    ]);
  };

  const removeTierRow = (index) => {
    setTiers(tiers.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="w-100" style={{ height: "90%" }}>
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
            )}
            <div className="row mt-2 justify-content-center">
              <div className="col-md-2">
                <button className="purple-btn1 w-100" onClick={nextStep}>
                  Next
                </button>
              </div>

              <div className="col-md-2">
                <button className="purple-btn2 w-100" onClick={() => navigate('/tiers')}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {step == 2 && (
          <div className="module-data-section mt-2" style={{ height: "85%" }}>
            <p className="pointer">
              <span className="text-secondary">Tier</span> &gt; New Tier
            </p>
            <h5 className="mb-3">
              <span className="title">New Tier</span>
            </h5>
            <Formik
              initialValues={{
                name: "",
                exit_points: "",
                multipliers: "",
                welcome_bonus: "",
                loyalty_type_id: Number(storedValue),
                point_type: timeframe,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, status }) => (
                <Form
                  className="go-shadow px-3 d-flex justify-content-between"
                  style={{
                    height: "100%",
                    flexDirection: "column",
                    marginRight: "26px",
                  }}
                >
                  <div>
                    <div className="row">
                      <div className="col-md-3 col-sm-11 mb-3">
                        <fieldset className="border">
                          <legend className="float-none">
                            Tier Name<span>*</span>
                          </legend>
                          <Field
                            type="text"
                            name="name"
                            placeholder="Enter Tier Name"
                            className="form-control border-0"
                          />
                        </fieldset>
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-3 col-sm-11 mb-3">
                        <fieldset className="border">
                          <legend className="float-none">
                            Exit Points<span>*</span>
                          </legend>
                          <Field
                            type="text"
                            name="exit_points"
                            placeholder="Enter Exit Points"
                            className="form-control border-0"
                          />
                        </fieldset>
                        <ErrorMessage
                          name="exit_points"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-3 col-sm-11 mb-3">
                        <fieldset className="border">
                          <legend className="float-none">
                            Set Multipliers<span>*</span>
                          </legend>
                          <Field
                            type="text"
                            name="multipliers"
                            placeholder="Enter Set Multipliers"
                            className="form-control border-0"
                          />
                        </fieldset>
                        <ErrorMessage
                          name="multipliers"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-3 col-sm-11 mb-3">
                        <fieldset className="border">
                          <legend className="float-none">
                            Welcome Bonus<span>*</span>
                          </legend>
                          <Field
                            type="text"
                            name="welcome_bonus"
                            placeholder="Enter Welcome Bonus"
                            className="form-control border-0"
                          />
                        </fieldset>
                        <ErrorMessage
                          name="welcome_bonus"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    {tiers.map((tier, index) => (
                      <div className="row mb-3" key={index}>
                        <div className="col-md-3 col-sm-11">
                          <fieldset className="border">
                            <legend className="float-none">
                              Tier Name<span>*</span>
                            </legend>
                            <Field
                              type="text"
                              name={`name${index}`}
                              placeholder="Enter Tier Name"
                              className="form-control border-0"
                              value={tier.name}
                              onChange={(e) => {
                                const updatedTiers = [...tiers];
                                updatedTiers[index].name = e.target.value;
                                setTiers(updatedTiers);
                              }}
                            />
                          </fieldset>
                          <ErrorMessage
                            name={`name${index}`}
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-3">
                          <fieldset className="border">
                            <legend className="float-none">
                              Exit Points<span>*</span>
                            </legend>
                            <Field
                              type="number"
                              name={`exit_points${index}`}
                              placeholder="Enter Exit Points"
                              className="form-control border-0"
                              value={tier.exit_points}
                              onChange={(e) => {
                                const updatedTiers = [...tiers];
                                updatedTiers[index].exit_points =
                                  e.target.value;
                                setTiers(updatedTiers);
                              }}
                            />
                          </fieldset>
                          <ErrorMessage
                            name={`exit_points${index}`}
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-3">
                          <fieldset className="border">
                            <legend className="float-none">
                              Set Multipliers<span>*</span>
                            </legend>
                            <Field
                              type="number"
                              name={`multipliers${index}`}
                              placeholder="Enter Set Multipliers"
                              className="form-control border-0"
                              value={tier.multipliers}
                              onChange={(e) => {
                                const updatedTiers = [...tiers];
                                updatedTiers[index].multipliers =
                                  e.target.value;
                                setTiers(updatedTiers);
                              }}
                            />
                          </fieldset>
                          <ErrorMessage
                            name={`multipliers${index}`}
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-3">
                          <fieldset className="border">
                            <legend className="float-none">
                              Welcome Bonus<span>*</span>
                            </legend>
                            <Field
                              type="number"
                              name={`welcome_bonus${index}`}
                              placeholder="Enter Welcome Bonus"
                              className="form-control border-0"
                              value={tier.welcome_bonus}
                              onChange={(e) => {
                                const updatedTiers = [...tiers];
                                updatedTiers[index].welcome_bonus =
                                  e.target.value;
                                setTiers(updatedTiers);
                              }}
                            />
                          </fieldset>
                          <ErrorMessage
                            name={`welcome_bonus${index}`}
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-12 text-end">
                          <button
                            type="button"
                            className="btn btn-danger" style={{ padding: '10px'}}
                            onClick={() => removeTierRow(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-x"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="row mb-3">
                      <div className="col-md-12 ">
                        <button
                          type="button"
                          className="purple-btn1"
                          onClick={addNewTierRow}
                        >
                          Add New Tier
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-center align-items-center">
                    <div className="col-md-2">
                      <button
                        type="submit"
                        className="purple-btn1 w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "Submit"}
                      </button>
                    </div>
                    <div className="col-md-2">
                      <button
                        type="reset"
                        className="purple-btn2 w-100"
                        onClick={() => {
                          setTiers([]);
                          cancelStep()
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  {status?.success && (
                    <div className="text-success">{status.success}</div>
                  )}
                  {status?.error && (
                    <div className="text-danger">{status.error}</div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

NewTier.propTypes = {
  tiers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      exit_points: PropTypes.number.isRequired,
      multipliers: PropTypes.number.isRequired,
      welcome_bonus: PropTypes.number.isRequired,
      point_type: PropTypes.string.isRequired,
    })
  ),
};

export default NewTier;
