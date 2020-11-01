import { Typography } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import ChangePassword from './ChangePassword';

function Account(props) {
    const {selectAccount} = props;
    useEffect(selectAccount,[selectAccount]);
    return (
        <Fragment>
            <Typography variant="h5" gutterBottom>Account Settings</Typography>
            <ChangePassword/>
        </Fragment>
    )
}

export default Account;
