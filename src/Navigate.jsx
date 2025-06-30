import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import App from './App';

export const navigate = useNavigate();

return (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);