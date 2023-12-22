export type LoginFields = {
  email: string;
  password: string;
};

export type RegisterFields = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type GettingStartedFields = {
  name: string;
  balance: number;
  currency: string;
  id: number;
  token: string;
};

export type AddCategoryFields = {
  type: "SPENDING" | "INCOME";
  description: string;
};

export type AddEntryFields = {
  name: string;
  amount: number;
  date: string;
  type: "SPENDING" | "INCOME";
  description: string;
  category_id: number;
};

export type UpdateAccountFields = {
  name: string;
  balance: number;
};