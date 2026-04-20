import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CashflowChart({ transactions }: any) {
  const monthly: Record<string, { income: number; expense: number }> = {};

  transactions.forEach((t: any) => {
    const date = new Date(t.id);
    const key = `${date.getMonth() + 1}/${date.getFullYear()}`;

    if (!monthly[key]) monthly[key] = { income: 0, expense: 0 };

    if (t.type === "Income") monthly[key].income += t.amount;
    else monthly[key].expense += t.amount;
  });

  const labels = Object.keys(monthly);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: labels.map(m => monthly[m].income),
        backgroundColor: "#00c853",
      },
      {
        label: "Expense",
        data: labels.map(m => monthly[m].expense),
        backgroundColor: "#d32f2f",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 IMPORTANT FIX
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 12, // smaller legend
        },
      },
    },
    layout: {
      padding: {
        bottom: 0, // 🔥 removes that huge gap
      },
    },
  };

  return (
    <div style={{ height: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

