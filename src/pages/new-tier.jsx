import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SubHeader from "../components/SubHeader";

const NewTier = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="website-content">
        <SubHeader />
        <div className="module-data-section mt-2">
          <p className="pointer">
            <span className="text-secondary">Tier</span> &gt; New Tier
          </p>
          <h5 class="mb-3 title">NEW TIER</h5>
          <div className="go-shadow me-3">
            <div className="row ms-3">
              <fieldset className="border col-md-2 m-2 col-sm-11">
                <legend className="float-none">
                  Tier Name<span>*</span>
                </legend>
                <input type="text" placeholder="Enter Tier Name" />
              </fieldset>

              <fieldset className="border col-md-2 m-2 col-sm-11">
                <legend className="float-none">
                  Exit points<span>*</span>
                </legend>
                <input type="text" placeholder="Enter Exit points" />
              </fieldset>

              <fieldset className="border col-md-2 m-2 col-sm-11">
                <legend className="float-none">
                  Set multipliers<span>*</span>
                </legend>
                <input type="text" placeholder="Enter Set multipliers" />
              </fieldset>

              <fieldset className="border col-md-2 m-2 col-sm-11">
                <legend className="float-none">
                  welcome bonus<span>*</span>
                </legend>
                <input type="text" placeholder="Enter welcome bonus" />
              </fieldset>
            </div>
            <div>
              <button className="purple-btn1 ms-4">Add New Tire</button>
            </div>
          </div>
          <div className="row mt-2 justify-content-center">
            <div className="col-md-2">
              <button className="purple-btn1 w-100" fdprocessedid="u33pye">
                Submit
              </button>
            </div>
            <div className="col-md-2">
              <button className="purple-btn2 w-100" fdprocessedid="af5l5g">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default NewTier;
