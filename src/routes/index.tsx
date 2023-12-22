import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import HomeLayout from "../components/HomeLayout";
import ProtectedLayout from "../components/ProtectedLayout";

import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Register from "./Register";
import GettingStarted from "./GettingStarted";
import Accounts from "./Accounts";
import { useLocalStorage } from "../hooks/useLocalStorage";
import constants from "../constants";
import authService from "../services/authService";
import { UserContextType } from "../context/User";
import { UserContext } from "../context/UserContext";
import accountService from "../services/accountService";
import Statistics from "./Statistics";

export default function App() {
  const [savedToken, _] = useLocalStorage(constants.TOKEN_KEY, "");
  const { setUser, setToken, setAccount } = useContext(
    UserContext
  ) as UserContextType;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      if (savedToken) {
        const response = await authService.tokenDetails(savedToken);
        if (response.success) {
          const account = await accountService.getAccount(
            response.data.id,
            savedToken
          );
          console.log(account);
          setAccount(account.data[0]);
          setToken(savedToken);
          setUser(response.data);
        }
        setLoading(false);
      }
    };
    bootstrapAsync();
  }, []);

  if (loading) {
    <h1>Loading...</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gettingstarted" element={<GettingStarted />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
