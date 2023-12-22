import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Styles from "../css/Register.module.css";
import bg from "../css/logo.png";
import authService from "../services/authService";
import toastService from "../services/toastService";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await authService.register({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      confirm_password: confirmPassword,
    });
    toastService.showToast(response);
    if (!response.errors) {
      setFirstName("");
      setlastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className={Styles.main}>
      <div className={Styles.login}>
        <div className={Styles.logo} onClick={() => navigate("/")}>
          <img src={bg}></img>MoneyManage
        </div>
        <label htmlFor="chk" aria-hidden="true">
          Register
        </label>

        <form onSubmit={onSubmit}>
          <input
            value={firstName}
            onChange={(t) => setFirstName(t.target.value)}
            type="text"
            name="firstName"
            placeholder="First Name"
            className={Styles.inp}
            required
          ></input>
          <input
            value={lastName}
            onChange={(t) => setlastName(t.target.value)}
            type="text"
            name="lastName"
            placeholder="Last Name"
            className={Styles.inp}
            required
          ></input>
          <input
            value={email}
            onChange={(t) => setEmail(t.target.value)}
            type="email"
            name="email"
            placeholder="Email"
            className={Styles.inp}
            required
          ></input>
          <input
            value={password}
            onChange={(t) => setPassword(t.target.value)}
            type="password"
            name="pswd"
            placeholder="Password"
            className={Styles.inp}
            required
          ></input>
          <input
            value={confirmPassword}
            onChange={(t) => setConfirmPassword(t.target.value)}
            type="password"
            name="conpswd"
            placeholder="Confirm Password"
            className={Styles.inp}
            required
          ></input>
          <button className={Styles.btn}>Sign-up</button>
        </form>

        <a className={Styles.reg} onClick={() => navigate("/login")}>
          Already have an account?
        </a>
      </div>
    </div>
  );
}
export default Register;
