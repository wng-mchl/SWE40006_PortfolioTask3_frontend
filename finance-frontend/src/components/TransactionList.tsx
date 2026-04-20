import type { Transaction } from "../App";

type Props = {
  transactions: Transaction[];

  // editing state
  editingId: number | null;
  editName: string;
  editAmount: string;

  // handlers
  setEditName: (value: string) => void;
  setEditAmount: (value: string) => void;
  startEdit: (t: Transaction) => void;
  saveEdit: (id: number) => void;
  deleteTransaction: (id: number) => void;
};

export default function TransactionList({
  transactions,
  editingId,
  editName,
  editAmount,
  setEditName,
  setEditAmount,
  startEdit,
  saveEdit,
  deleteTransaction,
}: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            {editingId === t.id ? (
              <>
                <td>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </td>

                <td>
                  <input
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                  />
                </td>

                <td>{t.type}</td>

                <td>
                  {t.date
                    ? new Date(t.date).toLocaleDateString()
                    : new Date(t.id).toLocaleDateString()}
                </td>

                <td>
                  <button onClick={() => saveEdit(t.id)}>Save</button>
                </td>
              </>
            ) : (
              <>
                <td>{t.name}</td>
                <td>RM {t.amount}</td>
                <td>{t.type}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>

                <td>
                  <button id="editButton" onClick={() => startEdit(t)}>
                    Edit
                  </button>
                  <button
                    id="deleteButton"
                    onClick={() => deleteTransaction(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

