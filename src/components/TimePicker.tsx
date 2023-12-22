import { DatePicker } from "@mui/x-date-pickers";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      padding: 0,
      "& .MuiButtonBase-root": {
        paddingRight: 20,
      },
      "& .MuiInputBase-input": {
        padding: 4,
        paddingLeft: 0,
      },
    },
  },
});

export default function TimePicker({ date, setDate }: any) {
  const classes = useStyles();

  return (
    <DatePicker
      value={date}
      className={classes.root}
      onChange={(newValue) => {
        setDate(newValue as any);
      }}
      renderInput={(params) => (
        <TextField style={styles.addSpendingDate} {...params} />
      )}
    />
  );
}

const styles = {
  addSpendingDate: {
    backgroundColor: "#e8f6fd",
    marginLeft: "50px",
    marginRight: "50px",
    height: "30px",
    marginTop: "30px",
  },
};
