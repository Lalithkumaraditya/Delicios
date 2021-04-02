import react from "react";
import React from "react";
import "./SnackBar.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = (props) => {
  let severity = "";
  let message = "";
  let SuccessDisplay=props.SuccessDisplay
  let displayer= SuccessDisplay ?   'SIGN-IN' :'SIGN-UP';
  if (props.errorStatus) {
    severity = "error";
    if (props.errorStatus.message == "EMAIL_EXISTS") {
      message = "YYayyy!! 😃 You are already a user please SignIn";
    }
  } else if(props.errorStatus==null){
    SuccessDisplay=props.SuccessDisplay
    severity = "success";
    message = "Successfull "+displayer;
  }

  return (
    <div>
      <Snackbar
        className="SnackBar_Align"
        open={props.status}
        autoHideDuration={6000}
        onClose={props.handleClose}
      >
        <Alert onClose={props.handleClose} severity={severity}>
          {message} 
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;
