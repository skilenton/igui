import { ArgumentAxis, Chart, LineSeries, ValueAxis, SplineSeries, Tooltip } from '@devexpress/dx-react-chart-material-ui'
import { Box, Paper, Typography, Grid } from '@material-ui/core'
import React from 'react'
import { EventTracker } from '@devexpress/dx-react-chart';


function ChartComponent(props) {
    const { processedData, sensor, title, color, unit } = props;
    return (
        (processedData !== undefined && processedData !== null) ? (
            <Paper>
                <Box
                    p={1}
                >
                    <Box p={1}>
                        <Typography variant="h6">{title}</Typography>
                        <Grid
                            container
                            spacing={1}
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={1}>
                                <Typography variant="subtitle2" display="inline">Value ({unit})</Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Chart
                                    data={processedData}
                                    height="250"
                                >
                                    <ArgumentAxis showLabels={false} />
                                    <ValueAxis />
                                    <LineSeries
                                        valueField={sensor}
                                        argumentField="timestampConverted"
                                        color={color}
                                    />
                                    <EventTracker />
                                    <Tooltip 
                                        
                                    />
                                </Chart>
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">Time</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>) : null
    )
}

export default ChartComponent
