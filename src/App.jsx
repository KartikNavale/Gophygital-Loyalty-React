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
import ViewRuleEngine from './components/ViewRuleEngine';
import CreateRuleEngine from './components/CreateRuleEngine'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Members />} />
          <Route path='/Members' element={<Members />} />
          <Route path='/Tiers' element={<Tiers />} />
          <Route path='/Segment' element={<Segment />} />
          <Route path='/Campaign' element={<Campaign />} />
          <Route path='/NewSegment' element={<NewSegment />} />
          <Route path='/NewCampaign' element={<NewCampaign />} />
          <Route path='/MemberDetails' element={<MemberDetails/>} />
          <Route path='/RuleEngine' element={<RuleEngine />} />
          <Route path='/CreateRuleEngine' element={<CreateRuleEngine />} />
          <Route path='/ViewRuleEngine' element={<ViewRuleEngine />} />
          <Route path='/TierSetting' element={<TierSetting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
