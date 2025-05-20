import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '../types/transaction';

export default function TransactionForm({ onAdd }: { onAdd: (t: Transaction) => void }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    const transaction: Transaction = {
      ...data,
      id: uuidv4(),
      amount: parseFloat(data.amount),
      type: data.type,
    };
    onAdd(transaction);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-group">
      <input placeholder="Description" {...register("description")} required />
      <input type="number" placeholder="Amount" {...register("amount")} required />
      <input type="date" {...register("date")} required />
      <select {...register("category")} required>
        <option value="">Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Beauty">Beauty</option>
        <option value="Subscriptions">Subscriptions</option>
        <option value="Accommodation">Accommodation</option>
        <option value="Misc">Misc</option>
      </select>
      <select {...register("type")} required>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
}
