export type Entry = {
  account_id: number;
  date: string;
  amount: string;
  category_id: number;
  created_at: string;
  deleted_at: string;
  description: string;
  id: number;
  name: string;
  type: "SPENDING" | "INCOME";
  updated_at: string;
};
