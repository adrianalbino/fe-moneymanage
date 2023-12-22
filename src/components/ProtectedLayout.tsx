import { useOutlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import headstyles from "../css/header.module.css";
import footerstyles from "../css/footer.module.css";
import logo from "../css/logo.png";
import { AiFillInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

import { UserContext } from "../context/UserContext";
import { UserContextType } from "../context/User";
import authService from "../services/authService";
import toastService from "../services/toastService";
import constants from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

const allowedRoutes = [
  "/gettingstarted",
  "/dashboard",
  "/accounts",
  "/statistics",
];

export default function ProtectedLayout() {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, setUser, setAccount, account } = useContext(
    UserContext
  ) as UserContextType;
  const [_, rememberToken] = useLocalStorage(constants.TOKEN_KEY, "");

  const homenig = () => {
    navigate("/");
  };

  const accounts = () => {
    navigate("/Accounts");
  };

  const spendings = () => {
    navigate("/Dashboard");
  };

  const statistics = () => {
    navigate("/Statistics");
  };

  async function logout() {
    try {
      const response = await authService.logout(token);
      setUser(constants.DEFAULT_USER);
      setAccount(constants.DEFAULT_ACCOUNT);
      rememberToken("");
      toastService.showToast(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(user);
    if (user.id == 0) {
      navigate("/");
    }
    if (account && account.id != 0) {
      navigate("/Dashboard");
    }
  }, [user, account]);

  console.log(location.pathname);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {allowedRoutes.includes(location.pathname.toLowerCase()) && (
        <>
          <div className={headstyles.header}>
            <div className={headstyles.logopic} onClick={homenig}>
              <img src={logo}></img>
              <h3 className={headstyles.title}>MoneyManage</h3>
            </div>
            <div className={headstyles.nav}>
              <div onClick={spendings}>Spendings</div>
              <div onClick={accounts}>Accounts</div>
              <div onClick={statistics}>Statistics</div>
            </div>
            <button className={headstyles.logout} onClick={logout}>
              Logout
            </button>
          </div>

          {outlet}
          <div className={footerstyles.footerProtected}>
            <p className={footerstyles.footerp1}>
              MoneyManage<br></br>© Copyright 2023
            </p>
            <a href="http://linkedin.com" className={footerstyles.fb}>
              <AiFillLinkedin className={footerstyles.icon} size={40} />
            </a>
            <a href="http://instagram.com" className={footerstyles.insta}>
              <AiFillInstagram className={footerstyles.icon} size={40} />
            </a>
            <a href="http://twitter.com" className={footerstyles.twit}>
              <AiOutlineTwitter className={footerstyles.icon} size={40} />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
