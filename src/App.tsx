import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
// import CompaniesPage from './pages/CompaniesPage';
// import ReviewsPage from './pages/ReviewsPage';
// import ServicesPage from './pages/ServicesPage';
// import AllJobsPage from './pages/AllJobsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/jobs" element={<AllJobsPage />} /> */}
        <Route path="/job/:company/:title/:id" element={<JobDetailsPage />} />
        {/* <Route path="/companies" element={<CompaniesPage />} /> */}
        {/* <Route path="/reviews" element={<ReviewsPage />} /> */}
        {/* <Route path="/services" element={<ServicesPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
