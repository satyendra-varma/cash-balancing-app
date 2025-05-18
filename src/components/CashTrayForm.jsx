import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CashTrayForm.css';

function CashTrayForm() {
  const [counts, setCounts] = useState({
    "20": "",
    "10": "",
    "5": "",
    "2": "",
    "1": "",
    "0.25": "",
    "0.10": "",
    "0.05": "",
  });

  const navigate = useNavigate();

  const handleChange = (e, denom) => {
    setCounts({
      ...counts,
      [denom]: e.target.value,
    });
  };

  const calculateTotal = () => {
    return Object.entries(counts).reduce((sum, [denom, count]) => {
      const numericCount = parseFloat(count);
      return sum + (isNaN(numericCount) ? 0 : numericCount * parseFloat(denom));
    }, 0).toFixed(2);
  };

  const handleSubmit = () => {
    const total = calculateTotal();
    localStorage.setItem("shiftEndFloat", total);
    navigate("/cash-balancing");
  };

  const getLabel = (denom) => {
    const billDenoms = ["5", "10", "20"];
    return billDenoms.includes(denom)
      ? `# of $${denom} bills:`
      : `# of $${denom}:`;
  };

  return (
    <div className="page-container">
      <h2>Cash Tray Breakdown</h2>
      {Object.entries(counts).map(([key, value]) => (
        <div key={key} className="form-row">
            <label>{getLabel(key)}</label>
            <input
            type="number"
            min="0"
            step="1"
            value={value}
            onChange={(e) => handleChange(e, key)}
            />
        </div>
        ))}
      <h3>Total Float: ${calculateTotal()}</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
        <button onClick={() => navigate(-1)} style={{ flex: 1, marginRight: "0.5rem" }}>
            Back
        </button>
        <button onClick={handleSubmit} style={{ flex: 1, marginLeft: "0.5rem" }}>
            Submit
        </button>
      </div>

    </div>
  );
}

export default CashTrayForm;
