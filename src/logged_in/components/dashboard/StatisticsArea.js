import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, withTheme, Paper, Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import { Amplify, API, Auth } from 'aws-amplify';
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';
import * as subscriptions from '../../../graphql/subscriptions';
import ChartComponent from './statistics/ChartComponent';
import AWS from 'aws-sdk';
import { Skeleton } from "@material-ui/lab";
import { Fragment } from "react";

function StatisticsArea(props) {
  const { theme, CardChart } = props;
  const [processedData, setProcessedData] = useState(null);
  const [resolution, setResolution] = useState("day");
  const [isLoading, setIsLoading] = useState(false);
  const config = {
    // ...
    "aws_appsync_graphqlEndpoint": "https://dbilqb2x2rhppcesvpg7aqtcjy.appsync-api.ap-southeast-1.amazonaws.com/graphql",
    "aws_appsync_region": "ap-southeast-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-oky3i2gtuzazvgq5k77aqydehe",
    // ...
  }
  Amplify.configure(config);

  const processData = (result) => {
    let processed_data;
    let sorted_data;
    let parsed_data;
    if (result !== undefined && result !== null) {
      parsed_data = result.map((item) => ({
        timestamp: item.timestamp,
        temp: item.temp,
        hum: item.hum,
        lum: item.lum,
        soilmoist: item.soilmoist,
        flow: item.flow,
        timestampConverted: new Date(parseFloat(item.timestamp) * 1000)
      }));
      sorted_data = parsed_data.sort((a, b) => {
        return b.timestampConverted - a.timestampConverted;
      });
      // to implement 24hrs, 7 days, last 30 days type of stuff.
      processed_data = processResolution(sorted_data);
      //console.log(processed_data);
    }
    return processed_data;
  };
  const processResolution = (data) => {
    let result = [];
    let extract = [];
    switch (resolution) {
      case "day":
        extract = data.slice(0, 48);
        result = extract;
        break;
      case "week":
        extract = data.slice(0, 336);
        result = extract;
        break;
      case "month":
        break;
      case "year":
        break;
      case "alltime":
        result = data;
        break;
      default:
    }
    return result;
  };

  const handleResolutionChange = (event) => {
    setResolution(event.target.value);
    //getLogs();
  };

  async function getLogs() {
    setIsLoading(true);
    let topic = null;
    const user = await Auth.currentAuthenticatedUser();
    topic = user.attributes['custom:iot_topic'];
    let filter = {
      topic: {
        eq: topic
      }
    };
    const result = await API.graphql({ query: queries.listLoggings, variables: { limit: 100000, filter: filter } });
    if (result !== null) {
      let resultArray = result.data.listLoggings.items;
      setProcessedData(processData(resultArray));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getLogs();
  }, []);
  return (
    <Fragment>
      <Box pb={2}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <FormControl variant="outlined" >
              <InputLabel id="resolution-select-label">Resolution</InputLabel>
              <Select
                labelId="resolution-select-label"
                id="resolution-select"
                value={resolution}
                onChange={handleResolutionChange}
                label="Resolution"
              >
                <MenuItem value="day">24 hours</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="alltime">All Time</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button onClick={getLogs} disableRipple>
              <RefreshIcon />
              <Typography variant="subtitle2">Reload</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
      {(processedData === null || processedData.length === 0 || isLoading) ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Paper>
              <Box
                p={1}
              >
                <Box p={1}>
                  <Typography variant="h5">{(processedData === null || processedData.length === 0) ? "No data is present on this topic." : "Refreshing"}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ChartComponent
              sensor="temp"
              processedData={processedData}
              title="Temperature"
              unit="°C"
              color="#74b9ff" />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartComponent
              sensor="hum"
              processedData={processedData}
              title="Humidity"
              unit="%"
              color="#00cec9" />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartComponent
              sensor="lum"
              processedData={processedData}
              title="Luminance"
              unit="lux"
              color="#fdcb6e" />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartComponent
              sensor="flow"
              processedData={processedData}
              title="Flow"
              unit="mL/s"
              color="#0984e3" />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartComponent
              sensor="soilmoist"
              processedData={processedData}
              title="Soil Moisture"
              unit="%"
              color="#6c5ce7" />
          </Grid>
        </Grid>)}
    </Fragment>
  )
}

StatisticsArea.propTypes = {
  theme: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  CardChart: PropTypes.elementType
};

export default withTheme(StatisticsArea);
