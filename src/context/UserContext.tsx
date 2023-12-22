import React, { createContext, useState } from "react";
import constants from "../constants";
import { Account } from "../types/Account";

import { UserContextType, User } from "./User";

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: any) => {
  const [token, setToken] = useState("");
  const [account, setAccount] = useState<Account>(constants.DEFAULT_ACCOUNT);
  const [user, setUser] = useState<User>(constants.DEFAULT_USER);

  return (
    <UserContext.Provider
      value={{ token, setToken, user, setUser, account, setAccount }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
