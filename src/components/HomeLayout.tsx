import { useContext, useEffect } from "react";
import { useNavigate, useOutlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { UserContextType } from "../context/User";
import { UserContext } from "../context/UserContext";
import { AiFillInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

import headstyles from "../css/header.module.css";
import footerstyles from "../css/footer.module.css";
import logo from "../css/logo.png";

export default function HomeLayout() {
  const { user } = useContext(UserContext) as UserContextType;

  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();

  const homenig = () => {
    navigate("/");
  };

  useEffect(() => {
    if (user.id != 0) {
      if (user.has_account == 1) {
        navigate("/Dashboard");
      } else {
        navigate("/GettingStarted");
      }
    }
  }, [user]);

  return (
    <div>
      {location.pathname === "/" ? (
        <div>
          <div className={headstyles.header}>
            <div className={headstyles.logopic} onClick={homenig}>
              <img src={logo}></img>MoneyManage
            </div>
            <div className={headstyles.headerright}>
              <a className={headstyles.loginbutton} href="/Login">
                Log-in
              </a>
              <a className={headstyles.registerbutton} href="/Register">
                Register
              </a>
            </div>
          </div>
          {outlet}
          <div className={footerstyles.footer}>
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
        </div>
      ) : (
        <>{outlet}</>
      )}
    </div>
  );
}
