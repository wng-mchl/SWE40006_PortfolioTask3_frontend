import { useState } from "react";
import type { FormEvent } from "react";
import type { Transaction } from "../App";

type Props = {
  addTransaction: (transaction: Transaction) => void;
};

export default function TransactionForm({ addTransaction }: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"Income" | "Expense">("Income");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTransaction({
      id: Date.now(),
      name,
      amount,
      type,
      date: new Date().toISOString(),
    });
    setName("");
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Transaction Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value as any)}>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

