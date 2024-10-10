import './App.css';
import Members from './components/Members';
import Tiers from './components/Tiers';
import MemberDetails from './components/MemberDetails';
import RuleEngine from './components/RuleEngine';
import TierSetting from './components/TierSetting';
import Segment from './components/Segment';
import Campaign from './components/Campaign';
import NewCampaign from './components/NewCampaign';
import NewSegment from './components/NewSegment';
import ViewRuleEngine from './components/CreateRuleEngine';
import CreateRuleEngine from './components/ViewRuleEngine';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewTier from './components/NewTier';
import SignIn from './login/SignIn';
import ProtectedRoute from './login/ProtectedRoute'; // Import your ProtectedRoute

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/login' element={<SignIn />} />
          
          {/* Wrap all routes with ProtectedRoute */}
          <Route path='/' element={<ProtectedRoute><Members /></ProtectedRoute>} />
          <Route path='/members' element={<ProtectedRoute><Members /></ProtectedRoute>} />
          <Route path='/tiers' element={<ProtectedRoute><Tiers /></ProtectedRoute>} />
          <Route path='/segment' element={<ProtectedRoute><Segment /></ProtectedRoute>} />
          <Route path='/campaign' element={<ProtectedRoute><Campaign /></ProtectedRoute>} />
          <Route path='/new-segment' element={<ProtectedRoute><NewSegment /></ProtectedRoute>} />
          <Route path='/new-campaign' element={<ProtectedRoute><NewCampaign /></ProtectedRoute>} />
          <Route path='/member-details' element={<ProtectedRoute><MemberDetails /></ProtectedRoute>} />
          <Route path='/rule-engine' element={<ProtectedRoute><RuleEngine /></ProtectedRoute>} />
          <Route path='/create-rule-engine' element={<ProtectedRoute><CreateRuleEngine /></ProtectedRoute>} />
          <Route path='/view-rule-engine' element={<ProtectedRoute><ViewRuleEngine /></ProtectedRoute>} />
          <Route path='/tier-setting' element={<ProtectedRoute><TierSetting /></ProtectedRoute>} />
          <Route path='/new-tier' element={<ProtectedRoute><NewTier /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
