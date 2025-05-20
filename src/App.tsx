import './styles/components/App.css';
import { useEffect, useState } from 'react';
import { Transaction } from './types/transaction';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';

const defaultData: Transaction[] = [
  { id: '1', description: 'Netflix', amount: 500, category: 'Subscriptions', date: '2025-05-01', type: 'expense' },
  { id: '2', description: 'Dinner', amount: 1200, category: 'Food', date: '2025-05-02', type: 'expense' },
  { id: '3', description: 'Salon', amount: 800, category: 'Beauty', date: '2025-05-03', type: 'expense' },
  { id: '4', description: 'Uber', amount: 300, category: 'Travel', date: '2025-05-04', type: 'expense' },
  { id: '5', description: 'Rent', amount: 15000, category: 'Accommodation', date: '2025-05-01', type: 'expense' }
];

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load transactions from localStorage OR insert defaults
  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      localStorage.setItem('transactions', JSON.stringify(defaultData));
      setTransactions(defaultData);
    }
  }, []);

  const addTransaction = (t: Transaction) => {
    const updated = [...transactions, t];
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  const clearAll = () => {
    localStorage.removeItem('transactions');
    setTransactions([]);
  };

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>
      <TransactionForm onAdd={addTransaction} />
      <button className="clear-button" onClick={clearAll}>Clear All</button>
      <div className='homepage-display'>
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      <ExpenseChart transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
