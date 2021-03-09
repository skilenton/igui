import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import {
  FormHelperText,
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
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
});

function RegisterDialog(props) {
  const { setStatus, theme, onClose, openTermsDialog, status, classes, openConfirmRegistrationDialog, setConfirmUser } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState(null);
  const [hasError, setHasError] = useState(false);


  const registerTermsCheckbox = useRef();
  const registerUsername = useRef();
  const registerEmail = useRef();
  const registerPassword = useRef();
  const registerPasswordRepeat = useRef();

  // async function register() {
  //   //setError(null);
  //   console.log(hasError);
  //   const username = String(registerUsername.current.value).toLowerCase();
  //   const email = registerEmail.current.value;
  //   const password = registerPassword.current.value;


  //   //console.log(username);

  //   if (!registerTermsCheckbox.current.checked) {
  //     setHasTermsOfServiceError(true);
  //     return;
  //   }
  //   if (
  //     registerPassword.current.value !== registerPasswordRepeat.current.value
  //   ) {
  //     setStatus("passwordsDontMatch");
  //     return;
  //   }

  //   setIsLoading(true);
  //   await Auth.signUp({
  //     username,
  //     password,
  //     attributes: {
  //       email: email
  //     }
  //   }).then(
  //     result => {
  //       setConfirmUser(username);
  //       openConfirmRegistrationDialog();
  //       console.log(result);
  //     }
  //   ).catch(
  //     err => {
  //       //console.log(err, err.name, err.message);
  //       setStatus(err.name);
  //       setStatusMessage(err.message);
  //       setError(err);
  //       setHasError(true);
  //     });
  //   setIsLoading(false);
  // }
  const register = useCallback(async () => {
    setHasError(false);
    setError(null);
    const username = String(registerUsername.current.value).toLowerCase();
    const email = registerEmail.current.value;
    const password = registerPassword.current.value;


    //console.log(username);

    if (!registerTermsCheckbox.current.checked) {
      setHasTermsOfServiceError(true);
      return;
    }
    if (
      registerPassword.current.value !== registerPasswordRepeat.current.value
    ) {
      setStatus("passwordsDontMatch");
      return;
    }

    setIsLoading(true);
    await Auth.signUp({
      username,
      password,
      attributes: {
        email: email
      }
    }).then(
      result => {
        setConfirmUser(username);
        openConfirmRegistrationDialog();
        console.log(result);
      }
    ).catch(
      err => {
        setError(err);
        setHasError(true);
      });
    setIsLoading(false);
  });

  return (
    <FormDialog
      loading={isLoading}
      onClose={onClose}
      open
      headline="Register"
      onFormSubmit={(e) => {
        e.preventDefault();
        register();
      }}
      hideBackdrop
      hasCloseIcon
      content={
        <Fragment>
          {hasError && (
            <HighlightedInformation>
              {error !== null ? error.message : null}
            </HighlightedInformation>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={status === "UsernameExistsException"}
            helperText={(() => {
              if (status === "UsernameExistsException") {
                return statusMessage;
              }
              return null;
            })()}
            label="Username"
            inputRef={registerUsername}
            autoFocus
            autoComplete="off"
            type="text"
            onChange={() => {
              if (status === "UsernameExistsException") {
                setStatus(null);
              }
            }}
            FormHelperTextProps={{ error: true }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={status === "invalidEmail"}
            label="Email Address"
            inputRef={registerEmail}
            autoComplete="off"
            type="email"
            onChange={() => {
              if (status === "invalidEmail") {
                setStatus(null);
              }
            }}
            FormHelperTextProps={{ error: true }}
          />
          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="Password"
            inputRef={registerPassword}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch" ||
                status === "InvalidPasswordException"
              ) {
                setStatus(null);
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "Create a password at least 6 characters long.";
              }
              if (status === "passwordsDontMatch") {
                return "Your passwords dont match.";
              }
              if (status === "InvalidPasswordException") {
                return "You have entered an invalid password.";
              }
              return null;
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="Repeat Password"
            inputRef={registerPasswordRepeat}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus(null);
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "Create a password at least 6 characters long.";
              }
              if (status === "passwordsDontMatch") {
                return "Your passwords dont match.";
              }
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          <FormControlLabel
            style={{ marginRight: 0 }}
            control={
              <Checkbox
                color="primary"
                inputRef={registerTermsCheckbox}
                onChange={() => {
                  setHasTermsOfServiceError(false);
                }}
              />
            }
            label={
              <Typography variant="body1">
                I agree to the
                <span
                  className={classes.link}
                  onClick={isLoading ? null : openTermsDialog}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(event) => {
                    // For screenreaders listen to space and enter events
                    if (
                      (!isLoading && event.keyCode === 13) ||
                      event.keyCode === 32
                    ) {
                      openTermsDialog();
                    }
                  }}
                >
                  {" "}
                  terms of service
                </span>
              </Typography>
            }
          />
          {hasTermsOfServiceError && (
            <FormHelperText
              error
              style={{
                display: "block",
                marginTop: theme.spacing(-1),
              }}
            >
              In order to create an account, you have to accept our terms of
              service.
            </FormHelperText>
          )}
          {/* {status === "accountCreated" ? (
            <HighlightedInformation>
              We have created your account. Please click on the link in the
              email we have sent to you before logging in.
            </HighlightedInformation>
          ) : (
            <HighlightedInformation>
              Registration is disabled until we go live.
            </HighlightedInformation>
          )} */}
        </Fragment>
      }
      actions={
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
          disabled={isLoading}
        >
          Register
          {isLoading && <ButtonCircularProgress />}
        </Button>
      }
    />
  );
}

RegisterDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  status: PropTypes.string,
  setStatus: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RegisterDialog);
