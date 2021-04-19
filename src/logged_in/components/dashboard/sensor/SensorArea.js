import { Button, Grid, makeStyles, Typography, Card, Box } from '@material-ui/core';
import { AcUnit, Autorenew, BrightnessHigh, Opacity } from '@material-ui/icons';
import React, { Fragment, useEffect, useState } from 'react'
import SensorCard from './SensorCard';

import Amplify, { Auth, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';



function SensorArea() {
    //const {sensorData,setSensorData} = useState(null);
    const [currentTopic, setcurrentTopic] = useState("--");
    const [lastUpdate, setLastUpdate] = useState("--");
    const [tempValue, setTempValue] = useState("--");
    const [humValue, setHumValue] = useState("--");
    const [lumValue, setLumValue] = useState("--");
    const [flowValue, setFlowValue] = useState("--");
    const [soilmoistValue, setSoilmoistValue] = useState("--");
    const [deviceUptime, setDeviceUptime] = useState("--");
    const [totalVolume, setTotalVolume] = useState("--");
    const [valveStatus, setValveStatus] = useState("--");
    const [sensorData, setSensorData] = useState([
        {
            id: "temp",
            label: "Temperature",
            icon: (<AcUnit style={{ fill: "#74b9ff" }} />),
            value: "0",
            unit: "°C"
        },
        {
            id: "hum",
            label: "Humidity",
            icon: (<Opacity style={{ fill: "#00cec9" }} />),
            value: "0",
            unit: "%"
        },
        {
            id: "lum",
            label: "Luminance",
            icon: (<BrightnessHigh style={{ fill: "#fdcb6e" }} />),
            value: "0",
            unit: "lux"
        },
        {
            id: "flow",
            label: "Flow Rate",
            icon: (<Autorenew style={{ fill: "#0984e3" }} />),
            value: "0",
            unit: "mL/s"
        },
        {
            id: "soilmoist",
            label: "Soil Moisture",
            icon: (<Opacity style={{ fill: "#6c5ce7" }} />),
            value: "0",
            unit: "%"
        }
    ]);
    useEffect(() => {
        let topic = null;
        async function getUser() {
            const user = await Auth.currentAuthenticatedUser();
            topic = user.attributes['custom:iot_topic'];
            setcurrentTopic(topic);
            //console.log('attributes:', topic);
            //PubSub.publish('client', { msg: '' });
            PubSub.subscribe(topic).subscribe({
                next: data => {
                    var currentdate = new Date();
                    setTempValue(data.value.data.temp);
                    setHumValue(data.value.data.hum);
                    setLumValue(data.value.data.lum);
                    setFlowValue(data.value.data.flow);
                    setSoilmoistValue(data.value.data.soilmoist);
                    setTotalVolume(data.value.data.total_volume);
                    setDeviceUptime(data.value.data.uptime);
                    setLastUpdate(currentdate.getDate() + "/"
                        + (currentdate.getMonth() + 1) + "/"
                        + currentdate.getFullYear() + " @ "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":"
                        + currentdate.getSeconds());
                    setValveStatus(data.value.data.valve_status);
                    //console.log(data.value.time)

                },
                error: error => console.error(error),
                close: () => console.log('Done'),
            });
        }
        getUser();

    },[currentTopic, tempValue]);
    function idk() {
        PubSub.publish('igraspberrySensors', "{'wtf':0}");
    }
    return (
        <Fragment>
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
                <Grid item xs={12} md={12}>
                    <Card>
                        <Box p={2}>
                            <Typography variant="subtitle2">Listening on topic:  {currentTopic}</Typography>
                            <Typography variant="subtitle2">Last update received on:  {lastUpdate}</Typography>
                            <Typography variant="subtitle2">Total Volume of Water:  {totalVolume}</Typography>
                            <Typography variant="subtitle2">Device Uptime:  {deviceUptime}</Typography>
                            <Typography variant="subtitle2">Watering?:  {String(valveStatus)}</Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default SensorArea;
