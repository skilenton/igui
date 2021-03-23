import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  withTheme,
  Paper,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card
} from "@material-ui/core";
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
  const [processedData, setProcessedData] = useState(
    [
      {
        temp:1,
        timestampConverted:1
      },
      {
        temp:2,
        timestampConverted:2
      },
      {
        temp:null,
        timestampConverted:3
      },
      {
        temp:4,
        timestampConverted:4
      },
      {
        temp:5,
        timestampConverted:5
      }
    ]
  );
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
      processed_data = sorted_data;
    }
    return processed_data;
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
    //getLogs();
  }, []);
  return (
    <Fragment>
      <Box pb={2}>
        <Card>
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item md={3} xs={12} >
              <Box p={1}>
                <Button onClick={getLogs} disableRipple fullWidth>
                  <RefreshIcon />
                  <Typography variant="subtitle2">Refresh</Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item md={3} xs={12}>
              <Box p={1}>
                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel id="measurement-system-label">Measurement System</InputLabel>
                  <Select
                    labelId="measurement-system-label"
                    id="measurement-system"
                    label="Measurement System"
                  >
                    <MenuItem value={"imperial"}>Imperial Units</MenuItem>
                    <MenuItem value={"metric"}>Metric Units</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Card>
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
              color="#74b9ff" />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartComponent
              sensor="hum"
              processedData={processedData}
              title="Humidity"
              color="#00cec9" />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartComponent
              sensor="lum"
              processedData={processedData}
              title="Luminance"
              color="#fdcb6e" />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartComponent
              sensor="flow"
              processedData={processedData}
              title="Flow"
              color="#0984e3" />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartComponent
              sensor="soilmoist"
              processedData={processedData}
              title="Soil Moisture"
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
