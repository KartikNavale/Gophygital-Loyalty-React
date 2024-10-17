import './App.css';
import './styles/style.css';

import Members from './pages/members';
import Tiers from './pages/tier';
import MemberDetails from './pages/member-details';
import RuleEngine from './pages/rule-engine';
import TierSetting from './pages/tier-setting';
import Segment from './pages/segment';
import Campaign from './pages/campaign';
import NewCampaign from './pages/new-campaign';
import NewSegment from './pages/new-segment';
import ViewRuleEngine from './pages/view-rule-engine';
import CreateRuleEngine from './pages/create-rule-engine';
import Test from './pages/test';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewTier from './pages/new-tier';
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
          <Route path='/test' element={<ProtectedRoute><Test /></ProtectedRoute>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
