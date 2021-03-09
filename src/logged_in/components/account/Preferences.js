import { Box, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography, TextField, Button } from '@material-ui/core'
import React, { Fragment, useCallback, useRef, useEffect, useState } from 'react';
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import { Auth } from 'aws-amplify';


function Preferences(props) {
    const { styles, username } = props;

    //const [user, setuser] = useState(null);
    const topicField = useRef("");
    const [resultInfo, setResultInfo] = useState("");
    const [resultShown, setResultShown] = useState(false);

    useEffect(() => {
        async function getUser() {
            const user = await Auth.currentAuthenticatedUser();
            //console.log('attributes:', user.attributes);
            let topic = user.attributes['custom:iot_topic'];
            topicField.current.value = (topic ===undefined) ? "" : topic;
        }
        getUser();
    },[]);

    const handleSave = async () => {
        setResultShown(false);
        const user = await Auth.currentAuthenticatedUser();
        const result = await Auth.updateUserAttributes(user, {
            'custom:iot_topic': topicField.current.value
        });
        setResultInfo(result);
        setResultShown(true);
    }



    return (
        <Fragment>
            <Grid item md={6} xs={12}>
                <Card>
                    <Box display="flex" pt={4} px={2} >
                        <Typography variant="h6" gutterBottom>Preferences</Typography>
                    </Box>
                    <CardContent>
                        {/* <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel id="measurement-system-label">Measurement System</InputLabel>
                            <Select
                                labelId="measurement-system-label"
                                id="measurement-system"
                                label="Measurement System"
                            >
                                <MenuItem value={"imperial"}>Imperial Units</MenuItem>
                                <MenuItem value={"metric"}>Metric Units</MenuItem>
                            </Select>
                        </FormControl> */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            label="IoT Topic"
                            autoComplete="on"
                            type="text"
                            fullWidth
                            inputRef={topicField}
                        />
                        {
                            resultShown ?
                            (
                                <HighlightedInformation>
                                    {
                                        resultInfo === "SUCCESS" 
                                        ? "Successfully saved"
                                        : "Something went wrong: " + resultInfo
                                    }
                                </HighlightedInformation>
                            ): ""
                        }
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
