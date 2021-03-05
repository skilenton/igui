/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLogging = /* GraphQL */ `
  subscription OnCreateLogging(
    $timestamp: String
    $hum: Float
    $lum: Float
    $flow: Float
    $temp: Float
  ) {
    onCreateLogging(
      timestamp: $timestamp
      hum: $hum
      lum: $lum
      flow: $flow
      temp: $temp
    ) {
      timestamp
      hum
      lum
      flow
      temp
      soilmoist
      topic
    }
  }
`;
export const onUpdateLogging = /* GraphQL */ `
  subscription OnUpdateLogging(
    $timestamp: String
    $hum: Float
    $lum: Float
    $flow: Float
    $temp: Float
  ) {
    onUpdateLogging(
      timestamp: $timestamp
      hum: $hum
      lum: $lum
      flow: $flow
      temp: $temp
    ) {
      timestamp
      hum
      lum
      flow
      temp
      soilmoist
      topic
    }
  }
`;
export const onDeleteLogging = /* GraphQL */ `
  subscription OnDeleteLogging(
    $timestamp: String
    $hum: Float
    $lum: Float
    $flow: Float
    $temp: Float
  ) {
    onDeleteLogging(
      timestamp: $timestamp
      hum: $hum
      lum: $lum
      flow: $flow
      temp: $temp
    ) {
      timestamp
      hum
      lum
      flow
      temp
      soilmoist
      topic
    }
  }
`;
