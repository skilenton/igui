import { Card, Typography, CardContent } from '@material-ui/core';
import { AcUnit } from '@material-ui/icons';
import React from 'react';



function SensorCard(props) {
    const {sensor} = props;
    return (
        <Card>
            <CardContent>
                    {sensor.icon}
                <Typography>
                    {sensor.label}
                </Typography>
                <Typography>
                    {sensor.value + sensor.unit}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SensorCard;
