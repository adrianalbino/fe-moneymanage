import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContextType } from "../context/User";
import { UserContext } from "../context/UserContext";

import Styles from "../css/GettingStarted.module.css";
import accountService from "../services/accountService";
import LocationMarker from "../css/LocationMarker.png";
import CurrencyDollar from "../css/CurrencyDollar.png";
import LightBulb from "../css/LightBulb.png";
import Dropdown from "../components/Dropdown";
import toastService from "../services/toastService";

function GettingStarted() {
  const navigate = useNavigate();
  const { user, token, setAccount, account } = useContext(
    UserContext
  ) as UserContextType;
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("");
  console.log(account);
  async function onSubmit() {
    const response = await accountService.createAccount({
      name,
      balance: +balance,
      currency,
      id: user.id,
      token,
    });
    toastService.showToast(response);
    setAccount(response.data);
    if (response.success) {
      setName("");
      setBalance("");
      setCurrency("");
    }
  }

  return (
    <div className={Styles.bod}>
      <div className={Styles.modal}>
        <div className={Styles.upperDiv}>
          <h3>Let's get you started!</h3>
        </div>

        <div className={Styles.inputfields}>
          <img src={LightBulb}></img>
          <h3>Account Name</h3>
          <p>
            Input the name of the account you wish to track your expenses on.
          </p>
          <input
            value={name}
            type="text"
            className={Styles.inp}
            onChange={(t) => setName(t.target.value)}
          />
        </div>

        <div className={Styles.inputfields}>
          <img src={LocationMarker}></img>
          <h3>Select Base Currency</h3>
          <p>
            Let’s start by selecting your base currency. All transactions in
            other curriences will be calculated regards to this one.
          </p>
          <Dropdown selected={currency} setSelected={setCurrency} />
        </div>

        <div className={Styles.inputfields}>
          <img src={CurrencyDollar}></img>
          <h3>Select your Cash Balance</h3>
          <p>
            How much cash do you have right now? You may skip this part if you
            wish to sync your bank account with the site.
          </p>
          <input
            value={balance}
            type="text"
            className={Styles.inp}
            onChange={(t) => setBalance(t.target.value)}
          />
        </div>
        <button className={Styles.submitBtn} onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
export default GettingStarted;
