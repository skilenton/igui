import { Card, Typography, CardContent } from '@material-ui/core';
import { AcUnit } from '@material-ui/icons';
import React, { useState } from 'react';

function SensorCard(props) {
    const { label, icon, value, unit, thresholdPassed } = props;

    return (
        <Card>
            <CardContent style={thresholdPassed ? { backgroundColor: "#ff7675" } : null}>
                {icon}
                <Typography>
                    {label}
                </Typography>
                <Typography>
                    {value + unit}
                </Typography>
                {thresholdPassed ? (<Typography variant="subtitle2">Threshold Passed!</Typography>) : ""}
            </CardContent>
        </Card>
    )
}

export default SensorCard;
