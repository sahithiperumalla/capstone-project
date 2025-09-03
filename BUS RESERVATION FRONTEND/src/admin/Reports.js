import React, { useState, useEffect } from "react";
import api from "../api/Api";

function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    api.get("/reports/sales").then((res) => setReport(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Sales Report</h3>
      {report && (
        <div>
          <p>Total Revenue: ₹{report.totalRevenue}</p>
          <p>Total Bookings: {report.totalBookings}</p>
        </div>
      )}
    </div>
  );
}

export default Reports;
