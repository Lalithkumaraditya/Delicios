import react from "react";
import React from "react";
import "./SnackBar.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {ThemeProvider} from '@material-ui/core';
import theme from '../../../theme';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = (props) => {
  let severity = "";
  let message = "Something went wrong";
  let SuccessDisplay=props.SuccessDisplay
  let displayer= SuccessDisplay ?   'SIGN-IN' :'SIGN-UP';
  if (props.errorStatus) {
    severity = "error";
    if (props.errorStatus == "EMAIL_EXISTS") {
      message = "YYayyy!! 😃 You are already a user please SignIn";
    }
    else if(props.errorStatus =="Request failed with status code 400"){
         message="Some thing went wrong please check the credentials"
    }
  } else if(props.errorStatus==null){
    SuccessDisplay=props.SuccessDisplay
    severity = "success";
    message = "Successfull "+displayer;
  }

  return (
    <ThemeProvider theme={theme}>
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
      </ThemeProvider>
  );
};

export default SnackBar;
