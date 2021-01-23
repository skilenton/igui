import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import { LinearScale } from '@material-ui/icons'
import React from 'react'

function ValveCard(props) {
    const { actuation, label, status } = props
    return (
        <Card>
            <CardContent>
                <LinearScale />
                <Typography>
                    {label}
                </Typography>
                <Typography>
                    {status}
                </Typography>
                <Grid container justify="flex-end">
                    <Button onClick={actuation}>Toggle</Button>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ValveCard
