import { Grid, Box, List, TextField } from "@mui/material";

import BG from "../css/mm-bg.png";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { BsFillPlusCircleFill, BsTabletLandscape } from "react-icons/bs";

import { UserContextType } from "../context/User";
import { UserContext } from "../context/UserContext";

import accountService from "../services/accountService";
import entryService from "../services/entryService";
import toastService from "../services/toastService";
import Dropdown from "../components/Dropdown";
import { Category } from "../types/Category";
import { Entry } from "../types/Entry";
import { Account } from "../types/Account";

export default function Accounts() {
  const { token, user, account, setAccount } = useContext(
    UserContext
  ) as UserContextType;

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);

  async function getAccounts() {
    const response = await accountService.getAccount(user.id, token);
    console.log(response);
    response.success && setAccounts(response.data);
  }

  useEffect(() => {
    getAccounts();
  }, []);
  console.log(accounts);
  async function updateAccount() {
    if (name && amount) {
      const response = await accountService.updateAccount(account.id, token, {
        name,
        balance: +amount,
      });
      console.log(response);
      toastService.showToast(response);
      const accountResponse = await accountService.getAccount(user.id, token);
      setAccount(accountResponse.data[0]);

      if (response.success) {
        setName("");
        setAmount("");
      }
    } else {
      toastService.showToast({
        success: false,
        message: "Fill out all forms",
        data: "",
      });
    }
  }
  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      columnSpacing={2}
      container
      style={styles.container}
    >
      <Grid item xs={8} overflow="auto">
        <Box sx={styles.box}>
          <h3 style={styles.bigText}>My Accounts</h3>
          <h5 style={styles.lightText}>
            View all your listed accounts listed down below.
          </h5>
          <Box sx={styles.row}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Box>
          </Box>
          <Grid container sx={{ marginLeft: "40px", marginRIght: "40px" }}>
            <Grid item xs={5}>
              <h5 style={styles.tableHeader}>Account Name</h5>
            </Grid>
            <Grid item xs={5}>
              <h5 style={styles.tableHeader}>Cash Balance</h5>
            </Grid>
          </Grid>
          <List style={styles.list}>
            {accounts.map((a) => (
              <Grid key={a.id} container sx={{}}>
                <Grid item xs={6}>
                  <h5 style={styles.tableHeader}>{a.name}</h5>
                </Grid>
                <Grid item xs={1}>
                  <h5 style={styles.tableHeader}>{a.balance}</h5>
                </Grid>
              </Grid>
            ))}
          </List>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={styles.box}>
          <h1 style={styles.bigText}>Account Details</h1>
          <input
            value={name}
            onChange={(t) => setName(t.target.value)}
            placeholder="Name of the account"
            style={styles.acccountInformation}
          />
          <input
            value={amount}
            onChange={(t) => setAmount(t.target.value)}
            placeholder="Cash Balance of account"
            style={styles.acccountInformation}
          />

          <button
            onClick={updateAccount}
            style={styles.editButton}
            color="#065ED4"
          >
            Update Account Details
          </button>
        </Box>
      </Grid>
    </Grid>
  );
}

const styles = {
  searchAccountInput: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: "1.1em",
    borderBottomWidth: "1px",
    borderTop: "0px",
    borderLeft: "0px",
    marginLeft: "20px",
    borderRight: "0px",
  },
  acccountInformation: {
    backgroundColor: "#e8f6fd",
    height: "30px",
    marginTop: "30px",
    marginLeft: "50px",
    marginRight: "50px",
  },
  container: {
    paddingLeft: "5%",
    paddingRight: "5%",
    width: "100vw",
    backgroundImage: `url(${BG})`,
    backgroundSize: "cover",
    flex: "auto",
  },
  box: {
    width: "100%",
    backgroundColor: "#323232",
    height: "30em",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    marginTop: "20px",
    justifyContent: "space-between",
  },
  bigText: {
    color: "white",
    fontSize: "1.1em",
    textAlign: "center" as const,
    margin: 15,
  },
  list: {
    backgroundColor: "#737373",
    overflow: "auto",
    height: "20em",
    marginLeft: "40px",
    marginRight: "40px",
    marginTop: "10px",
    marginBottom: "15px",
  },
  text: {
    color: "white",
    fontSize: "0.8em",
    marginLeft: "20px",
    flexBasis: "100%",
  },
  lightText: {
    color: "#737373",
    margin: 0,
    padding: 0,
    marginTop: "-10px",
    fontSize: "10px",
    textAlign: "center" as const,
  },
  tableHeader: {
    textAlign: "left" as const,
    width: "100%",
    color: "white",
    padding: 0,
    margin: 0,
  },
  midText: {
    color: "white",
    fontSize: "0.8em",
    textAlign: "center" as const,
    margin: 10,
    marginLeft: 40,
    paddingBottom: 50,
  },
  topContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  editButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: 250,
    height: 50,
    margin: "auto",
  },
};
