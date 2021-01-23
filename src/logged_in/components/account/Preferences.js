import { Box, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography, TextField, Button } from '@material-ui/core'
import React, { Fragment, useCallback, useRef, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';


function Preferences(props) {
    const { styles, username } = props;

    //const [user, setuser] = useState(null);
    const topicField = useRef("");

    useEffect(() => {
        async function getUser() {
            const user = await Auth.currentAuthenticatedUser();
            console.log('attributes:', user.attributes);
            topicField.current.value = user.attributes['custom:iot_topic'];
        }
        getUser();
    });

    const handleSave = async () => {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user, {
            'custom:iot_topic': topicField.current.value
        });
    }



    return (
        <Fragment>
            <Grid item md={6} xs={12}>
                <Card>
                    <Box display="flex" pt={4} px={2} >
                        <Typography variant="h6" gutterBottom>Preferences</Typography>
                        <Typography variant="subtitle2" color="error">not yet working™</Typography>
                    </Box>
                    <CardContent>
                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel id="measurement-system-label">Measurement System</InputLabel>
                            <Select
                                labelId="measurement-system-label"
                                id="measurement-system"
                                label="Measurement System"
                            >
                                <MenuItem value={"imperial"}>Imperial Units</MenuItem>
                                <MenuItem value={"metric"}>Metric Units</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            label="IoT Topic"
                            autoComplete="on"
                            type="text"
                            fullWidth
                            inputRef={topicField}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            fullWidth
                            onClick={handleSave}
                        >
                            Save Preferences
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>
    )
}

export default Preferences
