import { Button, Card, CardContent, Grid, TextField, Typography, withStyles, Box } from '@material-ui/core'
import { Auth } from 'aws-amplify';
import React, { useState, Fragment, useRef } from 'react';
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import { withRouter } from "react-router-dom";


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

function ChangePassword() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errored, setErrored] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [changed, setChanged] = useState(false);

    const oldPassword = useRef(null);
    const newPassword = useRef(null);
    const newPasswordRepeat = useRef(null);

    async function change() {
        var oldpass = oldPassword.current.value;
        var newpass = newPassword.current.value;
        var repeat = newPasswordRepeat.current.value;

        if (newpass !== repeat) {
            setErrored("NotMatchingError");
            setErrorMessage("New passwords do not match.");
        } else if (newpass.length < 6) {
            setErrored("InvalidParameterException");
            setErrorMessage("The new password you have entered is not long enough. Must be greater than 8.");
        }
        else {
            await Auth.currentAuthenticatedUser()
                .then(user => {
                    return Auth.changePassword(user, oldpass, newpass);
                })
                .then(() => {
                    setChanged(true);
                    oldPassword.current.value = null;
                    newPassword.current.value = null;
                    newPasswordRepeat.current.value = null;

                }
                )
                .catch(err => {
                    console.log(err);
                    setErrored(err.code);
                    console.log(errored, " ", errorMessage);
                    switch (err.code) {
                        case "NotAuthorizedException":
                            setErrorMessage("The password you have entered is incorrect.");
                            break;
                        case "InvalidPasswordException":
                            setErrorMessage("The new password you have entered is not long enough. Must be greater than 8.");
                            break;
                        case "LimitExceededException":
                            setErrorMessage(err.message);
                            break;
                        default:
                    }
                });
        }

    }
    return (
        <Fragment>
                <Grid item md={6} xs={12}>
                    <Card>
                        <Box display="flex" pt={4} px={2} >
                            <Typography variant="h6" gutterBottom>Change Password</Typography>
                        </Box>
                        <CardContent>
                            {(errored === "LimitExceededException") &&
                                <HighlightedInformation>
                                    {errorMessage}
                                </HighlightedInformation>
                            }
                            {changed &&
                                <HighlightedInformation>
                                    Password Changed!
                                </HighlightedInformation>
                            }
                            <VisibilityPasswordTextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                error={errored === "NotAuthorizedException"}
                                label="Old Password"
                                inputRef={oldPassword}
                                autoComplete="off"
                                onChange={() => {
                                    setErrored(null);
                                    setChanged(false);
                                }}
                                helperText={errored === "NotAuthorizedException" ? errorMessage : null}
                                FormHelperTextProps={{ error: true }}
                                onVisibilityChange={setIsPasswordVisible}
                                isVisible={isPasswordVisible}
                            />
                            <VisibilityPasswordTextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                error={
                                    errored === "NotMatchingError" ||
                                    errored === "InvalidParameterException" ||
                                    errored === "InvalidPasswordException"
                                }
                                label="New Password"
                                inputRef={newPassword}
                                autoComplete="off"
                                onChange={() => {
                                    setErrored(null);
                                    setChanged(false);
                                }}
                                helperText={(errored === "NotMatchingError" || errored === "InvalidParameterException") ? errorMessage : null}
                                FormHelperTextProps={{ error: true }}
                                onVisibilityChange={setIsPasswordVisible}
                                isVisible={isPasswordVisible}
                            />
                            <VisibilityPasswordTextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                error={
                                    errored === "NotMatchingError" ||
                                    errored === "InvalidParameterException" ||
                                    errored === "InvalidPasswordException"
                                }
                                label="Confirm New Password"
                                inputRef={newPasswordRepeat}
                                autoComplete="off"
                                onChange={() => {
                                    setErrored(null);
                                    setChanged(false);
                                }}
                                //helperText={}
                                FormHelperTextProps={{ error: true }}
                                onVisibilityChange={setIsPasswordVisible}
                                isVisible={isPasswordVisible}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={change}
                            >
                                Change Password
                        </Button>
                        </CardContent>
                    </Card>
                </Grid>
        </Fragment>
    )
}

export default withStyles(styles)(ChangePassword);
