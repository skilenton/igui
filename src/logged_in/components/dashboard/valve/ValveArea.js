import { Grid } from '@material-ui/core'
import { PubSub } from 'aws-amplify'
import React, { useState } from 'react'
import { Fragment } from 'react'
import ValveCard from './ValveCard'

function ValveArea() {
    const [isOpen, setIsOpen] = useState(true);
    const valveActuation = () => {
        setIsOpen(!isOpen);
        try {
            //console.log(isOpen);
            PubSub.publish('igraspberryControl', { solenoid: isOpen });
            
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                    <ValveCard label="Valve 1" status={(isOpen ? "OPEN":"CLOSED")} actuation={valveActuation} />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default ValveArea
