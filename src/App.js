import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ShpeHatAnimation from './pages/ShpeHatAnimation';

function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen font-sans">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">SHPE Austin</h1>
      <p className="text-gray-600 text-lg">Welcome to the SHPE Austin website.</p>
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shpe-hat" element={<ShpeHatAnimation />} />
      </Routes>
    </HashRouter>
  );
}
