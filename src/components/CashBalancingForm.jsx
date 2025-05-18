import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CashBalancingForm.css"; // Assuming external CSS, optional
function CashBalancingForm() {
  const [form, setForm] = useState({
    safeDrops: "",
    cpo1: "",
    cpo2: "",
    cpo3: "",
    driveAways: "",
    pumpTests: "",
    usDollars: "",
    shiftEndFloat: "",
    shiftStartFloat: "",
    shiftSales: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const storedFloat = localStorage.getItem("shiftEndFloat");
    setForm((prev) => ({
      ...prev,
      shiftEndFloat: storedFloat ? parseFloat(storedFloat).toFixed(2) : "",
    }));
  }, []);

  const toNum = (val) => parseFloat(val) || 0;

  const subtotalRevenue = (
    toNum(form.safeDrops) +
    toNum(form.cpo1) +
    toNum(form.cpo2) +
    toNum(form.cpo3) +
    toNum(form.driveAways) +
    toNum(form.pumpTests) +
    toNum(form.usDollars) +
    toNum(form.shiftEndFloat)
  ).toFixed(2);

  const totalRevenue = (
    toNum(subtotalRevenue) - toNum(form.shiftStartFloat)
  ).toFixed(2);

  const difference = (
    toNum(totalRevenue) - toNum(form.shiftSales)
  ).toFixed(2);

    const handleSubmit = () => {
    localStorage.setItem("cashBalancingForm", JSON.stringify(form));
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Cash Balancing</h2>
      <form className="form-list">
        {[
            ["Safe Drops", "safeDrops"],
            ["CPO 1", "cpo1"],
            ["CPO 2", "cpo2"],
            ["CPO 3", "cpo3"],
            ["Drive Aways", "driveAways"],
            ["Pump Tests", "pumpTests"],
            ["US $", "usDollars"],
            ["Shift End Float", "shiftEndFloat"],
            ["Shift Start Float", "shiftStartFloat"],
            ["Shift Sales in Bulloch", "shiftSales"],
        ].map(([label, key]) => (
            <div key={key} className="form-row">
            <label htmlFor={key}>{label}</label>
            <input
                id={key}
                type="number"
                name={key}
                value={form[key]}
                onChange={handleChange}
                disabled={key === "shiftEndFloat"}
                min="0"
                step="any"
            />
            </div>
        ))}
        </form>

      <div className="totals">
        <p><strong>Subtotal Revenue:</strong> ${subtotalRevenue}</p>
        <p><strong>Total Revenue:</strong> ${totalRevenue}</p>
        <p><strong>Difference (+/-):</strong> ${difference}</p>
      </div>
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

export default CashBalancingForm;
