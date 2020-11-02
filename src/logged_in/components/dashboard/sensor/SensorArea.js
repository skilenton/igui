import { Button, Grid } from '@material-ui/core';
import { AcUnit, Autorenew, BrightnessHigh, Opacity } from '@material-ui/icons';
import React, { useEffect } from 'react'
import SensorCard from './SensorCard';

import Amplify, { Auth, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

// Apply plugin with configuration
Amplify.addPluggable(new AWSIoTProvider({
    aws_pubsub_region: 'ap-southeast-1',
    aws_pubsub_endpoint: 'wss://a25ivprp9v2irh-ats.iot.ap-southeast-1.amazonaws.com/mqtt',
}));


function SensorArea() {
    useEffect(() => {
        PubSub.subscribe('myTopic').subscribe({
            next: data => {
                try {
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            },
            error: error => console.error(error),
            close: () => console.log('Done'),
        });
        //Amplify.Logger.LOG_LEVEL = 'DEBUG';
        // Auth.currentCredentials().then((data) => {
        //     console.log(data);
        // });
    });
    function idk()
    {
        PubSub.publish('myTopic1', { msg: 'myTopic1' });
        console.log("idk working");
    }
    var sensors = [
        {
            id: "temp",
            label: "Temperature",
            icon: (<AcUnit />),
            value: "21",
            unit: "°C"
        },
        {
            id: "hum",
            label: "Humidity",
            icon: (<Opacity />),
            value: "90",
            unit: "%"
        },
        {
            id: "luminance",
            label: "Luminance",
            icon: (<BrightnessHigh />),
            value: "400",
            unit: "lux"
        },
        {
            id: "flow",
            label: "Flow Sensor",
            icon: (<Autorenew />),
            value: "10",
            unit: "mL/s"
        },
        {
            id: "soilmoist",
            label: "Soil Moisture",
            icon: (<Opacity />),
            value: "60",
            unit: "%"
        }
    ];
    return (
        <Grid container spacing={3}>
            {sensors.map((sensor) => (
                <Grid key={sensor.id} item xs={6} md={3}>
                    <SensorCard sensor={sensor} />
                </Grid>
            ))}
            <Button onClick={idk}>CLICK</Button>
        </Grid>
    )
}

export default SensorArea;
