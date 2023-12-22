import { Account } from "../types/Account";

export type User = {
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  updated_at: string;
  has_account: number;
};

export type UserContextType = {
  token: string;
  setToken: (token: string) => void;
  user: User;
  setUser: (user: User) => void;
  account: Account;
  setAccount: (account: Account) => void;
};
