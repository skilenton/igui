import { Button, Grid, Typography } from '@material-ui/core';
import { AcUnit, Autorenew, BrightnessHigh, Opacity } from '@material-ui/icons';
import React, { Fragment, useEffect, useState } from 'react'
import SensorCard from './SensorCard';

import Amplify, { Auth, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

function SensorArea() {
    //const {sensorData,setSensorData} = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [tempValue, setTempValue] = useState(0);
    const [humValue, setHumValue] = useState(0);
    const [lumValue, setLumValue] = useState(0);
    const [flowValue, setFlowValue] = useState(0);
    const [soilmoistValue, setSoilmoistValue] = useState(0);
    const [sensorData, setSensorData] = useState([
        {
            id: "temp",
            label: "Temperature",
            icon: (<AcUnit />),
            value: "0",
            unit: "°C"
        },
        {
            id: "hum",
            label: "Humidity",
            icon: (<Opacity />),
            value: "0",
            unit: "%"
        },
        {
            id: "lum",
            label: "Luminance",
            icon: (<BrightnessHigh />),
            value: "0",
            unit: "lux"
        },
        {
            id: "flow",
            label: "Flow Sensor",
            icon: (<Autorenew />),
            value: "0",
            unit: "mL/s"
        },
        {
            id: "soilmoist",
            label: "Soil Moisture",
            icon: (<Opacity />),
            value: "0",
            unit: "%"
        }
    ]);
    useEffect(() => {
        PubSub.subscribe('igraspberrySensors').subscribe({
            next: data => {
                var currentdate = new Date();
                setTempValue(data.value.temp);
                setHumValue(data.value.hum);
                setLumValue(data.value.lum);
                setFlowValue(data.value.flow);
                setSoilmoistValue(data.value.soilmoist);
                setLastUpdate(currentdate.getDate() + "/"
                    + (currentdate.getMonth() + 1) + "/"
                    + currentdate.getFullYear() + " @ "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds());
                console.log(data)

            },
            error: error => console.error(error),
            close: () => console.log('Done'),
        });
    });
    function idk() {
        PubSub.publish('igraspberrySensors', "{'wtf':0}");
    }
    return (
        <Fragment>
            <Typography variant="subtitle2">Last update received on:  {lastUpdate}</Typography>
            <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                    <SensorCard
                        label={sensorData[0].label}
                        icon={sensorData[0].icon}
                        value={tempValue}
                        unit={sensorData[0].unit}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SensorCard
                        label={sensorData[1].label}
                        icon={sensorData[1].icon}
                        value={humValue}
                        unit={sensorData[1].unit}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SensorCard
                        label={sensorData[2].label}
                        icon={sensorData[2].icon}
                        value={lumValue}
                        unit={sensorData[2].unit}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SensorCard
                        label={sensorData[3].label}
                        icon={sensorData[3].icon}
                        value={flowValue}
                        unit={sensorData[3].unit}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <SensorCard
                        label={sensorData[4].label}
                        icon={sensorData[4].icon}
                        value={soilmoistValue}
                        unit={sensorData[4].unit}
                    />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default SensorArea;
