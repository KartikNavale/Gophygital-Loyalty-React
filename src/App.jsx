import './App.css';
import Members from './components/Members';
import Tiers from './components/Tiers';
import MemberDetails from './components/MemberDetails';
import RuleEngine from './components/RuleEngine';
import TierSetting from './components/TierSetting';
import Segment from './components/Segment';
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
          <Route path='/MemberDetails' element={<MemberDetails/>} />
          <Route path='/RuleEngine' element={<RuleEngine />} />
          <Route path='/TierSetting' element={<TierSetting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
