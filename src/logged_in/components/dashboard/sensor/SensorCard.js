import { Card, Typography, CardContent } from '@material-ui/core';
import { AcUnit } from '@material-ui/icons';
import React from 'react';

function SensorCard(props) {
    const {label,icon,value, unit} = props;
    return (
        <Card>
            <CardContent>
                {icon}
                <Typography>
                    {label}
                </Typography>
                <Typography>
                    {value + unit}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SensorCard;
