import { Routes, Route } from "react-router-dom";
import CashTrayForm from "./components/CashTrayForm";
import CashBalancingForm from "./components/CashBalancingForm";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Routes> {/* Just Routes here, no BrowserRouter */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/cash-tray" element={<CashTrayForm />} />
      <Route path="/cash-balancing" element={<CashBalancingForm />} />
    </Routes>
  );
}

export default App;
