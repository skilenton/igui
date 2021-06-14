import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Divider } from "@material-ui/core";
import SettingsArea from "./SettingsArea";
import UserDataArea from "./UserDataArea";
import AccountInformationArea from "./AccountInformationArea";
import StatisticsArea from "./StatisticsArea";
import SensorArea from "./sensor/SensorArea";
import ValveArea from "./valve/ValveArea";

function Dashboard(props) {
  const {
    selectDashboard,
    CardChart,
    statistics,
    toggleAccountActivation,
    pushMessageToSnackbar,
    targets,
    setTargets,
    isAccountActivated,
  } = props;

  useEffect(selectDashboard, [selectDashboard]);

  return (
    <Fragment>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Sensor Real-time Readings
      </Typography>
      <SensorArea />
      <Box pt={2} pb={2}>
        <Divider />
      </Box>
      <Typography variant="h6" gutterBottom>
        Sensor Graphs
      </Typography>
      <StatisticsArea CardChart={CardChart} data={statistics} />
      <Box pt={2}>
        <Divider />
      </Box>
      <Typography variant="subtitle2" align="center" color="textSecondary">Intelligreen App 2021</Typography>
    </Fragment>
  );
}

Dashboard.propTypes = {
  CardChart: PropTypes.elementType,
  statistics: PropTypes.object.isRequired,
  toggleAccountActivation: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTargets: PropTypes.func.isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
  selectDashboard: PropTypes.func.isRequired,
};

export default Dashboard;
