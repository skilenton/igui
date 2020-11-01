import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles,
} from "@material-ui/core";
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import { Auth } from 'aws-amplify';

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

function LoginDialog(props) {
  const {
    setStatus,
    history,
    classes,
    onClose,
    openChangePasswordDialog,
    openConfirmRegistrationDialog,
    status,
    confirmUser,
    setConfirmUser
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const loginUsername = useRef();
  const loginPassword = useRef();

  // const login = useCallback(() => {
  //   setIsLoading(true);
  //   setStatus(null);
  //   if (loginUsername.current.value !== "test@web.com") {
  //     setTimeout(() => {
  //       setStatus("invalidUsername");
  //       setIsLoading(false);
  //     }, 1500);
  //   } else if (loginPassword.current.value !== "HaRzwc") {
  //     setTimeout(() => {
  //       setStatus("invalidPassword");
  //       setIsLoading(false);
  //     }, 1500);
  //   } else {
  //     setTimeout(() => {
  //       history.push("/c/dashboard");
  //     }, 150);
  //   }
  // }, [setIsLoading, loginUsername, loginPassword, history, setStatus]);

  async function login() {

    var confirmerror = null;
    const user = await Auth.signIn(loginUsername.current.value, loginPassword.current.value)
      .catch(err => {
        setStatus(err.code);
        setStatusMessage(err.message);
        console.log(err);
        confirmerror = err.code
      });

    console.log(confirmerror);

    console.log(user);


    if (confirmerror === "UserNotConfirmedException") {
      setConfirmUser(loginUsername.current.value);
      openConfirmRegistrationDialog();
    }

    if (user !== undefined) {
      history.push("/c/dashboard");
    }

  }
  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        hideBackdrop
        headline="Login"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              error={status === "UserNotFoundException" || status === "UserNotConfirmedException"}
              required
              fullWidth
              label="Username"
              inputRef={loginUsername}
              autoFocus
              autoComplete="off"
              type="text"
              onChange={() => {
                if (status === "UserNotFoundException") {
                  setStatus(null);
                }
              }}
              helperText={
                (status === "UserNotFoundException" || status === "UserNotConfirmedException") ? statusMessage : null
              }
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "NotAuthorizedException"}
              label="Password"
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === "NotAuthorizedException") {
                  setStatus(null);
                }
              }}
              helperText={
                (status === "NotAuthorizedException") ? statusMessage : ""
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size="large"
            >
              Login
              {isLoading && <ButtonCircularProgress />}
            </Button>
            {/* <Typography
              align="center"
              className={classNames(
                classes.forgotPassword,
                isLoading ? classes.disabledText : null
              )}
              color="primary"
              onClick={isLoading ? null : openChangePasswordDialog}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => {
                // For screenreaders listen to space and enter events
                if (
                  (!isLoading && event.keyCode === 13) ||
                  event.keyCode === 32
                ) {
                  openChangePasswordDialog();
                }
              }}
            >
              Forgot Password?
            </Typography> */}

          </Fragment>
        }
      />
    </Fragment>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default withRouter(withStyles(styles)(LoginDialog));
