import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, withTheme, Paper, Box, Typography } from "@material-ui/core";
import { Amplify, API, Auth } from 'aws-amplify';
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';
import * as subscriptions from '../../../graphql/subscriptions';
import ChartComponent from './statistics/ChartComponent';
import AWS from 'aws-sdk';
import { Skeleton } from "@material-ui/lab";

function StatisticsArea(props) {
  const { theme, CardChart } = props;
  const [rawdata, setRawdata] = useState(null);
  const [resolution, setResolution] = useState(null);
  const [currentTopic, setcurrentTopic] = useState(null);
  const config = {
    // ...
    "aws_appsync_graphqlEndpoint": "https://dbilqb2x2rhppcesvpg7aqtcjy.appsync-api.ap-southeast-1.amazonaws.com/graphql",
    "aws_appsync_region": "ap-southeast-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-oky3i2gtuzazvgq5k77aqydehe",
    // ...
  }
  Amplify.configure(config);

  useEffect(() => {
    let topic = null;
    async function getLogs() {
      const user = await Auth.currentAuthenticatedUser();
      topic = user.attributes['custom:iot_topic'];
      let filter = {
        topic: {
          eq: topic
        }
      };
      const allLogs = await API.graphql({ query: queries.listLoggings, variables: { limit: 100000, filter: filter } })
      setRawdata(allLogs.data.listLoggings.items);
    }
    getLogs();
    console.log(rawdata);
  }, []);
  return (
    (rawdata === null ||rawdata.length===0) ? (
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Paper>
            <Box
              p={1}
            >
              <Box p={1}>
                <Typography variant="h5">No data is present on this topic.</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>) : (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartComponent
            sensor="temp"
            rawdata={rawdata}
            title="Temperature"
            color="#74b9ff" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartComponent
            sensor="hum"
            rawdata={rawdata}
            title="Humidity"
            color="#00cec9" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartComponent
            sensor="lum"
            rawdata={rawdata}
            title="Luminance"
            color="#fdcb6e" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartComponent
            sensor="flow"
            rawdata={rawdata}
            title="Flow"
            color="#0984e3" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartComponent
            sensor="soilmoist"
            rawdata={rawdata}
            title="Soil Moisture"
            color="#6c5ce7" />
        </Grid>
      </Grid>)
  )
}

StatisticsArea.propTypes = {
  theme: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  CardChart: PropTypes.elementType
};

export default withTheme(StatisticsArea);
