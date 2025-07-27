export interface Transaction {
  id: string;
  amount: number;
  category:
    | "travel"
    | "food"
    | "entertainment"
    | "bills"
    | "shopping"
    | "other";
  note: string;
  type: "income" | "expense";
  date: string;
}
