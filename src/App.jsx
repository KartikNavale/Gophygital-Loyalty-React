import "./App.css";
import "./styles/style.css";

import Members from "./pages/members";
import Tiers from "./pages/tier";
import MemberDetails from "./pages/member-details";
import RuleEngine from "./pages/rule-engine";
import TierSetting from "./pages/tier-setting";
import Segment from "./pages/segment";
import Campaign from "./pages/campaign";
import NewCampaign from "./pages/new-campaign";
import NewSegment from "./pages/new-segment";
import ViewRuleEngine from "./pages/view-rule-engine";
import CreateRuleEngine from "./pages/create-rule-engine";
import Test from "./pages/test";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NewTier from "./pages/new-tier";
import SignIn from "./login/SignIn";
import ProtectedRoute from "./login/ProtectedRoute"; // Import your ProtectedRoute
import RootLayout from "./pages/Layout/RootLayout";

function App() {
  const isAuthenticated = sessionStorage.getItem("spree_api_key") !== null;

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/members" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/"
            element={
              isAuthenticated ? <RootLayout /> : <Navigate to="/login" />
            }
          >
            <Route index element={<Navigate to="/members" />} />
            <Route path="/members" element={<Members />} />
            <Route path="/tiers" element={<Tiers />} />
            <Route path="/segment" element={<Segment />} />
            <Route path="/campaign" element={<Campaign />} />
            <Route path="/new-segment" element={<NewSegment />} />
            <Route path="/new-campaign" element={<NewCampaign />} />
            {/*  <Route path='/member-details' element={<MemberDetails />} />  */}
            <Route path="/member-details/:id" element={<MemberDetails />} />
            <Route path="/rule-engine" element={<RuleEngine />} />
            <Route path="/create-rule-engine" element={<CreateRuleEngine />} />
            <Route path="/view-rule-engine" element={<ViewRuleEngine />} />
            <Route path="/tier-setting" element={<TierSetting />} />
            <Route path="/new-tier" element={<NewTier />} />
            <Route path="/test" element={<Test />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
