import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "../styles/style.css";
import SubHeader from "../components/SubHeader";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Tier Name is required"),
  exit_points: Yup.number()
    .required("Exit Points are required")
    .positive("Exit Points must be a positive number"),
  multipliers: Yup.number()
    .required("Multipliers are required")
    .positive("Multipliers must be a positive number"),
  welcome_bonus: Yup.number()
    .required("Welcome Bonus is required")
    .positive("Welcome Bonus must be a positive number"),
  point_type: Yup.string()
    .required("Point type is required")
    .oneOf(["lifetime", "yearly"], "Invalid point type"),
});

const Tiers = () => {
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    const storedValue = sessionStorage.getItem("selectedId");
    const fetchTiers = async () => {
      try {
        const response = await axios.get(
          `https://staging.lockated.com/loyalty/tiers.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&&q[loyalty_type_id_eq]=${storedValue}`
        );
        if (response && response.data) {
          setTiers(response.data.reverse());
          setFilteredItems(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch tiers data.");
        setLoading(false);
      }
    };

    fetchTiers();
  }, [tiers]);

  const handleEditClick = (tier) => {
    setSelectedTier(tier);
    setShowModal(true);
  };

  const handleFormSubmit = async (values) => {
    if (selectedTier) {
      try {
        // Optimistically update the state to reflect the new changes
        setTiers((prevTiers) =>
          prevTiers.map((tier) =>
            tier.id === selectedTier.id ? { ...tier, ...values } : tier
          )
        );

        const response = await axios.put(
          `https://staging.lockated.com/loyalty/tiers/${selectedTier.id}.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`,
          { loyalty_tier: values },
          { headers: { "Content-Type": "application/json" } }
        );

        // Double-check update after response if needed
        if (response && response.data) {
          setTiers((prevTiers) =>
            prevTiers.map((tier) =>
              tier.id === selectedTier.id
                ? { ...tier, ...response.data.loyalty_tier }
                : tier
            )
          );
        }

        handleCloseModal();
      } catch (error) {
        alert(`Error: ${error.message}`);
        // Optional: Revert optimistic update if there's an error
        setTiers((prevTiers) => prevTiers); // Re-fetch original state if needed
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTier(null);
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    const filtered = tiers.filter((rule) => {
      const ruleName = rule.name ? rule.name.toLowerCase() : ""; // Ensure rule.name is not null
      return ruleName.includes(searchTerm.toLowerCase());
    });

    console.log("filtered :----", filtered);

    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredItems(tiers);
    setCurrentPage(1);
  };

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
      if (page > 0 && page <= totalPages) {
        onPageChange(page);
      }
    };

    return (
      <nav>
        <ul className="pagination justify-content-center align-items-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="purple-btn1"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          <li className={`page-item active`}>{`Page ${currentPage}  `}</li>
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="purple-btn1"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <>
      <div className="w-100">
        <SubHeader />
        <div className="module-data-section mt-2 px-3">
          <p className="pointer">
            <span className="text-secondary">Tiers</span> &gt; Tier List
          </p>
          <h5 className="mb-3">Tiers</h5>
          <div className="loyalty-header">
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/new-tier">
                <button className="purple-btn1 rounded-3">
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
                  <span>New Tier</span>
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

            {loading && <p>Loading tiers...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
              <div
                className="tbl-container mt-4"
                style={{
                  height: "100%",
                  overflowY: "hidden",
                  margin: "0 100px",
                  textAlign: "center",
                }}
              >
                <table className="w-100" style={{ tableLayout: "fixed" }}>
                  <thead>
                    <tr>
                      <th style={{ width: "20%" }}>Tier Name</th>
                      <th style={{ width: "20%" }}>Exit Points</th>
                      <th style={{ width: "20%" }}>Multipliers</th>
                      <th style={{ width: "20%" }}>Welcome Bonus</th>
                      <th style={{ width: "20%" }}>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((tier) => (
                      <tr key={tier.id}>
                        <td>{tier.name}</td>
                        <td>{tier.exit_points}</td>
                        <td>{tier.multipliers}x</td>
                        <td>{tier.welcome_bonus} Points</td>
                        <td>
                          <button
                            className="btn btn-link"
                            onClick={() => handleEditClick(tier)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fillRule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Tier</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedTier && (
                  <Formik
                    initialValues={{
                      name: selectedTier.name || "",
                      exit_points: selectedTier.exit_points || 0,
                      multipliers: selectedTier.multipliers || 0,
                      welcome_bonus: selectedTier.welcome_bonus || 0,
                      point_type: selectedTier.point_type || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                  >
                    {({ values, handleChange }) => (
                      <Form>
                        <div className="row">
                          <div className="col-6 mb-3">
                            <fieldset className="border col-md-11 m-2 col-sm-11">
                              <legend
                                className="float-none"
                                style={{ marginLeft: "15px !important" }}
                              >
                                Tier Name<span>*</span>
                              </legend>
                              <Field
                                type="text"
                                className="form-control border-0"
                                id="tierName"
                                name="name"
                              />
                            </fieldset>
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="col-6 mb-3">
                            <fieldset className="border col-md-11 m-2 col-sm-11">
                              <legend
                                className="float-none"
                                style={{ marginLeft: "15px !important" }}
                              >
                                Exit Points<span>*</span>
                              </legend>
                              <Field
                                type="number"
                                className="form-control border-0"
                                id="exitPoints"
                                name="exit_points"
                                value={values.exit_points}
                                onChange={handleChange}
                              />
                            </fieldset>

                            <ErrorMessage
                              name="exit_points"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-6 mb-3">
                            <fieldset className="border col-md-11 m-2 col-sm-11">
                              <legend
                                className="float-none"
                                style={{ marginLeft: "15px !important" }}
                              >
                                Multipliers
                                <span>*</span>
                              </legend>
                              <Field
                                type="number"
                                className="form-control border-0"
                                id="multipliers"
                                name="multipliers"
                                value={values.multipliers}
                                onChange={handleChange}
                              />
                            </fieldset>

                            <ErrorMessage
                              name="multipliers"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="col-6 mb-3">
                            <fieldset className="border col-md-11 m-2 col-sm-11">
                              <legend
                                className="float-none"
                                style={{ marginLeft: "15px !important" }}
                              >
                                Welcome Bonus<span>*</span>
                              </legend>
                              <Field
                                type="number"
                                className="form-control border-0"
                                id="welcomeBonus"
                                name="welcome_bonus"
                                value={values.welcome_bonus}
                                onChange={handleChange}
                              />
                            </fieldset>

                            <ErrorMessage
                              name="welcome_bonus"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 mb-3">
                            <fieldset className="border col-md-11 m-2 col-sm-11">
                              <legend
                                className="float-none"
                                style={{ marginLeft: "15px !important" }}
                              >
                                Point Type<span>*</span>
                              </legend>
                              <Field
                                as="select" // Change to select
                                className="form-control border-0"
                                id="pointType"
                                name="point_type"
                                onChange={handleChange}
                                value={values.point_type}
                              >
                                <option value="lifetime" label="Life Time" />
                                <option value="yearly" label="Yearly" />
                              </Field>
                            </fieldset>

                            <ErrorMessage
                              name="point_type"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="row mt-2 justify-content-center align-items-center">
                          <div className="col-4">
                            <button type="submit" className="purple-btn1 w-100">
                              Submit
                            </button>
                          </div>
                          <div className="col-4">
                            <button
                              type="reset"
                              className="purple-btn2 w-100"
                              onClick={handleCloseModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

// Add PropTypes for type checking
Tiers.propTypes = {
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

export default Tiers;
