import { Grid, Typography, withTheme } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import ChangePassword from './ChangePassword';
import Preferences from './Preferences';
import { Skeleton } from '@material-ui/lab';

function Account(props) {
    const { selectAccount, username } = props;
    useEffect(selectAccount, [selectAccount]);
    return (
        <Fragment>
            <Typography variant="h5" gutterBottom>Account Settings for {username}</Typography>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                justify="center"
            >
                <Preferences username={username} />
                <ChangePassword />
            </Grid>
        </Fragment>
    )
}

export default Account;
