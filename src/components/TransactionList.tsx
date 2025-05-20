import { Transaction } from '../types/transaction';

export default function TransactionList({
  transactions,
  onDelete
}: {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}) {
  return (
    <ul className="transaction-list">
      {transactions.map(t => (
        <li key={t.id} className="transaction-item">
          <span>
            {t.date} - {t.description} - ₹{t.amount} ({t.category})
          </span>
          <button onClick={() => onDelete(t.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
