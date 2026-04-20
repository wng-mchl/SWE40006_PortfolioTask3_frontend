import { useState, useEffect } from "react";
import "./styles/App.css";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import CashflowChart from "./components/CashflowBarChart";
import SummaryCard from "./components/CardView";

export type Transaction = {
  id: number;
  name: string;
  amount: number;
  type: "Income" | "Expense";
  date: string;
};

function App() {

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const incomeTransactions = transactions.filter(t => t.type === "Income");

  const avgIncome =
    incomeTransactions.length > 0
      ? incomeTransactions.reduce((acc, t) => acc + t.amount, 0) /
      incomeTransactions.length
      : 0;

  const expenseTransactions = transactions.filter(t => t.type === "Expense");

  const avgExpense =
    expenseTransactions.length > 0
      ? expenseTransactions.reduce((acc, t) => acc + t.amount, 0) /
      expenseTransactions.length
      : 0;

  const total = transactions.reduce((acc, t) => {
    return t.type === "Income"
      ? acc + t.amount
      : acc - t.amount;
  }, 0);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);



  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // handles transaction editing
  const startEdit = (t: Transaction) => {
    setEditingId(t.id);
    setEditName(t.name);
    setEditAmount(t.amount.toString());
  };

  const saveEdit = (id: number) => {
    setTransactions(transactions.map(t =>
      t.id === id
        ? { ...t, name: editName, amount: parseFloat(editAmount) }
        : t
    ));
    setEditingId(null);
  };


  return (
    <div className="container">
      <div id="header">
        {/* the noticeable change for high distinction task */}
        <h1>Finance Tracker v1.1.0</h1> 
        <button className="toggle" onClick={()  => setDarkMode(!darkMode)}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className="top">
        <div className="text-view">
          <SummaryCard title="Average Balance" value={total} />

          <SummaryCard title="Average Income per entry" value={avgIncome} />
          
          <SummaryCard title="Average Expense per entry " value={avgExpense} />
        </div>

        <div className="card" id="cashflow-card">
          <h2>Monthly Cashflow</h2>
          <div className="chart-container">
            <CashflowChart transactions={transactions} />
          </div>
        </div>
      </div>

      {/* bottom section */}

      <div className="bottomRow">
        <div className="form" style={{ marginBottom: "20px" }}>
          <TransactionForm addTransaction={addTransaction} />
          <TransactionList
            transactions={transactions}
            editingId={editingId}
            editName={editName}
            editAmount={editAmount}
            setEditName={setEditName}
            setEditAmount={setEditAmount}
            startEdit={startEdit}
            saveEdit={saveEdit}
            deleteTransaction={deleteTransaction}
          />
        </div>

      </div>
    </div>
  );
}

export default App;