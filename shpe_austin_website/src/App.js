import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ExecutiveBoard from './pages/ExecutiveBoard';
import NationalPrograms from './pages/NationalPrograms';
import Events from './pages/Events';
import Membership from './pages/Membership';
import Donations from './pages/Donations';
import Sponsors from './pages/Sponsors';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/executive-board" element={<ExecutiveBoard />} />
        <Route path="/national-programs" element={<NationalPrograms />} />
        <Route path="/events" element={<Events />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/sponsors" element={<Sponsors />} />
      </Routes>
    </Router>
  );
}

export default App;
