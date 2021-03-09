import { Grid } from '@material-ui/core'
import { PubSub } from 'aws-amplify'
import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import ValveCard from './ValveCard'
import {Auth} from 'aws-amplify';

function ValveArea() {
    const [isOpen, setIsOpen] = useState(true);
    const [topic, setTopic] = useState(null);
    const valveActuation = () => {
        setIsOpen(!isOpen);
        try {
            //console.log(isOpen);
            PubSub.publish(topic+'Control', { solenoid: isOpen });

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        async function getTopic() {
            let topic;
            const user = await Auth.currentAuthenticatedUser();
            topic = user.attributes['custom:iot_topic'];
            setTopic(topic);
        }
        getTopic();
    },[]);
    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                    <ValveCard label="Valve 1" status={(isOpen ? "OPEN" : "CLOSED")} actuation={valveActuation} />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default ValveArea
