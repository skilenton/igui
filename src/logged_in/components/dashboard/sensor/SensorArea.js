import { Grid } from '@material-ui/core';
import { AcUnit, Autorenew, BrightnessHigh, Opacity } from '@material-ui/icons';
import React from 'react'
import SensorCard from './SensorCard';

import { WiHumidity } from 'react-icons/wi';




function getSensorData()
{
    
}

function SensorArea() {
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
        </Grid>
    )
}

export default SensorArea;
