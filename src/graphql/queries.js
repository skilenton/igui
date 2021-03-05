/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLogging = /* GraphQL */ `
  query GetLogging($timestamp: String!) {
    getLogging(timestamp: $timestamp) {
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
export const listLoggings = /* GraphQL */ `
  query ListLoggings(
    $filter: TableLoggingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLoggings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        timestamp
        hum
        lum
        flow
        temp
        soilmoist
        topic
      }
      nextToken
    }
  }
`;
