import React, { useState, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import RegisterDialog from "./RegisterDialog";
import TermsOfServiceDialog from "./TermsOfServiceDialog";
import LoginDialog from "./LoginDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ModalBackdrop from "../../../shared/components/ModalBackdrop";
import ConfirmRegistrationDialog from "./ConfirmRegistrationDialog";

function DialogSelector(props) {
  const {
    dialogOpen,
    openTermsDialog,
    openRegisterDialog,
    openConfirmRegistrationDialog,
    openLoginDialog,
    openChangePasswordDialog,
    onClose,
  } = props;
  const [loginStatus, setLoginStatus] = useState(null);
  const [registerStatus, setRegisterStatus] = useState(null);
  const [confirmRegistrationStatus, setConfirmRegistrationStatus] = useState(null);
  const [confirmUser, setConfirmUser] = useState(null);

  const _onClose = useCallback(() => {
    setLoginStatus(null);
    setRegisterStatus(null);
    setConfirmRegistrationStatus(null);
    onClose();
  }, [onClose, setLoginStatus, setRegisterStatus, setConfirmRegistrationStatus]);

  const printDialog = useCallback(() => {
    switch (dialogOpen) {
      case "register":
        return (
          <RegisterDialog
            onClose={_onClose}
            openTermsDialog={openTermsDialog}
            openConfirmRegistrationDialog={openConfirmRegistrationDialog}
            status={registerStatus}
            setStatus={setRegisterStatus}
            confirmUser={confirmUser}
            setConfirmUser={setConfirmUser}
          />
        );
      case "termsOfService":
        return <TermsOfServiceDialog onClose={openRegisterDialog} />;
      case "login":
        return (
          <LoginDialog
            onClose={_onClose}
            status={loginStatus}
            setStatus={setLoginStatus}
            openChangePasswordDialog={openChangePasswordDialog}
            openConfirmRegistrationDialog={openConfirmRegistrationDialog}
            confirmUser={confirmUser}
            setConfirmUser={setConfirmUser}
          />
        );
      case "changePassword":
        return (
          <ChangePasswordDialog
            setLoginStatus={setLoginStatus}
            onClose={openLoginDialog}
          />
        );
      case "confirmRegistration":
        return (
          <ConfirmRegistrationDialog
            setConfirmRegistrationStatus={setConfirmRegistrationStatus}
            confirmUser={confirmUser}
            setConfirmUser={setConfirmUser}
            onClose={_onClose}
          />
        )
      default:
    }
  }, [
    dialogOpen,
    openChangePasswordDialog,
    openLoginDialog,
    openRegisterDialog,
    openTermsDialog,
    openConfirmRegistrationDialog,
    _onClose,
    loginStatus,
    registerStatus,
    setLoginStatus,
    setRegisterStatus,
  ]);

  return (
    <Fragment>
      {dialogOpen && <ModalBackdrop open />}
      {printDialog()}
    </Fragment>
  );
}

DialogSelector.propTypes = {
  dialogOpen: PropTypes.string,
  openLoginDialog: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  openConfirmRegistrationDialog: PropTypes.func.isRequired,
  openRegisterDialog: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
};

export default DialogSelector;
