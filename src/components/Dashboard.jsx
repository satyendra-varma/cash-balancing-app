import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './Dashboard.css';

function Dashboard() {
  const [cashData, setCashData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("cashBalancingForm");
    if (stored) {
      setCashData(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="page-container">
      <h1>Dashboard</h1>

      <div className="form-link-wrapper">
        <Link to="/cash-tray">
          <button className="primary-button">Start Cash Tray Form</button>
        </Link>
      </div>

      {cashData ? (
        <div className="cash-summary">
          <h3>Last Submitted Cash Balancing</h3>
          <ul>
            {Object.entries(cashData).map(([key, value]) => (
              <li key={key}>
                <span>{key}</span>
                <strong>${value}</strong>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="no-data">No cash balancing data available.</p>
      )}
    </div>
  );
}

export default Dashboard;
