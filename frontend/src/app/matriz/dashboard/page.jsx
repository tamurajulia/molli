"use client";

import Chart from "@/components/Charts/charts";
import KpiCards from "@/components/KpiCards/kpicards";
import "./dashboard.css";

export default function Dashboard() {


  return (
    <div className="container" id="dashboard-pdf">
      

      <KpiCards />
      <Chart />
    </div>
  );
}
