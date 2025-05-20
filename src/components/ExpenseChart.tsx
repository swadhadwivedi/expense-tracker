import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Transaction } from '../types/transaction';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#D65DB1", "#FF6F91"];

export default function ExpenseChart({ transactions }: { transactions: Transaction[] }) {
  const pieData = Object.entries(
    transactions.reduce((acc, tx) => {
      if (tx.type === "expense") {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      }
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div>
      <h2>Spending by Category</h2>
      <PieChart width={400} height={300}>
        <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={120} label>
          {pieData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
