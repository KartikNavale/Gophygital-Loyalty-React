import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import SetupSidebar from '../../components/SetupSidebar'; // <-- new import
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function RootLayout() {
  const location = useLocation();
  const [selectedNav, setSelectedNav] = useState("home");

  // Determine if the current path includes "tiers"
  const noTier = location.pathname.includes('/tiers'); // Adjust this condition as needed

  return (
    <main className="h-100 w-100">
      <Header noTier={noTier} onNavChange={setSelectedNav} />
      <div className="main-content">
        <div>
          {selectedNav === "setup" ? <SetupSidebar /> : <Sidebar />}
        </div>
        <div className="website-content flex-grow-1">
          <Outlet />
          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </div>
    </main>
  );
}
