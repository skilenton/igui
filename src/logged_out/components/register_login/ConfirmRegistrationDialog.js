import { Dialog, TextField, Typography, withStyles, Button, Link } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import React, { Fragment, useState, useRef } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";


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



function ConfirmRegistrationDialog(props) {
    const {
        onClose,
        confirmRegistrationStatus,
        confirmUser,
        history
    } = props;
    const [isLoading, setIsLoading] = useState(false);
    const confirmPin = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [codeSent, setCodeSent] = useState(null);



    async function confirm() {
        var errorMessage = "";
        var errorCode = "";
        // After retrieveing the confirmation code from the user
        await Auth.confirmSignUp(confirmUser, confirmPin.current.value, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        }).then(data => {
            //console.log(data);
            history.push("/c/dashboard");
        }).catch(err => {
            errorCode = err.code;
            setErrorMessage(err.message);
            console.log(err.code, " ", err.message)
        });
    }

    async function resendCode() {
        await Auth.resendSignUp(confirmUser).then(data => { console.log(data); setCodeSent(true) });
    }

    return (
        <FormDialog
            loading={isLoading}
            open
            onClose={onClose}
            headline="Confirm Registration"
            onFormSubmit={(e) => {
                e.preventDefault();
                confirm();
            }}
            hideBackdrop
            hasCloseIcon
            content={
                <Fragment>
                    <HighlightedInformation>
                        Please enter the PIN from the
                        email we have sent to you before logging in.
                    </HighlightedInformation>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        //error={}
                        //helperText={}
                        label="Username"
                        autoFocus
                        autoComplete="off"
                        type="text"
                        disabled
                        value={confirmUser}

                    //onChange={}
                    //FormHelperTextProps={}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={errorMessage !== null}
                        helperText={errorMessage}
                        inputRef={confirmPin}
                        label="Confirmation Pin"
                        autoComplete="off"
                        type="text"
                        onChange={() => {
                            setErrorMessage(null);
                        }}
                    //FormHelperTextProps={}
                    />
                </Fragment>
            }
            actions={
                <Fragment>
                    <Typography>
                        <Link component="button" variant="body2" onClick={resendCode}>
                            Click here to resend code.
                        </Link>
                        {codeSent && <Typography>Code Sent!</Typography>}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        color="secondary"
                        disabled={isLoading}
                    >
                        Confirm
                  {isLoading && <ButtonCircularProgress />}
                    </Button>
                </Fragment>
            }

        />
    )
}

ConfirmRegistrationDialog.propTypes = {
    history: PropTypes.object.isRequired
  };
  

export default withRouter(withStyles(styles, { withTheme: true })(ConfirmRegistrationDialog));
