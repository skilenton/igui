import { ArgumentAxis, Chart, LineSeries, ValueAxis, SplineSeries } from '@devexpress/dx-react-chart-material-ui'
import { Box, Paper, Typography } from '@material-ui/core'
import React from 'react'

function ChartComponent(props) {
    const { processedData, sensor, title, color } = props;
    return (
        (processedData !== undefined && processedData !== null) ? (
            <Paper>
                <Box
                    p={1}
                >
                    <Box p={1}>
                        <Typography variant="h6">{title}</Typography>
                    </Box>
                    <Chart
                        data={processedData}
                        height="250"
                    >
                        <ArgumentAxis showLabels={false} />
                        <ValueAxis />
                        <LineSeries valueField={sensor} argumentField="timestampConverted" color={color} />
                    </Chart>
                </Box>
            </Paper>) : null
    )
}

export default ChartComponent
