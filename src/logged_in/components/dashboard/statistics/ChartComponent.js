import { SplineSeries } from '@devexpress/dx-react-chart';
import { ArgumentAxis, Chart, LineSeries, ValueAxis } from '@devexpress/dx-react-chart-material-ui'
import { Box, Paper, Typography } from '@material-ui/core'
import React from 'react'

function ChartComponent(props) {
    const { rawdata, sensor, title, color } = props;
    let processed_data;
    const data = [
        { 'argument': 1, 'value': 10 },
        { 'argument': 2, 'value': 20 },
        { 'argument': 3, 'value': 30 },
    ];
    if (rawdata !== undefined && rawdata !== null) {
        processed_data = rawdata.map((item)=>{
            return item;
        });
        //console.log(processed_data);
    }
    return (
        (rawdata !== undefined && rawdata !== null)?(
        <Paper>
            <Box
                p={1}
            >
                <Box p={1}>
                    <Typography variant="h6">{title}</Typography>
                </Box>
                <Chart
                    data={processed_data}
                    height="250"
                >
                    <ArgumentAxis showLabels={false} />
                    <ValueAxis />
                    <SplineSeries valueField={sensor} argumentField="timestamp" color={color}/>
                </Chart>
            </Box>
        </Paper>) : null
    )
}

export default ChartComponent
