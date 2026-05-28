import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TicketProvider } from './context/TicketContext';
import Navbar from './components/Navbar/Navbar';
import ReservationPage from './pages/ReservationPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <TicketProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/reservation" replace />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </TicketProvider>
  );
}

export default App;