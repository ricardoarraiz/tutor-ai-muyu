import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import Tutor from './pages/Tutor';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}