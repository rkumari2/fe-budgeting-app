export interface Transaction {
  id: string;
  amount: number;
  category: string;
  note: string;
  type: "income" | "expense";
  date: string;
}
